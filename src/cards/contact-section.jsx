import React from "react";

const ContactSection = () => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <div className="font-semibold mb-1">Where to find me</div>
      <div>Mill Creek, WA 98012</div>
      <div>United States</div>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <div className="font-semibold mb-1">Email Me At</div>
      <a className="text-cyan-600 underline" href="mailto:suwaphit.b@gmail.com">
        suwaphit.b@gmail.com
      </a>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      <div className="font-semibold mb-1">Call Me At</div>
      <div>Phone: (+1) 806‑283‑2312</div>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm flex flex-col items-start justify-center">
      <div className="font-semibold mb-1">Download CV</div>
      <a
        className="inline-flex items-center px-3 py-2 rounded-xl border border-cyan-600/30 bg-white/80 hover:bg-white transition-colors shadow-sm"
        href="RESUME_suwaphit.pdf"
        target="_blank"
        rel="noreferrer"
        download
      >
        Download CV
      </a>
    </div>
  </div>
);

export default ContactSection;
