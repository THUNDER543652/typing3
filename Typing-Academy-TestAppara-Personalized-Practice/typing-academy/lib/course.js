export const levels = [
  {
    id: "beginner", title: "Beginner", label: "Start with the basics",
    description: "Learn the keyboard, finger placement, letters, words and simple sentences.",
    modules: [
      { title: "Getting Started", lessons: [
        ["keyboard-basics","Meet Your Keyboard","Learn the main keyboard sections and how a typing lesson works."],
        ["posture-hand-position","Posture & Hand Position","Set up a comfortable position and learn the home-row resting position."]
      ]},
      { title: "Learn One Letter at a Time", lessons: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => [
        `letter-${letter.toLowerCase()}`, `Letter ${letter}`, `Find the ${letter} key, learn its finger, and practise it slowly before trying simple words.`
      ]) },
      { title: "Learn the Keys", lessons: [
        ["home-row-left","Home Row: Left Hand","Practice A, S, D and F with the correct fingers."],
        ["home-row-right","Home Row: Right Hand","Practice J, K, L and semicolon."],
        ["top-row","Top Row Keys","Reach Q through P while returning to the home row."],
        ["bottom-row","Bottom Row Keys","Reach Z through M with controlled finger movement."],
        ["all-letters","All 26 Letters","Combine the alphabet without looking at the keyboard."]
      ]},
      { title: "First Words & Sentences", lessons: [
        ["short-words","Short Familiar Words","Type short everyday words using the keys you know."],
        ["common-words","Common Everyday Words","Build confidence with frequently used words."],
        ["simple-sentences","Simple Sentences","Practice spaces, capital letters and full stops."]
      ]}
    ]
  },
  {
    id: "intermediate", title: "Intermediate", label: "Build fluency",
    description: "Improve rhythm, accuracy and control with patterns, punctuation and paragraphs.",
    modules: [
      { title: "Letter Patterns", lessons: [
        ["common-pairs","Common Letter Pairs","Practice patterns such as th, sh, ch, wh and st."],
        ["word-endings","Word Endings","Practice ing, ed, er, tion and ment."],
        ["longer-words","Longer Words","Type multisyllable words with a steady rhythm."]
      ]},
      { title: "Everyday Typing", lessons: [
        ["numbers","Numbers Row","Practice numbers from 0 to 9."],
        ["punctuation","Punctuation & Shift","Use commas, question marks, quotation marks and capitals."],
        ["sentences-intermediate","Longer Sentences","Type varied sentences with natural punctuation."],
        ["paragraphs-intermediate","Short Paragraphs","Build consistency with 50–75 word passages."]
      ]},
      { title: "Speed Foundations", lessons: [
        ["one-minute","One-Minute Practice","Focus on a steady pace while maintaining accuracy."],
        ["three-minute","Three-Minute Practice","Build consistency over a longer exercise."]
      ]}
    ]
  },
  {
    id: "advanced", title: "Advanced", label: "Type with confidence",
    description: "Apply your skills to realistic writing, longer passages and timed assessments.",
    modules: [
      { title: "Advanced Control", lessons: [
        ["complex-vocabulary","Complex Vocabulary","Practice challenging spelling patterns and longer words."],
        ["complex-sentences","Complex Sentences","Handle varied sentence structures and punctuation."],
        ["symbols-dates","Symbols, Dates & Numbers","Type mixed numeric and symbol-based text."]
      ]},
      { title: "Real-World Typing", lessons: [
        ["emails-letters","Emails & Letters","Practice common professional writing formats."],
        ["reports-notices","Reports & Notices","Type formal paragraphs with headings and punctuation."],
        ["long-passages","Long Paragraphs","Practice 100–150 word passages."]
      ]},
      { title: "Mastery", lessons: [
        ["five-minute","Five-Minute Challenge","Maintain accuracy during a longer timed session."],
        ["final-assessment","Final Assessment","Complete a mixed-skill course assessment."]
      ]}
    ]
  }
];

const practice = {
  "home-row-left": ["asdf","sad fad","a dad had a sad day."],
  "home-row-right": ["jkl;","all; fall; ask;","jill had a skill."],
  "top-row": ["qwerty","type your quiet query","we try to write quite well."],
  "bottom-row": ["zxcvbnm","mix box van cab","my name can be written."],
  "all-letters": ["abcdefghijklmnopqrstuvwxyz","the quick brown fox jumps over the lazy dog","pack my box with five dozen liquor jugs."],
  "short-words": ["cat dog sun hat red","book tree milk fish","the sun is up."],
  "common-words": ["the and you are for with","have this from they will","you can learn something new every day."],
  "simple-sentences": ["I can type.","This is my keyboard.","Practice helps me improve."],
  "common-pairs": ["the then this","ship shop wish","chat cheese lunch","stop start still"],
  "word-endings": ["playing reading walking","wanted helped smiled","action station movement"],
  "longer-words": ["computer keyboard practice","important information","beautiful wonderful afternoon"],
  "numbers": ["12345 67890","2026 123 456","Room 204 starts at 9:30."],
  "punctuation": ["Hello, how are you?","I said, \"Practice every day.\"","Wait! That is amazing."],
  "sentences-intermediate": ["Typing becomes easier when you practise regularly.","A calm rhythm can improve both speed and accuracy."],
  "paragraphs-intermediate": ["Good typing is built through regular practice. Start slowly, use the correct fingers, and focus on accuracy. As the movements become familiar, your speed will improve naturally."],
  "one-minute": ["steady practice builds confidence and control","focus on the words in front of you and keep a comfortable rhythm"],
  "three-minute": ["Accuracy is the foundation of efficient typing. Keep your hands relaxed, look at the screen, and correct mistakes by learning from them."],
  "complex-vocabulary": ["curiosity responsibility extraordinary","communication concentration opportunity"],
  "complex-sentences": ["Although the task looked difficult, consistent practice made it manageable.","When accuracy becomes dependable, a faster pace can follow."],
  "symbols-dates": ["09/11/2026  ₹500.00","(sample) [reference] {details}","Order #2048: 3 items, total ₹1,250."],
  "emails-letters": ["Subject: Weekly Update","Dear Team, I am writing to share a brief update on our work."],
  "reports-notices": ["NOTICE: The computer lab will remain open until 4:00 PM today.","Please save your work before signing out."],
  "long-passages": ["Clear communication depends on both careful thought and accurate writing. Typing is a practical skill that improves with patience. Set a comfortable pace, pay attention to punctuation, and aim for consistent accuracy rather than rushing through every line."],
  "five-minute": ["A reliable typist works with a steady rhythm and keeps attention on the text. Good habits matter more than short bursts of speed."],
  "final-assessment": ["The final assessment combines letters, familiar words, punctuation, numbers and paragraphs. Read carefully, type at a comfortable pace, and focus on accuracy."]
};

function letterExercises(letter) {
  const lower = letter.toLowerCase();
  const upper = letter;
  const examples = {
    A: ["am", "an", "ant", "apple"], B: ["bat", "bed", "big", "ball"], C: ["cat", "cup", "car", "cake"],
    D: ["dad", "dog", "dig", "duck"], E: ["egg", "end", "elf", "elephant"], F: ["fun", "fan", "fit", "fish"],
    G: ["get", "gap", "gum", "goat"], H: ["hat", "hen", "hot", "horse"], I: ["in", "it", "ink", "igloo"],
    J: ["jam", "jet", "jug", "jump"], K: ["key", "kid", "kit", "kite"], L: ["leg", "lip", "log", "lion"],
    M: ["map", "mom", "mud", "moon"], N: ["nap", "net", "nut", "nose"], O: ["on", "ox", "old", "orange"],
    P: ["pan", "pet", "pig", "park"], Q: ["quit", "quiz", "quick", "queen"], R: ["red", "run", "rat", "rain"],
    S: ["sun", "sit", "sad", "star"], T: ["top", "ten", "tap", "tree"], U: ["up", "us", "use", "under"],
    V: ["van", "vet", "vest", "voice"], W: ["win", "wet", "web", "water"], X: ["six", "box", "fox", "mix"],
    Y: ["yes", "yam", "yell", "yellow"], Z: ["zip", "zoo", "zero", "zigzag"]
  }[upper];
  return [
    `${lower}   ${lower}   ${lower}   ${lower}   ${lower}`,
    `${lower}${lower}   ${lower}${lower}   ${lower}${lower}`,
    `${lower} ${lower}   ${lower} ${lower}   ${lower} ${lower}`,
    `${lower}   ${lower}${lower}   ${lower}   ${lower}${lower}`,
    examples.join("   "),
    `I can type the letter ${lower}.`
  ];
}

export function getAllLessons() {
  return levels.flatMap(level => level.modules.flatMap(module =>
    module.lessons.map(([slug,title,description], index) => {
      const isLetter = slug.startsWith("letter-");
      const letter = isLetter ? slug.slice(-1).toUpperCase() : null;
      const letterIndex = isLetter ? letter.charCodeAt(0) - 65 : null;
      return {
        slug, title, description, levelId: level.id, levelTitle: level.title,
        moduleTitle: module.title, order: index + 1, letter,
        recommendedSeconds: isLetter ? 30 + Math.floor(letterIndex / 4) * 15 : null,
        exercises: isLetter ? letterExercises(letter) : (practice[slug] || ["Practice makes progress.","Keep a steady rhythm and focus on accuracy."])
      };
    })
  ));
}
export function getLesson(slug) { return getAllLessons().find(lesson => lesson.slug === slug); }
