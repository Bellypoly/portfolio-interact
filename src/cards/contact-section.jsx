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
  </div>
);

export default ContactSection;
