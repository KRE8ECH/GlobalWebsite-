import { NextRequest } from "next/server";
import { GET as getSync, POST as postSync } from "../src/app/api/sync/route";
import { GET as getNotices } from "../src/app/api/notices/route";

async function testApiRoutes() {
  console.log("════════════════════════════════════════════════════════════════");
  console.log("  TESTING NEXT.JS API ROUTES (SYNC & NOTICES)                  ");
  console.log("════════════════════════════════════════════════════════════════\n");

  const secret = process.env.CRON_SECRET || "gitm_gurugram_sync_secret_2026";

  // 1. Test /api/sync Authorization
  console.log("▶ [Test 1] /api/sync Auth Guard");
  const unauthReq = new NextRequest("http://localhost:3000/api/sync");
  const unauthRes = await getSync(unauthReq);
  console.log(`  Unauthenticated GET: Status = ${unauthRes.status}`);
  if (unauthRes.status !== 401) throw new Error("Expected 401 Unauthorized for missing token");

  const wrongReq = new NextRequest("http://localhost:3000/api/sync", {
    headers: { Authorization: "Bearer wrong-secret" },
  });
  const wrongRes = await getSync(wrongReq);
  console.log(`  Invalid Bearer Token: Status = ${wrongRes.status}`);
  if (wrongRes.status !== 401) throw new Error("Expected 401 Unauthorized for invalid token");

  // 2. Test /api/sync Authorized GET
  console.log("\n▶ [Test 2] /api/sync Authorized GET with Bearer Token");
  const authReq = new NextRequest("http://localhost:3000/api/sync?limit=2", {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const authRes = await getSync(authReq);
  const syncData = await authRes.json();
  console.log(`  Status = ${authRes.status}, Response:`, JSON.stringify(syncData));
  if (authRes.status !== 200 || !syncData.success) {
    throw new Error(`Sync GET failed: ${JSON.stringify(syncData)}`);
  }

  // 3. Test /api/sync Authorized POST with custom HTML payload
  console.log("\n▶ [Test 3] /api/sync Authorized POST with Custom HTML");
  const postReq = new NextRequest("http://localhost:3000/api/sync", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customHtml: `
        <ul class="list-group">
          <li>
            <a href="Notice/Special_Campus_Placement_Notice_2026.pdf">Special Gurugram University Joint Placement Circular <span class="badge-new">NEW</span></a>
            <span class="badge-date">2026-11-03</span>
          </li>
        </ul>
      `,
    }),
  });
  const postRes = await postSync(postReq);
  const postData = await postRes.json();
  console.log(`  Status = ${postRes.status}, Response:`, JSON.stringify(postData));
  if (postRes.status !== 200 || !postData.success) {
    throw new Error(`Sync POST failed: ${JSON.stringify(postData)}`);
  }

  // 4. Test /api/notices Read API with Filters & Pagination
  console.log("\n▶ [Test 4] /api/notices General Query");
  const noticesReq = new NextRequest("http://localhost:3000/api/notices?page=1&limit=5");
  const noticesRes = await getNotices(noticesReq);
  const noticesData = await noticesRes.json();
  console.log(`  Status = ${noticesRes.status}, Total = ${noticesData.pagination.total}, Retrieved = ${noticesData.data.length}`);
  if (noticesRes.status !== 200 || !noticesData.success) {
    throw new Error(`Notices fetch failed: ${JSON.stringify(noticesData)}`);
  }

  // 5. Test /api/notices Filter by source=GURUGRAM_UNIVERSITY
  console.log("\n▶ [Test 5] /api/notices Filter by source=GURUGRAM_UNIVERSITY");
  const guReq = new NextRequest("http://localhost:3000/api/notices?source=GURUGRAM_UNIVERSITY&limit=3");
  const guRes = await getNotices(guReq);
  const guData = await guRes.json();
  console.log(`  Status = ${guRes.status}, GU Notices Count = ${guData.pagination.total}`);
  if (guRes.status !== 200 || guData.data.some((n: { source: string }) => n.source !== "GURUGRAM_UNIVERSITY")) {
    throw new Error("Source filter did not return strictly GURUGRAM_UNIVERSITY notices");
  }

  // 6. Test /api/notices Filter by category=EXAM
  console.log("\n▶ [Test 6] /api/notices Filter by category=EXAM");
  const examReq = new NextRequest("http://localhost:3000/api/notices?category=EXAM&limit=3");
  const examRes = await getNotices(examReq);
  const examData = await examRes.json();
  console.log(`  Status = ${examRes.status}, EXAM Notices Count = ${examData.pagination.total}`);
  if (examRes.status !== 200 || examData.data.some((n: { category: string }) => n.category !== "EXAM")) {
    throw new Error("Category filter did not return strictly EXAM notices");
  }

  console.log("\n✨ All API route tests passed successfully!\n");
}

testApiRoutes()
  .catch((e) => {
    console.error("❌ API route test failed:", e);
    process.exit(1);
  });

