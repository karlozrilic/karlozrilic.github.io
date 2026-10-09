export default function LoadingScreen({message} : { message?: string }) {
    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center gap-4 bg-background text-foreground z-50' role='status' aria-live='polite'>
            <div className='loading-dots flex gap-2' aria-hidden='true'>
                <span></span><span></span><span></span>
            </div>
            {message ?
                <p className='font-hand text-2xl text-muted-foreground'>{message}</p>
            :
                <span className='sr-only'>Loading</span>
            }
        </div>
    );
}
