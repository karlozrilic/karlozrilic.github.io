import moment from 'moment'

export default function Footer() {
    return (
        <footer className='border-t'>
            <div className='container mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted-foreground'>
                <span>© {moment().year()} Karlo Zrilić</span>
                <a href='#hero' className='hover:text-foreground transition-colors'>Back to top</a>
            </div>
        </footer>
    );
}
