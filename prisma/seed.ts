/**
 * Database seed — GITM Gurugram
 * ---------------------------------------------------------------------------
 * Seeds from the SAME canonical data the site renders, so the database and the
 * static fallback can never disagree. The previous seed hard-coded its own copy
 * of the programmes and notices, which is how the site ended up publishing three
 * different "highest package" figures.
 *
 * Run:  npm run db:seed       (requires DATABASE_URL)
 * This is optional — the site runs fully without a database.
 */

import { PrismaClient } from "@prisma/client";
import { programs, campusFacts } from "../src/data/site";
import {
  academicCalendar,
  fallbackEvents,
  fallbackNotices,
  fallbackPlacements,
} from "../src/data/content";

const prisma = new PrismaClient();

const departmentMap = {
  Engineering: "ENGINEERING",
  Management: "MANAGEMENT",
  Pharmacy: "PHARMACY",
  "Computer Applications": "COMPUTER_APPLICATIONS",
} as const;

async function main() {
  console.log("Seeding GITM Gurugram…");

  // Clear in dependency order.
  await prisma.inquiry.deleteMany();
  await prisma.placementHighlight.deleteMany();
  await prisma.event.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.program.deleteMany();

  /* Programmes ---------------------------------------------------------- */
  for (const programme of programs) {
    await prisma.program.create({
      data: {
        slug: programme.slug,
        name: programme.name,
        department: departmentMap[programme.department] as never,
        level: programme.level as never,
        durationYears: programme.durationYears,
        eligibility: programme.eligibility,
        intake: programme.intake ?? 0,
        description: programme.description,
      },
    });
  }
  console.log(`  ${programs.length} programmes`);

  /* Notices ------------------------------------------------------------- */
  for (const notice of fallbackNotices) {
    await prisma.notice.create({
      data: {
        title: notice.title,
        category: notice.category as never,
        source: notice.source as never,
        publishDate: new Date(notice.publishDate),
        pdfUrl: notice.pdfUrl ?? null,
        sourceUrl: notice.sourceUrl ?? null,
        isPinned: notice.isPinned,
      },
    });
  }
  console.log(`  ${fallbackNotices.length} notices`);

  /* Events -------------------------------------------------------------- */
  for (const event of fallbackEvents) {
    await prisma.event.create({
      data: {
        slug: event.slug,
        title: event.title,
        summary: event.summary,
        date: new Date(event.date),
        location: event.location,
        imageUrl: event.imageUrl ?? null,
        tags: event.tags.join(","),
      },
    });
  }
  console.log(`  ${fallbackEvents.length} events`);

  /* Placement highlights ------------------------------------------------ */
  for (const placement of fallbackPlacements) {
    await prisma.placementHighlight.create({
      data: {
        studentName: placement.studentName,
        company: placement.company,
        packageLPA: placement.packageLPA,
        designation: placement.designation,
        year: placement.year,
        branch: placement.branch,
        photoUrl: placement.photoUrl ?? null,
      },
    });
  }
  console.log(`  ${fallbackPlacements.length} placement highlights`);

  console.log(
    `\nDone. Campus reference: ${campusFacts.acres} acres, ${campusFacts.builtUpSqFt}.`
  );
  console.log(`Academic calendar entries in static data: ${academicCalendar.length}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
