export const INITIAL_FLASHCARDS = [
  {
    id: "fc-os-1",
    subject: "OS & Database Systems",
    title: "Introduction to Processes",
    content: `# Introduction to Processes

A process is a program in execution. It is the core unit of work in a modern operating system.

## Key Components of a Process
- **Text Section**: Executable code instructions
- **Data Section**: Global and static variables
- **Heap**: Dynamically allocated memory during runtime
- **Stack**: Temporary data storage (function parameters, return addresses, local variables)

## Process vs Program
- A **program** is a passive entity (a file containing instructions stored on disk).
- A **process** is an active entity, with a program counter specifying the next instruction to execute.

\`\`\`c
// C example of process creation
#include <stdio.h>
#include <unistd.h>

int main() {
    printf("Process ID: %d\\n", getpid());
    return 0;
}
\`\`\``,
    lastEdited: "Just now"
  },
  {
    id: "fc-os-2",
    subject: "OS & Database Systems",
    title: "Process States",
    content: `# Process States

As a process executes, it changes state depending on its current execution phase.

## Standard Lifecycle States
1. **New**: The process is being created.
2. **Ready**: The process is waiting to be assigned to a processor core.
3. **Running**: Instructions are actively executing on the CPU.
4. **Waiting / Blocked**: The process is waiting for an I/O event or signal.
5. **Terminated**: The process has finished execution and released its resources.

\`\`\`
  [New] ---> [Ready] <=======> [Running] ---> [Terminated]
               ^                  |
               |--- [Waiting] <---|
\`\`\``,
    lastEdited: "Just now"
  },
  {
    id: "fc-os-3",
    subject: "OS & Database Systems",
    title: "Process Control Block",
    content: `# Process Control Block

A Process Control Block (PCB) stores information about a process that the operating system needs to manage it.

## Important Fields

- Process ID (PID)
- Process State (Ready, Running, Waiting)
- Program Counter (PC)
- CPU Registers
- CPU Scheduling Information
- Memory-Management Information

## Example Structure

\`\`\`java
class ProcessControlBlock {
    int processId;
    String state;
    int programCounter;
    int priority;
    long memoryLimit;

    public void updateState(String newState) {
        this.state = newState;
    }
}
\`\`\``,
    lastEdited: "Just now"
  },
  {
    id: "fc-os-4",
    subject: "OS & Database Systems",
    title: "Context Switching",
    content: `# Context Switching

Switching the CPU to another process requires performing a state save of the current process and a state restore of a different process.

## Context Switch Overhead
- When a context switch occurs, the kernel saves the context of the old process in its PCB and loads the saved context of the new process.
- Context-switch time is pure overhead because the system does no useful work while switching.

\`\`\`c
void context_switch(struct pcb *prev, struct pcb *next) {
    save_cpu_registers(prev);
    prev->state = READY;
    
    load_cpu_registers(next);
    next->state = RUNNING;
}
\`\`\``,
    lastEdited: "Just now"
  },
  {
    id: "fc-os-5",
    subject: "OS & Database Systems",
    title: "System Calls",
    content: `# System Calls

System calls provide an interface between a running process and the operating system kernel.

## Categories of System Calls
- **Process Control**: \`fork()\`, \`exec()\`, \`exit()\`
- **File Management**: \`open()\`, \`read()\`, \`write()\`, \`close()\`
- **Device Management**: \`ioctl()\`, \`read()\`, \`write()\`
- **Information Maintenance**: \`getpid()\`, \`alarm()\`
- **Communication**: \`pipe()\`, \`shmget()\`, \`mmap()\`

## C Example

\`\`\`c
#include <unistd.h>
#include <fcntl.h>

int main() {
    int fd = open("log.txt", O_WRONLY | O_CREAT, 0644);
    write(fd, "System Call Execution\\n", 22);
    close(fd);
    return 0;
}
\`\`\``,
    lastEdited: "Just now"
  },
  {
    id: "fc-os-6",
    subject: "OS & Database Systems",
    title: "User Mode vs Kernel Mode",
    content: `# User Mode vs Kernel Mode

Modern operating systems execute in dual mode to protect the kernel and other processes from malfunctioning user applications.

## Key Differences

| Feature | User Mode | Kernel Mode |
|---|---|---|
| Privilege | Unprivileged | Privileged (Ring 0) |
| Hardware Access | Restricted | Direct & Unrestricted |
| Mode Bit | 1 | 0 |
| Instructions | Non-privilege only | Full CPU Instruction Set |

## Mode Switching
- A process switches from User Mode to Kernel Mode via hardware trap, interrupt, or system call execution.`,
    lastEdited: "Just now"
  },
  {
    id: "fc-alg-1",
    subject: "CS & Algorithms",
    title: "Graph Shortest Paths: Dijkstra vs Bellman-Ford",
    content: `# Graph Shortest Paths: Dijkstra vs Bellman-Ford

What is Dijkstra's Algorithm complexity and why does it fail on negative edge weights?

Dijkstra runs in $O((V + E) \\log V)$ using a Min-Heap binary priority queue. It fails on negative edge weights because once a vertex is selected greedily, its distance is finalized and cannot be updated even if a cheaper negative-weight path is discovered later.

## Bellman-Ford Algorithm Implementation

\`\`\`javascript
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
\`\`\``,
    lastEdited: "Just now"
  },
  {
    id: "fc-math-1",
    subject: "Math & Linear Algebra",
    title: "Eigenvalues, Trace & Matrix Determinant",
    content: `# Eigenvalues, Trace & Matrix Determinant

How do you calculate matrix trace and determinant using its eigenvalues?

The **Sum of all eigenvalues** equals the Matrix Trace:
$$\\sum \\lambda_i = \\text{tr}(A)$$

The **Product of all eigenvalues** equals the Matrix Determinant:
$$\\prod \\lambda_i = \\det(A)$$

Matrix $A$ is invertible if and only if $0$ is not an eigenvalue.

## 2x2 Matrix Eigenvalue Calculation

\`\`\`javascript
function findEigenvalues2x2(a, b, c, d) {
  const trace = a + d;
  const det = (a * d) - (b * c);
  const discriminant = Math.sqrt(trace * trace - 4 * det);
  
  const l1 = (trace + discriminant) / 2;
  const l2 = (trace - discriminant) / 2;
  return [l1, l2];
}
\`\`\``,
    lastEdited: "Just now"
  }
];
