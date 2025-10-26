'use client'
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faBars, faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';

export default function Header() {
	const [isDark, setIsDark] = useState<boolean | null>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const drawerToggleRef = useRef<HTMLButtonElement>(null);
	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const drawerBackdropRef = useRef<HTMLDivElement>(null);
	const drawerRef = useRef<HTMLDivElement>(null);
	const closeDrawerButtonRef = useRef<HTMLButtonElement>(null);
	const [icon, setIcon] = useState<IconDefinition>(faMoon);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		// Set initial value
		setIsDark(mediaQuery.matches);

		localStorage.getItem('dark_mode')

		if (isDark || JSON.parse(localStorage.getItem('dark_mode') ?? 'false')) {
			document.documentElement.classList.add('dark');
			setIcon(faSun);
		} else {
			document.documentElement.classList.remove('dark');
			setIcon(faMoon);
		}

		// Listen for changes
		const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
		mediaQuery.addEventListener('change', handler);

		return () => mediaQuery.removeEventListener('change', handler);
	}, []);

	useEffect(() => {
		if (toggleRef.current == null || drawerToggleRef.current == null) return;
		const toggle = toggleRef.current;
		const drawerToggle = drawerToggleRef.current;
		toggle.addEventListener('click', toggleHandler);
		drawerToggle.addEventListener('click', toggleHandler);

		function toggleHandler() {
			document.documentElement.classList.toggle('dark');
			if (document.documentElement.classList.contains('dark')) {
				setIcon(faSun);
				localStorage.setItem('dark_mode', JSON.stringify(true));
			} else {
				setIcon(faMoon);
				localStorage.setItem('dark_mode', JSON.stringify(false));
			}
		}

		return () => {
			toggle.removeEventListener('click', toggleHandler);
			drawerToggle.removeEventListener('click', toggleHandler);
		}
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
				<Link href='/#about' className='hover:text-primary transition' onClick={closeDrawer}>About</Link>
				<Link href='/#skills' className='hover:text-primary transition' onClick={closeDrawer}>Skills</Link>
				<Link href='/#projects' className='hover:text-primary transition' onClick={closeDrawer}>Projects</Link>
				<Link href='/#experience' className='hover:text-primary transition' onClick={closeDrawer}>Experience</Link>
				<Link href='/#contact' className='hover:text-primary transition' onClick={closeDrawer}>Contact</Link>
			</>
		);
	}

    return (
		<>
			<nav className='bg-white dark:bg-gray-800 shadow fixed w-full z-50 transition-colors duration-500'>
				<div className='container mx-auto flex justify-between items-center p-5'>
					<Link href='/' className='text-xl font-bold'>Karlo Zrilić</Link>
					<div className='hidden space-x-6 md:flex'>
						{links()}
					</div>
					<button
						ref={toggleRef}
						className='hidden ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition md:block'
					>
						<FontAwesomeIcon icon={icon} />
					</button>
					<button
						ref={menuButtonRef}
						className='ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition md:hidden'
					>
						<FontAwesomeIcon icon={faBars} />
					</button>
				</div>
			</nav>

			<div ref={drawerBackdropRef} className="fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm hidden z-55"></div>
			<div ref={drawerRef} className="fixed top-0 right-0 sm:w-64 w-full h-full bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col space-y-6 transform translate-x-full transition-transform duration-300 z-56">
				<div className="flex justify-between items-center">
					<span className="text-xl font-bold">Karlo Zrilić</span>
					<button ref={closeDrawerButtonRef} className="text-2xl hover:text-primary">✕</button>
				</div>
				{links()}
				<button
					ref={drawerToggleRef}
					className='p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition'
				>
					<FontAwesomeIcon icon={icon} />
				</button>
			</div>
		</>
    );
}