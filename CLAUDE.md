# Canvas

Shared design system and React component library (`@olympusoss/canvas`) for the Olympus platform.

## Versioning

**Always use `octl bump` to bump versions** — never manually edit version numbers in `package.json`.
`octl bump` handles the full flow: bumps canvas first, waits for npm publish, then updates all downstream repos (athena, hera, site) together.

## Agent System

This repo is part of the [Olympus agent system](../docs/teams/ciam-team.md) — an 18-agent team that operates as a continuous product development loop.

- **Engineer agent**: [`docs/agents/ciam-engineer-canvas.md`](../docs/agents/ciam-engineer-canvas.md)
- **Cross-functional reviewers**: Architect, Security Expert, QA Engineer, DX Expert, Technical Writer
- **Key docs**: [`../docs/`](../docs/) — philosophy, file structure, team definition, dependency map, system status

### Dependencies

- **Consumed by**: athena, hera, site (all UI apps import `@olympus/canvas`)
- **No upstream dependencies** (Canvas is the leaf design-system package)

### Before Making Changes

- Check [`../docs/system-status.md`](../docs/system-status.md) for active work
- Check [`../docs/dependency-map.md`](../docs/dependency-map.md) for cross-repo impact
- Changes to this repo may trigger reviews from Security, QA, and DX agents
