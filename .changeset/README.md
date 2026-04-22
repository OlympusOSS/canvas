# Changesets

This folder is managed by [changesets](https://github.com/changesets/changesets).

Every user-facing change (new component, API change, bug fix, breaking change)
should include a changeset. When merged to `main`, the release workflow opens
a "Version Packages" PR that consolidates changesets into a version bump +
CHANGELOG entry + publish.

## Creating a changeset

```sh
bun changeset
```

The CLI prompts you for:

1. Which packages changed (just Canvas for this repo).
2. Semver bump (patch / minor / major).
3. A short description — this becomes the CHANGELOG line.

Commit the generated `.md` file alongside your code change.

## Semver guidelines

- **patch**: bug fixes, internal refactors, doc updates.
- **minor**: new components, new props, new exports. No breaking changes.
- **major**: removed/renamed exports, changed required prop types, deprecation
  removals.

Deprecated components stay in the public API for one full major before being
removed. Flag with JSDoc `@deprecated` and link to the replacement.
