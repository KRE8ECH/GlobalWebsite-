"use client";

import * as React from "react";
import {
  Building2,
  Video,
  ExternalLink,
  Cpu,
  BookOpen,
  Trophy,
  Play,
  Layers,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FacilityPhoto {
  id: string;
  title: string;
  category: "labs" | "library" | "sports" | "campus";
  categoryLabel: string;
  imageSrc: string;
  description: string;
}

const CAMPUS_FACILITIES: FacilityPhoto[] = [
  {
    id: "f1",
    title: "Advanced Artificial Intelligence & High-Performance Computing Lab",
    category: "labs",
    categoryLabel: "Computing Labs",
    imageSrc: "/images/official/general/general_14_c9.jpg",
    description: "Equipped with high-throughput multi-core workstations, GPU acceleration, and gigabit fiber connectivity.",
  },
  {
    id: "f2",
    title: "Software Engineering & Full-Stack Development Studio",
    category: "labs",
    categoryLabel: "Computing Labs",
    imageSrc: "/images/official/general/general_15_c8.jpg",
    description: "Dedicated coding environment for hackathons, cloud systems design, and open-source contributions.",
  },
  {
    id: "f3",
    title: "IoT Systems, Robotics & Embedded Hardware Laboratory",
    category: "labs",
    categoryLabel: "Computing Labs",
    imageSrc: "/images/official/general/general_16_c7.jpg",
    description: "Hands-on micro-controller testbeds, sensors, 3D printers, and digital signal analyzers.",
  },
  {
    id: "f4",
    title: "Central Digital Library & Research Knowledge Repository",
    category: "library",
    categoryLabel: "Library & Studies",
    imageSrc: "/images/official/general/general_17_c6.jpg",
    description: "Over 50,000 print volumes, IEEE Xplore access, National Digital Library terminals, and quiet study alcoves.",
  },
  {
    id: "f5",
    title: "Smart Tiered Lecture Theatres with Audiovisual Integration",
    category: "library",
    categoryLabel: "Library & Studies",
    imageSrc: "/images/official/general/general_18_c5.jpg",
    description: "Acoustically treated multimedia lecture halls equipped with digital podiums and high-definition projectors.",
  },
  {
    id: "f6",
    title: "Dr. A.P.J. Abdul Kalam Memorial Central Seminar Hall",
    category: "library",
    categoryLabel: "Library & Studies",
    imageSrc: "/images/official/general/general_19_c4.jpg",
    description: "Air-conditioned 450-seat auditorium hosting national conferences, symposia, and corporate guest lectures.",
  },
  {
    id: "f7",
    title: "Annual Athletic Meet 'SPARDHA' & Inter-College Sports Arena",
    category: "sports",
    categoryLabel: "Sports & Fests",
    imageSrc: "/images/official/campus/campus_108_Sports-meet1.jpg",
    description: "Olympic-dimension athletic tracks, standard cricket turf, basketball courts, and inter-collegiate tournaments.",
  },
  {
    id: "f8",
    title: "Annual Tech Fest & Cultural Youth Convention",
    category: "sports",
    categoryLabel: "Sports & Fests",
    imageSrc: "/images/official/campus/campus_69_event5.jpg",
    description: "Celebration of student talent, robotics competitions, national hackathons, and theatrical cultural festivals.",
  },
  {
    id: "f9",
    title: "20-Acre Lush Green Academic Blocks & Wi-Fi Campus",
    category: "campus",
    categoryLabel: "Campus Blocks",
    imageSrc: "/images/official/general/general_7_b1-1.jpg",
    description: "Pollution-free eco-friendly academic environment with solar power infrastructure and manicured lawns.",
  },
  {
    id: "f10",
    title: "Air-Cooled Residential Hostels & Student Dining Refectory",
    category: "campus",
    categoryLabel: "Campus Blocks",
    imageSrc: "/images/official/general/general_8_b2-1.jpg",
    description: "24x7 biometric security, continuous RO drinking water, high-speed Wi-Fi, and hygienic multi-cuisine cafeteria.",
  },
  {
    id: "f11",
    title: "Pharmaceutical Chemistry & Pharmacology Research Labs",
    category: "labs",
    categoryLabel: "Computing Labs",
    imageSrc: "/images/official/general/general_20_c3.jpg",
    description: "PCI approved specialized drug synthesis, formulation analysis, and quality assurance testing laboratories.",
  },
  {
    id: "f12",
    title: "Institute Transport Fleet Covering Delhi-NCR & Rewari",
    category: "campus",
    categoryLabel: "Campus Blocks",
    imageSrc: "/images/official/general/general_6_b3.jpg",
    description: "Fleet of institute-owned deluxe buses serving Gurugram, Dwarka, South Delhi, Rewari, and Jhajjar.",
  },
];

type CategoryFilter = "all" | "labs" | "library" | "sports" | "campus";

export function CampusGallery() {
  const [activeFilter, setActiveFilter] = React.useState<CategoryFilter>("all");
  const [selectedPhoto, setSelectedPhoto] = React.useState<FacilityPhoto | null>(null);

  const filteredPhotos = React.useMemo(() => {
    if (activeFilter === "all") return CAMPUS_FACILITIES;
    return CAMPUS_FACILITIES.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="campus-life"
      className="py-14 sm:py-20 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#080f1a] scroll-mt-14"
      aria-labelledby="campus-gallery-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400 mb-1.5">
              <Building2 className="h-4 w-4" />
              <span>20-Acre Wi-Fi Enabled Collegiate Infrastructure</span>
            </div>

            <h2
              id="campus-gallery-heading"
              className="font-editorial text-2xl sm:text-4xl font-extrabold text-[#0f2b48] dark:text-stone-100"
            >
              Campus Facilities & Virtual Video Tour
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              Explore authentic laboratories, lecture complexes, central digital library, athletic grounds, and campus life photographs verified from GITM Gurgaon.
            </p>
          </div>

          <Button asChild variant="outline" size="sm" className="bg-stone-50 dark:bg-stone-900 border-stone-300 dark:border-stone-700 font-bold text-xs uppercase tracking-wider rounded-sm shrink-0">
            <a
              href="https://www.youtube.com/@GITMGuraon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#881337] dark:text-amber-400"
            >
              <Video className="h-4 w-4" />
              <span>Official YouTube Channel</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>

        {/* 1. OFFICIAL VIRTUAL VIDEO TOUR SHOWCASE */}
        <div className="mb-12 rounded-md border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-[#0f1c2e] p-4 sm:p-6 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Embedded YouTube Player */}
            <div className="lg:col-span-8 rounded-sm overflow-hidden border border-stone-300 dark:border-stone-700 aspect-video bg-black shadow-md relative">
              <iframe
                src="https://www.youtube-nocookie.com/embed/FmS2fA7G-Ls?rel=0"
                title="Global Institute of Technology & Management (GITM Gurgaon) Official Campus Tour & Video Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            {/* Video Description & Highlights */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#881337] text-white px-2.5 py-0.5 rounded-xs">
                <Video className="h-3.5 w-3.5" />
                <span>Virtual Campus Tour</span>
              </div>

              <h3 className="font-editorial text-xl font-bold text-[#0f2b48] dark:text-stone-100 leading-snug">
                Experience GITM Gurgaon: 20-Acre Campus Infrastructure & Student Life
              </h3>

              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Take an immersive video walkthrough of the sprawling green campus, hi-tech engineering laboratories, pharmaceutical research center, modern residential hostels, sports arenas, and interview sessions with faculty and recruiters.
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400" />
                  <span><strong>Location:</strong> 5 KM Milestone, Farrukhnagar Rd, Gurugram</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400" />
                  <span><strong>Connectivity:</strong> 25 mins from IGI Airport & Cyber City</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0f2b48] dark:bg-amber-400" />
                  <span><strong>Affiliation:</strong> Gurugram University, Sector 51</span>
                </div>
              </div>

              <div className="pt-2">
                <Button asChild size="sm" className="w-full bg-[#0f2b48] hover:bg-[#1a3a5e] text-white font-bold text-xs uppercase tracking-wider rounded-sm shadow-2xs">
                  <a href="#inquiry">Book An In-Person Campus Visit</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PHOTO GALLERY FILTER TABS */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "all"
                  ? "bg-[#0f2b48] text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              All Amenities ({CAMPUS_FACILITIES.length})
            </button>
            <button
              onClick={() => setActiveFilter("labs")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "labs"
                  ? "bg-[#0f2b48] text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Computing & AI Labs
            </button>
            <button
              onClick={() => setActiveFilter("library")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "library"
                  ? "bg-[#0f2b48] text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Library & Seminar Halls
            </button>
            <button
              onClick={() => setActiveFilter("sports")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "sports"
                  ? "bg-[#0f2b48] text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Sports & Cultural Fests
            </button>
            <button
              onClick={() => setActiveFilter("campus")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "campus"
                  ? "bg-[#0f2b48] text-white shadow-xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Campus Blocks & Hostels
            </button>
          </div>

          <span className="text-xs text-stone-500 font-mono">
            Showing <strong>{filteredPhotos.length}</strong> official campus captures
          </span>
        </div>

        {/* 3. PHOTO GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] overflow-hidden shadow-2xs hover:border-[#0f2b48] transition-all flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                  {photo.categoryLabel}
                </div>
              </div>

              {/* Photo Details */}
              <div className="p-4 space-y-1">
                <h4 className="font-editorial text-sm font-bold text-[#0f2b48] dark:text-stone-100 group-hover:text-[#881337] dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {photo.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox for Full View */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in-50"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white dark:bg-[#0f1c2e] rounded-md overflow-hidden shadow-2xl border border-stone-300 dark:border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                <img
                  src={selectedPhoto.imageSrc}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400">
                    {selectedPhoto.categoryLabel}
                  </span>
                  <h3 className="font-editorial text-base sm:text-lg font-bold text-[#0f2b48] dark:text-stone-100 mt-0.5">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="rounded-sm bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-stone-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CampusGallery;
