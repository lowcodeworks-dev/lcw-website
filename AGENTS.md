<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git & Deployment Conventions

- **Never commit directly to `main`.** Always create a branch first.
- **Branch naming:** prefix with `feature/`, `fix/`, or `experiment/` (e.g. `feature/task-filters`, `fix/invoice-vat`).
- **After pushing a branch**, open a PR with `gh pr create` and surface the Vercel preview URL in the response so Danny can test before merging.
- **Always test UI changes on the Vercel preview URL**, not just locally — mobile rendering and environment-specific behaviour can differ.
- **Preview deployments use Preview-scoped environment variables** in Vercel (may include a separate Supabase config, test Resend key, etc.). Do not assume production data or credentials are present.
- **Only merge to `main`** when the feature has been tested on the preview URL and Danny has confirmed it is production-ready.

# LCW Ways of Working

@../../Obsidian Vault/20_Knowledge/Global/General_Principles.md
@../../Obsidian Vault/20_Knowledge/VibeCoding/Tech_Stack.md
@../../Obsidian Vault/20_Knowledge/VibeCoding/UI_and_Styling.md
@../../Obsidian Vault/20_Knowledge/VibeCoding/Deployment_Workflow.md
@../../Obsidian Vault/10_Projects/LCW_Website/Handoff.md
