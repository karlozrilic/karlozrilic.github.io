'use client'
import { Button } from '@/app/src/components/ui/button'
import { faArrowUpRightFromSquare, faDownload, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWebHaptics } from 'web-haptics/react';
import { useAuth } from '@/hooks/useAuth';
import { useLatexPreview } from '@/hooks/useLatexPreview';
import { RootState } from '@/app/src/store/store';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '@/app/src/components/ui/dialog';
import { Spinner } from '../components/ui/spinner';
import Polaroid from '@/app/src/components/custom/polaroid';

export default function Hero() {
    const { trigger } = useWebHaptics();
    const { user } = useAuth();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [iframeLoading, setIframeLoading] = useState<boolean>(true);
    const [pendingDownload, setPendingDownload] = useState(false);
    const [pdfRequested, setPdfRequested] = useState(false);

    const cvData = useSelector((state: RootState) => state.cv);
    const experiences = useSelector((state: RootState) => state.experiences.data);
    // only compile once they click download - cvData.data doesn't change
    // after that so it just stays cached for the rest of the session
    const { url: pdfUrl, status: pdfStatus } = useLatexPreview(pdfRequested ? (cvData.data ?? '') : '');

    const currentJob = experiences.find(e => e.show && !e.end_date);

    useEffect(() => {
        const faders = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '0px 0px -15% 0px',
        });
        faders.forEach(f => observer.observe(f));

        return () => {
            faders.forEach(f => observer.unobserve(f));
        }
    }, []);

    useEffect(() => {
        if (dialogOpen === false) {
            setTimeout(() => {
                setIframeLoading(true);
            }, 150)
        }
    }, [dialogOpen]);

    function onIframeLoad() {
        setIframeLoading(false);
    }

    function downloadPdf(url: string) {
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Karlo_Zrilic_CV.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    useEffect(() => {
        if (!pendingDownload || pdfStatus !== 'ok' || !pdfUrl) return;
        downloadPdf(pdfUrl);
        setPendingDownload(false);
    }, [pendingDownload, pdfStatus, pdfUrl]);

    function generatePDF() {
        if (pdfStatus === 'ok' && pdfUrl) {
            downloadPdf(pdfUrl);
            return;
        }

        setPdfRequested(true);
        setPendingDownload(true);
    }

    return (
        <section
            className='relative overflow-hidden min-h-[calc(100svh-var(--header-height,68px))] flex items-center'
            id='hero'
        >
            <div className='container relative mx-auto px-6 py-14 md:py-24 grid gap-10 md:gap-6 md:grid-cols-[3fr_2fr] items-center'>
                <div className='order-2 md:order-1'>
                    <h1 className='font-display text-6xl md:text-8xl font-semibold tracking-tight leading-[0.95] fade-in'>
                        Karlo Zrilić<span className='text-brand'>.</span>
                    </h1>

                    <p className='mt-6 text-2xl md:text-3xl font-medium'>
                        Frontend and mobile developer.
                    </p>
                    <p className='mt-3 max-w-xl text-lg text-muted-foreground leading-relaxed'>
                        I build websites and apps, mostly with React, Vue and Flutter.{' '}
                        {currentJob ?
                            <>Right now I'm working at <span className='text-foreground'>{currentJob.company_name}</span>.</>
                        :
                            <>Currently looking for my next job.</>
                        }
                    </p>

                    <div className='mt-10 flex flex-wrap items-center gap-x-6 gap-y-3'>
                        <Button
                            size='lg'
                            className='bg-brand text-black font-semibold hover:bg-brand/90'
                            onClick={() => {
                                trigger('success');
                                document.querySelector('#contact')?.scrollIntoView();
                            }}
                        >
                            Get in touch
                        </Button>
                        <button
                            type='button'
                            className='inline-flex items-center gap-2 font-medium underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground disabled:opacity-60'
                            onClick={generatePDF}
                            disabled={pdfStatus === 'compiling'}
                        >
                            {pdfStatus === 'compiling' ? 'Preparing PDF...' : pdfStatus === 'error' ? 'Failed, try again' : 'Download my CV'}
                            {pdfStatus === 'compiling' ? <Spinner className='size-4' /> : <FontAwesomeIcon icon={faDownload} className='text-sm' />}
                        </button>

                        {user &&
                            <Dialog
                                open={dialogOpen}
                                onOpenChange={setDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button size='sm' variant='ghost'>
                                        <span>Preview CV</span>
                                        <FontAwesomeIcon icon={faFileContract} />
                                    </Button>
                                </DialogTrigger>
                                <DialogOverlay className='backdrop-blur-sm' />
                                <DialogContent className='w-[95dvw] md:w-[60dvw] h-[95dvh] !max-w-none p-2 md:p-6'>
                                    <div className='flex flex-col'>
                                        <DialogHeader>
                                            <DialogTitle>CV</DialogTitle>
                                        </DialogHeader>
                                        <div className='relative -mx-4 no-scrollbar flex-1 overflow-y-auto px-4 py-2'>
                                            {
                                                iframeLoading ?
                                                    <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center px-4 py-2 bg-background'>
                                                        <Spinner className='size-8' />
                                                    </div>
                                                :
                                                null
                                            }
                                            <iframe src='/preview' className='w-full h-full' onLoad={onIframeLoad}></iframe>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type='button'
                                                onClick={() => {
                                                    window.open('/preview', '_blank');
                                                }}
                                            >
                                                <span>Open in window</span>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </Button>
                                            <Button
                                                type='button'
                                                onClick={generatePDF}
                                                disabled={pdfStatus === 'compiling'}
                                            >
                                                <span>
                                                    {pdfStatus === 'compiling' ? 'Preparing PDF...' : pdfStatus === 'error' ? 'Failed, try again' : 'Download PDF'}
                                                </span>
                                                {pdfStatus === 'compiling' ? <Spinner className='size-4' /> : <FontAwesomeIcon icon={faDownload} />}
                                            </Button>
                                        </DialogFooter>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        }
                    </div>
                </div>

                <div className='order-1 md:order-2 flex justify-end md:justify-start'>
                    <div className='relative w-48 md:w-full md:max-w-sm md:-ml-10'>
                    <div className='absolute top-1/4 -left-32 md:top-0 md:-left-36 flex flex-col items-end font-hand text-2xl md:text-3xl text-foreground/80 -rotate-6 pointer-events-none select-none' aria-hidden='true'>
                        <span>that's me</span>
                        <svg className='w-12 h-9 md:w-14 md:h-10 mr-1' viewBox='0 0 60 40' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M6 4 C 18 6, 34 14, 50 32' />
                            <path d='M41 31 L 51 33 L 50 22' />
                        </svg>
                    </div>
                    <Polaroid
                        caption='Šibenik, Croatia'
                        alt='Karlo Zrilić in Šibenik, Croatia'
                        className='hero-polaroid w-full rotate-3 hover:rotate-1 transition-transform duration-500'
                    />
                    </div>
                </div>
            </div>
        </section>
    );
}
