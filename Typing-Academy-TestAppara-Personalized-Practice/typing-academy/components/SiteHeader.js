"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    let saved = "dark";
    try { saved = localStorage.getItem("tw-theme") === "light" ? "light" : "dark"; } catch {}
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("tw-theme", next); } catch {}
  }

  return (
    <header className="site-header">
      <div className="site-header-main">
        <Link href="/" className="brand" aria-label="TestAppara Typing Academy home">
          <img src="/assests/images/testappara-icon-fixed.png" alt="TestAppara" width="36" height="36" />
          <span>TestAppara</span>
        </Link>
        <div className="header-context">Typing Academy</div>
        <button className="theme-switch" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </div>
    </header>
  );
}
