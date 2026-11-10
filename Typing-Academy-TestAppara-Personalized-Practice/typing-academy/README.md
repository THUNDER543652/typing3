# TestAppara Typing Academy (standalone)

An independent Next.js typing-course project designed to be integrated into TestAppara later without duplicating the main site's branding.

## Included
- TestAppara logo, dark/light theme and matching header space
- Left-side expandable navigation with three top-level destinations: Lessons, Practice and Typing Test
- Beginner, Intermediate and Advanced practice lesson groups
- Dedicated key-learning lesson list
- Live character feedback: correct characters turn green and incorrect characters turn red
- Live finger guidance for the next character, with a visual keyboard and finger-color legend
- Elapsed exercise time, average time per character, last-key interval and recent key-by-key timing
- Responsive sidebar that becomes a mobile drawer
- Typing Test opens the official TestAppara typing speed test: https://www.testappara.com/typing-speed-test
- Local-device lesson completion saving

## Run locally
1. Install Node.js 20.9 or later.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Project structure
- `app/` — routes, layout and global styles
- `components/SiteHeader.js` — TestAppara header and theme switch
- `components/AcademySidebar.js` — independent expandable course navigation
- `components/TypingPractice.js` — reusable live typing exercise and finger coach
- `lib/course.js` — course levels, modules and lesson content

## Notes
- Progress is stored in localStorage on the current browser/device only.
- Keystroke timing is calculated locally in the browser and is not sent to a server.
- This is a standalone project; no files in the main TestAppara application are modified.
- A production build should be run after dependencies are installed in the deployment environment.


## Beginner lesson improvements
- A–Z lessons use six gradual stages: meet the key, tap it, practise pairs, build a rhythm, try words, and type a sentence.
- Each letter lesson records per-key pause times and shows the three keys with the longest average pauses at completion.
- Learners can launch a short focused drill for a recommended key.
- Press Enter after completing an exercise to continue; Enter is ignored while the exercise is incomplete.
