# Revival Readiness v0.1

`Revival Readiness` answers a narrower question than nostalgia or historical importance:

> If the underlying product idea were rebuilt today with a clean-room implementation, does a credible modern product path exist?

It is intentionally **not a 0–100 score**. The evidence is too heterogeneous for decimal precision, and a single number hides blocking constraints.

## Output

Each researched artifact receives:

- **Readiness**: `HIGH`, `MIXED`, `LOW`, `BLOCKED`, or `UNRATED`
- **Confidence**: `HIGH`, `MEDIUM`, or `LOW`
- six explanatory dimensions
- a short thesis
- an optional key constraint

Confidence describes confidence in the assessment, not the attractiveness of the product.

## Readiness bands

### HIGH
A credible clean-room modern product path exists. Demand is still meaningful, reconstruction is feasible, and no unresolved structural blocker dominates the concept. HIGH is not a prediction of commercial success.

### MIXED
A credible path exists only after changing the original product boundary, business model, distribution assumption, or rights exposure. At least one major old constraint remains relevant.

### LOW
The need may still exist, but the original concept depends heavily on network effects, privileged distribution, external infrastructure, or a weak AI/technology advantage. A rebuild is possible but is not currently a strong revival candidate.

### BLOCKED
The concept's core value cannot presently be reproduced in a clean-room, rights-safe, technically credible form without resolving a hard external constraint. This status should be used sparingly.

### UNRATED
Research is not mature enough to make the judgment.

## Six dimensions

All dimensions use `STRONG / MIXED / WEAK / UNKNOWN`, where STRONG is favorable to a modern revival.

1. **需求仍存在 / Demand** — Is the underlying user need still meaningful?
2. **原始约束已改变 / Constraint Shift** — Have the old technical, economic, or distribution constraints materially improved?
3. **AI 杠杆 / AI Leverage** — Does AI create a real product advantage rather than a decorative feature?
4. **重建可行性 / Buildability** — Can a useful MVP be built without reproducing the original company's full infrastructure?
5. **权利安全 / Rights Safety** — Can the valuable idea be reconstructed without relying on protected assets, unauthorized content, or unsafe data use?
6. **网络独立性 / Network Independence** — Can the product create value before a large social/content network already exists?

## Decision rule

The overall band is a research judgment, not a mechanical average.

A single weak dimension can dominate when it represents a true blocker. For example, strong AI leverage does not cancel music licensing costs, and easy frontend implementation does not cancel a missing social graph.

Group Revival does **not** average individual Readiness values. Combining artifacts can create new complementary value or simply stack their constraints.

## v0.1 main-river assessments

| Artifact | Readiness | Confidence | Core reason |
| --- | --- | --- | --- |
| 校内网 | MIXED | MEDIUM | Campus identity remains useful; network cold-start remains hard |
| VeryCD | MIXED | MEDIUM | Discovery is revivable; unauthorized download model is not |
| 千千静听 | HIGH | MEDIUM | Local-first media management gains real AI leverage without owning a catalog |
| 射手网 | MIXED | MEDIUM | AI subtitle tooling is strong; public subtitle distribution has rights constraints |
| 百度空间 | HIGH | MEDIUM | Personal digital memory is valuable and can be local-first / portable |
| 网易博客 | HIGH | MEDIUM | Long-form personal publishing is viable when portable and AI-searchable |
| 腾讯微博 | LOW | MEDIUM | Network effects dominate; AI does not create a sufficient migration reason |
| 虾米音乐 | MIXED | HIGH | Discovery layer is strong; catalog licensing remains structural |
| 飞信 | LOW | MEDIUM | Distinctive value depends on carrier/platform interoperability |
| 天涯社区 | MIXED | HIGH | Archive revival is strong; live community revival still depends on governance and network effects |

## Calibration policy

This rubric should change when evidence changes. Before promoting v0.1 into a more formal scoring system, the project should test it against additional artifacts outside the current main river, especially:

- products with very low rights risk but weak demand,
- products with strong demand but severe network effects,
- products with strong AI leverage but high regulatory or licensing dependence,
- products that never died and therefore act as counterfactual controls.

The goal is not to make every artifact look revivable. A useful system must be willing to return LOW or BLOCKED.
