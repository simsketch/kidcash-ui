# Roadmap

> Living document. Last updated as of `v0.1.x`.

## Where we are

`@kidcash/ui` is in **early access** (`0.1.x`). The catalog of 27 components is stable in shape but APIs may shift before `1.0`. Pin exact versions.

The kit covers the surfaces we've already shipped to production at [KidCash](https://www.kidcashapp.com), so the bar is "this is what we use," not "this is everything someone might want."

## Near-term (`0.1.x` → `0.2.0`)

- **API stabilization.** Audit every component's prop surface for naming consistency. Likely renames: `loading` vs `isLoading`, `onClose` vs `onDismiss`, etc. Done in one batch with a CHANGELOG migration note.
- **Accessibility pass.** Audit focus management on overlays (Modal, Sheet, CommandPalette, EmojiPicker), keyboard navigation in CommandPalette, screen-reader labels everywhere a colored gradient stands in for text. Likely the biggest individual lift on the path to 1.0.
- **Storybook or component playground sandboxing.** Each component already has a live preview at `kit.kidcashapp.com/components/<slug>`; v0.2 adds an embedded prop editor so visitors can flip props live without forking the repo.

## Medium-term (`0.2.x` → `1.0.0`)

- **Theming docs and a "build your own theme" walkthrough.** The 9 included themes are a starting point; the public API is the CSS-variable contract. Document it.
- **Bundle-size audit.** Goal: each individual import paths to <10kb gzipped after tree-shaking. Currently the package imports cleanly but the bundle could probably shed ~30kb through better module boundaries.
- **Animation primitives extracted.** `spring.bounce`, `spring.gentle`, `spring.stiff` should be a separate sub-export so users can match the kit's motion vocabulary in their own components.
- **Confetti + FloatingCoins variants.** New patterns from the KidCash app codebase as we ship them in production.

## 1.0 and beyond

- Public API stability: no breaking changes without a deprecation cycle.
- Semver-strict releases.
- Considered additions: a `<DataTable>` family, more `Specialized` finance widgets (transaction list, kid leaderboard), maybe a `<Page>` shell that bundles the playground hero patterns. None of these are committed.

## Things we will not build

- **A parity-with-mantine catalog.** The deliberate scope of the kit is "what KidCash uses." Inputs, selects, tabs, accordions, etc. — wire those in from `radix-ui` or `@headlessui/react` if you need them.
- **A full design system spec doc.** The component pages and the playground are the docs.
- **A no-code site builder.** The kit is libraries, not a hosted product.

## Want something specific?

- File a [feature request](https://github.com/simsketch/kidcash-ui/issues/new?template=feature-request.yml) for a concrete enhancement.
- Open a [discussion](https://github.com/simsketch/kidcash-ui/discussions) for "how would I build X?" or general design questions.
- Submit a PR — see [CONTRIBUTING.md](./CONTRIBUTING.md).
