import Link from "next/link";
import { notFound } from "next/navigation";
import TypingPractice from "../../../components/TypingPractice";
import { getAllLessons, getLesson } from "../../../lib/course";

export function generateStaticParams() {
  return getAllLessons().map(lesson => ({ slug: lesson.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return lesson ? { title: `${lesson.title} | Typing Academy`, description: lesson.description } : {};
}
export default async function LessonPage({ params }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const lessons = getAllLessons();
  const index = lessons.findIndex(item => item.slug === slug);
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  return <main className="lesson-shell">
    <nav className="lesson-nav"><Link href="/">← All courses</Link><span>{lesson.levelTitle} / {lesson.moduleTitle}</span></nav>
    <div className="lesson-intro"><div className="eyebrow">{lesson.levelTitle} · {lesson.moduleTitle}</div><h1>{lesson.title}</h1><p>{lesson.description}</p></div>
    <div className="tip"><strong>Lesson tip</strong><span>Look at the screen, keep your hands relaxed, and aim for accuracy before speed.</span></div>
    <TypingPractice lesson={lesson}/>
    <div className="lesson-pager">{previous ? <Link href={`/lessons/${previous.slug}`}>← {previous.title}</Link> : <span/>}{next ? <Link href={`/lessons/${next.slug}`}>Next: {next.title} →</Link> : <Link href="/">Back to course home →</Link>}</div>
  </main>;
}
