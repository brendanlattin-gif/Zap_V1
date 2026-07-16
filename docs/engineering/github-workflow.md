# GitHub Workflow

> **What this file is for:** How to use Git and GitHub on this project. Sections marked **Proposed** are sensible defaults for a solo / small-team app — they are not enforced by CI yet.
>
> Related: [docs README](../README.md)

---

## Current reality

| Item | Status |
|------|--------|
| Default branch | `main` (`origin/main`) |
| CI / GitHub Actions | **Not set up yet** |
| CONTRIBUTING.md | **Not in repo** |
| PR templates | **Not in repo** |

---

## Proposed: day-to-day workflow

### 1. Keep `main` stable

- Treat `main` as the version that should run (`npm run dev` / build).
- Do experimental or multi-file features on a branch.

### 2. Feature branches

Suggested names:

```text
feature/wizard-idea-modals
fix/dashboard-empty-state
docs/engineering-index
```

Create from an up-to-date `main`:

```bash
git checkout main
git pull
git checkout -b feature/short-description
```

### 3. Commits

- Commit when a chunk of work is coherent (not every keystroke).
- Prefer short messages that say **why**, in the repo’s existing style (plain sentence is fine), e.g. “Add wizard AI suggestion modals with mock fallback.”
- Do **not** commit `.env.local` or other secrets.
- Only commit when you (or an agent you asked) intend to; agents should not commit unless requested.

### 4. Pull requests (optional but useful)

Even as a solo developer, a PR is a nice checkpoint:

1. Push the branch: `git push -u origin HEAD`
2. Open a PR into `main` with a short summary + test notes
3. Merge when you’re happy; delete the branch after

### 5. What not to do (unless you explicitly want to)

- Force-push to `main`
- Rewrite published history on shared branches
- Commit API keys or service role keys

---

## Working with Cursor agents

- Ask the agent to **implement** first; ask separately to **commit** or **open a PR** when ready.
- Point agents at `docs/engineering/` and `docs/project-shaping/` for context instead of pasting huge specs every time.

---

## Gaps / TBD

- Add CI (lint + `tsc` / build) when useful
- Optional: branch protection on `main` once a second person joins
- Optional: Cursor rules that remind agents of this workflow (see future setup — not created yet)
