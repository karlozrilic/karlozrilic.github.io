export default function LoadingScreen({message} : { message?: string }) {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-background text-foreground z-50'>
            <h1 className='text-2xl font-bold'>{message ?? 'Loading...'}</h1>
        </div>
    );
}