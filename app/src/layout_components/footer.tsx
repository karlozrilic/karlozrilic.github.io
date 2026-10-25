export default function Footer() {
    return (
        <footer className='border-t'>
            <div className='container mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted-foreground'>
                {/* the year can differ from when the page was built */}
                <span suppressHydrationWarning>© {new Date().getFullYear()} Karlo Zrilić</span>
                <a href='#hero' className='hover:text-foreground transition-colors'>Back to top</a>
            </div>
        </footer>
    );
}
