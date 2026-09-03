"use client";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";

interface Props {
  image_one: string;
  image_two: string;
}
export default function ProjectCardTwo({ image_one, image_two }: Props) {
  const card = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const productCard = card.current as HTMLDivElement;
      const imgTwo = card.current?.querySelector(".img_two");
      if (!imgTwo || !productCard) return;

      const onEnter = (e: MouseEvent) => {
        const rect = productCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.set(imgTwo, {
          clipPath: `circle(0% at ${x}px ${y}px)`,
        });

        gsap.to(imgTwo, {
          clipPath: `circle(150% at ${x}px ${y}px)`,
          duration: 1,
          ease: "power3.out",
        });
      };

      const onLeave = (e: MouseEvent) => {
        const rect = productCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        console.log(x, y);

        gsap.to(imgTwo, {
          clipPath: `circle(0% at ${x}px ${y}px)`,
          duration: 1,
          ease: "power3.out",
        });
      };

      card.current!.addEventListener("mouseenter", onEnter);
      card.current!.addEventListener("mouseleave", onLeave);

      return () => {
        card.current!.removeEventListener("mouseenter", onEnter);
        card.current!.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: card },
  );
  return (
    <div ref={card} className="project_card_2">
      <div className="svg_border">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 407 411"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 .5h390.89a7.5 7.5 0 0 1 7.5 7.5v356.983a7.5 7.5 0 0 1-7.5 7.5H263.329a23.502 23.502 0 0 0-18.375 8.849l-16.499 20.695a22.502 22.502 0 0 1-17.593 8.473H8A7.5 7.5 0 0 1 .5 403V8A7.5 7.5 0 0 1 8 .5Z"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          ></path>
        </svg>
      </div>
      <div className="image_content">
        <div className="img_one">
          <div className="imgbox_full">
            <Image
              src={image_one}
              alt=""
              width={407}
              height={411}
            />
          </div>
        </div>
        <div className="img_two">
          <div className="imgbox_full">
            <Image
              src={image_two}
              alt=""
              width={407}
              height={411}
            />
          </div>
        </div>
      </div>
      <div className="info_content">
        <h2 className="title">
          JAZBAH
          <div className="icon_box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 16V7H8v2h5.59l-6.3 6.29 1.42 1.42 6.29-6.3V16z"></path>
            </svg>
          </div>
        </h2>
      </div>
    </div>
  );
}
