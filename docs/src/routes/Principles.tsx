import { DocsCodeBlock } from "../components/DocsCodeBlock";

const NO_RESTRICTED_IMPORTS = `// biome.json
{
  "linter": {
    "rules": {
      "style": {
        "noRestrictedImports": {
          "level": "error",
          "options": {
            "paths": {
              "lucide-react": "Import Icon from @olympusoss/canvas.",
              "sonner": "Import toast / Toaster from @olympusoss/canvas.",
              "@radix-ui/react-dialog": "Import Dialog from @olympusoss/canvas."
            }
          }
        }
      }
    }
  }
}`;

interface RuleProps {
	title: string;
	children: React.ReactNode;
}

function Rule({ title, children }: RuleProps) {
	return (
		<div className="border-l-2 border-border pl-4">
			<p className="text-sm font-medium text-foreground">{title}</p>
			<div className="mt-1 text-sm text-muted-foreground">{children}</div>
		</div>
	);
}

export function Principles() {
	return (
		<div className="space-y-12">
			<header>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Principles</h1>
				<p className="mt-2 max-w-2xl text-muted-foreground">
					The rules behind every component. Atomic design, voice, motion, accessibility — what we
					promise contributors and consumers.
				</p>
			</header>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold tracking-tight text-foreground">Atomic design</h2>
				<p className="text-sm text-muted-foreground">
					Canvas is split into four tiers. The folder is the contract.
				</p>
				<div className="space-y-3">
					<Rule title="Atoms">
						Single primitives. Wrap one Radix primitive or one lucide icon. No composition.
						Examples: Button, Input, Icon, Badge, Separator.
					</Rule>
					<Rule title="Molecules">
						Two or three atoms composed for a single named purpose. No state machines beyond local
						useState. Examples: Card, PageHeader, StatCard, AnimatedBackground.
					</Rule>
					<Rule title="Organisms">
						Stateful surfaces with their own context, controlled/uncontrolled API, and ARIA
						contracts. Examples: Sidebar, DataTable, Form, Dialog, Command.
					</Rule>
					<Rule title="Templates">
						Page-level scaffolding. Slots-only — no business logic. Examples: AuthShell, AdminShell,
						WizardShell.
					</Rule>
				</div>
				<p className="rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">
					<strong className="text-foreground">When in doubt, demote one tier.</strong> A "molecule"
					with state probably wants to be an organism. A "template" with conditional logic probably
					wants to be a page in the consuming app.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold tracking-tight text-foreground">Voice and copy</h2>
				<p className="text-sm text-muted-foreground">
					Terse, technical, sentence-case, infrastructural. Written for developers and operators.
				</p>
				<div className="space-y-3">
					<Rule title="Sentence case everywhere">
						"Sign in", "Revoke session", "OAuth2 clients". Proper nouns keep caps: Kratos, Hydra,
						OAuth2, OIDC, PKCE.
					</Rule>
					<Rule title="Use protocol terms">
						"identity" (not user), "session" (not login), "consent" (not permission), "challenge"
						(Hydra's term).
					</Rule>
					<Rule title="No emoji. No exclamation marks">
						Status = color + label, never punctuation. Errors are factual: "Invalid or expired login
						request" — not "Oops, something went wrong!"
					</Rule>
					<Rule title="Imperatives for actions">
						"Add client", "Revoke token", "Unlock account".
					</Rule>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold tracking-tight text-foreground">Motion</h2>
				<div className="space-y-3">
					<Rule title="transition-colors only">
						Hovers fade color, never position or size. Buttons / links / nav items do not scale or
						translate on press.
					</Rule>
					<Rule title="Tailwind 150ms default">
						Most interactive states. <code className="font-mono">duration-300</code> reserved for
						the AdminShell sidebar collapse and similarly load-bearing transitions.
					</Rule>
					<Rule title="Browser default easing">
						No custom cubic-beziers except the orb drift loops in AnimatedBackground (8s / 10s / 12s
						ease-in-out).
					</Rule>
					<Rule title="Focus-visible is sacred">
						<code className="font-mono">focus-visible:ring-1 ring-ring</code> on every interactive
						element. Subtle but present — do not remove.
					</Rule>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold tracking-tight text-foreground">Accessibility</h2>
				<div className="space-y-3">
					<Rule title="Form fields have labels">
						Every Input/Textarea/Select renders inside a Label, or with a connected aria-labelledby.
					</Rule>
					<Rule title="Status is never color alone">
						StatusBadge uses label + colored dot. Color-blind users get the same signal.
					</Rule>
					<Rule title="Icon-only buttons require aria-label">
						No exceptions. Reviews block on this.
					</Rule>
					<Rule title="Dialogs trap focus">
						Handled by Radix. Don't break it with custom portals.
					</Rule>
				</div>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold tracking-tight text-foreground">Lint guardrails</h2>
				<p className="text-sm text-muted-foreground">
					Add this to consuming apps. Stops accidental direct imports of libraries Canvas wraps.
				</p>
				<DocsCodeBlock code={NO_RESTRICTED_IMPORTS} language="json" filename="biome.json" />
			</section>
		</div>
	);
}
