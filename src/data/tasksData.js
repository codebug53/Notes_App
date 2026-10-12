export const INITIAL_DAILY_TODOS = [
  {
    id: "dt-1",
    title: "Solve 2 LeetCode Tree Problems (Invert Binary Tree, LCA)",
    subject: "CS & Algorithms",
    priority: "High",
    timeEstimate: "45m",
    completed: true,
    dueDate: "Today",
    relatedNoteId: "note-1"
  },
  {
    id: "dt-2",
    title: "Review Process Scheduling & Context Switching code snippet",
    subject: "OS & Database Systems",
    priority: "High",
    timeEstimate: "30m",
    completed: false,
    dueDate: "Today",
    relatedNoteId: "fc-os-1"
  },
  {
    id: "dt-3",
    title: "Practice Eigenvalues & Matrix Diagonalization sample problems",
    subject: "Math & Linear Algebra",
    priority: "Medium",
    timeEstimate: "60m",
    completed: false,
    dueDate: "Today",
    relatedNoteId: "note-2"
  },
  {
    id: "dt-4",
    title: "Complete Maxwell's Equations short notes for mid-terms",
    subject: "Physics & Engineering",
    priority: "Low",
    timeEstimate: "25m",
    completed: false,
    dueDate: "Today",
    relatedNoteId: "note-3"
  },
  {
    id: "dt-5",
    title: "Revise SN1 vs SN2 reaction mechanism flashcards",
    subject: "Organic Chemistry",
    priority: "Medium",
    timeEstimate: "20m",
    completed: true,
    dueDate: "Today",
    relatedNoteId: "note-4"
  }
];

export const INITIAL_LONG_TERM_TASKS = [
  {
    id: "lt-1",
    title: "Operating Systems & Systems Programming Mastery",
    subject: "OS & Database Systems",
    targetDeadline: "Dec 2026",
    priority: "High",
    status: "In Progress",
    description: "Deep dive into kernel architectures, concurrency primitives, and memory paging mechanisms.",
    milestones: [
      { id: "m1-1", text: "Master Process Synchronization & Semaphores", completed: true },
      { id: "m1-2", text: "Implement LRU Cache Simulation in C++", completed: true },
      { id: "m1-3", text: "Virtual Memory Paging & TLB Hit Rate Analysis", completed: false },
      { id: "m1-4", text: "Deadlock Detection & Banker's Algorithm Implementation", completed: false }
    ]
  },
  {
    id: "lt-2",
    title: "Data Structures & Competitive Algorithms Portfolio",
    subject: "CS & Algorithms",
    targetDeadline: "Nov 2026",
    priority: "High",
    status: "In Progress",
    description: "Build robust mastery over graph theory, dynamic programming, and advanced tree data structures.",
    milestones: [
      { id: "m2-1", text: "Graph SSSP Algorithms: Dijkstra, Bellman-Ford, Floyd-Warshall", completed: true },
      { id: "m2-2", text: "Dynamic Programming Top 50 Pattern Problems", completed: false },
      { id: "m2-3", text: "Build Segment Tree & Trie reference templates", completed: false },
      { id: "m2-4", text: "Complete 10 Mock Technical Coding Interviews", completed: false }
    ]
  },
  {
    id: "lt-3",
    title: "Linear Algebra & Vector Calculus Semester Exam Prep",
    subject: "Math & Linear Algebra",
    targetDeadline: "Nov 2026",
    priority: "Medium",
    status: "In Progress",
    description: "Ace midterm and final semester exams with full conceptual clarity and proof derivations.",
    milestones: [
      { id: "m3-1", text: "Solve 5 years of Previous Year Question (PYQ) sets", completed: true },
      { id: "m3-2", text: "Eigenvalue & Singular Value Decomposition (SVD) proofs", completed: false },
      { id: "m3-3", text: "Vector Fields, Line Integrals & Stokes' Theorem exercises", completed: false }
    ]
  },
  {
    id: "lt-4",
    title: "Full-Stack Project: Developer Code Vault & Knowledge Base",
    subject: "Projects",
    targetDeadline: "Jan 2027",
    priority: "Medium",
    status: "Planning",
    description: "Architect and build an offline-first technical note-taking system with embedded code snippet review.",
    milestones: [
      { id: "m4-1", text: "Design split panel layout with editable code block", completed: true },
      { id: "m4-2", text: "Implement daily todo list and long-term milestone checklist", completed: true },
      { id: "m4-3", text: "Add syntax language selector and clipboard copy manager", completed: false },
      { id: "m4-4", text: "Deploy production build and publish documentation", completed: false }
    ]
  }
];

export const INITIAL_STUDENT_TASKS = [
  ...INITIAL_DAILY_TODOS.map(d => ({
    id: d.id,
    title: d.title,
    subject: d.subject,
    dueDate: d.dueDate === "Today" ? "2026-10-12" : d.dueDate,
    priority: d.priority,
    status: d.completed ? "Completed" : "In Progress",
    relatedNoteId: d.relatedNoteId
  }))
];
