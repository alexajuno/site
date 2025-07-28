---
slug: building-simple-full-text-search
title: "Building a Simple Full-Text Search Feature"
date: "2025-07-28T00:10:57+07:00"
category: "Tech"
tags: ["Full-Text Search", "Typesense", "Search Engine", "Software Development", "UX"]
excerpt: "A deep dive into building a full-text search feature, covering search engine selection, multi-tenancy, deployment decisions, and the UX challenges that doubled the development timeline."
---

# Building a Simple Yet Scalable Full-Text Search Feature

Recently, I built a simple full-text search feature for an app, and I thought it might be fun to share some of the challenges, decisions, and insights along the way.

The first major decision was choosing the right search engine. There were several good options: Elasticsearch, Typesense, Algolia, and MeiliSearch. Given the simplicity of our initial needs, our desire for self-hosting, and the expectation of future scalability and additional features, Typesense emerged as the clear winner.

Typesense's concepts are similar to MongoDB, involving ideas like clusters, collections, and documents. It supports multiple search types, including multi-search in union or federated modes, as well as single-collection search. Initially, I envisioned users selecting multiple collections at once, alternating between federated search for specific collections and union search for the 'All' mode. However, I quickly discovered this approach was cumbersome from a user experience perspective—selecting and deselecting multiple categories felt clunky. Ultimately, simplicity won out, and I streamlined the system to allow searching one category at a time, primarily utilizing the union mode.

Another critical aspect was multi-tenancy. Since the app serves multiple tenants, we needed robust isolation. Typesense addressed this through scoped API keys, which enabled granular access control per user. While the details can be quite technical, this capability was essential and valuable for our implementation.

Regarding deployment, although cloud services generally provide convenience and reliability, for this relatively new and optional feature, we chose self-hosting. Our setup is intentionally simple compared to Typesense's extensive deployment guidelines. As long as we manage our hosting responsibly, this approach shouldn't introduce major issues.

The search history feature presented an interesting dilemma. Initially, I considered using a longer debounce period (600ms–1s) to trigger search execution and history recording. However, this method was problematic—choosing the correct debounce timing was challenging, and it often resulted in unwanted history entries, especially in no-result scenarios. Ultimately, I opted for a simpler solution: saving search history only when users explicitly select a result.

Building this feature for a production application was enlightening. I learned firsthand that building the core functionality is just the beginning. Significant refinement, particularly in UX and UI, doubled the initially estimated timeline—from two weeks to nearly a month.

At the time of writing, the feature has yet to be deployed, so some unexpected challenges might still arise. Nonetheless, I hope this glimpse into the practical realities of implementing full-text search has provided insights beyond the documentation.
