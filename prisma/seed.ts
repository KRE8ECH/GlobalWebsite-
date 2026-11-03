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

  // 1. Seed Programs (Comprehensive set covering UG, PG, and Diploma)
  const programs = await Promise.all([
    // UNDERGRADUATE
    prisma.program.create({
      data: {
        slug: "btech-cse",
        name: "B.Tech in Computer Science & Engineering",
        department: Department.ENGINEERING,
        level: ProgramLevel.UG,
        durationYears: 4,
        eligibility: "10+2 with Physics, Mathematics & Chemistry/CS with min 50% aggregate marks",
        intake: 120,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/btech-cse-nep2020.pdf",
        description:
          "NEP 2020 compliant engineering curriculum covering foundational computing, advanced algorithms, cloud architecture, cybersecurity, and modern software engineering practices affiliated with Gurugram University.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "btech-ai-ds",
        name: "B.Tech in Artificial Intelligence & Data Science",
        department: Department.ENGINEERING,
        level: ProgramLevel.UG,
        durationYears: 4,
        eligibility: "10+2 with Physics, Mathematics & Chemistry/CS with min 50% aggregate marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/btech-aids-nep2020.pdf",
        description:
          "Specialized B.Tech program focused on neural networks, machine learning operations, large language models, computer vision, data pipelines, and predictive modeling.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "bca",
        name: "Bachelor of Computer Applications (BCA)",
        department: Department.COMPUTER_APPLICATIONS,
        level: ProgramLevel.UG,
        durationYears: 3,
        eligibility: "10+2 in any stream with Mathematics or Computer Science with min 45% marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/bca-nep2020.pdf",
        description:
          "Practical three-year degree centered on web full-stack development, database architecture, mobile application development, and cloud-native computing.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "bba",
        name: "Bachelor of Business Administration (BBA)",
        department: Department.MANAGEMENT,
        level: ProgramLevel.UG,
        durationYears: 3,
        eligibility: "10+2 in any stream from a recognized board with minimum 45% aggregate marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/bba-nep2020.pdf",
        description:
          "Foundational management degree developing managerial competencies, marketing strategies, corporate finance, and business analytics for aspiring young executives.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "b-pharm",
        name: "Bachelor of Pharmacy (B.Pharm)",
        department: Department.PHARMACY,
        level: ProgramLevel.UG,
        durationYears: 4,
        eligibility: "10+2 with Physics, Chemistry and Biology/Mathematics with min 50% aggregate marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/bpharm-pci.pdf",
        description:
          "PCI approved undergraduate program providing rigorous laboratory training in pharmaceutical synthesis, clinical pharmacology, drug formulation, regulatory affairs, and biotechnology.",
      },
    }),

    // POSTGRADUATE
    prisma.program.create({
      data: {
        slug: "mba",
        name: "Master of Business Administration (MBA)",
        department: Department.MANAGEMENT,
        level: ProgramLevel.PG,
        durationYears: 2,
        eligibility: "Graduation in any discipline with minimum 50% aggregate marks from a recognized university",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/mba-nep2020.pdf",
        description:
          "Industry-integrated management program with dual specializations in Marketing, Finance, Human Resources, and Business Analytics, fostering corporate leadership and strategic vision.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "mtech-cse",
        name: "M.Tech in Computer Science & Engineering",
        department: Department.ENGINEERING,
        level: ProgramLevel.PG,
        durationYears: 2,
        eligibility: "B.Tech/B.E in CSE/IT or MCA with minimum 50% aggregate marks from a recognized university",
        intake: 18,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/mtech-cse.pdf",
        description:
          "Advanced master's degree focusing on distributed systems, AI research, cloud infrastructure, cryptography, and academic thesis publishing under Gurugram University.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "mca",
        name: "Master of Computer Applications (MCA)",
        department: Department.COMPUTER_APPLICATIONS,
        level: ProgramLevel.PG,
        durationYears: 2,
        eligibility: "BCA or B.Sc (CS/IT) or graduation with Mathematics at 10+2 or Degree level with min 50% marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/mca-nep2020.pdf",
        description:
          "Two-year professional master's degree covering enterprise software development, DevOps, AI integration, cyber defense, and cloud database administration.",
      },
    }),

    // DIPLOMA
    prisma.program.create({
      data: {
        slug: "diploma-me",
        name: "Diploma in Mechanical Engineering",
        department: Department.ENGINEERING,
        level: ProgramLevel.DIPLOMA,
        durationYears: 3,
        eligibility: "10th standard pass with Science and Mathematics with minimum 35% marks",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/diploma-me.pdf",
        description:
          "Technical polytechnic diploma covering workshop technology, thermodynamics, CAD/CAM, automotive engineering, and industrial manufacturing maintenance.",
      },
    }),
    prisma.program.create({
      data: {
        slug: "d-pharm",
        name: "Diploma in Pharmacy (D.Pharm)",
        department: Department.PHARMACY,
        level: ProgramLevel.DIPLOMA,
        durationYears: 2,
        eligibility: "10+2 with Physics, Chemistry and Biology/Mathematics from a recognized board",
        intake: 60,
        syllabusPdfUrl: "https://gitm.ac.in/syllabus/dpharm-pci.pdf",
        description:
          "Two-year PCI approved diploma qualifying candidates for community pharmacy registration, dispensing practice, hospital pharmacy inventory, and drug quality testing.",
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
      },
    }),
    prisma.placementHighlight.create({
      data: {
        studentName: "Siddharth Patel",
        company: "Capgemini",
        packageLPA: 10.5,
        designation: "Full Stack Consultant",
        year: 2026,
        branch: "BCA",
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
      },
    }),
  ]);

  console.log(`✅ Seeded ${placements.length} placement highlights.`);

  // 3. Seed Notices (Split between Gurugram University and GITM Campus)
  const now = new Date();
  const notices = await Promise.all([
    // Gurugram University Updates
    prisma.notice.create({
      data: {
        title: "Gurugram University Semester End Examination Schedule & Admit Card Circular (May-June 2026)",
        category: NoticeCategory.EXAM,
        source: NoticeSource.GURUGRAM_UNIVERSITY,
        publishDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        isPinned: true,
        pdfUrl: "https://gurugramuniversity.ac.in/Notice/exam-datesheet-2026.pdf",
        sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/examNotice/index.php",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Re-Evaluation & Re-Checking Result Notification for Odd Semester Examinations",
        category: NoticeCategory.EXAM,
        source: NoticeSource.GURUGRAM_UNIVERSITY,
        publishDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        isPinned: true,
        pdfUrl: "https://gurugramuniversity.ac.in/Notice/Re-Evaluation_Result_Dec_2025.pdf",
        sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/resultNotice/index.php",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Samarth eGov Portal Registration Mandatory for All Affiliated Colleges Batch 2026",
        category: NoticeCategory.ACADEMIC,
        source: NoticeSource.GURUGRAM_UNIVERSITY,
        publishDate: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        isPinned: false,
        pdfUrl: "https://gurugramuniversity.ac.in/Notice/samarth-portal-circular.pdf",
        sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/generalNotice/index.php",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Notification regarding Gazetted Holiday for Gurugram Campus & Affiliated Institutes on Haryana Day",
        category: NoticeCategory.HOLIDAY,
        source: NoticeSource.GURUGRAM_UNIVERSITY,
        publishDate: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
        isPinned: false,
        pdfUrl: "https://gurugramuniversity.ac.in/Notice/haryana-day-holiday-2026.pdf",
        sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/generalNotice/index.php",
      },
    }),

    // GITM Campus Circulars
    prisma.notice.create({
      data: {
        title: "Technovation 2026: Annual National Techno-Management Fest Registration Open",
        category: NoticeCategory.GENERAL,
        source: NoticeSource.GITM,
        publishDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        isPinned: true,
        sourceUrl: "https://gitm.ac.in/technovation-2026",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Wipro & Infosys Joint On-Campus Placement Drive for 2026 Passing Out Batch",
        category: NoticeCategory.ACADEMIC,
        source: NoticeSource.GITM,
        publishDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        isPinned: true,
        pdfUrl: "https://gitm.ac.in/circulars/crc-placement-drive-wipro.pdf",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Call for Research Papers: National Conference on Generative AI & Sustainable Computing",
        category: NoticeCategory.ACADEMIC,
        source: NoticeSource.GITM,
        publishDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        isPinned: false,
        pdfUrl: "https://gitm.ac.in/docs/nc-aics-call-for-papers.pdf",
      },
    }),
    prisma.notice.create({
      data: {
        title: "Library Timings Extended for End-Semester Preparation & Digital Portal Access",
        category: NoticeCategory.GENERAL,
        source: NoticeSource.GITM,
        publishDate: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
        isPinned: false,
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
        date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
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
        date: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000),
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
