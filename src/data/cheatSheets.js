export const CHEAT_SHEET_DATA = [
  {
    category: "Algorithms & Complexity Matrix",
    items: [
      { name: "Dijkstra Shortest Path", formula: "O((V + E) log V) with Min-Heap | Fails on negative edges" },
      { name: "Bellman-Ford Algorithm", formula: "O(V · E) | Handles negative edges & detects negative cycles" },
      { name: "Merge Sort vs Quick Sort", formula: "Merge: O(N log N) stable | Quick: O(N log N) avg, O(N²) worst" },
      { name: "0/1 Knapsack DP", formula: "dp[w] = max(dp[w], val[i] + dp[w - wt[i]]) iterating backwards" }
    ]
  },
  {
    category: "Math & Linear Algebra Matrix",
    items: [
      { name: "Characteristic Equation", formula: "det(A - λI) = 0  => Solve for eigenvalues λ" },
      { name: "Trace & Eigenvalues", formula: "Trace(A) = ∑ λi  (Sum of main diagonal elements)" },
      { name: "Determinant & Eigenvalues", formula: "det(A) = ∏ λi  (Product of all eigenvalues)" },
      { name: "Diagonalizability Rule", formula: "A is diagonalizable iff A has n linearly independent eigenvectors" }
    ]
  },
  {
    category: "Physics & Electromagnetism Formulas",
    items: [
      { name: "Gauss's Law (Electricity)", formula: "∇ · E = ρ / ε0  (Charge creates electric field)" },
      { name: "Gauss's Law (Magnetism)", formula: "∇ · B = 0  (No magnetic monopoles exist)" },
      { name: "Faraday's Law of Induction", formula: "∇ × E = -∂B / ∂t  (Changing B field creates E field)" },
      { name: "Speed of Light in Vacuum", formula: "c = 1 / √(μ0 · ε0) ≈ 2.998 × 10⁸ m/s" }
    ]
  },
  {
    category: "Organic Chemistry Mechanisms",
    items: [
      { name: "SN1 Mechanism", formula: "2-Step | Rate = k[Substrate] | 3° > 2° | Carbocation intermediate | Racemic" },
      { name: "SN2 Mechanism", formula: "1-Step | Rate = k[Substrate][Nuc] | 1° > 2° | Walden Inversion" },
      { name: "Solvent Effect", formula: "Polar Protic favors SN1 | Polar Aprotic favors SN2" }
    ]
  },
  {
    category: "OS & Memory Management Formulas",
    items: [
      { name: "Effective Access Time (TLB)", formula: "EAT = h · (t_TLB + t_mem) + (1 - h) · (t_TLB + 2 · t_mem)" },
      { name: "Page Table Size Formula", formula: "Size = (Virtual Address Space / Page Size) × Entry Size" },
      { name: "Belady's Anomaly Rule", formula: "Occurs ONLY in FIFO page replacement algorithm" }
    ]
  }
];
