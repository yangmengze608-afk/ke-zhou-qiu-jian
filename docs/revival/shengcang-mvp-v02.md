# 声藏 / SHENGCANG — MVP v0.2

## What changed from v0.1

v0.1 proved the real local-file loop:

> choose folder → keyword search → explain → play.

v0.2 adds the first real AI experiment without changing the product boundary:

> **keyword baseline vs in-browser multilingual semantic retrieval.**

The semantic layer is opt-in. The prototype does not pretend the model understands the audio itself.

## Semantic implementation

- Runtime: Transformers.js loaded in the browser.
- Model: `Xenova/multilingual-e5-small`.
- Model format: ONNX / q8.
- Retrieval input: title, parsed artist, local relative path, inferred year and source label.
- Retrieval output: normalized local embeddings + dot-product similarity.
- Ranking: semantic similarity with a small lexical bonus when direct keyword evidence also exists.
- Index cap for the browser experiment: first 300 tracks.
- Batch size: 12 tracks.

Official implementation references:

- https://huggingface.co/docs/transformers.js/
- https://huggingface.co/Xenova/multilingual-e5-small

The q8 ONNX weights are roughly 118 MB; tokenizer/model support files add additional first-run bandwidth. Assets are fetched on first opt-in and may be cached by the browser.

## Privacy boundary

Audio files are not intentionally uploaded for semantic indexing.

The local model receives only the text representation derived from the user-selected files:

- file name / parsed title;
- parsed artist when present in the filename;
- relative folder path;
- year tokens inferred from the path;
- source/folder label.

The browser still creates object URLs only for local playback.

Important nuance: enabling the semantic layer requires downloading model assets from external hosts. This is **local inference after model download**, not an air-gapped offline build.

## What v0.2 can and cannot test

### It can test

Whether multilingual semantic embeddings recover useful local tracks that ordinary filename/path search misses.

Examples of potentially useful queries:

- `高中那几年下雨天听的女声`
- `2017 左右很久没听的歌`
- `夜路上比较安静的 Dream Pop`

This only works when the local text metadata/path contains enough latent clues for the embedding model to connect the query with the track representation.

### It cannot test yet

- mood inferred from raw audio;
- tempo / timbre / vocal characteristics extracted from waveform;
- listening-history memory unless those signals are explicitly imported;
- full ID3/FLAC metadata parsing;
- durable local indexing across sessions.

Therefore a successful semantic result is evidence for **metadata-semantic retrieval**, not evidence that Shengcang already understands music.

## Retrieval evaluation protocol

For each real test folder, write 10 memory-style queries before searching.

For each query record:

1. target track(s) the tester expected;
2. keyword baseline rank or MISS;
3. semantic rank or MISS;
4. whether the semantic result is genuinely useful, not merely plausible;
5. whether the explanation helps the tester trust the result.

Primary metric for this stage:

> **Semantic Rescue Rate** = proportion of queries where semantic retrieval returns a genuinely useful target in top 5 while keyword baseline misses top 5.

Secondary metrics:

- top-5 precision judged by the tester;
- time to first useful result;
- number of false-but-plausible semantic matches;
- first-run model/index latency;
- willingness to enable the model again.

## Go / no-go gate

Continue toward audio understanding only if semantic metadata retrieval creates repeated rescue cases on real libraries.

A practical gate for the prototype:

- at least 3 / 10 queries are semantic rescues;
- false-plausible matches do not dominate the top 5;
- users understand that similarity is not a probability;
- first-run cost is acceptable after caching.

If the rescue rate is weak, do not add a heavier audio model just to protect the concept. Reconsider the product thesis first.

## Next build only if v0.2 passes

1. Parse real embedded metadata locally.
2. Persist the local index with IndexedDB.
3. Add optional listening-history signals.
4. Run a separate experiment for local audio embeddings / acoustic tags.
5. Package as a desktop app only after retrieval value is demonstrated.
