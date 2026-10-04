export const COURSE_MODULES = [
  {
    id: 1,
    number: 1,
    title: "Basics",
    subtitle: "Syntax, Variables, Types",
    lessonsCount: 8,
    completed: 8,
  },
  {
    id: 2,
    number: 2,
    title: "Logic",
    subtitle: "Functions, Conditionals, Loops",
    lessonsCount: 12,
    completed: 4,
  },
  {
    id: 3,
    number: 3,
    title: "DOM & Projects",
    subtitle: "Events, DOM, mini apps",
    lessonsCount: 10,
    completed: 0,
  }
];

export const CURRENT_LESSON = {
  id: "lesson-4",
  moduleName: "Intro to Functions",
  moduleNumber: 1,
  lessonNumber: 4,
  totalLessons: 12,
  pathTitle: "Beginner friendly JavaScript path",
  mainHeading: "Interactive coding,",
  subHeading: "guided from zero to DOM",
  description: "Start with variables, master functions, and build real time mini projects. all in your browser with instant feedback.",
  streakDays: 2,
  streakText: "Keep your streak to unlock practice sprints",
  guidedTitle: "Write your first function",
  guidedDesc: 'Create a function greet that takes a name and returns the string "Hello, <name>".',
  requirements: [
    { color: '#10b981', text: 'Use the function keyword' },
    { color: '#06b6d4', text: 'Make sure the function returns a value not just log.' },
    { color: '#a855f7', text: 'Try calling it out your own name in the console panel.' }
  ],
  initialCode: `// TODO: complete the greet function
function greet(name) {
  /**
   * Step 1: create a message like "Hello, <name>"
   * Step 2: return that message
   */
  
  // your code goes here
  const message = \`Hello, \${name}!\`;
  return message;
}

// Try it:
greet("Arjun");`,
  testCases: [
    { input: "Arjun", expected: "Hello, Arjun!" },
    { id: 2, input: "Mahammad", expected: "Hello, Mahammad!" },
    { id: 3, input: "Developer", expected: "Hello, Developer!" }
  ],
  sampleLessons: [
    { title: "Variables and console.log", duration: "10 min", completed: true },
    { title: "Functions intro & parameters", duration: "12 min", completed: false },
    { title: "Return values vs side-effects", duration: "15 min", completed: false }
  ]
};

export const LESSON_NOTES = `
# Lesson Notes: Intro to Functions

### What is a Function?
A function is a reusable block of code designed to perform a particular task. In JavaScript:

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

### Key Concepts:
1. **Function Parameters**: The variables listed inside the parentheses \`(name)\`.
2. **Arguments**: The actual values passed when calling the function \`greet("Arjun")\`.
3. **Return Statement**: Specifies the value returned to the caller. Without a \`return\`, the function yields \`undefined\`.

### GATE & Placement Tip:
In algorithms and time complexity analysis, functions define operations per input size $N$. Keep functions pure to avoid side effects!
`;

export const CHALLENGES = [
  {
    id: "c1",
    title: "Challenge 1: Sum of Two Numbers",
    difficulty: "Easy",
    desc: "Write a function `add(a, b)` that returns the sum of `a` and `b`.",
    code: `function add(a, b) {\n  return a + b;\n}\nadd(5, 7);`
  },
  {
    id: "c2",
    title: "Challenge 2: Check Even or Odd",
    difficulty: "Easy",
    desc: "Write a function `isEven(num)` that returns true if num is even, otherwise false.",
    code: `function isEven(num) {\n  return num % 2 === 0;\n}\nisEven(10);`
  },
  {
    id: "c3",
    title: "Challenge 3: Reverse a String",
    difficulty: "Medium",
    desc: "Write a function `reverseStr(str)` that returns the reversed string.",
    code: `function reverseStr(str) {\n  return str.split('').reverse().join('');\n}\nreverseStr("codebuddy");`
  }
];

export const CHEAT_SHEET = [
  { term: "function Keyword", desc: "Declares a standard JavaScript function." },
  { term: "Arrow Functions", desc: "Short syntax: const greet = (name) => `Hello ${name}`;" },
  { term: "Default Parameters", desc: "function greet(name = 'Guest') { ... }" },
  { term: "Rest Parameters", desc: "function sum(...args) { return args.reduce((a,b)=>a+b, 0); }" }
];
