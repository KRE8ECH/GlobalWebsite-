"use client";

import * as React from "react";
import {
  Building2,
  Video,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  MapPin,
  Clock,
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
    title: "Administrative Tower & Collegiate Quadrangle",
    category: "campus",
    categoryLabel: "Campus Blocks",
    imageSrc: "/images/official/general/general_8_b2-1.jpg",
    description: "Registrar offices, academic counseling cells, corporate placement wing, and board rooms.",
  },
  {
    id: "f11",
    title: "Student Residential Hostels & Hygienic Dining Mess",
    category: "campus",
    categoryLabel: "Campus Blocks",
    imageSrc: "/images/official/general/general_6_b3.jpg",
    description: "Separate hostels for male and female scholars with 24x7 security, RO purified water, and recreational lounges.",
  },
  {
    id: "f12",
    title: "Science & Innovation Exposition Arena",
    category: "sports",
    categoryLabel: "Sports & Fests",
    imageSrc: "/images/official/general/general_107_science-day.jpg",
    description: "Inter-collegiate technical exhibitions, robotic prototype demonstrations, and science showcases.",
  },
];

export function CampusGallery() {
  const [activeFilter, setActiveFilter] = React.useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = React.useState<number | null>(null);

  const filteredPhotos = React.useMemo(() => {
    if (activeFilter === "all") return CAMPUS_FACILITIES;
    return CAMPUS_FACILITIES.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Handle keyboard navigation for modal lightbox
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const currentPhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

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

          <Button asChild variant="outline" size="sm" className="bg-stone-50 dark:bg-stone-900 border-stone-300 dark:border-stone-700 font-bold text-xs uppercase tracking-wider rounded-xs shrink-0 hover:bg-stone-100 transition-colors">
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
        <div className="mb-14 rounded-md border border-stone-300 dark:border-stone-800 bg-stone-50 dark:bg-[#0f1c2e] p-4 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Embedded YouTube Player Container */}
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

            {/* Video Description, Highlights & Affiliations */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#881337] text-white px-2.5 py-0.5 rounded-xs">
                <Video className="h-3.5 w-3.5" />
                <span>Virtual Video Walkthrough</span>
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
                <Button asChild size="sm" className="w-full bg-[#0f2b48] hover:bg-[#1a3a5e] text-white font-bold text-xs uppercase tracking-wider rounded-xs shadow-2xs">
                  <a href="#inquiry">Book An In-Person Campus Inspection</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PHOTO GALLERY FILTER TABS WITH COUNTERS */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "all"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              All Amenities ({CAMPUS_FACILITIES.length})
            </button>
            <button
              onClick={() => setActiveFilter("labs")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "labs"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Computing & AI Labs
            </button>
            <button
              onClick={() => setActiveFilter("library")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "library"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Library & Seminar Halls
            </button>
            <button
              onClick={() => setActiveFilter("sports")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "sports"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Sports & Cultural Fests
            </button>
            <button
              onClick={() => setActiveFilter("campus")}
              className={`px-3 py-1.5 rounded-xs transition-colors ${
                activeFilter === "campus"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
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
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="academic-card group cursor-pointer rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0f1c2e] overflow-hidden flex flex-col justify-between"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover"
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
        {currentPhoto && selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white dark:bg-[#0f1c2e] rounded-md overflow-hidden shadow-2xl border border-stone-300 dark:border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img
                  src={currentPhoto.imageSrc}
                  alt={currentPhoto.title}
                  className="w-full h-full object-contain"
                />

                {/* Left Arrow */}
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="text-xs bg-black/70 backdrop-blur-xs text-white px-2 py-1 rounded-xs font-mono">
                    {selectedPhotoIndex + 1} / {filteredPhotos.length}
                  </span>
                  <button
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="h-8 w-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
                    aria-label="Close Lightbox"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Caption and description */}
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400">
                    {currentPhoto.categoryLabel}
                  </span>
                  <h3 className="font-editorial text-base sm:text-lg font-bold text-[#0f2b48] dark:text-stone-100 mt-0.5">
                    {currentPhoto.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {currentPhoto.description}
                  </p>
                </div>

                <Button
                  onClick={() => setSelectedPhotoIndex(null)}
                  variant="outline"
                  size="sm"
                  className="font-bold text-xs uppercase tracking-wider rounded-xs shrink-0"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CampusGallery;
