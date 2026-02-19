import { Metadata } from 'next';
import ProjectPage from '../sections/project_page';

export const metadata: Metadata = {
    title: 'Banana | Karlo Zrilić',
    description: 'Its a banana, nothing more, nothing less'
};

export default function Banana() {
    return (
        <ProjectPage />
    );
}
