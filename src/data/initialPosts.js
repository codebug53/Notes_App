export const INITIAL_POSTS = [
  {
    id: "post-1",
    title: "Mastering Shortest Path Algorithms: Dijkstra vs Bellman-Ford (GATE CS & SDE Interviews)",
    slug: "shortest-path-dijkstra-bellman-ford",
    category: "GATE CS",
    tags: ["Algorithms", "Graph Theory", "GATE PYQ", "Placement"],
    difficulty: "GATE High-Yield",
    readTime: "7 min read",
    date: "2026-10-02",
    summary: "A deep dive into Single Source Shortest Path (SSSP) algorithms for weighted graphs, handling negative weight cycles, time complexities, and solving classic GATE CS questions.",
    author: "Mahammad Azhar",
    likes: 42,
    bookmarked: true,
    keyFormulas: [
      "Dijkstra (Min-Heap): O((V + E) log V)",
      "Bellman-Ford: O(V · E) time, O(V) space",
      "Negative Weight Edge: Dijkstra FAILS, Bellman-Ford SUCCEEDS",
      "Negative Weight Cycle: Bellman-Ford detects via (V)th relaxation"
    ],
    codeSnippet: `// C++ Implementation of Bellman-Ford Algorithm
#include <iostream>
#include <vector>
using namespace std;

struct Edge {
    int src, dest, weight;
};

bool bellmanFord(int V, int E, int src, vector<Edge>& edges, vector<int>& dist) {
    dist.assign(V, 1e9);
    dist[src] = 0;

    // Relax all edges V - 1 times
    for (int i = 1; i <= V - 1; ++i) {
        for (const auto& edge : edges) {
            if (dist[edge.src] != 1e9 && dist[edge.src] + edge.weight < dist[edge.dest]) {
                dist[edge.dest] = dist[edge.src] + edge.weight;
            }
        }
    }

    // Check for negative-weight cycles
    for (const auto& edge : edges) {
        if (dist[edge.src] != 1e9 && dist[edge.src] + edge.weight < dist[edge.dest]) {
            return false; // Negative cycle detected!
        }
    }
    return true;
}`,
    solvedPYQs: [
      {
        question: "GATE CS 2021: Suppose a directed graph G=(V,E) has negative edge weights, but NO negative edge cycles. Which of the following algorithms can correctly compute shortest paths from source s?",
        options: ["(A) Dijkstra's Algorithm", "(B) Bellman-Ford Algorithm", "(C) BFS", "(D) DFS"],
        correctOption: "(B) Bellman-Ford Algorithm",
        explanation: "Dijkstra algorithm relies on greedy choice and fails when negative edge weights are present. Bellman-Ford correctly handles negative weights as long as there are no negative weight cycles."
      }
    ],
    content: `## Single Source Shortest Path (SSSP) Overview

When solving graph problems in both **GATE CS** and **Product Company Interviews (Amazon, Google, Microsoft)**, shortest path algorithms form a core pillar.

### 1. Dijkstra's Algorithm
Dijkstra's algorithm works using a **greedy choice property**. At each step, it selects the unvisited vertex with the minimum distance metric.

> **Crucial Pitfall**: Dijkstra DOES NOT work with negative weight edges! Why? Because once a node is marked visited, Dijkstra assumes its shortest path is finalized. A negative edge encountered later could yield a shorter path, violating the greedy assumption.

#### Time & Space Complexity Matrix
- **Array implementation**: O(V²) time
- **Binary Heap (Min-Priority Queue)**: O((V + E) log V) time
- **Fibonacci Heap**: O(E + V log V) time

---

### 2. Bellman-Ford Algorithm
Bellman-Ford uses **Dynamic Programming** principles. It relaxes all $E$ edges $V - 1$ times.

Why $V - 1$ times? Because a simple shortest path in a graph with $V$ vertices can contain at most $V - 1$ edges.

If we perform a $V$-th relaxation and any distance still decreases, it proves the existence of a **negative weight cycle**.

---

### GATE Quick Checklist:
1. All positive weights $\\rightarrow$ **Dijkstra** (Fastest)
2. Negative weights without negative cycles $\\rightarrow$ **Bellman-Ford**
3. DAG (Directed Acyclic Graph) $\\rightarrow$ **Topological Sort + Relaxation** in **O(V + E)**
4. All-Pairs Shortest Path $\\rightarrow$ **Floyd-Warshall** in **O(V³)**`
  },
  {
    id: "post-2",
    title: "System Design & DBMS: ACID Properties & Lock-Based Concurrency Control",
    slug: "dbms-acid-properties-lock-concurrency",
    category: "DBMS & Placement",
    tags: ["DBMS", "System Design", "Transactions", "Placement"],
    difficulty: "Placement Must-Read",
    readTime: "6 min read",
    date: "2026-10-01",
    summary: "Demystifying Atomicity, Consistency, Isolation, and Durability alongside 2PL (Two-Phase Locking), Strict 2PL, and Rigorous 2PL protocols for GATE & SDE interviews.",
    author: "Mahammad Azhar",
    likes: 38,
    bookmarked: false,
    keyFormulas: [
      "Atomicity: All or Nothing (Handled by Transaction Manager & Log)",
      "Consistency: Database transitions from one valid state to another",
      "Isolation: Concurrent execution yields same state as serial execution",
      "Durability: Committed transactions persist even during power/system crash"
    ],
    codeSnippet: `-- SQL Transaction Example with Isolation Level
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN TRANSACTION;

UPDATE accounts 
SET balance = balance - 5000 
WHERE account_id = 101;

UPDATE accounts 
SET balance = balance + 5000 
WHERE account_id = 102;

COMMIT;`,
    solvedPYQs: [
      {
        question: "GATE CS 2019: Which two-phase locking (2PL) protocol guarantees freedom from cascading aborts (cascading rollbacks)?",
        options: ["(A) Basic 2PL", "(B) Strict 2PL", "(C) Conservative 2PL", "(D) Shared 2PL"],
        correctOption: "(B) Strict 2PL",
        explanation: "Strict 2PL requires that all Exclusive (X) locks held by a transaction must be released ONLY after the transaction commits or aborts. This prevents dirty reads and eliminates cascading rollbacks."
      }
    ],
    content: `## ACID Properties Demystified

For both **GATE DBMS section** and **System Design / Backend Placement Interviews**, understanding database transactions is non-negotiable.

### Isolation Anomalies
When multiple transactions execute concurrently without proper isolation, the following anomalies occur:

1. **Dirty Read (W-R Conflict)**: Transaction T2 reads uncommitted data modified by T1. If T1 aborts, T2 read invalid data.
2. **Unrepeatable Read (R-W Conflict)**: Transaction T1 reads a value, T2 updates that value and commits, T1 reads again and sees a different value.
3. **Phantom Read**: Transaction T1 reads a set of rows matching a condition. T2 inserts new matching rows and commits. T1 re-executes and sees "phantom" rows.

---

### Two-Phase Locking (2PL) Protocols

#### 1. Basic 2PL
- **Growing Phase**: Locks are acquired, none can be released.
- **Shrinking Phase**: Locks are released, none can be acquired.
- *Guarantees*: Serializability.
- *Does NOT prevent*: Deadlocks or Cascading Aborts!

#### 2. Strict 2PL
- All **Exclusive (X) locks** are held until transaction commits/aborts.
- *Guarantees*: Serializability + **Cascade-less Recovery**.

#### 3. Rigorous 2PL
- ALL locks (both Shared S and Exclusive X) are held until transaction commits/aborts.`
  },
  {
    id: "post-3",
    title: "OS Memory Management: Page Replacement Algorithms & Belady's Anomaly",
    slug: "os-page-replacement-beladys-anomaly",
    category: "Operating Systems",
    tags: ["Operating Systems", "Virtual Memory", "GATE PYQ"],
    difficulty: "GATE High-Yield",
    readTime: "8 min read",
    date: "2026-09-28",
    summary: "Comparative analysis of FIFO, LRU, and Optimal Page Replacement with mathematical proofs of Belady's Anomaly and page fault calculation shortcuts.",
    author: "Mahammad Azhar",
    likes: 55,
    bookmarked: true,
    keyFormulas: [
      "Effective Access Time (EAT) = (1 - p) · m + p · (Page Fault Service Time)",
      "Belady's Anomaly: Increasing frame size INCREASES page faults (FIFO only!)",
      "Stack Algorithms (LRU, OPT): NEVER exhibit Belady's Anomaly"
    ],
    codeSnippet: `// Python simulation of LRU Page Replacement
def lru_page_faults(pages, capacity):
    memory = []
    page_faults = 0

    for page in pages:
        if page not in memory:
            if len(memory) == capacity:
                memory.pop(0) # Evict least recently used
            memory.append(page)
            page_faults += 1
        else:
            # Move visited page to the end (most recent)
            memory.remove(page)
            memory.append(page)

    return page_faults

print("LRU Page Faults:", lru_page_faults([7, 0, 1, 2, 0, 3, 0, 4, 2, 3], 3))`,
    solvedPYQs: [
      {
        question: "GATE CS 2017: Which of the following page replacement algorithms suffers from Belady's Anomaly?",
        options: ["(A) Optimal Page Replacement", "(B) LRU (Least Recently Used)", "(C) FIFO (First In First Out)", "(D) LFU (Least Frequently Used)"],
        correctOption: "(C) FIFO (First In First Out)",
        explanation: "FIFO does not satisfy the Stack Property. Increasing the number of allocation frames can sometimes lead to more page faults for specific reference strings."
      }
    ],
    content: `## Virtual Memory & Page Replacement

Memory management is one of the most scoring units in **GATE CS**.

### Key Page Replacement Algorithms

1. **FIFO (First In First Out)**:
   - Replaces the oldest page loaded in memory.
   - Simple queue data structure.
   - **Warning**: Prone to Belady's Anomaly!

2. **LRU (Least Recently Used)**:
   - Replaces the page that has not been accessed for the longest time.
   - Approximates Optimal algorithm.
   - Implemented using Doubly Linked List + Hash Map (O(1) lookup).

3. **Optimal (OPT / Belady's Min)**:
   - Replaces the page that will NOT be used for the longest duration in the future.
   - Benchmark algorithm (Impractical in real OS as future is unknown).`
  },
  {
    id: "post-4",
    title: "Dynamic Programming Top 7 Interview Patterns (0/1 Knapsack, LIS, LCS, Matrix Chain)",
    slug: "dp-top-7-interview-patterns",
    category: "Placement / DSA",
    tags: ["DSA", "Dynamic Programming", "LeetCode", "Placement"],
    difficulty: "Placement Must-Read",
    readTime: "10 min read",
    date: "2026-09-25",
    summary: "Recognizing state transitions, base cases, space optimization tricks from O(N²) to O(N) for top tech company interview coding rounds.",
    author: "Mahammad Azhar",
    likes: 64,
    bookmarked: true,
    keyFormulas: [
      "0/1 Knapsack: dp[i][w] = max(dp[i-1][w], val[i-1] + dp[i-1][w-wt[i-1]])",
      "LCS: if s1[i]==s2[j] -> 1 + dp[i-1][j-1] else max(dp[i-1][j], dp[i][j-1])",
      "LIS: dp[i] = max(dp[i], 1 + dp[j]) for j < i and arr[j] < arr[i]"
    ],
    codeSnippet: `// 0/1 Knapsack Space Optimized O(W) Space Solution in C++
#include <vector>
#include <iostream>
using namespace std;

int knapsack01(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);

    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) { // Reverse loop for 0/1
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
    solvedPYQs: [],
    content: `## Why Dynamic Programming Scares Candidates (And How to Master It)

Dynamic Programming is the #1 filter topic in **Placement Coding Tests (Amazon, Microsoft, Flipkart, Swiggy, Uber)**.

### Top 7 Patterns You Must Know:

1. **0/1 Knapsack**: Partition Equal Subset Sum, Target Sum.
2. **Unbounded Knapsack**: Coin Change 1 & 2, Rod Cutting.
3. **Longest Common Subsequence (LCS)**: Edit Distance, Shortest Common Supersequence.
4. **Longest Increasing Subsequence (LIS)**: Russian Doll Envelopes, Longest String Chain.
5. **Palindromic Substring DP**: Longest Palindromic Subsequence, Palindrome Partitioning.
6. **DP on Trees**: Diameter of Tree, Maximum Path Sum.
7. **Matrix Chain Multiplication (MCM)**: Burst Balloons, Boolean Parenthesization.`
  },
  {
    id: "post-5",
    title: "Theory of Computation: Pumping Lemma Proof Techniques & Decision Properties",
    slug: "toc-pumping-lemma-decision-properties",
    category: "GATE CS",
    tags: ["TOC", "Automata", "GATE PYQ"],
    difficulty: "GATE High-Yield",
    readTime: "6 min read",
    date: "2026-09-20",
    summary: "Step-by-step methodology for proving non-regularity of languages using Pumping Lemma, along with closure & decision property summary tables.",
    author: "Mahammad Azhar",
    likes: 31,
    bookmarked: false,
    keyFormulas: [
      "Pumping Lemma: w = xyz, |xy| <= p, |y| >= 1, xy^i z in L for all i >= 0",
      "Regular Languages are closed under: Union, Intersect, Complement, Concatenation, Kleene Star",
      "Regular Languages Decision Properties: Emptiness (Decidable), Finiteness (Decidable), Equivalence (Decidable)"
    ],
    codeSnippet: `/* Pumping Lemma Proof Structure Template for L = { a^n b^n | n >= 0 }
1. Assume L is Regular. Let p be the pumping length.
2. Choose string w = a^p b^p in L, with length |w| = 2p >= p.
3. By Pumping Lemma, w can be split as w = xyz such that:
   - |xy| <= p  => xy consists ONLY of 'a's!
   - |y| >= 1   => y contains at least one 'a' (say y = a^k, k >= 1).
4. Pump for i = 2: xy^2 z = a^(p+k) b^p.
5. Since p+k != p, xy^2 z is NOT in L!
6. Contradiction! Hence, L is NOT Regular. Q.E.D. */`,
    solvedPYQs: [],
    content: `## TOC: Mastering Regular Languages & Automata

In GATE CS, Theory of Computation yields **100% predictable marks** if your concepts on Regular & Context-Free languages are clear.

### Summary Matrix of Closure Properties

| Property | Regular | CFL | DCFL | CSL | Recursive | RE |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Union | Yes | Yes | No | Yes | Yes | Yes |
| Intersection | Yes | No | No | Yes | Yes | Yes |
| Complement | Yes | No | Yes | Yes | Yes | No |
| Kleene Star | Yes | Yes | No | Yes | Yes | Yes |`
  }
];
