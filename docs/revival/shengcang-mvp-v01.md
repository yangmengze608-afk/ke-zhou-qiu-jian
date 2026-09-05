# 声藏 / SHENGCANG — MVP v0.1

## Product decision

Do not revive 千千静听 as another streaming player.

Revive one durable job:

> I remember the period, place, weather, or feeling — but I forgot the song name.

The product thesis is a **local-first personal music memory layer** over files the user already owns.

## One core loop

1. Connect a local music folder.
2. Search the private library.
3. Explain why a result matched.
4. Play the local file immediately.

Everything else is subordinate to this loop.

## Cut from the previous concept

- Taste Graph as a standalone surface — cut from MVP.
- Separate Sonic Similarity mode — cut from MVP; may become a ranking signal later.
- Repair Queue as a first-class destination — cut from MVP; metadata repair becomes infrastructure.
- Fake 24k-track library and fake playback — removed from the functional proof.
- Commercial catalog, licensing battle, social graph — explicitly out of scope.

## What is actually functional in v0.1

The browser prototype can:

- import a user-selected local audio folder;
- build an in-session index from file names and relative paths;
- search that index;
- show why a row matched;
- play the selected local file using a browser object URL;
- discard the session when the page is closed.

No audio is intentionally uploaded by the prototype.

## What is deliberately NOT claimed yet

Semantic memory search is not implemented yet.

The current retrieval layer is lexical/path-based. The UI labels that limitation directly rather than presenting fake AI output.

The next technical experiment should add a local semantic layer and test whether it materially improves retrieval over ordinary file search.

## Validation gates

Before building a desktop app, test these gates:

1. **Import friction** — can a new user reach the first playable result in under 60 seconds?
2. **Private-library willingness** — will users actually select a real folder rather than only view sample data?
3. **Retrieval delta** — does a semantic layer recover songs users fail to find with filename/path search?
4. **Trust** — do users understand why a result matched and where their audio data stays?
5. **Repeat value** — after the novelty wears off, is the search useful often enough to justify a dedicated app?

If semantic retrieval does not create clear value above Finder/Explorer/standard player search, the Revival thesis should be downgraded rather than protected by nostalgia.

## Next build only if gates hold

- local metadata parser;
- local embeddings for titles/tags/folder context;
- optional local audio embeddings;
- persistent local index;
- desktop packaging;
- metadata repair as background infrastructure, not a separate product center.
