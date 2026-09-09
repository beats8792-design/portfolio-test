"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TextAnimate } from "./TextAnimate";
import Button from "../others/Button";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type Slide = {
  image: string;
  title: string;
  description: string;
  tags: string[];
  live_url: string;
  git_url: string;
};

const seededRotation = (index: number, variant: number): number => {
  const seed = index * 31 + variant * 17 + 7;
  const positive = Math.abs(Math.sin(seed) * 10000) % 21;
  return Math.floor(positive) - 10;
};

export const AnimatedSlides = ({
  slides,
  autoplay = false,
}: {
  slides: Slide[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const cardRotations = useMemo(() => {
    return slides.map((_, index) => ({
      initial: seededRotation(index, 0),
      idle: seededRotation(index, 1),
      exit: seededRotation(index, 2),
    }));
  }, [slides]);

  return (
    <div className="w-full font-sans antialiased">
      <div className="relative grid grid-cols-1 gap-10 md:gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-60 md:h-120 w-full">
            <AnimatePresence>
              {slides.map((slide, index) => {
                const rotations = cardRotations[index];
                return (
                  <motion.div
                    key={slide.image}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: rotations.initial,
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : rotations.idle,
                      zIndex: isActive(index) ? 40 : slides.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: rotations.exit,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      width={500}
                      height={500}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {slides[active].title}
            </h3>
            <div className="text-sm text-gray-500 dark:text-neutral-500">
              <TextAnimate animation="blurIn">
                {slides[active].description}
              </TextAnimate>
            </div>
            <div className="mt-2 flex gap-2">
              {slides[active].tags.map((tag) => (
                <span key={tag} className="inline-block px-2 py-1 bg-gray-100 dark:bg-neutral-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <Button className="mt-5 md:mt-10" url={slides[active].live_url}>View Project</Button>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
