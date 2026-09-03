'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ImageShaderEffectProps {
    imageSrc: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;    
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_aberrationIntensity;

  void main() {
    vec2 gridUV = floor(vUv * vec2(40.0, 40.0)) / vec2(40.0, 40.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/40.0, 1.0/40.0);

    vec2 mouseDirection = u_mouse - u_prevMouse;
    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * -mouseDirection * 0.2;
    vec2 uv = vUv - uvOffset;

    vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.001, 0.0));
    vec4 colorG = texture2D(u_texture, uv);
    vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.001, 0.0));

    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
  }
`;

export const ImageShaderEffect: React.FC<ImageShaderEffectProps> = ({ imageSrc }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const img = imageRef.current;
        if (!container || !img) return;

        let easeFactor = 0.02;
        let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
        let planeMesh: THREE.Mesh;
        const mousePosition = { x: 0.5, y: 0.5 };
        let targetMousePosition = { x: 0.5, y: 0.5 };
        let prevPosition = { x: 0.5, y: 0.5 };
        let aberrationIntensity = 0.0;
        // Removed lastScrollY variable as it's no longer needed

        const init = (texture: THREE.Texture) => {
            const width = img.offsetWidth;
            const height = img.offsetHeight;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 10);
            camera.position.z = 1;

            const uniforms = {
                u_mouse: { value: new THREE.Vector2() },
                u_prevMouse: { value: new THREE.Vector2() },
                u_aberrationIntensity: { value: 0.0 },
                u_texture: { value: texture }
            };

            const aspect = width / height;
            const planeGeometry = new THREE.PlaneGeometry(aspect * 2, 2);
            planeMesh = new THREE.Mesh(
                planeGeometry,
                new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })
            );
            scene.add(planeMesh);

            renderer = new THREE.WebGLRenderer({ alpha: true });
            renderer.setSize(width, height);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '0';
            renderer.domElement.style.left = '0';
            renderer.domElement.style.pointerEvents = 'none';
            renderer.domElement.style.width = '100%';
            renderer.domElement.style.height = '100%';

            canvasRef.current = renderer.domElement;
            container.appendChild(renderer.domElement);
        };

        const animate = () => {
            requestAnimationFrame(animate);
            mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
            mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;
            ((planeMesh.material as THREE.ShaderMaterial).uniforms.u_mouse.value as THREE.Vector2).set(mousePosition.x, 1.0 - mousePosition.y);
            ((planeMesh.material as THREE.ShaderMaterial).uniforms.u_prevMouse.value as THREE.Vector2).set(prevPosition.x, 1.0 - prevPosition.y);
            aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.005);
            ((planeMesh.material as THREE.ShaderMaterial).uniforms.u_aberrationIntensity.value) = aberrationIntensity;
            renderer.render(scene, camera);
        };

        const loadAndInit = () => {
            new THREE.TextureLoader().load(imageSrc, (texture) => {
                texture.minFilter = THREE.LinearFilter;
                init(texture);
                animate();
            });
        };

        const handleImageReady = () => {
            if (img.complete && img.naturalWidth !== 0) {
                loadAndInit();
            } else {
                img.onload = loadAndInit;
            }
        };

        handleImageReady();

        // event listeners
        const handleMouseMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            easeFactor = 0.02;
            prevPosition = { ...targetMousePosition };
            targetMousePosition.x = (event.clientX - rect.left) / rect.width;
            targetMousePosition.y = (event.clientY - rect.top) / rect.height;
            aberrationIntensity = 1;
        };
        const handleMouseEnter = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            easeFactor = 0.02;
            mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
            mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
        };
        const handleMouseLeave = () => {
            easeFactor = 0.05;
            targetMousePosition = { ...prevPosition };
        };
        // Removed handleScroll function

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        // Removed scroll event listener

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            // Removed scroll event cleanup
            if (canvasRef.current) canvasRef.current.remove();
        };
    }, [imageSrc]);

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}
        >
            <Image
                ref={imageRef}
                src={imageSrc}
                style={{ width: '100%', visibility: 'hidden', position: 'relative' }}
                aria-hidden="true"
                alt="shader image"
                width={100}
                height={100}
            />
        </div>
    );
};

export default ImageShaderEffect;
