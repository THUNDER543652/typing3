import "./globals.css";
import SiteHeader from "../components/SiteHeader";
import AcademySidebar from "../components/AcademySidebar";

export const metadata = {
  title: "Typing Academy | TestAppara",
  description: "Build typing skills through guided keyboard lessons and beginner, intermediate and advanced practice with TestAppara.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { const t = localStorage.getItem("tw-theme"); document.documentElement.dataset.theme = t === "light" ? "light" : "dark"; } catch (e) { document.documentElement.dataset.theme = "dark"; }` }} />
      </head>
      <body>
        <SiteHeader />
        <div className="academy-layout">
          <AcademySidebar />
          <div className="academy-main">{children}</div>
        </div>
      </body>
    </html>
  );
}
