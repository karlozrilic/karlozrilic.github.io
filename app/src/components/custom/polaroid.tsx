import { cn } from '@/lib/utils';

type PolaroidProps = {
    caption: React.ReactNode;
    alt?: string;
    className?: string;
    imgClassName?: string;
    style?: React.CSSProperties;
    ref?: React.Ref<HTMLElement>;
    onTransitionEnd?: React.TransitionEventHandler<HTMLElement>;
};

export default function Polaroid({ caption, alt = '', className, imgClassName, style, ref, onTransitionEnd }: PolaroidProps) {
    return (
        <figure
            ref={ref}
            className={cn('bg-white p-2.5 md:p-3 pb-11 md:pb-16 shadow-2xl shadow-black/40 relative', className)}
            style={style}
            onTransitionEnd={onTransitionEnd}
        >
            <div className='aspect-[4/5] w-full bg-[#e9e3d4] overflow-hidden'>
                <img
                    src='/images/portfolio_picture.jpeg'
                    alt={alt}
                    className={cn('size-full object-cover object-[56%_40%]', imgClassName)}
                />
            </div>
            <figcaption className='absolute bottom-1.5 md:bottom-3 left-0 right-0 text-center font-hand text-2xl md:text-3xl text-neutral-700'>
                {caption}
            </figcaption>
        </figure>
    );
}
