import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Flips the theme and remembers the choice. Which icon shows is decided by the
 * `dark` class in CSS rather than by component state, so the server-rendered
 * markup and the hydrated markup are identical and the button never flickers
 * through a wrong icon on load.
 */
export function ThemeToggle() {
	function toggle() {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}

	return (
		<Button
			variant="ghost"
			size="icon-sm"
			onClick={toggle}
			aria-label="Toggle colour theme"
			title="Toggle colour theme"
			className="text-muted-foreground hover:text-foreground"
		>
			<Sun className="hidden dark:block" />
			<Moon className="block dark:hidden" />
		</Button>
	);
}
