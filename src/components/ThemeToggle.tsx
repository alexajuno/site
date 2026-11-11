import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const modes = ['system', 'light', 'dark'] as const;
type Mode = (typeof modes)[number];

/**
 * Cycles the theme through system, light and dark. System follows the device
 * and stores nothing; light and dark are stored. The inline script in the
 * layout reads the stored choice, sets `data-theme` on <html> and keeps the
 * `dark` class right, so this only has to write the choice and re-run it.
 * Which icon shows is decided by `data-theme` in CSS rather than by component
 * state, so the server-rendered markup and the hydrated markup are identical
 * and the button never flickers through a wrong icon on load.
 */
export function ThemeToggle() {
	function cycle() {
		const current = document.documentElement.dataset.theme as Mode;
		const next = modes[(modes.indexOf(current) + 1) % modes.length];
		if (next === 'system') localStorage.removeItem('theme');
		else localStorage.setItem('theme', next);
		const dark = next === 'system' ? matchMedia('(prefers-color-scheme: dark)').matches : next === 'dark';
		document.documentElement.dataset.theme = next;
		document.documentElement.classList.toggle('dark', dark);
	}

	return (
		<Button
			variant="ghost"
			size="icon-sm"
			onClick={cycle}
			aria-label="Change colour theme"
			title="Change colour theme"
			className="text-muted-foreground hover:text-foreground"
		>
			<Monitor className="hidden in-data-[theme=system]:block" />
			<Sun className="hidden in-data-[theme=light]:block" />
			<Moon className="hidden in-data-[theme=dark]:block" />
		</Button>
	);
}
