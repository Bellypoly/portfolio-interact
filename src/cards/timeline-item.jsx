import React, { useState } from "react";

const TimelineItem = ({
  title,
  time,
  org,
  where,
  bullets = [],
  badges = [],
}) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleBullet = (idx) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="relative pl-8 mb-4">
      <span className="absolute left-0 top-1 w-5 h-5 rounded-full bg-cyan-500 shadow" />
      <div className="text-sm opacity-60">{time}</div>

      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h4 className="font-semibold m-0 p-0">{title}</h4>
        {badges &&
          badges.length > 0 &&
          badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-2 py-0.5 rounded-full"
            >
              {badge}
            </span>
          ))}
      </div>
      <div className="text-sm opacity-80">
        {org}
        {where ? <span className="opacity-70"> • {where}</span> : null}
      </div>
      {bullets.length > 0 && (
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          {bullets.map((b, i) => {
            // Split bullet into summary and detail if possible
            const match = b.match(/^(.*?): (.*)$/);
            const summary = match ? match[1] : b;
            const detail = match ? match[2] : null;
            const isOpen = openIndexes.includes(i);
            return (
              <li key={i} className="list-item list-disc ml-0 pl-0 align-top">
                <div className="flex flex-col items-start min-w-0">
                  <button
                    type="button"
                    className={`text-left w-full focus:outline-none${
                      detail ? " hover:underline" : ""
                    }`}
                    onClick={() => (detail ? toggleBullet(i) : undefined)}
                    disabled={!detail}
                  >
                    {summary}
                    {detail && (
                      <span className="ml-1 text-cyan-500">
                        <b>{isOpen ? "-" : "+"}</b>
                      </span>
                    )}
                  </button>
                  {detail &&
                    isOpen &&
                    (() => {
                      // If detail contains an <a ...>...</a> tag, split and render link at the bottom
                      const linkMatch = detail.match(
                        /<a [^>]*href=['\"]([^'\"]+)['\"][^>]*>(.*?)<\/a>/i
                      );
                      if (linkMatch) {
                        const [full, href, linkText] = linkMatch;
                        const before = detail.replace(full, "").trim();
                        return (
                          <div className="mt-1 ml-2 text-xs opacity-80 border-l-2 border-cyan-100 pl-2 leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: before }} />
                            <div className="mt-2">
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-200 hover:underline"
                              >
                                <span role="img" aria-label="link">
                                  🔗
                                </span>{" "}
                                {linkText || "GitHub"}
                              </a>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="mt-1 ml-2 text-xs opacity-80 border-l-2 border-cyan-100 pl-2 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: detail }}
                          />
                        );
                      }
                    })()}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TimelineItem;
