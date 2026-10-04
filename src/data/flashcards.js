export const INITIAL_FLASHCARDS = [
  {
    id: "fc-1",
    subject: "CS & Algorithms",
    question: "What is Dijkstra's Algorithm complexity and why does it fail on negative edge weights?",
    answer: "Dijkstra runs in O((V + E) log V) with Min-Heap. It fails on negative edges because once a node is marked visited under greedy choice, its distance can never be re-evaluated even if a cheaper negative path is discovered later.",
    mastered: false
  },
  {
    id: "fc-2",
    subject: "Math & Linear Algebra",
    question: "How do you calculate the trace and determinant of a matrix using its eigenvalues?",
    answer: "The Sum of all eigenvalues equals the Trace of matrix A: ∑ λi = tr(A). The Product of all eigenvalues equals the Determinant of matrix A: ∏ λi = det(A).",
    mastered: true
  },
  {
    id: "fc-3",
    subject: "Physics & Engineering",
    question: "What physical concept is described by Gauss's Law for Magnetism (∇ · B = 0)?",
    answer: "∇ · B = 0 states that the divergence of the magnetic field B is zero everywhere, meaning magnetic flux lines are continuous loops and isolated magnetic monopoles do not exist.",
    mastered: false
  },
  {
    id: "fc-4",
    subject: "Organic Chemistry",
    question: "Why does an SN2 substitution mechanism result in 100% Walden Inversion?",
    answer: "SN2 is a 1-step concerted mechanism where the nucleophile attacks from the opposite side of the leaving group (backside attack), causing the 3 remaining substituents to flip like an umbrella in high wind.",
    mastered: false
  },
  {
    id: "fc-5",
    subject: "OS & Database Systems",
    question: "What is Belady's Anomaly and which page replacement algorithm suffers from it?",
    answer: "Belady's Anomaly is the phenomenon where increasing physical page frames increases total page faults for a reference string. It occurs only in FIFO (First-In-First-Out) page replacement.",
    mastered: true
  },
  {
    id: "fc-6",
    subject: "CS & Algorithms",
    question: "How does 1D space optimization work in 0/1 Knapsack Dynamic Programming?",
    answer: "By iterating the capacity loop backwards from W down to wt[i], we ensure that dp[w - wt[i]] references values computed in the previous item's pass, reducing 2D space O(N·W) to 1D O(W).",
    mastered: false
  }
];
