'use client'
import { useRef, useEffect } from 'react';
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

export default function Header() {
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const drawerBackdropRef = useRef<HTMLDivElement>(null);
	const drawerRef = useRef<HTMLDivElement>(null);
	const closeDrawerButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const onChange = (event: MediaQueryListEvent) => {
			const stored = localStorage.getItem('theme');
			if (!stored) {
				const next = event.matches ? 'dark' : 'light';
				document.documentElement.classList.toggle('dark', next === 'dark');
			}
		};

		mediaQuery.addEventListener('change', onChange);
		return () => mediaQuery.removeEventListener('change', onChange);
	}, []);

	useEffect(() => {
		if (
			menuButtonRef.current == null ||
			closeDrawerButtonRef.current == null ||
			drawerRef.current == null ||
			drawerBackdropRef.current == null
		) return;
		const menuButton = menuButtonRef.current;
		const closeDrawerButton = closeDrawerButtonRef.current;
		const drawer = drawerRef.current;
		const drawerBackdrop = drawerBackdropRef.current;
		menuButton.addEventListener('click', menuButtonHandler);
		closeDrawerButton.addEventListener('click', closeDrawerHandler);
		drawerBackdrop.addEventListener('click', closeDrawerHandler);
		window.addEventListener('resize', resize)

        function menuButtonHandler() {
            drawer.classList.toggle('translate-x-full');
			drawerBackdrop.classList.toggle('hidden');
        }

		function closeDrawerHandler() {
			drawer.classList.add('translate-x-full');
			drawerBackdrop.classList.add('hidden');
		}

		function resize() {
			if (window.innerWidth >= 768) {
				drawer.classList.add('translate-x-full');
				drawerBackdrop.classList.add('hidden');
			}
		}

        return () => {
			menuButton.removeEventListener('click', menuButtonHandler);
			closeDrawerButton.removeEventListener('click', closeDrawerHandler);
			drawerBackdrop.removeEventListener('click', closeDrawerHandler);
            window.removeEventListener('resize', resize);
        };
    }, []);

	function closeDrawer() {
		if (drawerRef.current == null || drawerBackdropRef.current == null) return;
		drawerRef.current.classList.add('translate-x-full');
		drawerBackdropRef.current.classList.add('hidden');
	}

	function links() {
		return (
			<>
				<Link href='/#about' onClick={closeDrawer}>About</Link>
				<Link href='/#experience' onClick={closeDrawer}>Experience</Link>
				<Link href='/#technologies' onClick={closeDrawer}>Technologies</Link>
				<Link href='/#projects' onClick={closeDrawer}>Projects</Link>
				<Link href='/#contact' onClick={closeDrawer}>Contact</Link>
			</>
		);
	}

    return (
		<>
			<nav className='bg-background text-foreground shadow fixed w-full z-50 transition-colors duration-500'>
				<div className='container mx-auto flex justify-between items-center p-5'>
					<Link href='/' className='text-xl font-bold'>Karlo Zrilić</Link>
					<div className='hidden space-x-6 md:flex'>
						{links()}
					</div>
					<AnimatedThemeToggler className='hidden md:block' />
					<button
						ref={menuButtonRef}
						className='ml-4 p-2 rounded md:hidden'
					>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
			</nav>

			<div ref={drawerBackdropRef} className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm hidden z-55"></div>
			<div ref={drawerRef} className="fixed top-0 right-0 sm:w-64 w-full h-full bg-background text-foreground shadow-xl p-6 flex flex-col space-y-6 transform translate-x-full transition-transform duration-300 z-56">
				<div className="flex justify-between items-center">
					<span className="text-xl font-bold">Karlo Zrilić</span>
					<button ref={closeDrawerButtonRef} className="text-2xl hover:text-primary">✕</button>
				</div>
				{links()}
				<AnimatedThemeToggler />
			</div>
		</>
    );
}