"use client"
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import React, { useRef } from 'react'


interface Props {
    type?: string,
    children: React.ReactNode,
    onClick?: () => void,
    url?: string,
    target?: string,
    className?: string,
}

export default function Button({ children, type, onClick, url, target, className }: Props) {   
    const buttonRef = useRef<HTMLDivElement>(null);


    useGSAP(() => {
        if (buttonRef.current) {
            const button = buttonRef.current.querySelector('.button') as HTMLElement;
            const bg = button?.querySelector('.bg') as HTMLElement;

            const handleMouse = (e: MouseEvent) => {
                const rect = button.getBoundingClientRect();
                const relX = e.pageX - rect.left - window.scrollX;
                const relY = e.pageY - rect.top - window.scrollY;
                bg.style.left = `${relX}px`;
                bg.style.top = `${relY}px`;
            };

            button.addEventListener('mouseenter', handleMouse);
            button.addEventListener('mouseout', handleMouse);

            return () => {
                button.removeEventListener('mouseenter', handleMouse);
                button.removeEventListener('mouseout', handleMouse);
            };
        }
    }, { scope: buttonRef });

    return (
        <div ref={buttonRef} className={className}>
            {type == "Link" ?
                <Link href={url ? url : "#"} className="button" data-cursor-type="link" target={target}>
                    <span className="text">{children}</span>
                    <span className="bg"></span>
                </Link> :
                <button className='button' onClick={onClick} data-cursor-type="link">
                    <span className="text">{children}</span>
                    <span className="bg"></span>
                </button>
            }
        </div>
    )
}
