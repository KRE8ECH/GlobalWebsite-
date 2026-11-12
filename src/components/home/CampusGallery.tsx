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
  Eye,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThreeDTiltCard from "@/components/3d/ThreeDTiltCard";
import CampusMapTour from "@/components/home/CampusMapTour";

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
  const [activePhotoIndex, setActivePhotoIndex] = React.useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState<boolean>(false);

  const filteredPhotos = React.useMemo(() => {
    if (activeFilter === "all") return CAMPUS_FACILITIES;
    return CAMPUS_FACILITIES.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Keep index in range when switching category
  React.useEffect(() => {
    setActivePhotoIndex(0);
  }, [activeFilter]);

  const activePhoto = filteredPhotos[activePhotoIndex] || filteredPhotos[0];

  // Handle keyboard navigation for modal lightbox
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, filteredPhotos.length]);

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
              Campus Facilities & Infrastructure Gallery
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
              Explore authentic laboratories, lecture theatres, central digital library, athletic grounds, and campus life verified from GITM Gurgaon.
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
              <span>Official Video Tour</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>

        {/* 1. INTERACTIVE MAP FLIGHT & OFFICIAL CAMPUS TOUR VIDEO */}
        <div className="mb-12">
          <CampusMapTour id="campus-tour" defaultMode="map" />
        </div>

        {/* 2. PHOTO GALLERY FILTER TABS WITH COUNTERS */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-sm border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-900 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              All Amenities ({CAMPUS_FACILITIES.length})
            </button>
            <button
              onClick={() => setActiveFilter("labs")}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                activeFilter === "labs"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Computing & AI Labs
            </button>
            <button
              onClick={() => setActiveFilter("library")}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                activeFilter === "library"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Library & Seminar Halls
            </button>
            <button
              onClick={() => setActiveFilter("sports")}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
                activeFilter === "sports"
                  ? "bg-[#0f2b48] text-white shadow-2xs"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              }`}
            >
              Sports & Cultural Fests
            </button>
            <button
              onClick={() => setActiveFilter("campus")}
              className={`px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
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

        {/* 3. MASTER SHOWCASE: THE MAIN FEATURED IMAGE STAGE (Shown Before Full Modal) */}
        {activePhoto && (
          <ThreeDTiltCard
            maxTilt={3}
            glareColor="rgba(217, 119, 6, 0.12)"
            className="mb-6 rounded-md overflow-hidden shadow-md"
          >
            <div className="rounded-md border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#0f1c2e] overflow-hidden">
              {/* Main Featured Photo Stage */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black group cursor-pointer"
                title="Click to expand high-resolution photograph"
              >
                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover object-center photo-enhance group-hover:scale-102 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Status Tags */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#881337] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xs shadow-md">
                    {activePhoto.categoryLabel}
                  </span>
                  <span className="bg-black/80 text-amber-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-xs border border-amber-400/30">
                    {activePhotoIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>

                {/* Top Right Expand Button */}
                <div className="absolute top-4 right-4">
                  <span className="bg-black/75 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border border-white/25 flex items-center gap-1.5 shadow-md group-hover:bg-amber-500 group-hover:text-black transition-colors">
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Click to Expand Fullscreen</span>
                  </span>
                </div>

                {/* Bottom In-Image Master Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-left text-white space-y-1">
                  <h3 className="font-editorial text-lg sm:text-2xl font-bold text-white tracking-wide leading-snug">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-3xl line-clamp-2">
                    {activePhoto.description}
                  </p>
                </div>
              </div>

              {/* Interactive Thumbnail Filmstrip (Switch Main Image on Click or Hover) */}
              <div className="p-3 sm:p-4 bg-white dark:bg-[#071322] border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Select Thumbnail to Preview Above
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {activePhotoIndex + 1} of {filteredPhotos.length} Selected
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
                  {filteredPhotos.map((photo, index) => {
                    const isActive = index === activePhotoIndex;
                    return (
                      <button
                        key={photo.id}
                        onClick={() => setActivePhotoIndex(index)}
                        className={`relative aspect-[16/10] rounded-xs overflow-hidden border-2 transition-all cursor-pointer group/thumb ${
                          isActive
                            ? "border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md"
                            : "border-stone-200 dark:border-stone-700 opacity-70 hover:opacity-100 hover:border-[#0f2b48]"
                        }`}
                        title={photo.title}
                      >
                        <img
                          src={photo.imageSrc}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-mono text-white text-center py-0.2 truncate px-0.5">
                          0{index + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </ThreeDTiltCard>
        )}

        {/* 4. PHOTO GALLERY COMPACT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => {
                setActivePhotoIndex(index);
                // Smooth scroll to featured stage on mobile
                const stage = document.getElementById("campus-gallery-heading");
                if (stage && window.innerWidth < 768) {
                  stage.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`academic-card group cursor-pointer rounded-md border bg-white dark:bg-[#0f1c2e] overflow-hidden flex flex-col justify-between transition-all ${
                index === activePhotoIndex
                  ? "border-[#0f2b48] dark:border-amber-400 shadow-md ring-1 ring-[#0f2b48]/20"
                  : "border-stone-200 dark:border-stone-800"
              }`}
            >
              {/* Photo Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={photo.imageSrc}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/85 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                  {photo.categoryLabel}
                </div>
                {index === activePhotoIndex && (
                  <div className="absolute bottom-2.5 right-2.5 bg-[#881337] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs">
                    Previewing Above
                  </div>
                )}
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

        {/* Modal Lightbox for Full High-Res Inspection */}
        {isLightboxOpen && activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-none"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl w-full bg-white dark:bg-[#0f1c2e] rounded-md overflow-hidden shadow-2xl border border-stone-300 dark:border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />

                {/* Left Arrow */}
                <button
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev > 0 ? prev - 1 : filteredPhotos.length - 1
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                  aria-label="Previous photograph"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={() =>
                    setActivePhotoIndex((prev) =>
                      prev < filteredPhotos.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                  aria-label="Next photograph"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Counter & Close */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="text-xs bg-black/85 text-white px-2.5 py-1 rounded-xs font-mono border border-white/20">
                    {activePhotoIndex + 1} / {filteredPhotos.length}
                  </span>
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="h-8 w-8 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
                    aria-label="Close high-resolution modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Caption */}
              <div className="p-4 bg-white dark:bg-[#0f1c2e] text-left border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#881337] dark:text-amber-400">
                    {activePhoto.categoryLabel}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    GITM Farrukhnagar Campus Archive
                  </span>
                </div>
                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0f2b48] dark:text-stone-100">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
