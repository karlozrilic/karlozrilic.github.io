import { cn } from '@/lib/utils';
import { ReactSVG } from 'react-svg';

export default function Technology({image, name}: {image: string, name: string}) {
    return (
        <figure
            className={
                cn(
                    'relative h-full overflow-hidden rounded-xl border p-2',
                    // light styles
                    'border-gray-950/[.1] bg-gray-950/[.01]',
                    // dark styles
                    'dark:border-gray-50/[.1] dark:bg-gray-50/[.10]'
                )
            }
        >
            <div className='flex flex-row items-center gap-2'>
                <ReactSVG
                    style={{ width: 32, height: 32, display: 'inline-block' }}
                    src={'images/icons/' + image}
                    desc='Description'
                    className='fill-foreground'
                />
                <div className='flex flex-col'>
                    <figcaption className='text-sm font-medium dark:text-white'>
                        {name}
                    </figcaption>
                </div>
            </div>
        </figure>
    );
};