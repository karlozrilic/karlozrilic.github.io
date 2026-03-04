import moment from 'moment'

export default function Footer() {
    return (
        <footer className='bg-secondary text-secondary-foreground py-10 text-center'>
            © {moment().year()} Karlo Zrilić. All rights reserved.
        </footer>
    );
}