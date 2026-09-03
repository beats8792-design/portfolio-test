import Image from 'next/image'
import Link from 'next/link'
import "./../../../styles/components/projects_banner.scss";
import { Marquee } from '../../animations/Marquee';

const projects = [
    {
        media: "/static/images/slide-1.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-2.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-3.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-4.mp4",
        type: "video",
        path: "/"
    },
    {
        media: "/static/images/slide-5.png",
        type: "image",
        path: "/"
    },
    {
        media: "/static/images/slide-6.jpg",
        type: "image",
        path: "/"
    },
]

export default function ProjectsBannerSlider() {
    return (
        <section className='projects_banner_section projects_banner_section_slider'>
            <div className="slider_container">
                <Marquee reverse={false} className="slider_content">
                    {projects && projects.map((project, index) => project.type === "image" ? (
                        <Link href={project.path} key={index}>
                            <div className="imgbox_full">
                                <Image src={project.media} alt="image" width={200} height={200} />
                            </div>
                        </Link>
                    ) : (
                        <Link href={project.path} key={index}>
                            <video autoPlay muted loop>
                                <source src={project.media} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Link>
                    ))}
                </Marquee>
            </div>

            <div className="text_box">
                <h2 className="title">400+ projects. Shopify Themes</h2>
            </div>
        </section>
    )
}
