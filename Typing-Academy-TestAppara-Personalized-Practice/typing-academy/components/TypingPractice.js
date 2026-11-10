'use client';

import { useMemo, useRef, useState } from "react";

const fingerMap = {
  q: "Left pinky", a: "Left pinky", z: "Left pinky", "1": "Left pinky", "`": "Left pinky",
  w: "Left ring", s: "Left ring", x: "Left ring", "2": "Left ring",
  e: "Left middle", d: "Left middle", c: "Left middle", "3": "Left middle",
  r: "Left index", f: "Left index", v: "Left index", t: "Left index", g: "Left index", b: "Left index", "4": "Left index", "5": "Left index",
  y: "Right index", h: "Right index", n: "Right index", u: "Right index", j: "Right index", m: "Right index", "6": "Right index", "7": "Right index",
  i: "Right middle", k: "Right middle", ",": "Right middle", "8": "Right middle",
  o: "Right ring", l: "Right ring", ".": "Right ring", "9": "Right ring",
  p: "Right pinky", ";": "Right pinky", "/": "Right pinky", "0": "Right pinky", "-": "Right pinky", "=": "Right pinky", "'": "Right pinky", "[": "Right pinky", "]": "Right pinky", "\\": "Right pinky"
};
const keyboardRows = [
  ["1","2","3","4","5","6","7","8","9","0"],
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l",";"],
  ["z","x","c","v","b","n","m",",",".","/"]
];

function fingerFor(key) {
  if (key === " ") return "Either thumb";
  return fingerMap[key?.toLowerCase()] || "Check the keyboard guide";
}

export default function TypingPractice({ lesson }) {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lastKey, setLastKey] = useState(null);
  const [keyHistory, setKeyHistory] = useState([]);
  const [keyPerformance, setKeyPerformance] = useState({});
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reviewKey, setReviewKey] = useState(null);
  const startedAt = useRef(null);
  const previousKeyAt = useRef(null);
  const target = reviewMode && reviewTarget ? reviewTarget : (lesson.exercises[exerciseIndex] || "");
  const nextCharacter = target[value.length] || "";

  const stats = useMemo(() => {
    let correct = 0;
    for (let i = 0; i < value.length; i++) if (value[i] === target[i]) correct++;
    return { accuracy: value.length ? Math.round(correct / value.length * 100) : 100, errors: value.length - correct, correct };
  }, [value, target]);

  const averageKeyTime = value.length && elapsed > 0 ? (elapsed / 1000 / value.length).toFixed(2) : "—";

  function recordKey(event) {
    if (done || event.key === "Shift" || event.key === "Control" || event.key === "Alt" || event.key === "Meta" || event.key === "Enter") return;
    const now = performance.now();
    if (!startedAt.current) startedAt.current = now;
    const interval = previousKeyAt.current ? (now - previousKeyAt.current) / 1000 : null;
    previousKeyAt.current = now;
    setElapsed(now - startedAt.current);
    const expected = target[value.length] || event.key;
    const pressedKey = event.key === " " ? "Space" : event.key.toLowerCase();
    const keyLabel = pressedKey;
    const entry = { key: event.key === " " ? "Space" : event.key, expected: keyLabel, interval: interval === null ? "Start" : `${interval.toFixed(2)}s`, finger: fingerFor(expected) };
    setLastKey(entry);
    setKeyHistory(history => [...history.slice(-11), entry]);
    if (interval !== null && event.key.length === 1) {
      setKeyPerformance(current => {
        const previous = current[keyLabel] || { total: 0, count: 0 };
        return { ...current, [keyLabel]: { total: previous.total + interval, count: previous.count + 1 } };
      });
    }
  }

  function updateValue(nextValue) {
    setValue(nextValue);
    if (!startedAt.current && nextValue.length) startedAt.current = performance.now();
    if (startedAt.current) setElapsed(performance.now() - startedAt.current);
  }

  function resetExercise() {
    setValue(""); setDone(false); setElapsed(0); setLastKey(null); setKeyHistory([]);
    startedAt.current = null; previousKeyAt.current = null;
  }

  function restartLesson() {
    setExerciseIndex(0);
    setKeyPerformance({});
    setReviewMode(false);
    setReviewTarget(null);
    setReviewKey(null);
    resetExercise();
  }

  function continueFromKeyboard(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (value === target) next();
    }
  }

  const slowKeys = Object.entries(keyPerformance)
    .filter(([, result]) => result.count > 0)
    .map(([key, result]) => ({ key, average: result.total / result.count, count: result.count }))
    .sort((a, b) => b.average - a.average)
    .slice(0, 3);

  function startFocusedPractice(key) {
    const letter = key.toLowerCase() === "space" ? " " : key;
    const focused = letter === " " ? " " : letter.toLowerCase();
    setReviewKey(key.toLowerCase() === "space" ? "Space" : key.toUpperCase());
    const remedial = focused === " " ? "the sun is up. we can do it." : `${focused} ${focused} ${focused} ${focused} ${focused}   ${focused}${focused}  ${focused}${focused}   ${focused} a ${focused}   ${focused} is for practice.`;
    setReviewMode(true);
    setExerciseIndex(0);
    setValue("");
    setDone(false);
    setElapsed(0);
    setLastKey(null);
    setKeyHistory([]);
    startedAt.current = null;
    previousKeyAt.current = null;
    setReviewTarget(remedial);
  }

  function next() {
    if (!reviewMode && exerciseIndex < lesson.exercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1); resetExercise();
    } else {
      setDone(true);
      try {
        const key = "typing-academy-completed";
        const saved = JSON.parse(localStorage.getItem(key) || "[]");
        if (!saved.includes(lesson.slug)) localStorage.setItem(key, JSON.stringify([...saved, lesson.slug]));
      } catch {}
    }
  }

  const lessonLetter = lesson.letter;
  const fingerName = nextCharacter ? fingerFor(nextCharacter) : "Exercise complete";
  const letterStages = ["Meet the key", "Tap the letter", "Practise pairs", "Build a rhythm", "Try simple words", "Use it in a sentence"];

  return <section className="practice">
    {lessonLetter && <div className="letter-welcome" aria-label={`Introduction to the ${reviewMode && reviewKey ? reviewKey : lessonLetter} key`}>
      <div className="letter-mascot" aria-hidden="true"><div className="mascot-screen"><span>•</span><span>•</span><b>⌣</b></div><div className="mascot-base"/></div>
      <div className="letter-welcome-copy">
        <span className="eyebrow">{reviewMode ? "PERSONALISED EXTRA PRACTICE" : "YOUR NEW KEY · STEP 1 OF 6"}</span>
        <p>Howdy! Use your <strong>{fingerFor(reviewMode && reviewKey ? reviewKey : lessonLetter).toLowerCase()}</strong> finger to:</p>
        <h2>Type the <span>{reviewMode && reviewKey ? reviewKey : lessonLetter}</span> key</h2>
        <div className="letter-welcome-tip">Find the key on the keyboard below. Keep your other fingers relaxed on the home row.</div>
        <div className="letter-keyboard-preview" aria-label={`Keyboard map showing the ${lessonLetter} key`}>
          {keyboardRows.map((row, rowIndex) => <div className="keyboard-row" key={rowIndex}>{row.map(key => <span key={key} className={`keyboard-key ${(reviewMode && reviewKey ? reviewKey.toLowerCase() : lessonLetter.toLowerCase()) === key ? "key-next" : ""}`}>{key}</span>)}</div>)}
        </div>
      </div>
    </div>}
    <div className="practice-top"><span>{lessonLetter ? letterStages[Math.min(exerciseIndex, letterStages.length - 1)] : `Exercise ${exerciseIndex + 1} of ${lesson.exercises.length}`}</span><span>Accuracy: {stats.accuracy}% · Errors: {stats.errors}</span></div>
    {lessonLetter && <div className="letter-time-guide"><span>Suggested practice time</span><strong>About {lesson.recommendedSeconds} seconds</strong><small>No rush — take the time you need. Accuracy comes first.</small></div>}
    {done ? <div className="success lesson-complete">
      <h3>{reviewMode ? "Focused practice complete!" : "Lesson complete!"}</h3>
      <p>Your progress has been saved on this device.</p>
      {!reviewMode && <div className="key-insights">
        <h4>Your key practice report</h4>
        <p>These are the keys where your pauses were longest. A little extra practice can make them feel more familiar.</p>
        {slowKeys.length ? <div className="slow-key-list">{slowKeys.map((item, index) => <div className="slow-key-row" key={item.key}>
          <span className="slow-key-rank">{index + 1}</span><strong className="slow-key-letter">{item.key.toLowerCase() === "space" ? "Space" : item.key.toUpperCase()}</strong>
          <span className="slow-key-time">Avg. pause: {item.average.toFixed(2)}s</span>
          <button onClick={() => startFocusedPractice(item.key)}>Practise this key</button>
        </div>)}</div> : <p>Keep practising. We need a few timed keystrokes before we can identify which keys need extra attention.</p>}
        {slowKeys[0] && <div className="practice-recommendation"><strong>Recommended next:</strong> Spend a little more time on the <b>{slowKeys[0].key.toLowerCase() === "space" ? "Space" : slowKeys[0].key.toUpperCase()}</b> key, then repeat a short word exercise.</div>}
      </div>}
      <div className="completion-actions"><button onClick={restartLesson}>Practice lesson again</button>{reviewMode && <button className="secondary-action" onClick={restartLesson}>Return to lesson</button>}</div>
    </div> : <>
      <div className="typing-stats">
        <div><small>TIME</small><strong>{(elapsed / 1000).toFixed(1)}s</strong></div>
        <div><small>AVERAGE / KEY</small><strong>{averageKeyTime}{averageKeyTime !== "—" ? "s" : ""}</strong></div>
        <div><small>CHARACTERS</small><strong>{value.length}/{target.length}</strong></div>
      </div>
      {lessonLetter && <p className="letter-step-hint">{exerciseIndex === 0 ? `First, find the ${reviewMode && reviewKey ? reviewKey : lessonLetter} key. Then tap it gently each time you see it.` : exerciseIndex === 1 ? `Now type pairs of ${lessonLetter.toLowerCase()}. Pause, relax, and repeat.` : exerciseIndex === 2 ? "Practise two letters at a time. Keep your finger relaxed." : exerciseIndex === 3 ? "Build a steady rhythm. Accuracy matters more than speed." : exerciseIndex === 4 ? "Great! Try these short, friendly words. Use the finger guide for other keys too." : "You are ready to use your new key in a sentence."}</p>}
      <div className="target" aria-label="Typing passage">
        {Array.from(target).map((character, index) => {
          const typed = index < value.length;
          const correct = typed && value[index] === character;
          return <span key={`${exerciseIndex}-${index}`} className={`${typed ? (correct ? "char-correct" : "char-wrong") : "char-pending"} ${index === value.length ? "char-current" : ""}`}>{character === " " ? "\u00a0" : character}</span>;
        })}
      </div>
      <label className="typing-input-label" htmlFor="typing-entry">Your typing</label>
      <textarea id="typing-entry" autoFocus value={value} onKeyDown={e => { recordKey(e); continueFromKeyboard(e); }} onChange={e => updateValue(e.target.value)} placeholder="Start typing the highlighted passage here..." spellCheck="false" autoCapitalize="off" autoCorrect="off" />
      <div className="practice-actions"><span className="muted">{value === target ? "Great work! Press Enter to continue, or use the button." : "Correct characters turn green; incorrect characters turn red."}</span><button disabled={value !== target} onClick={next}>{reviewMode ? "Finish focused practice" : exerciseIndex === lesson.exercises.length - 1 ? "Finish lesson" : "Next exercise"} · Enter ↵</button></div>

      <div className="finger-coach">
        <div className="finger-coach-heading"><div><span className="eyebrow">LIVE FINGER GUIDE</span><h3>Which finger should type next?</h3></div><div className="next-key"><small>NEXT KEY</small><strong>{nextCharacter === " " ? "SPACE" : nextCharacter || "—"}</strong></div></div>
        <div className="finger-instruction"><span className="finger-dot"/><div><strong>{nextCharacter ? fingerFor(nextCharacter) : "Exercise complete"}</strong><small>{nextCharacter ? `Use ${fingerFor(nextCharacter).toLowerCase()} for this key. Return to the home row after reaching.` : "Move to the next exercise when ready."} Home row resting position: left hand A–S–D–F, right hand J–K–L–;.</small></div></div>
        <div className="keyboard-guide" aria-label="Keyboard finger placement guide">
          {keyboardRows.map((row, rowIndex) => <div className={`keyboard-row keyboard-row-${rowIndex + 1}`} key={rowIndex}>{row.map(key => <span key={key} className={`keyboard-key finger-${fingerFor(key).toLowerCase().replaceAll(" ", "-")} ${nextCharacter.toLowerCase() === key ? "key-next" : ""}`}>{key}</span>)}</div>)}
          <div className={`keyboard-key space-key ${nextCharacter === " " ? "key-next" : ""}`}>SPACE · either thumb</div>
        </div>
        <div className="finger-legend"><span><i className="legend-pinky"/>Pinky</span><span><i className="legend-ring"/>Ring</span><span><i className="legend-middle"/>Middle</span><span><i className="legend-index"/>Index</span><span><i className="legend-thumb"/>Thumb</span></div>
        <div className="key-timing"><span>Last key interval</span><strong>{lastKey ? `${lastKey.key} · ${lastKey.interval}` : "Waiting for first key"}</strong><small>{lastKey ? `Suggested finger: ${lastKey.finger}` : "Timing starts when you begin typing."}</small></div>
        <div className="key-history"><div className="key-history-title">Recent key-by-key timing <small>Each chip shows the interval after the previous keystroke</small></div><div className="key-history-list">{keyHistory.length ? keyHistory.map((entry, index) => <span key={`${index}-${entry.key}`}><b>{entry.key === " " ? "Space" : entry.key}</b><small>{entry.interval}</small></span>) : <span className="key-history-empty">Your keystroke timings will appear here.</span>}</div></div>
      </div>
    </>}
  </section>;
}
