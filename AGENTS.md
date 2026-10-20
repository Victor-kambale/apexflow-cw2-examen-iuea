<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep TanStack file routes with the shared shell in `__root.tsx`; view routing remains type-safe and URLs stay stable.
- Keep demo pipeline records and digest/filter logic in `src/lib/pipeline.ts`, and dashboard controls in `PipelineDashboard`; tests exercise logic independently from presentation.
- Run the feed simulation only after hydration with bounded records and cleaned-up timers; SSR must not generate clock-dependent records.
- Treat local SHA-256 checks as simulated payload integrity, never official source authenticity or a security guarantee.
- Use Lovable Cloud generated clients/configuration without editing them; no backend data workflow is implemented until explicitly requested.
