"use client";
import React, { useEffect, useRef, useState } from "react";
import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";
import Image from "next/image";

export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1.2, isMobile ? 1 : 1.5]
  );
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.6, isMobile ? 1 : 1.5]
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, 1500]);
  const rotate = useTransform(scrollYProgress, [0.1, 0.12, 0.3], [-28, -28, 0]);
  const textTransform = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={ref}
      className="flex min-h-[200vh] shrink-0 scale-[0.9] flex-col items-center justify-start py-0 [perspective:800px] sm:scale-100 sm:py-32"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-20 text-center text-3xl font-bold text-white"
      >
        {title || (
          <span>
            Stocks Profiles <br /> Dive into detailed profiles of companies, exploring their financial performance, market trends, and potential investment opportunities. From stock history to analyst ratings, our platform offers a wealth of data to empower your investment decisions.
          </span>
        )}
      </motion.h2>
      {/* Lid */}
      <Lid
        src={src}
        scaleX={scaleX}
        scaleY={scaleY}
        rotate={rotate}
        translate={translate}
      />
      {/* Base area */}
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200">
        {/* above keyboard bar */}
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-4/5 bg-[#050505]" />
        </div>
        <div className="relative flex">
          <div className="mx-auto h-full w-[10%]  overflow-hidden">
            <SpeakerGrid />
          </div>
          <div className="mx-auto h-full w-4/5">
            <Keypad />
          </div>
          <div className="mx-auto h-full w-[10%]  overflow-hidden">
            <SpeakerGrid />
          </div>
        </div>
        <Trackpad />
        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-t-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
        {showGradient && (
          <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent"></div>
        )}
        {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
      </div>
    </div>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative [perspective:800px]">
      <div
        style={{
          transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
          transformOrigin: "bottom",
          transformStyle: "preserve-3d",
        }}
        className="relative h-48 w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{
            boxShadow: "0px 2px 0px 2px var(--neutral-900) inset",
          }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
        >
          <span className="text-white">
            <GetInfosLogo />
          </span>
        </div>
      </div>
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateY: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <Image
          src={src as string}
          alt="logo"
          fill
          className="absolute inset-0 size-full rounded-lg border-2 border-white object-cover object-left-top"
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32  w-2/5 rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full rounded-md bg-[#050505] p-1">
      {/* First Row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="size-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>

        <KBtn>
          <IconBrightnessUp className="size-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="size-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="size-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="size-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="size-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="size-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="size-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="size-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="size-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="size-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="size-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="size-4 rounded-full bg-gradient-to-b  from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="size-full rounded-full bg-black" />
          </div>
        </KBtn>
      </Row>

      {/* Second row */}
      <Row>
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>

        <KBtn>
          <span className="block ">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pb-[2px] pr-[4px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </Row>

      {/* Third row */}
      <Row>
        <KBtn
          className="w-8 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>

        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`¨`}</span>
          <span className="block">{`^`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`*`}</span>
          <span className="block">{`$`}</span>
        </KBtn>
        <KBtn className="w-8 items-end justify-start pb-[2px] pr-[4px]"
          childrenClassName="items-end">
          <span className="block">en</span>
        </KBtn>
      </Row>

      {/* Fourth Row */}
      <Row>
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>

        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`%`}</span>
          <span className="block">{`ù`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`£`}</span>
          <span className="block">{'`'}</span>
        </KBtn>
        <KBtn className="items-end justify-start pb-[2px] pr-[4px]"
          childrenClassName="items-end">
          <span className="block">ter</span>
        </KBtn>
      </Row>

      {/* Fifth Row */}
      <Row>
        <KBtn
          className="w-8 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`<`}</span>
        </KBtn>
        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`.`}</span>
          <span className="block">{`;`}</span>
        </KBtn>{" "}
        <KBtn>
          <span className="block">{`/`}</span>
          <span className="block">{`:`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`+`}</span>
          <span className="block">{`=`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pb-[2px] pr-[4px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </Row>

      {/* sixth Row */}
      <Row>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="size-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="size-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="size-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="size-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="size-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="size-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="size-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="size-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="size-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="size-[6px]" />
            </KBtn>
          </div>
        </div>
      </Row>
    </div>
  );
};
export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "p-[0.5px] rounded-[4px]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white"
      )}
    >
      <div
        className={cn(
          "h-6 w-6 bg-[#0A090D] rounded-[3.5px] flex items-center justify-center",
          className
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "text-neutral-200 text-[5px] w-full flex justify-center items-center flex-col",
            childrenClassName,
            backlit && "text-white"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
      {children}
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};

const GetInfosLogo = () => {
  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      fill="none"
      width="25%" className="mx-auto object-cover opacity-75"
      viewBox="0 0 1079 1079" enableBackground="new 0 0 1079 1079">
      <path fill="#000000" opacity="1.000000" stroke="none"
        d="
M603.000000,1080.000000 
	C402.023163,1080.000000 201.546326,1080.000000 1.069475,1080.000000 
	C1.046307,1079.856567 1.002844,1079.713013 1.002843,1079.569580 
	C0.999987,720.111084 1.000000,360.652618 1.000000,1.097061 
	C360.560394,1.097061 720.120850,1.097061 1079.840576,1.097061 
	C1079.840576,360.666595 1079.840576,720.333313 1079.840576,1080.000000 
	C921.128967,1080.000000 762.314514,1080.000000 603.000000,1080.000000 
M308.499695,972.425476 
	C467.990967,972.428101 627.482300,972.480652 786.973389,972.328247 
	C798.389648,972.317322 809.904785,971.498413 821.201233,969.862427 
	C856.023987,964.819336 886.620544,950.067078 912.566833,926.540222 
	C952.987610,889.888672 972.673035,843.608948 972.735413,789.249268 
	C972.926331,622.924255 972.903809,456.598816 972.649719,290.274017 
	C972.629700,277.146729 971.465759,263.738373 968.628479,250.949844 
	C959.178894,208.357620 937.439697,173.188110 902.765686,146.187103 
	C870.416565,120.996559 833.497375,108.315819 792.929504,108.198524 
	C636.105164,107.745125 479.278717,107.994308 322.453094,108.065613 
	C308.017181,108.072182 293.556732,108.264755 279.154053,109.136688 
	C268.740814,109.767097 258.213867,110.831161 248.066696,113.144905 
	C203.454865,123.317230 167.821411,147.537323 141.319183,184.601028 
	C118.730301,216.191864 108.240288,252.016388 108.219543,290.761078 
	C108.130775,456.586243 108.069748,622.411743 108.406700,788.236267 
	C108.436676,802.989868 109.774689,818.140320 113.293663,832.419250 
	C129.802017,899.405334 171.565918,943.445679 237.078491,964.913208 
	C259.984436,972.419128 283.720459,972.776733 308.499695,972.425476 
z"/>
      <path fill="#BF0FFF" opacity="1.000000" stroke="none"
        d="
M307.999695,972.425537 
	C283.720459,972.776733 259.984436,972.419128 237.078491,964.913208 
	C171.565918,943.445679 129.802017,899.405334 113.293663,832.419250 
	C109.774689,818.140320 108.436676,802.989868 108.406700,788.236267 
	C108.069748,622.411743 108.130775,456.586243 108.219543,290.761078 
	C108.240288,252.016388 118.730301,216.191864 141.319183,184.601028 
	C167.821411,147.537323 203.454865,123.317230 248.066696,113.144905 
	C258.213867,110.831161 268.740814,109.767097 279.154053,109.136688 
	C293.556732,108.264755 308.017181,108.072182 322.453094,108.065613 
	C479.278717,107.994308 636.105164,107.745125 792.929504,108.198524 
	C833.497375,108.315819 870.416565,120.996559 902.765686,146.187103 
	C937.439697,173.188110 959.178894,208.357620 968.628479,250.949844 
	C971.465759,263.738373 972.629700,277.146729 972.649719,290.274017 
	C972.903809,456.598816 972.926331,622.924255 972.735413,789.249268 
	C972.673035,843.608948 952.987610,889.888672 912.566833,926.540222 
	C886.620544,950.067078 856.023987,964.819336 821.201233,969.862427 
	C809.904785,971.498413 798.389648,972.317322 786.973389,972.328247 
	C627.482300,972.480652 467.990967,972.428101 307.999695,972.425537 
M421.866730,679.670532 
	C413.112610,667.016296 401.701996,657.606934 387.504150,651.637024 
	C385.419250,650.760254 383.950317,650.106812 384.207916,647.100098 
	C387.414520,609.675720 397.555542,574.184509 414.523224,540.774841 
	C426.893555,516.417419 442.592621,494.268463 461.366211,474.291656 
	C480.660583,453.760651 502.427185,436.349762 526.712891,422.230499 
	C554.927979,405.826721 585.115479,394.320190 617.299683,388.467560 
	C628.160583,386.492554 639.149048,385.219299 649.935242,383.646301 
	C650.986694,386.119568 651.611755,387.653992 652.286011,389.166412 
	C668.308228,425.107727 708.909302,443.606049 746.761108,432.215393 
	C784.605286,420.827087 808.331848,382.839478 801.772522,344.139008 
	C795.717407,308.413422 767.844543,282.768158 730.428406,278.496613 
	C697.851257,274.777527 664.391357,295.254303 651.335266,327.181641 
	C649.883179,330.732452 647.950012,331.756927 644.396057,332.059601 
	C634.793335,332.877472 625.144592,333.655518 615.662659,335.304138 
	C571.514893,342.980164 530.197021,358.243256 492.055176,381.956207 
	C463.301117,399.832703 437.608673,421.358490 415.373383,446.825439 
	C393.773926,471.564148 375.958496,498.825165 362.223694,528.791321 
	C345.270782,565.778564 335.005646,604.408752 331.985260,644.958618 
	C331.745148,648.181946 330.740479,649.870483 327.581238,651.170105 
	C294.080902,664.951355 275.031067,697.288940 278.868835,733.472595 
	C283.579956,777.890808 327.319946,810.153259 371.053619,801.467529 
	C427.263580,790.304138 453.334747,728.596130 421.866730,679.670532 
z"/>
      <path fill="#FFFEFF" opacity="1.000000" stroke="none"
        d="
M422.062012,679.971985 
	C453.334747,728.596130 427.263580,790.304138 371.053619,801.467529 
	C327.319946,810.153259 283.579956,777.890808 278.868835,733.472595 
	C275.031067,697.288940 294.080902,664.951355 327.581238,651.170105 
	C330.740479,649.870483 331.745148,648.181946 331.985260,644.958618 
	C335.005646,604.408752 345.270782,565.778564 362.223694,528.791321 
	C375.958496,498.825165 393.773926,471.564148 415.373383,446.825439 
	C437.608673,421.358490 463.301117,399.832703 492.055176,381.956207 
	C530.197021,358.243256 571.514893,342.980164 615.662659,335.304138 
	C625.144592,333.655518 634.793335,332.877472 644.396057,332.059601 
	C647.950012,331.756927 649.883179,330.732452 651.335266,327.181641 
	C664.391357,295.254303 697.851257,274.777527 730.428406,278.496613 
	C767.844543,282.768158 795.717407,308.413422 801.772522,344.139008 
	C808.331848,382.839478 784.605286,420.827087 746.761108,432.215393 
	C708.909302,443.606049 668.308228,425.107727 652.286011,389.166412 
	C651.611755,387.653992 650.986694,386.119568 649.935242,383.646301 
	C639.149048,385.219299 628.160583,386.492554 617.299683,388.467560 
	C585.115479,394.320190 554.927979,405.826721 526.712891,422.230499 
	C502.427185,436.349762 480.660583,453.760651 461.366211,474.291656 
	C442.592621,494.268463 426.893555,516.417419 414.523224,540.774841 
	C397.555542,574.184509 387.414520,609.675720 384.207916,647.100098 
	C383.950317,650.106812 385.419250,650.760254 387.504150,651.637024 
	C401.701996,657.606934 413.112610,667.016296 422.062012,679.971985 
M700.997803,369.302643 
	C708.611877,381.726715 721.818726,386.357483 734.381531,381.008026 
	C746.365845,375.904968 752.815002,362.678711 749.401733,350.204041 
	C745.320251,335.287140 729.754517,327.080475 715.257996,332.202728 
	C700.524048,337.408844 694.085144,353.473236 700.997803,369.302643 
M345.160858,747.518433 
	C355.328491,752.069519 365.027008,751.292053 373.655701,744.160461 
	C381.785553,737.441040 384.688782,728.490417 382.407928,718.209961 
	C379.814423,706.520264 369.712585,698.267700 358.283386,697.994141 
	C345.591797,697.690308 335.378204,704.855103 331.853516,716.534607 
	C328.243591,728.496277 333.032227,740.091980 345.160858,747.518433 
z"/>
    </svg>)
};