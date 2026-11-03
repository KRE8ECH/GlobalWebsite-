import { PrismaClient, Department, ProgramLevel, NoticeCategory, NoticeSource } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for GITM Gurgaon...");

  // Clean existing records to allow idempotent seed runs
  await prisma.inquiry.deleteMany();
  await prisma.placementHighlight.deleteMany();
  await prisma.event.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.program.deleteMany();

  console.log("🧹 Cleaned existing tables.");

  // 1. Seed Programs (5 core courses requested)
  const programs = await Promise.all([
    prisma.program.create({
      data: {
        slug: "btech-cse",
        name: "B.Tech in Computer Science & Engineering",
        department: Department.ENGINEERING,
        level: ProgramLevel.UG,
        durationYears: 4,
        eligibility: "10+2 with Physics, Mathematics & Chemistry/Computer Science with minimum 50% aggregate marks",
        intake: 120,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/btech-cse.pdf",
        description:
          "Comprehensive engineering curriculum covering foundational computing, advanced algorithms, cloud architecture, system design, cybersecurity, and modern software engineering practices affiliated with Gurugram University.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "btech-ai-ds",
        name: "B.Tech in Artificial Intelligence & Data Science",
        department: Department.ENGINEERING,
        level: ProgramLevel.UG,
        durationYears: 4,
        eligibility: "10+2 with Physics, Mathematics & Chemistry/CS with minimum 50% aggregate marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/btech-aids.pdf",
        description:
          "Specialized B.Tech program focused on neural networks, machine learning operations, large language models, computer vision, data engineering pipelines, and statistical modeling.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "mba",
        name: "Master of Business Administration (MBA)",
        department: Department.MANAGEMENT,
        level: ProgramLevel.PG,
        durationYears: 2,
        eligibility: "Bachelor's degree in any discipline with minimum 50% aggregate marks from a recognized university",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/mba.pdf",
        description:
          "Industry-integrated management program with dual specializations in Marketing, Finance, Human Resources, and Business Analytics, fostering strategic leadership and entrepreneurial acumen.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "bca",
        name: "Bachelor of Computer Applications (BCA)",
        department: Department.COMPUTER_APPLICATIONS,
        level: ProgramLevel.UG,
        durationYears: 3,
        eligibility: "10+2 in any stream with Mathematics or Computer Science with minimum 45% marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/bca.pdf",
        description:
          "Practical three-year degree centered on web full-stack development, database architecture, mobile application development, and cloud-native solutions.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "b-pharm",
        name: "Bachelor of Pharmacy (B.Pharm)",
        department: Department.PHARMACY,
        level: ProgramLevel.UG,
        durationYears: 4,
        eligibility: "10+2 with Physics, Chemistry and Biology/Mathematics with minimum 50% aggregate marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/bpharm.pdf",
        description:
          "PCI approved undergraduate program providing rigorous laboratory training in pharmaceutical synthesis, clinical pharmacology, drug formulation, regulatory affairs, and biotechnology.",
      },
    }),
  ]);

  console.log(`✅ Seeded ${programs.length} academic programs.`);

  // 2. Seed Placement Highlights
  const placements = await Promise.all([
    prisma.placementHighlight.create({
      data: {
        studentName: "Aarav Sharma",
        company: "Google",
        packageLPA: 28.5,
        designation: "Software Engineer - Cloud Systems",
        year: 2026,
        branch: "B.Tech CSE",
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      },
    }),
    prisma.placementHighlight.create({
      data: {
        studentName: "Priya Verma",
        company: "Microsoft",
        packageLPA: 24.0,
        designation: "Technology Specialist (Azure)",
        year: 2026,
        branch: "B.Tech CSE",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      },
    }),
    prisma.placementHighlight.create({
      data: {
        studentName: "Rohan Gupta",
        company: "Amazon Web Services",
        packageLPA: 21.0,
        designation: "Associate Cloud Architect",
        year: 2026,
        branch: "B.Tech AI-DS",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      },
    }),
    prisma.placementHighlight.create({
      data: {
        studentName: "Ananya Sen",
        company: "Deloitte",
        packageLPA: 12.5,
        designation: "Business Technology Analyst",
        year: 2026,
        branch: "MBA",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      },
    }),
    prisma.placementHighlight.create({
      data: {
        studentName: "Siddharth Patel",
        company: "TCS Digital",
        packageLPA: 9.0,
        designation: "Full Stack Engineer",
        year: 2026,
        branch: "BCA",
        photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      },
    }),
    prisma.placementHighlight.create({
      data: {
        studentName: "Neha Malik",
        company: "Sun Pharma",
        packageLPA: 8.5,
        designation: "Formulation R&D Associate",
        year: 2026,
        branch: "B.Pharm",
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
      },
    }),
  ]);

  console.log(`✅ Seeded ${placements.length} placement highlights.`);

  // 3. Seed Sample Notices
  const notices = await Promise.all([
    prisma.notice.create({
      data: {
        title: "Admissions Open for Academic Session 2026-27 at GITM Gurgaon",
        category: NoticeCategory.ADMISSION,
        source: NoticeSource.GITM,
        publishDate: new Date(),
        isPinned: true,
        sourceUrl: "https://gitm.ac.in/admissions-2026",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Gurugram University Semester End Examination Schedule & Admit Card Circular",
        category: NoticeCategory.EXAM,
        source: NoticeSource.GURUGRAM_UNIVERSITY,
        publishDate: new Date(),
        isPinned: true,
        pdfUrl: "https://gurugramuniversity.ac.in/notices/exam-datesheet-2026.pdf",
        sourceUrl: "https://gurugramuniversity.ac.in/notices",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Academic Calendar for Odd Semester 2026-27 Released",
        category: NoticeCategory.ACADEMIC,
        source: NoticeSource.GITM,
        publishDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        isPinned: false,
        pdfUrl: "https://gitm.ac.in/docs/academic-calendar-2026.pdf",
      },
    }),
  ]);

  console.log(`✅ Seeded ${notices.length} notices.`);

  // 4. Seed Sample Events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "InnovateX: National Hackathon & AI Showcase 2026",
        summary:
          "36-hour continuous inter-college hackathon focusing on AI agents, smart mobility, healthcare, and sustainable tech with prize pool over ₹5 Lakhs.",
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        location: "GITM Auditorium & Advanced Computing Labs, Gurgaon",
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80",
        tags: "Hackathon,AI,Innovation,Coding",
      },
    }),
    prisma.event.create({
      data: {
        title: "Annual Corporate Leadership & Placement Conclave",
        summary:
          "Distinguished panel discussions featuring CHROs and tech leaders from Fortune 500 enterprises discussing hiring trends and technical competencies.",
        date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        location: "Convention Hall, GITM Campus",
        imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
        tags: "Placements,Leadership,Industry,Networking",
      },
    }),
  ]);

  console.log(`✅ Seeded ${events.length} events.`);

  console.log("✨ GITM Gurgaon database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

