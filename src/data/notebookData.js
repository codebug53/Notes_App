export const FOLDERS = [
  { id: "all", name: "All Subjects", icon: "BookOpen", count: 8, color: "#6366f1" },
  { id: "cs-dsa", name: "CS & Algorithms", icon: "Code2", count: 2, color: "#10b981" },
  { id: "math", name: "Math & Linear Algebra", icon: "Calculator", count: 2, color: "#f59e0b" },
  { id: "physics", name: "Physics & Engineering", icon: "Zap", count: 2, color: "#06b6d4" },
  { id: "chem", name: "Organic Chemistry", icon: "FlaskConical", count: 1, color: "#a855f7" },
  { id: "os-dbms", name: "OS & Database Systems", icon: "Cpu", count: 1, color: "#f43f5e" }
];

export const INITIAL_NOTEBOOK_NOTES = [
  {
    id: "note-1",
    folderId: "cs-dsa",
    subject: "CS & Algorithms",
    title: "Graph Shortest Path: Dijkstra vs Bellman-Ford Algorithms",
    lastEdited: "10 mins ago",
    tags: ["Algorithms", "Graph Theory", "Greedy vs DP", "Exam Prep"],
    cues: [
      "What is the greedy choice in Dijkstra?",
      "Why does Dijkstra fail on negative edge weights?",
      "How does Bellman-Ford detect negative cycles?"
    ],
    summary: "Single Source Shortest Path (SSSP) analysis for weighted graphs. Dijkstra uses greedy Min-Heap selection while Bellman-Ford relaxes all E edges V-1 times using Dynamic Programming.",
    keyTakeaways: [
      "Dijkstra Time Complexity: O((V + E) log V) with Min-Heap binary priority queue.",
      "Dijkstra FAILS on negative edge weights due to greedy visited status assumption.",
      "Bellman-Ford Time Complexity: O(V · E) using DP relaxation.",
      "Bellman-Ford detects negative cycles if distance shrinks on the V-th relaxation step."
    ],
    content: `### Dijkstra's Algorithm Overview
Dijkstra's algorithm solves the single-source shortest path problem for a graph with non-negative edge weights.

#### Step-by-Step Procedure:
1. Initialize distance array with \`Infinity\`, and set source distance \`dist[S] = 0\`.
2. Extract vertex \`u\` with minimum distance from Min-Heap.
3. For each neighbor \`v\`, if \`dist[u] + weight(u,v) < dist[v]\`, update \`dist[v]\`.
4. Repeat until priority queue is empty.

### Bellman-Ford Algorithm
Used when edges can have negative weights.
It relaxes all \`E\` edges \`V - 1\` times. If a further relaxation reduces any distance on the \`V\`-th pass, a **negative weight cycle** exists in the graph.`,
    code: `// JavaScript Bellman-Ford Implementation & Verification
function bellmanFord(vertices, edges, source) {
  let dist = new Array(vertices).fill(Infinity);
  dist[source] = 0;

  for (let i = 1; i <= vertices - 1; i++) {
    for (let [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  for (let [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return "Negative Weight Cycle Detected!";
    }
  }
  return dist;
}

const edges = [[0,1,4], [0,2,5], [1,2,-2], [2,3,3]];
console.log("Distances from Source 0:", bellmanFord(4, edges, 0));`,
    testInput: "0",
    expectedOutput: "Distances from Source 0: [0, 4, 2, 5]",
    pyqs: [
      {
        question: "Final Exam Q1: Which algorithm works for negative edge weights without negative cycles?",
        answer: "Bellman-Ford Algorithm with O(V · E) complexity."
      }
    ]
  },
  {
    id: "note-2",
    folderId: "math",
    subject: "Math & Linear Algebra",
    title: "Eigenvalues, Eigenvectors & Diagonalization Theorems",
    lastEdited: "1 hour ago",
    tags: ["Linear Algebra", "Calculus", "Matrices", "Exam High-Yield"],
    cues: [
      "What is the characteristic equation for Matrix A?",
      "What does det(A - λI) = 0 determine?",
      "When is a matrix n x n diagonalizable?"
    ],
    summary: "Fundamental linear transformations where vector direction remains invariant under transformation: A x = λ x. Applications in PCA, quantum mechanics, and differential equations.",
    keyTakeaways: [
      "Characteristic Equation: det(A - λI) = 0.",
      "Sum of Eigenvalues = Trace of Matrix A.",
      "Product of Eigenvalues = Determinant det(A).",
      "Matrix A is diagonalizable iff it has n linearly independent eigenvectors."
    ],
    content: `### Eigenvalue Equation
For a square matrix **A**, a scalar **λ** is an eigenvalue if there exists a non-zero vector **x** such that:

$$A \\mathbf{x} = \\lambda \\mathbf{x}$$

#### Key Properties:
- **Trace Property**: \$\\sum \\lambda_i = \\text{tr}(A)\$
- **Determinant Property**: \$\\prod \\lambda_i = \\det(A)\$
- **Invertibility**: Matrix A is invertible if and only if **0 is not an eigenvalue** of A.`,
    code: `// Finding 2x2 Matrix Eigenvalues using Characteristic Equation
function findEigenvalues2x2(a, b, c, d) {
  // A = [[a, b], [c, d]]
  const trace = a + d;
  const det = (a * d) - (b * c);
  const discriminant = Math.sqrt(trace * trace - 4 * det);
  
  const l1 = (trace + discriminant) / 2;
  const l2 = (trace - discriminant) / 2;
  return [l1, l2];
}

console.log("Eigenvalues of [[4, 1], [2, 3]]:", findEigenvalues2x2(4, 1, 2, 3));`,
    testInput: "[[4,1],[2,3]]",
    expectedOutput: "Eigenvalues of [[4, 1], [2, 3]]: [5, 2]",
    pyqs: [
      {
        question: "Midterm Exam: If trace of matrix A is 7 and det(A) is 10, find its eigenvalues.",
        answer: "λ = 5 and λ = 2 (since λ1 + λ2 = 7 and λ1 * λ2 = 10)."
      }
    ]
  },
  {
    id: "note-3",
    folderId: "physics",
    subject: "Physics & Engineering",
    title: "Maxwell's Equations & Electromagnetic Wave Propagation",
    lastEdited: "3 hours ago",
    tags: ["Electromagnetism", "Physics III", "Vector Calculus"],
    cues: [
      "What physical law does Gauss's Law represent?",
      "Why is displacement current necessary in Ampere-Maxwell Law?",
      "What is the speed of light in terms of ε0 and μ0?"
    ],
    summary: "The four governing equations of classical electromagnetism connecting electric fields, magnetic fields, charge densities, and electric currents.",
    keyTakeaways: [
      "Gauss's Law: ∇ · E = ρ / ε0 (Electric charge creates divergent electric field).",
      "Gauss's Law for Magnetism: ∇ · B = 0 (No magnetic monopoles exist).",
      "Faraday's Law: ∇ × E = -∂B/∂t (Time-varying B creates E field).",
      "Ampere-Maxwell Law: ∇ × B = μ0 J + μ0 ε0 ∂E/∂t (Speed of light c = 1 / √(μ0 ε0))."
    ],
    content: `### Differential Form of Maxwell's Equations

1. **Gauss's Law for Electricity**:
   $$\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}$$

2. **Gauss's Law for Magnetism**:
   $$\\nabla \\cdot \\mathbf{B} = 0$$

3. **Faraday's Law of Induction**:
   $$\\nabla \\times \\mathbf{E} = -\\frac{\\partial \\mathbf{B}}{\\partial t}$$

4. **Ampère-Maxwell Law**:
   $$\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\varepsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}$$`,
    code: `// Calculating Speed of Light in Vacuum from Permittivity & Permeability
const e0 = 8.854187817e-12; // Farads/meter
const u0 = 1.256637061e-6;  // Henries/meter

function calculateSpeedOfLight() {
  return 1 / Math.sqrt(e0 * u0);
}

console.log("Calculated c (m/s):", calculateSpeedOfLight().toExponential(4));`,
    testInput: "e0, u0",
    expectedOutput: "Calculated c (m/s): 2.9979e+8",
    pyqs: [
      {
        question: "Physics Exam Q4: What does ∇ · B = 0 physically imply?",
        answer: "It implies magnetic flux lines are continuous closed loops and magnetic monopoles do not exist."
      }
    ]
  },
  {
    id: "note-4",
    folderId: "chem",
    subject: "Organic Chemistry",
    title: "SN1 vs SN2 Nucleophilic Substitution Mechanisms",
    lastEdited: "Yesterday",
    tags: ["Chemistry", "Mechanisms", "Stereochemistry", "High-Yield"],
    cues: [
      "Which mechanism involves a carbocation intermediate?",
      "Why does SN2 result in Walden Inversion of stereochemistry?",
      "How do polar protic solvents affect SN1 vs SN2 rates?"
    ],
    summary: "Comparison of bimolecular (SN2) vs unimolecular (SN1) nucleophilic substitution reactions, reaction kinetics, solvent effects, and stereochemical outcomes.",
    keyTakeaways: [
      "SN1: 2-step mechanism, Carbocation intermediate, Rate = k[Substrate], Racemization outcome.",
      "SN2: 1-step concerted mechanism, Transition state, Rate = k[Substrate][Nucleophile], Walden Inversion.",
      "Substrate preference: SN1 prefers 3° > 2°; SN2 prefers 1° > 2° > Methyl.",
      "Polar protic solvents stabilize carbocations (favors SN1)."
    ],
    content: `### SN1 Mechanism (Unimolecular)
- **Step 1 (Rate Determining)**: Leaving group departs, forming a planar carbocation.
- **Step 2**: Nucleophile attacks from either side with equal probability, leading to a **racemic mixture**.

### SN2 Mechanism (Bimolecular)
- **Concerted Single Step**: Backside attack by nucleophile while leaving group leaves.
- Requires low steric hindrance around electrophilic carbon.
- Results in **100% Walden Inversion** of stereocenter (R -> S or S -> R).`,
    code: `// Predict Substitution Mechanism based on Substrate & Nucleophile
function predictMechanism(substrateDegree, solventType, nucleophileStrength) {
  if (substrateDegree === 3) return "SN1 (Stable carbocation formed)";
  if (substrateDegree === 1) return "SN2 (Low steric hindrance)";
  if (substrateDegree === 2) {
    return solventType === "polar_protic" ? "SN1 (Protic stabilizes carbocation)" : "SN2";
  }
  return "Unknown";
}

console.log("3-degree Substrate:", predictMechanism(3, "polar_protic", "strong"));
console.log("1-degree Substrate:", predictMechanism(1, "polar_aprotic", "strong"));`,
    testInput: "3, polar_protic",
    expectedOutput: "3-degree Substrate: SN1 (Stable carbocation formed)",
    pyqs: [
      {
        question: "Chemistry Midterm: Why does 1-bromobutane undergo substitution via SN2?",
        answer: "Because 1-bromobutane is a primary alkyl halide with minimal steric hindrance, facilitating backside nucleophilic attack."
      }
    ]
  },
  {
    id: "note-5",
    folderId: "os-dbms",
    subject: "OS & Database Systems",
    title: "Operating Systems Paging, Virtual Memory & Belady's Anomaly",
    lastEdited: "2 days ago",
    tags: ["OS", "Virtual Memory", "Paging", "Page Faults"],
    cues: [
      "How is Effective Access Time (EAT) calculated with TLB?",
      "Which page replacement algorithm exhibits Belady's Anomaly?",
      "Why are LRU and Optimal free from Belady's Anomaly?"
    ],
    summary: "Virtual memory architecture, TLB hit ratios, page replacement strategies (FIFO, LRU, Optimal), and mathematical proof of stack property algorithms.",
    keyTakeaways: [
      "EAT Formula: EAT = h · (t_TLB + t_mem) + (1 - h) · (t_TLB + 2 · t_mem).",
      "Belady's Anomaly: Increasing physical memory frames INCREASES total page faults (FIFO only).",
      "LRU & OPT satisfy Stack Property and are mathematically immune to Belady's anomaly."
    ],
    content: `### Virtual Memory & Paging Basics
Logical memory is divided into **pages**; physical memory is divided into **frames**. 

#### Effective Access Time (EAT)
When TLB hit ratio is \$h\$:
$$\\text{EAT} = h \\cdot (t_{\\text{TLB}} + t_{\\text{mem}}) + (1 - h) \\cdot (t_{\\text{TLB}} + 2 \\cdot t_{\\text{mem}})$$

### Page Replacement Algorithms
1. **FIFO**: First-In First-Out. Simple but subject to **Belady's Anomaly**.
2. **LRU**: Least Recently Used. Replaces page untouched for longest time.
3. **OPT (Belady's Optimal)**: Replaces page that won't be used for longest future duration.`,
    code: `// LRU Page Replacement Simulator
function lruPageFaults(pages, capacity) {
  let memory = [];
  let faults = 0;

  for (let page of pages) {
    if (!memory.includes(page)) {
      if (memory.length === capacity) memory.shift();
      memory.push(page);
      faults++;
    } else {
      memory.splice(memory.indexOf(page), 1);
      memory.push(page);
    }
  }
  return faults;
}

console.log("LRU Page Faults for [7, 0, 1, 2, 0, 3, 0, 4]:", lruPageFaults([7, 0, 1, 2, 0, 3, 0, 4], 3));`,
    testInput: "7,0,1,2,0,3,0,4",
    expectedOutput: "LRU Page Faults for [7, 0, 1, 2, 0, 3, 0, 4]: 7",
    pyqs: [
      {
        question: "GATE CS PYQ: Which algorithm suffers from Belady's anomaly?",
        answer: "FIFO (First In First Out)."
      }
    ]
  },
  {
    id: "note-6",
    folderId: "cs-dsa",
    subject: "CS & Algorithms",
    title: "Dynamic Programming Top 7 Patterns (Knapsack, LIS, LCS)",
    lastEdited: "3 days ago",
    tags: ["DSA", "Dynamic Programming", "LeetCode Hard", "Placement"],
    cues: [
      "What is the state transition for 0/1 Knapsack?",
      "How to optimize 2D Knapsack DP space into 1D?",
      "How does Patience Sorting solve LIS in O(N log N) time?"
    ],
    summary: "Recognizing key DP patterns: 0/1 Knapsack, Unbounded Knapsack, Longest Common Subsequence (LCS), Longest Increasing Subsequence (LIS), and Matrix Chain Multiplication.",
    keyTakeaways: [
      "0/1 Knapsack 1D Space DP: dp[w] = max(dp[w], val[i] + dp[w - wt[i]]) iterating backwards.",
      "LCS Relation: if (s1[i] == s2[j]) 1 + dp[i-1][j-1] else max(dp[i-1][j], dp[i][j-1]).",
      "LIS Binary Search: Patience sorting algorithm achieves O(N log N) runtime."
    ],
    content: `### 0/1 Knapsack Pattern
Given items with weights \`wt[]\` and values \`val[]\`, find max value in capacity \`W\`.

#### Space Optimization:
By running the weight loop **backwards** from \`W\` to \`wt[i]\`, we avoid overwriting results from the current item, reducing 2D space \$O(N \\times W)\$ down to 1D \$O(W)\$.`,
    code: `// JavaScript 0/1 Knapsack 1D DP Solution
function knapsack(W, wt, val, n) {
  let dp = new Array(W + 1).fill(0);
  for (let i = 0; i < n; i++) {
    for (let w = W; w >= wt[i]; w--) {
      dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
    }
  }
  return dp[W];
}

const wt = [1, 2, 3];
const val = [10, 15, 40];
console.log("Max Value for Capacity 6:", knapsack(6, wt, val, 3));`,
    testInput: "W = 6",
    expectedOutput: "Max Value for Capacity 6: 65",
    pyqs: [
      {
        question: "Placement Coding Round: What is the optimal time & space complexity for LCS of 2 strings of length N?",
        answer: "Time: O(N^2), Space: O(N) using 2-row rolling DP array."
      }
    ]
  },
  {
    id: "note-7",
    folderId: "math",
    subject: "Math & Linear Algebra",
    title: "Fourier Series & Harmonics Decomposition",
    lastEdited: "4 days ago",
    tags: ["Calculus", "Fourier Analysis", "Signals", "Math"],
    cues: [
      "What are Dirichlet conditions for Fourier series existence?",
      "How are Fourier coefficients a0, an, bn computed?",
      "What is Parseval's Identity?"
    ],
    summary: "Decomposing periodic functions into infinite sums of sines and cosines. Fundamental tool for signal processing, heat equations, and spectral analysis.",
    keyTakeaways: [
      "Fourier Series expansion: f(x) = a0/2 + ∑ [an cos(nwx) + bn sin(nwx)].",
      "Even functions have only cosine terms (bn = 0); Odd functions have only sine terms (an = 0).",
      "Parseval's Theorem states average power equals sum of power of individual harmonics."
    ],
    content: `### Trigonometric Fourier Series
For a periodic function \$f(t)\$ with period \$T\$ and fundamental frequency \$\\omega_0 = 2\\pi / T\$:

$$f(t) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left[ a_n \\cos(n \\omega_0 t) + b_n \\sin(n \\omega_0 t) \\right]$$

#### Coefficients:
- \$a_0 = \\frac{2}{T} \\int_{0}^{T} f(t) dt\$
- \$a_n = \\frac{2}{T} \\int_{0}^{T} f(t) \\cos(n \\omega_0 t) dt\$
- \$b_n = \\frac{2}{T} \\int_{0}^{T} f(t) \\sin(n \\omega_0 t) dt\$`,
    code: `// Approximate Square Wave with Fourier Series (N terms)
function fourierSquareWave(t, terms) {
  let sum = 0;
  for (let n = 1; n <= terms; n += 2) {
    sum += (4 / (n * Math.PI)) * Math.sin(n * t);
  }
  return sum;
}

console.log("Square Wave approx at t=1.0 (5 terms):", fourierSquareWave(1.0, 5).toFixed(4));`,
    testInput: "t=1.0",
    expectedOutput: "Square Wave approx at t=1.0 (5 terms): 0.9416",
    pyqs: []
  },
  {
    id: "note-8",
    folderId: "physics",
    subject: "Physics & Engineering",
    title: "Schrödinger Equation & Quantum Particle in a Box",
    lastEdited: "5 days ago",
    tags: ["Quantum Physics", "Schrödinger", "Wavefunction"],
    cues: [
      "What is the time-independent Schrödinger Equation?",
      "Why are energy levels quantized in an infinite potential well?",
      "What is Born's interpretation of |Ψ|^2?"
    ],
    summary: "Introduction to quantum mechanics, wave-particle duality, boundary conditions, and spatial quantization in a 1D infinite square potential well.",
    keyTakeaways: [
      "Time-Independent Schrödinger Equation: - (ħ² / 2m) (d²Ψ / dx²) + V(x) Ψ = E Ψ.",
      "Quantized Energy Levels in 1D Box: En = (n² h²) / (8 m L²).",
      "Ground state energy (n=1) is strictly non-zero due to Heisenberg Uncertainty Principle."
    ],
    content: `### 1D Infinite Potential Well
For a particle trapped in a box of width \$L\$ where \$V(x) = 0\$ for \$0 \\le x \\le L\$ and \$V(x) = \\infty\$ elsewhere:

#### Wavefunction:
$$\\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n \\pi x}{L}\\right)$$

#### Quantized Energy:
$$E_n = \\frac{n^2 h^2}{8 m L^2} \\quad (n = 1, 2, 3, \\dots)$$`,
    code: `// Quantum Box Energy Level Calculator (in Joules)
const h = 6.62607015e-34;
const m_e = 9.1093837e-31; // electron mass

function particleInBoxEnergy(n, L) {
  return (n * n * h * h) / (8 * m_e * L * L);
}

console.log("Electron Energy (n=1, L=1nm) in eV:", (particleInBoxEnergy(1, 1e-9) / 1.602e-19).toFixed(3));`,
    testInput: "n=1, L=1nm",
    expectedOutput: "Electron Energy (n=1, L=1nm) in eV: 0.376",
    pyqs: []
  }
];
