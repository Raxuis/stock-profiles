"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";
import { Activity, Building2, List } from "lucide-react";
import { ImNewspaper } from "react-icons/im";
import { motion } from "framer-motion";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: {
          duration: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 0.5,
          ease: "easeInOut"
        },
      }}
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
});

Circle.displayName = "Circle";

export function BorderBeamUser({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div className="pb-14 sm:pb-16" initial={{
      x: 100
    }} whileInView={{
      x: 0
    }}
      transition={{
        duration: 0.9,
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.5,
        ease: "easeInOut"
      }}
    >
      <div
        className={cn(
          "relative flex h-[500px] w-full items-center justify-center overflow-hidden",
          className,
        )}
        ref={containerRef}
      >
        <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
          <div className="flex flex-col justify-center">
            <Circle ref={div7Ref}>
              <Icons.user />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div6Ref} className="size-16">
              <Image src="/icon.png" alt="Icon" width={100} height={100} className='size-full object-contain' priority />
            </Circle>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <Circle ref={div1Ref}>
              <Activity className="size-full text-black" />
            </Circle>
            <Circle ref={div2Ref}>
              <Building2 className="size-full text-black" />
            </Circle>
            <Circle ref={div3Ref}>
              <ImNewspaper className="size-full text-black" />
            </Circle>
            <Circle ref={div4Ref}>
              <List className="size-full text-black" />
            </Circle>
          </div>
        </div>

        {/* AnimatedBeams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
          duration={3}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
          duration={3}
        />
      </div>
      <p className="text-center text-muted-foreground">This is the process of how the user will use the website</p>
    </motion.div>
  );
}

const Icons = {
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};
