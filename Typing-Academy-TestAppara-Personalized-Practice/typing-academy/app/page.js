import Link from "next/link";
import { levels, getAllLessons } from "../lib/course";

export default function Home() {
  const all = getAllLessons();
  return <main className="shell">
    <header className="hero"><div className="eyebrow">A step-by-step typing course</div><h1>Build your typing skills.<br/><span>One lesson at a time.</span></h1><p>Start with individual keys, grow your vocabulary, and progress to real-world typing challenges.</p><a className="primary" href="#courses">Explore lessons</a></header>
    <section className="stats"><div><strong>{all.length}</strong><span>Lessons planned</span></div><div><strong>3</strong><span>Learning levels</span></div><div><strong>A–Z</strong><span>Full keyboard foundation</span></div></section>
    <section id="courses"><div className="section-heading"><div><div className="eyebrow">Your learning path</div><h2>Choose your level</h2></div><p>Complete each level in order. You can revisit lessons whenever you need more practice.</p></div>
      <div className="level-grid">{levels.map((level,i) => <article id={level.id === "beginner" ? "beginner" : level.id === "intermediate" ? "intermediate" : "advanced"} className={`level-card level-${i}`} key={level.id}><div className="level-number">0{i+1}</div><h3>{level.title}</h3><p>{level.description}</p><div className="module-list">{level.modules.map(module => <div className="module" key={module.title}><strong>{module.title}</strong><span>{module.lessons.length} lessons</span></div>)}</div><Link className="text-link" href={`/lessons/${level.modules[0].lessons[0][0]}`}>Start {level.title} →</Link></article>)}</div>
    </section>
    <section className="all-lessons"><div className="eyebrow">Course contents</div><h2>Explore the lessons</h2>{levels.map(level => <div className="level-contents" key={level.id}><h3>{level.title}</h3>{level.modules.map(module => <div className="module-contents" key={module.title}><h4>{module.title}</h4><div className="lesson-links">{module.lessons.map(([slug,title,description]) => <Link key={slug} href={`/lessons/${slug}`}><span>{title}</span><small>{description}</small></Link>)}</div></div>)}</div>)}</section>
    <section id="typing-tests" className="all-lessons">
      <div className="eyebrow">Timed assessment</div><h2>Ready for a typing test?</h2>
      <p className="hero p-compact">When you are ready to measure your typing speed, accuracy and progress, use the official TestAppara typing test.</p>
      <a className="primary" href="https://www.testappara.com/typing-speed-test" target="_blank" rel="noopener noreferrer">Open TestAppara Typing Test ↗</a>
    </section>
    <section id="my-progress" className="all-lessons">
      <div className="eyebrow">Your learning record</div><h2>My progress</h2>
      <p className="hero p-compact">Completed lessons are saved locally in this browser on this device. Finish any lesson to add it to your progress.</p>
    </section>
    <footer>TestAppara Typing Academy · Independent learning project</footer>
  </main>;
}
