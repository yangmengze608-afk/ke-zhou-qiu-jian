# 声藏 / SHENGCANG — MVP v0.1

> Historical note: v0.1 established the real local-file loop. The active semantic experiment is documented in `shengcang-mvp-v02.md`.

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

## What v0.1 proved

The browser prototype can:

- import a user-selected local audio folder;
- build an in-session index from file names and relative paths;
- search that index;
- show why a row matched;
- play the selected local file using a browser object URL;
- discard the session when the page is closed.

No audio is intentionally uploaded by the prototype.

## What happened next

v0.1 explicitly left semantic memory search unimplemented rather than faking AI output.

That next experiment now exists in **MVP v0.2**:

- keyword/path retrieval remains the baseline;
- multilingual text embeddings run in the browser after an opt-in model download;
- semantic ranking is evaluated only on local textual metadata/path context;
- audio-content understanding is still out of scope.

See `docs/revival/shengcang-mvp-v02.md` for the current implementation and go/no-go criteria.
