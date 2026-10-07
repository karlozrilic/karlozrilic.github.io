import { cn } from '@/lib/utils';

export default function SectionHeading({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={cn('font-display text-4xl md:text-6xl font-semibold tracking-tight', className)}>
            {children}<span className='text-brand'>.</span>
        </h2>
    );
}
