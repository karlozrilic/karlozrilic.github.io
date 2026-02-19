import { useEffect, useRef } from "react";

import { Marquee } from "@/app/components/ui/marquee"; 
import Tehnology from "../components/custom/tehnology";

export default function Technologies() {
    const techRef = useRef<HTMLDivElement>(null);

    const technologies = [
        {
            name: "HTML",
            img: "/images/icons/html5.svg",
        },
        {
            name: "CSS",
            img: "/images/icons/css3.svg",
        },
        {
            name: "JavaScript",
            img: "/images/icons/javascript.svg",
        },
        {
            name: "TypeScript",
            img: "/images/icons/typescript.svg",
        },
        {
            name: "Vue.js",
            img: "/images/icons/vue.js.svg",
        },
        {
            name: "React",
            img: "/images/icons/react.svg",
        },
        {
            name: "Sass",
            img: "/images/icons/sass.svg",
        },
        {
            name: "Docker",
            img: "/images/icons/docker.svg",
        },
        {
            name: "Electron",
            img: "/images/icons/electron.svg",
        },

        {
            name: "Git",
            img: "/images/icons/git.svg",
        },
        {
            name: "Python",
            img: "/images/icons/python.svg",
        },
        {
            name: "Java",
            img: "/images/icons/java.svg",
        },
        {
            name: "Flutter",
            img: "/images/icons/flutter.svg",
        },
        {
            name: "PostgresSQL",
            img: "/images/icons/postgressql.svg",
        },
        {
            name: "Postman",
            img: "/images/icons/postman.svg",
        },
        {
            name: "Next.js",
            img: "/images/icons/next.js.svg",
        },
        {
            name: "Node.js",
            img: "/images/icons/node.js.svg",
        },
        {
            name: "Firebase",
            img: "/images/icons/firebase.svg",
        }
    ];

    const firstRow = technologies.slice(0, technologies.length / 2)
    const secondRow = technologies.slice(technologies.length / 2)

    useEffect(() => {
        if (techRef.current == null) return;
        techRef.current.classList.add('visible');
    }, [])
        
    return (
        <>
            <span id='technologies'></span>
            <section className='relative py-10 md:py-20 overflow-hidden fade-in'>
                <h2 className='text-4xl font-bold text-center mb-12'>Technologies i use</h2>

                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:30s]">
                        {firstRow.map((technology) => (
                            <Tehnology key={technology.name} {...technology} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:25s]">
                        {secondRow.map((technology) => (
                            <Tehnology key={technology.name} {...technology} />
                        ))}
                    </Marquee>
                    <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
                    <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
                </div>
            </section>
        </>
    );
}