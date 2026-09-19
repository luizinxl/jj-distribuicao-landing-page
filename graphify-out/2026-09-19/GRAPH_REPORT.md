# Graph Report - jj-distribuicao-landing-page  (2026-09-19)

## Corpus Check
- 5 files · ~31,035 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 18 nodes · 17 edges · 5 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- server.js
- getLeads

## God Nodes (most connected - your core abstractions)
1. `getLeads()` - 3 edges
2. `saveLead()` - 3 edges
3. `server` - 3 edges
4. `http` - 1 edges
5. `fs` - 1 edges
6. `path` - 1 edges
7. `url` - 1 edges
8. `LEADS_FILE` - 1 edges
9. `BUSINESS_CONFIG` - 1 edges
10. `MIME_TYPES` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (5 total, 0 thin omitted)

### Community 2 - "server.js"
Cohesion: 0.25
Nodes (7): BUSINESS_CONFIG, fs, http, LEADS_FILE, MIME_TYPES, path, url

### Community 4 - "getLeads"
Cohesion: 1.00
Nodes (3): getLeads(), saveLead(), server

## Knowledge Gaps
- **7 isolated node(s):** `http`, `fs`, `path`, `url`, `LEADS_FILE` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 13 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `http`, `fs`, `path` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._