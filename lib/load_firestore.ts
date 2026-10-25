// loaded on demand: visitors get content baked into the HTML and never need Firestore
export async function loadFirestore() {
    const [{ db }, firestore] = await Promise.all([import('@/lib/firebase'), import('firebase/firestore')]);
    return { db, ...firestore };
}
