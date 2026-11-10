"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { levels } from "../lib/course";

export default function AcademySidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState({ lessons: true, practice: false });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [practiceLevelsOpen, setPracticeLevelsOpen] = useState({});
  const toggle = (key) => setOpen(current => ({ ...current, [key]: !current[key] }));
  const closeMobile = () => setMobileOpen(false);

  return <>
    <button className="sidebar-mobile-toggle" onClick={() => setMobileOpen(v => !v)} aria-expanded={mobileOpen} aria-controls="academy-sidebar">
      <span>☰</span> Course menu <span className="mobile-toggle-state">{mobileOpen ? "Close" : "Open"}</span>
    </button>
    <aside id="academy-sidebar" className={`academy-sidebar ${mobileOpen ? "mobile-open" : ""}`} aria-label="Typing Academy sections">
      <section className="sidebar-group">
        <button className={`sidebar-heading ${open.lessons ? "expanded" : ""}`} onClick={() => toggle("lessons")} aria-expanded={open.lessons}>
          <span className="sidebar-heading-icon">▤</span><span>Lessons</span><span className="sidebar-chevron">{open.lessons ? "−" : "+"}</span>
        </button>
        {open.lessons && <div className="sidebar-submenu">
          <div className="sidebar-caption">LEARN THE KEYS</div>
          {levels[0].modules.map(module => <div className="sidebar-module" key={module.title}>
            <div className="sidebar-module-title">{module.title}</div>
            {module.lessons.map(([slug, title]) => <Link key={slug} href={`/lessons/${slug}`} className={pathname === `/lessons/${slug}` ? "current" : ""} onClick={closeMobile}>{title}</Link>)}
          </div>)}
        </div>}
      </section>

      <section className="sidebar-group">
        <button className={`sidebar-heading ${open.practice ? "expanded" : ""}`} onClick={() => toggle("practice")} aria-expanded={open.practice}>
          <span className="sidebar-heading-icon">⌨</span><span>Practice</span><span className="sidebar-chevron">{open.practice ? "−" : "+"}</span>
        </button>
        {open.practice && <div className="sidebar-submenu practice-levels">
          {levels.map(level => <div className="sidebar-module" key={level.id}>
            <button className="sidebar-level-toggle" onClick={() => setPracticeLevelsOpen(current => ({ ...current, [level.id]: !current[level.id] }))} aria-expanded={!!practiceLevelsOpen[level.id]}>
              <span>{level.title}</span><span>{practiceLevelsOpen[level.id] ? "−" : "+"}</span>
            </button>
            {practiceLevelsOpen[level.id] && level.modules.map(module => <div className="sidebar-practice-module" key={module.title}>
              <div className="sidebar-module-title">{module.title}</div>
              {module.lessons.map(([slug, title]) => <Link key={slug} href={`/lessons/${slug}`} className={pathname === `/lessons/${slug}` ? "current" : ""} onClick={closeMobile}>{title}</Link>)}
            </div>)}
          </div>)}
        </div>}
      </section>

      <a className="sidebar-heading sidebar-test-link" href="https://www.testappara.com/typing-speed-test">
        <span className="sidebar-heading-icon">◷</span><span>Typing Test</span><span className="external-mark">↗</span>
      </a>
      <div className="sidebar-note">Learn at your pace. Accuracy first, speed follows.</div>
    </aside>
    {mobileOpen && <button className="sidebar-backdrop" aria-label="Close course menu" onClick={closeMobile} />}
  </>;
}
