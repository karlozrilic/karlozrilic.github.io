export default function LoadingComponent() {
    return (
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-background text-foreground z-50'>
            <h1 className='text-2xl font-bold'>Loading...</h1>
        </div>
    );
}