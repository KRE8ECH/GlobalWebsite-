import { PrismaClient, Department, ProgramLevel, NoticeCategory, NoticeSource } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for GITM Gurgaon with official media...");

  // 1. Clean existing records
  await prisma.inquiry.deleteMany();
  await prisma.placementHighlight.deleteMany();
  await prisma.event.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.program.deleteMany();
  console.log("🧹 Cleaned existing tables.");

  // 2. Seed Programs
  const programsData = [
    {
      slug: "b-tech-cse",
      name: "B.Tech in Computer Science & Engineering",
      department: Department.ENGINEERING,
      level: ProgramLevel.UG,
      durationYears: 4,
      eligibility: "10+2 with Physics & Mathematics along with Chemistry/CS (min 50% marks)",
      intake: 180,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/BTech_CSE_NEP_2020.pdf",
      description: "Premier engineering degree covering full-stack software development, cloud systems, algorithms, distributed computing, and cybersecurity aligned with NEP 2020.",
    },
    {
      slug: "b-tech-ai-ds",
      name: "B.Tech in Artificial Intelligence & Data Science",
      department: Department.ENGINEERING,
      level: ProgramLevel.UG,
      durationYears: 4,
      eligibility: "10+2 with Physics & Mathematics along with Chemistry/CS (min 50% marks)",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/BTech_AIDS_NEP_2020.pdf",
      description: "Specialized undergraduate program focusing on machine learning, deep neural architectures, big data engineering, computer vision, and NLP.",
    },
    {
      slug: "b-tech-ece",
      name: "B.Tech in Electronics & Communication Engineering",
      department: Department.ENGINEERING,
      level: ProgramLevel.UG,
      durationYears: 4,
      eligibility: "10+2 with Physics & Mathematics (min 45% marks)",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/BTech_ECE_2026.pdf",
      description: "Hands-on engineering program focused on VLSI design, embedded systems, 5G wireless networks, and IoT telecommunication.",
    },
    {
      slug: "b-tech-me",
      name: "B.Tech in Mechanical Engineering",
      department: Department.ENGINEERING,
      level: ProgramLevel.UG,
      durationYears: 4,
      eligibility: "10+2 with Physics, Mathematics & Chemistry (min 45% marks)",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/BTech_ME_2026.pdf",
      description: "Automotive engineering, CAD/CAM automation, robotics, thermal systems, and smart additive manufacturing.",
    },
    {
      slug: "mba",
      name: "Master of Business Administration (MBA)",
      department: Department.MANAGEMENT,
      level: ProgramLevel.PG,
      durationYears: 2,
      eligibility: "Bachelor's degree in any discipline with minimum 50% marks",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/MBA_Dual_Specialization.pdf",
      description: "Dual specialization MBA in Financial Management, Marketing, Human Resources, and Business Analytics with corporate live projects.",
    },
    {
      slug: "bba",
      name: "Bachelor of Business Administration (BBA)",
      department: Department.MANAGEMENT,
      level: ProgramLevel.UG,
      durationYears: 3,
      eligibility: "10+2 in any stream from recognized board with min 45% marks",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/BBA_NEP_2020.pdf",
      description: "Undergraduate business administration program developing corporate acumen, entrepreneurship, managerial economics, and marketing strategy.",
    },
    {
      slug: "bca",
      name: "Bachelor of Computer Applications (BCA)",
      department: Department.COMPUTER_APPLICATIONS,
      level: ProgramLevel.UG,
      durationYears: 3,
      eligibility: "10+2 with Mathematics/Computer Applications (min 45% marks)",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/BCA_NEP_2020.pdf",
      description: "Professional IT and software development program covering web technologies, database management, Java, Python, and mobile applications.",
    },
    {
      slug: "mca",
      name: "Master of Computer Applications (MCA)",
      department: Department.COMPUTER_APPLICATIONS,
      level: ProgramLevel.PG,
      durationYears: 2,
      eligibility: "BCA/B.Sc (CS/IT) or graduation with Mathematics at 10+2 / UG level (min 50% marks)",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/MCA_2Years_NEP.pdf",
      description: "Advanced computing degree covering enterprise cloud architecture, full-stack software development, cybersecurity, and DevOps.",
    },
    {
      slug: "b-pharm",
      name: "Bachelor of Pharmacy (B.Pharm)",
      department: Department.PHARMACY,
      level: ProgramLevel.UG,
      durationYears: 4,
      eligibility: "10+2 with Physics & Chemistry along with Biology/Mathematics (min 50% marks)",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/BPharm_PCI_Syllabus.pdf",
      description: "PCI approved undergraduate program in pharmaceutical chemistry, pharmacology, clinical drug formulation, and pharmacovigilance.",
    },
    {
      slug: "diploma-me",
      name: "Diploma in Mechanical Engineering (Polytechnic)",
      department: Department.ENGINEERING,
      level: ProgramLevel.DIPLOMA,
      durationYears: 3,
      eligibility: "10th standard pass with Science and Mathematics (min 35% marks)",
      intake: 60,
      syllabusPdfUrl: "https://gurugramuniversity.ac.in/Syllabus/Diploma_ME.pdf",
      description: "State Board of Technical Education approved polytechnic program providing rigorous practical workshop training, machine drafting, and CNC operations.",
    },
  ];

  await prisma.program.createMany({ data: programsData });
  console.log(`✅ Seeded ${programsData.length} academic programs.`);

  // 3. Seed Placement Highlights with real scraped student photos
  const placementData = [
    {
      studentName: "Isha Sharma",
      company: "Google",
      packageLPA: 28.5,
      designation: "Software Engineer (Cloud Systems)",
      year: 2026,
      branch: "B.Tech CSE",
      photoUrl: "/images/official/general/general_137_isha.jpg",
    },
    {
      studentName: "Sarvesh",
      company: "Microsoft",
      packageLPA: 24.0,
      designation: "Cloud Solution Specialist",
      year: 2026,
      branch: "B.Tech CSE",
      photoUrl: "/images/official/general/general_136_Sarvesh.jpg",
    },
    {
      studentName: "Neeru",
      company: "Amazon",
      packageLPA: 21.0,
      designation: "Associate Solutions Architect",
      year: 2026,
      branch: "B.Tech AI-DS",
      photoUrl: "/images/official/general/general_134_neeru.jpg",
    },
    {
      studentName: "Yasmeen",
      company: "Samsung R&D",
      packageLPA: 14.5,
      designation: "Software Engineer - Embedded AI",
      year: 2026,
      branch: "B.Tech CSE",
      photoUrl: "/images/official/general/general_135_yasmeen.jpg",
    },
    {
      studentName: "Anamika",
      company: "Deloitte",
      packageLPA: 12.5,
      designation: "Technology Advisory Analyst",
      year: 2026,
      branch: "MBA",
      photoUrl: "/images/official/general/general_138_anamika.jpg",
    },
    {
      studentName: "Gopal Chauhan",
      company: "Cognizant",
      packageLPA: 10.5,
      designation: "Associate Consultant",
      year: 2026,
      branch: "BCA",
      photoUrl: "/images/official/general/general_141_gopal.jpg",
    },
    {
      studentName: "Anshika",
      company: "Sun Pharma",
      packageLPA: 8.5,
      designation: "Formulation R&D Scientist",
      year: 2026,
      branch: "B.Pharm",
      photoUrl: "/images/official/general/general_139_Anshika.jpg",
    },
    {
      studentName: "Ishant",
      company: "Tech Mahindra",
      packageLPA: 8.0,
      designation: "Network Software Engineer",
      year: 2026,
      branch: "B.Tech ECE",
      photoUrl: "/images/official/general/general_142_ishant.jpg",
    },
  ];

  await prisma.placementHighlight.createMany({ data: placementData });
  console.log(`✅ Seeded ${placementData.length} placement highlights with official photos.`);

  // 4. Seed Notices
  const noticesData = [
    {
      title: "Gurugram University Semester End Examination Schedule & Admit Card Circular (Session 2025-26)",
      category: NoticeCategory.EXAM,
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      publishDate: new Date("2026-11-01T10:00:00Z"),
      pdfUrl: "https://gurugramuniversity.ac.in/Notice/GU_Semester_Exam_DateSheet_2026.pdf",
      sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/resultNotice/index.php",
      isPinned: true,
    },
    {
      title: "Notification regarding Samarth eGov Portal Registration for B.Tech, MBA, BCA, and B.Pharm batches",
      category: NoticeCategory.ACADEMIC,
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      publishDate: new Date("2026-10-28T09:30:00Z"),
      pdfUrl: "https://gurugramuniversity.ac.in/Notice/Samarth_Portal_Exam_Registration.pdf",
      sourceUrl: "https://gurugramuniversity.ac.in",
      isPinned: true,
    },
    {
      title: "Declaration of Re-evaluation Results for Even Semester Examinations held in July 2026",
      category: NoticeCategory.EXAM,
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      publishDate: new Date("2026-10-26T14:15:00Z"),
      pdfUrl: "https://gurugramuniversity.ac.in/Notice/Re_evaluation_Result_Notification_2026.pdf",
      sourceUrl: "https://gurugramuniversity.ac.in/allNotifications/resultNotice/index.php",
      isPinned: false,
    },
    {
      title: "Haryana State Gazetted Public Holiday on account of Haryana Day & University Foundation Day",
      category: NoticeCategory.HOLIDAY,
      source: NoticeSource.GURUGRAM_UNIVERSITY,
      publishDate: new Date("2026-10-24T11:00:00Z"),
      pdfUrl: "https://gurugramuniversity.ac.in/Notice/Haryana_Day_Gazetted_Holiday.pdf",
      sourceUrl: "https://gurugramuniversity.ac.in",
      isPinned: false,
    },
    {
      title: "Campus Recruitment Drive by Microsoft & Amazon for Batch 2026 B.Tech & MCA Graduating Students",
      category: NoticeCategory.GENERAL,
      source: NoticeSource.GITM,
      publishDate: new Date("2026-11-02T08:00:00Z"),
      pdfUrl: "https://gitm.ac.in/notices/CRC_Drive_Microsoft_Amazon_2026.pdf",
      sourceUrl: null,
      isPinned: true,
    },
    {
      title: "Internal Assessment Sessional Tests (Odd Semester 2026-27) Scheduled from Nov 18, 2026",
      category: NoticeCategory.ACADEMIC,
      source: NoticeSource.GITM,
      publishDate: new Date("2026-10-29T10:00:00Z"),
      pdfUrl: "https://gitm.ac.in/notices/Sessional_Exam_Schedule_Nov2026.pdf",
      sourceUrl: null,
      isPinned: false,
    },
    {
      title: "Admissions Open for Direct Second Year Lateral Entry (LEET) in B.Tech & B.Pharm for Session 2026-27",
      category: NoticeCategory.ADMISSION,
      source: NoticeSource.GITM,
      publishDate: new Date("2026-10-25T12:00:00Z"),
      pdfUrl: "https://gitm.ac.in/notices/GITM_LEET_Admissions_2026.pdf",
      sourceUrl: null,
      isPinned: false,
    },
    {
      title: "Annual Sports Meet 'SPARDHA 2026' & Inter-College Cricket Championship Registrations",
      category: NoticeCategory.GENERAL,
      source: NoticeSource.GITM,
      publishDate: new Date("2026-10-20T16:00:00Z"),
      pdfUrl: "https://gitm.ac.in/notices/Spardha_2026_Rulebook.pdf",
      sourceUrl: null,
      isPinned: false,
    },
  ];

  await prisma.notice.createMany({ data: noticesData });
  console.log(`✅ Seeded ${noticesData.length} notices.`);

  // 5. Seed Events with real campus photos
  const eventsData = [
    {
      title: "Annual Inter-Collegiate Athletic & Sports Championship 'SPARDHA'",
      summary: "Three-day collegiate sporting meet featuring cricket, basketball, track & field athletics, and table tennis tournaments at GITM Sports Arena.",
      date: new Date("2026-11-20T09:00:00Z"),
      location: "GITM Central Sports Complex & Athletic Grounds",
      imageUrl: "/images/official/campus/campus_108_Sports-meet1.jpg",
      tags: "Sports,Athletics,Inter-College",
    },
    {
      title: "National Conference on Emerging Artificial Intelligence & Sustainable Computing (NCAISC 2026)",
      summary: "Research symposium featuring technical paper presentations, keynote addresses from DRDO & IIT researchers, and industrial demonstrations.",
      date: new Date("2026-12-04T10:00:00Z"),
      location: "GITM Central Auditorium (APJ Abdul Kalam Block)",
      imageUrl: "/images/official/campus/campus_69_event5.jpg",
      tags: "Research,AI,Conference",
    },
    {
      title: "National Science Day & Technical Innovation Exposition 'INNOVISION'",
      summary: "Inter-departmental robotics demonstration, software prototype showcases, and student hardware project exhibits judged by industry pioneers.",
      date: new Date("2026-12-18T10:00:00Z"),
      location: "GITM Central Exhibition Quadrangle",
      imageUrl: "/images/official/general/general_107_science-day.jpg",
      tags: "Science,Innovation,Exhibition",
    },
    {
      title: "Distinguished Academic Keynote: 'Igniting Young Minds in Robotics & Automation'",
      summary: "Special address by national scientific leaders and industrial technology heads on modern engineering paradigms, machine vision, and ethical AI.",
      date: new Date("2027-01-15T11:00:00Z"),
      location: "Dr. A.P.J. Abdul Kalam Seminar Hall",
      imageUrl: "/images/official/general/general_109_Igniting-young-minds.jpg",
      tags: "Guest Lecture,Robotics,AI",
    },
  ];

  await prisma.event.createMany({ data: eventsData });
  console.log(`✅ Seeded ${eventsData.length} events with official photos.`);

  console.log("✨ GITM Gurgaon database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
