import { makeStore } from '@/app/src/store/store';
import { fetchCV } from '@/app/src/store/slices/CVSlice';
import { fetchAboutMe } from '@/app/src/store/slices/aboutMeSlice';
import { fetchTechnologies } from '@/app/src/store/slices/technologiesSlice';
import { fetchProjects } from '@/app/src/store/slices/projectsSlice';
import { fetchExperiences } from '@/app/src/store/slices/experienceSlice';
import { fetchVercelProjects } from '@/app/src/store/slices/vercelProjectsSlice';

// Runs at build time so visitors get the content in the HTML instead of fetching Firestore.
export async function getBuildState() {
    const store = makeStore();

    const content = await Promise.all([
        store.dispatch(fetchCV()),
        store.dispatch(fetchAboutMe()),
        store.dispatch(fetchTechnologies()),
        store.dispatch(fetchProjects()),
        store.dispatch(fetchExperiences()),
    ]);

    // never deploy a site with missing content
    const failed = content.filter(result => result.meta.requestStatus === 'rejected');
    if (failed.length) {
        throw new Error(`Build data failed: ${failed.map(result => result.type).join(', ')}`);
    }

    // only sidebar links, not worth failing the build over
    await store.dispatch(fetchVercelProjects());

    return store.getState();
}
