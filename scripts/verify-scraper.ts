import {
  parseNoticesFromHtml,
  determineNoticeCategory,
  resolveGurugramUrl,
  hashTitle,
  syncGurugramUniversityNotices,
} from "../src/lib/scraper/gurugram-univ";
import prisma from "../src/lib/prisma";
import { NoticeCategory, NoticeSource } from "@prisma/client";

// Realistic Gurugram University mock HTML snippet
const MOCK_GU_HTML = `
<!DOCTYPE html>
<html>
<head><title>Gurugram University Notifications</title></head>
<body>
  <div class="row pgrow wow fadeInDown admission-list-container">
    <ul class="list-group w-100">
      <li>
        <span class="notice-icon">📄</span>
        <a href="Notice/Re-Evaluation_Result_Dec_2025.pdf" target="_blank">
          Re-Evaluation Result Notification for B.Tech Semester Exams (Dec 2025) <span class="badge-new">NEW</span>
        </a>
        <span class="badge-date">2026-11-03</span>
      </li>
      <li>
        <span class="notice-icon">📄</span>
        <a href="/Notice/DateSheet_Even_Semester_May_2026.pdf" target="_blank">
          Theory & Practical Date Sheet for Even Semester Examinations 2026
        </a>
        <span class="badge-date">2026-10-28</span>
      </li>
      <li>
        <span class="notice-icon">📄</span>
        <a href="https://gurugramuniversity.ac.in/Notice/UG_PG_Admissions_Round3_Counseling.pdf" target="_blank">
          UG/PG Admissions Round 3 Counseling and Seat Allotment Circular <span class="badge-new">NEW</span>
        </a>
        <span class="badge-date">2026-10-25</span>
      </li>
      <li>
        <span class="notice-icon">📄</span>
        <a href="Notice/Gazetted_Holiday_Diwali_Break_2026.pdf" target="_blank">
          Gazetted Holiday Notification - Diwali Break & University Campus Closure
        </a>
        <span class="badge-date">2026-10-20</span>
      </li>
      <li>
        <span class="notice-icon">📄</span>
        <a href="Notice/Revised_Academic_Calendar_2026-27.pdf" target="_blank">
          Revised Academic Calendar & Teaching Schedule for Session 2026-27
        </a>
        <span class="badge-date">2026-10-15</span>
      </li>
    </ul>
  </div>
</body>
</html>
`;

async function runVerification() {
  console.log("════════════════════════════════════════════════════════════════");
  console.log("  GURUGRAM UNIVERSITY NOTIFICATION SCRAPER VERIFICATION SUITE  ");
  console.log("════════════════════════════════════════════════════════════════\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      if (details) console.error(`     Details: ${details}`);
    }
  }

  // TEST 1: URL Resolution
  console.log("▶ [Test 1] URL Resolution Safeguards");
  const rel1 = resolveGurugramUrl("Notice/exam.pdf");
  assert(
    rel1 === "https://gurugramuniversity.ac.in/Notice/exam.pdf",
    "Resolves relative path without leading slash",
    rel1
  );

  const rel2 = resolveGurugramUrl("/allNotifications/datesheet.pdf");
  assert(
    rel2 === "https://gurugramuniversity.ac.in/allNotifications/datesheet.pdf",
    "Resolves root-relative path with leading slash",
    rel2
  );

  const abs = resolveGurugramUrl("https://gurugramuniversity.ac.in/docs/test.pdf");
  assert(
    abs === "https://gurugramuniversity.ac.in/docs/test.pdf",
    "Preserves already absolute URLs",
    abs
  );

  // TEST 2: Category Inference
  console.log("\n▶ [Test 2] Notice Category Inference");
  assert(
    determineNoticeCategory("Re-Evaluation Result of B.Tech 6th Sem") === NoticeCategory.EXAM,
    "Maps 'Result' to EXAM"
  );
  assert(
    determineNoticeCategory("Theory Examination Date Sheet for MCA") === NoticeCategory.EXAM,
    "Maps 'Date Sheet' to EXAM"
  );
  assert(
    determineNoticeCategory("UG/PG Admission Counseling Notice 2026") === NoticeCategory.ADMISSION,
    "Maps 'Admission Counseling' to ADMISSION"
  );
  assert(
    determineNoticeCategory("Notification regarding Gazetted Holiday for Gurugram Campus") === NoticeCategory.HOLIDAY,
    "Maps 'Holiday' to HOLIDAY"
  );
  assert(
    determineNoticeCategory("Academic Calendar for Academic Year 2026-27") === NoticeCategory.ACADEMIC,
    "Maps 'Academic Calendar' to ACADEMIC"
  );
  assert(
    determineNoticeCategory("General Advisory regarding Vehicle Parking in Campus") === NoticeCategory.GENERAL,
    "Maps generic announcement to GENERAL"
  );

  // TEST 3: Mock HTML Parsing
  console.log("\n▶ [Test 3] Mock HTML Scraper Parsing");
  const parsedNotices = parseNoticesFromHtml(
    MOCK_GU_HTML,
    "https://gurugramuniversity.ac.in/allNotifications/resultNotice/index.php"
  );

  assert(parsedNotices.length === 5, `Parsed exactly 5 notices (got ${parsedNotices.length})`);

  const n1 = parsedNotices[0];
  assert(
    n1.title === "Re-Evaluation Result Notification for B.Tech Semester Exams (Dec 2025)",
    `Cleaned title correctly: "${n1.title}"`
  );
  assert(n1.isPinned === true, "Identified NEW badge as pinned notice");
  assert(
    n1.pdfUrl === "https://gurugramuniversity.ac.in/Notice/Re-Evaluation_Result_Dec_2025.pdf",
    `Resolved absolute PDF URL: "${n1.pdfUrl}"`
  );
  assert(
    n1.category === NoticeCategory.EXAM,
    `Correctly categorized as EXAM: "${n1.category}"`
  );

  // TEST 4: Title Hashing Deduplication
  console.log("\n▶ [Test 4] Title Hash Stability");
  const h1 = hashTitle("Re-Evaluation Result Notification for B.Tech");
  const h2 = hashTitle("  re-evaluation result notification for b.tech!  ");
  assert(h1 === h2, "Hash is case and punctuation insensitive");

  // TEST 5: Database Synchronization & Deduplication Idempotency
  console.log("\n▶ [Test 5] Database Sync & Deduplication Idempotency");
  
  // Clean mock entries first if present
  const mockTitles = [
    "Re-Evaluation Result Notification for B.Tech Semester Exams (Dec 2025)",
    "Theory & Practical Date Sheet for Even Semester Examinations 2026",
    "UG/PG Admissions Round 3 Counseling and Seat Allotment Circular",
    "Gazetted Holiday Notification - Diwali Break & University Campus Closure",
    "Revised Academic Calendar & Teaching Schedule for Session 2026-27",
  ];
  await prisma.notice.deleteMany({
    where: {
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      title: { in: mockTitles },
    },
  });

  // First sync pass: should insert the new mock notices
  const syncPass1 = await syncGurugramUniversityNotices({
    customHtml: MOCK_GU_HTML,
    sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/resultNotice/index.php",
  });

  console.log(`  Sync Pass 1 Result: Synced = ${syncPass1.synced}, Skipped = ${syncPass1.skipped}, Errors = ${syncPass1.errors.length}`);
  assert(syncPass1.synced >= 5, `First sync inserted ${syncPass1.synced} notices (expected >= 5)`);
  assert(syncPass1.errors.length === 0, "First sync completed with 0 errors");

  // Second sync pass with the EXACT same HTML: must skip all duplicates!
  const syncPass2 = await syncGurugramUniversityNotices({
    customHtml: MOCK_GU_HTML,
    sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/resultNotice/index.php",
  });

  console.log(`  Sync Pass 2 Result: Synced = ${syncPass2.synced}, Skipped = ${syncPass2.skipped}, Errors = ${syncPass2.errors.length}`);
  assert(syncPass2.synced === 0, "Second sync correctly skipped all duplicate notices (synced = 0)");
  assert(syncPass2.skipped >= 5, `Second sync recognized duplicates (skipped = ${syncPass2.skipped})`);

  // TEST 6: Verify Database Query & Category Filters
  console.log("\n▶ [Test 6] Database Query and Category Verification");
  const examNotices = await prisma.notice.findMany({
    where: {
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      category: NoticeCategory.EXAM,
    },
  });
  assert(examNotices.length > 0, `Found ${examNotices.length} EXAM notices in database`);

  const holidayNotices = await prisma.notice.findMany({
    where: {
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      category: NoticeCategory.HOLIDAY,
    },
  });
  assert(holidayNotices.length > 0, `Found ${holidayNotices.length} HOLIDAY notices in database`);

  // TEST 7: Live Gurugram University Portal Connection (Non-blocking)
  console.log("\n▶ [Test 7] Live Gurugram University Portal Live Scrape");
  try {
    const liveSync = await syncGurugramUniversityNotices({ limitPerCategory: 3 });
    console.log(`  Live Portal Sync Result: Synced = ${liveSync.synced}, Skipped = ${liveSync.skipped}, Errors = ${liveSync.errors.length}`);
    assert(
      liveSync.synced + liveSync.skipped > 0,
      `Live Gurugram University scrape processed ${liveSync.synced + liveSync.skipped} circulars`
    );
  } catch (err: unknown) {
    console.warn(`  ⚠️ Live portal fetch warning: ${(err as Error).message}`);
  }

  console.log("\n════════════════════════════════════════════════════════════════");
  console.log(`  SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
  console.log("════════════════════════════════════════════════════════════════\n");

  if (passedTests === totalTests) {
    console.log("✨ All verification checks passed successfully!");
    process.exit(0);
  } else {
    console.error("❌ Some verification checks failed.");
    process.exit(1);
  }
}

runVerification()
  .catch((e) => {
    console.error("Fatal error during verification:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

