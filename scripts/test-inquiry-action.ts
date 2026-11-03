import { submitInquiryAction } from "../src/actions/submit-inquiry";
import prisma from "../src/lib/prisma";

async function testInquiryAction() {
  console.log("════════════════════════════════════════════════════════════════");
  console.log("  TESTING ADMISSION INQUIRY ACTION & HONEYPOT SPAM GUARD       ");
  console.log("════════════════════════════════════════════════════════════════\n");

  // 1. Test Valid Candidate Submission
  console.log("▶ [Test 1] Valid Candidate Submission");
  const validPayload = {
    fullName: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "9876543210", // Valid 10-digit Indian mobile
    state: "Haryana",
    highestQualification: "12th Standard (PCM)",
    courseInterested: "B.Tech in Computer Science & Engineering",
    message: "Seeking admission in 2026-27 batch.",
    honeypot: "",
  };

  const res1 = await submitInquiryAction(validPayload);
  console.log("  Result:", JSON.stringify(res1));
  if (!res1.success || !res1.inquiryId) {
    throw new Error(`Expected success on valid payload, got: ${JSON.stringify(res1)}`);
  }

  // Verify saved in DB
  const dbRecord = await prisma.inquiry.findUnique({
    where: { id: res1.inquiryId },
  });
  console.log(`  Persisted in DB: #${dbRecord?.id.slice(-6).toUpperCase()} for ${dbRecord?.fullName}`);
  if (!dbRecord || dbRecord.phone !== "9876543210") {
    throw new Error("Record was not persisted correctly in database");
  }

  // 2. Test Honeypot Anti-Spam Defense
  console.log("\n▶ [Test 2] Honeypot Anti-Spam Defense");
  const botPayload = {
    ...validPayload,
    fullName: "Spam Bot",
    email: "bot@spamnetwork.com",
    honeypot: "https://spam-link.com", // Bot filled honeypot
  };

  const res2 = await submitInquiryAction(botPayload);
  console.log("  Bot Submission Result:", JSON.stringify(res2));
  if (res2.inquiryId !== "BOT_TRAPPED") {
    throw new Error("Honeypot did not trap bot payload");
  }

  // Verify bot was NOT written to DB
  const botInDb = await prisma.inquiry.findFirst({
    where: { email: "bot@spamnetwork.com" },
  });
  if (botInDb) {
    throw new Error("Bot submission was written to DB despite honeypot trigger");
  }
  console.log("  ✅ Bot silently dropped, 0 spam records in DB");

  // 3. Test Invalid Mobile Number Validation
  console.log("\n▶ [Test 3] Invalid Phone Validation");
  const invalidPhonePayload = {
    ...validPayload,
    phone: "12345", // Invalid short phone
  };
  const res3 = await submitInquiryAction(invalidPhonePayload);
  console.log("  Invalid Phone Result:", JSON.stringify(res3));
  if (res3.success) {
    throw new Error("Invalid phone was unexpectedly accepted");
  }

  // 4. Test Invalid Email Validation
  console.log("\n▶ [Test 4] Invalid Email Validation");
  const invalidEmailPayload = {
    ...validPayload,
    email: "not-an-email",
  };
  const res4 = await submitInquiryAction(invalidEmailPayload);
  console.log("  Invalid Email Result:", JSON.stringify(res4));
  if (res4.success) {
    throw new Error("Invalid email was unexpectedly accepted");
  }

  // Cleanup test record
  await prisma.inquiry.delete({ where: { id: res1.inquiryId } });

  console.log("\n✨ All Admission Inquiry Action tests passed successfully!\n");
}

testInquiryAction()
  .catch((e) => {
    console.error("❌ Inquiry action test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
