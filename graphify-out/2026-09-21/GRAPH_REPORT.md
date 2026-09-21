# Graph Report - jj-distribuicao-landing-page  (2026-09-19)

## Corpus Check
- 5 files · ~32,327 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: (none) 1)

## Summary
- 23 nodes · 21 edges · 6 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `885c1fe2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- server.js
- getLeads
- J&J Distribuição - Landing Page & Catálogo Digital

## God Nodes (most connected - your core abstractions)
1. `J&J Distribuição - Landing Page & Catálogo Digital` - 4 edges
2. `getLeads()` - 3 edges
3. `saveLead()` - 3 edges
4. `server` - 3 edges
5. `http` - 1 edges
6. `fs` - 1 edges
7. `path` - 1 edges
8. `url` - 1 edges
9. `LEADS_FILE` - 1 edges
10. `BUSINESS_CONFIG` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (6 total, 0 thin omitted)

### Community 2 - "server.js"
Cohesion: 0.25
Nodes (7): BUSINESS_CONFIG, fs, http, LEADS_FILE, MIME_TYPES, path, url

### Community 4 - "getLeads"
Cohesion: 1.00
Nodes (3): getLeads(), saveLead(), server

### Community 5 - "J&J Distribuição - Landing Page & Catálogo Digital"
Cohesion: 0.40
Nodes (4): 🛠️ Como Executar Localmente, 🚀 Funcionalidades, J&J Distribuição - Landing Page & Catálogo Digital, 💻 Tecnologias

## Knowledge Gaps
- **10 isolated node(s):** `http`, `fs`, `path`, `url`, `LEADS_FILE` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 17 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `http`, `fs`, `path` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._