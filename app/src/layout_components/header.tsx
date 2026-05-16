'use client'
import { useRef, useEffect } from 'react';
import { AnimatedThemeToggler } from '@/app/src/components/ui/animated-theme-toggler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useWebHaptics } from 'web-haptics/react';
import { useAuth } from '@/hooks/useAuth';
import { SidebarTrigger } from '../components/ui/sidebar';

export default function Header() {
	const { user, loading } = useAuth();
	const { trigger } = useWebHaptics();

	const menuButtonRef = useRef<HTMLButtonElement>(null);
	const drawerBackdropRef = useRef<HTMLDivElement>(null);
	const drawerRef = useRef<HTMLDivElement>(null);
	const closeDrawerButtonRef = useRef<HTMLButtonElement>(null);

	const headerTitle = 'Karlo Zrilić';

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
			trigger('success');
            drawer.classList.toggle('translate-x-full');
			drawerBackdrop.classList.toggle('hidden');

			const isOpen = !drawer.classList.contains('translate-x-full');
			document.body.style.overflow = isOpen ? 'hidden' : '';
        }

		function resize() {
			if (window.innerWidth >= 768) {
				drawer.classList.add('translate-x-full');
				drawerBackdrop.classList.add('hidden');
				document.body.style.overflow = '';
			}
		}

        return () => {
			menuButton.removeEventListener('click', menuButtonHandler);
			closeDrawerButton.removeEventListener('click', closeDrawerHandler);
			drawerBackdrop.removeEventListener('click', closeDrawerHandler);
            window.removeEventListener('resize', resize);
        };
    }, []);

	function closeDrawerHandler() {
		trigger('success');
		if (drawerRef.current == null || drawerBackdropRef.current == null) return;
		drawerRef.current.classList.add('translate-x-full');
		drawerBackdropRef.current.classList.add('hidden');
		document.body.style.overflow = '';
	}

	function themeToggle() {
		trigger('error');
	}

	function links() {
		return (
			<>
				<Link href='/#about' onClick={closeDrawerHandler}>About</Link>
				<Link href='/#experience' onClick={closeDrawerHandler}>Experience</Link>
				<Link href='/#technologies' onClick={closeDrawerHandler}>Technologies</Link>
				<Link href='/#projects' onClick={closeDrawerHandler}>Projects</Link>
				<Link href='/#contact' onClick={closeDrawerHandler}>Contact</Link>
			</>
		);
	}

    return (
		<>
			<nav className='bg-background text-foreground shadow sticky top-0 w-full z-50 transition-colors duration-500'>
				<div className='container mx-auto flex justify-between items-center p-5'>
					<Link href='/' onClick={() => trigger('warning')} className='text-xl font-bold'>{headerTitle}</Link>
					<div className='hidden space-x-6 md:flex'>
						{links()}
					</div>

					<div className='hidden md:flex gap-2'>
						{user && !loading && (
							<>
								<SidebarTrigger onClick={closeDrawerHandler} />
							</>
						)}
						<AnimatedThemeToggler onClickCapture={themeToggle} />
					</div>

					<div className='flex items-center ml-4 md:hidden'>
						{user && !loading && (
							<>
								<SidebarTrigger className='p-2 w-auto h-auto' onClick={closeDrawerHandler} />
							</>
						)}
						<button
							ref={menuButtonRef}
							className='p-2 rounded'
						>
							<FontAwesomeIcon icon={faBars} />
						</button>
					</div>
				</div>
			</nav>

			<div ref={drawerBackdropRef} className='fixed inset-0 w-full h-full bg-black/50 backdrop-blur-sm hidden z-55'></div>
			<div ref={drawerRef} className='fixed top-0 right-0 sm:w-64 w-full h-full bg-background text-foreground shadow-xl p-6 flex flex-col space-y-6 transform translate-x-full transition-transform duration-300 z-55'>
				<div className='flex justify-between items-center'>
					<span className='text-xl font-bold'>{headerTitle}</span>
					<button ref={closeDrawerButtonRef} className='text-2xl hover:text-primary'>✕</button>
				</div>
				{links()}
				<AnimatedThemeToggler onClickCapture={themeToggle} />
			</div>
		</>
    );
}