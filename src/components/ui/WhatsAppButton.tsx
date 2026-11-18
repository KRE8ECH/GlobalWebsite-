"use client";

import * as React from "react";

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="0"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.153.568 4.174 1.558 5.923l-1.558 5.68 5.827-1.528c1.701.927 3.655 1.455 5.731 1.455 6.627 0 12-5.373 12-12s-5.373-12-12-12zm.001 21.916c-1.92 0-3.702-.533-5.228-1.456l-.375-.226-3.882 1.018 1.036-3.784-.247-.393c-.99-1.577-1.543-3.428-1.543-5.419 0-5.474 4.453-9.927 9.928-9.927 5.476 0 9.928 4.453 9.928 9.927 0 5.475-4.452 9.928-9.929 9.928z"/>
    </svg>
  );
}

export function WhatsAppFloatingButton() {
  const whatsappUrl =
    "https://wa.me/919555100100?text=Hello%20GITM%20Gurgaon%2C%20I%20am%20interested%20in%20admissions%20for%20Academic%20Session%202026-27.%20Please%20guide%20me.";

  return (
    <aside
      aria-label="Direct WhatsApp Support"
      className="fixed bottom-6 right-6 z-50 flex items-center group pointer-events-auto"
    >
      {/* Expanded Hover Pill */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white pl-4 pr-5 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.25)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
        aria-label="Chat on WhatsApp with GITM Admissions Counselor at +91 9555 100 100"
      >
        <div className="relative flex items-center justify-center">
          <WhatsAppIcon className="h-6 w-6 text-white drop-shadow-xs" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
          </span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider leading-none text-emerald-100">
            Admissions Desk
          </span>
          <span className="text-xs font-extrabold tracking-tight leading-tight text-white mt-0.5">
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
}

