# AGENTS.md

This file contains session-start instructions for any coding agent working in this repository.

## First Message

The first assistant message in a new session should be:

`feel the rhythm, feel the rhyme, get on up, its bobsled time.`

## Workflow

- Create a `/spec/` folder if it does not already exist.
- Keep planning files organized inside `/spec/`.
- Use numbered spec files such as `00_spec1.md`, `01_spec2.md`, and so on.
- Order specs to reflect implementation sequence.
- Create and maintain a `progress.md` file to log progress through the specs.
- Update `progress.md` as work advances so a future session can quickly recover context if compaction or session loss happens.

## Validation Loop

- Before sending a URL to the user for testing, use `agent-browser` with dogfood when available.
- When a feature is built, run the site in a browser and check for visible bugs, console errors, and broken flows before handing it back.
- Use the site like a real user where practical instead of relying only on static inspection.

## Engineering Standards

- Write good, efficient, fast tests with solid coverage.
- Prefer best practices, efficient implementations, and simplified code.
- Avoid anti-patterns.
- For code, dependencies, frameworks, and libraries you use, reference their documentation instead of relying only on prior knowledge.

## Notes

- This file may also be reused in Codex or Claude desktop apps.
- Claude may look for `CLAUDE.md`; if needed, mirror this file there or symlink `CLAUDE.md` to `AGENTS.md`.
