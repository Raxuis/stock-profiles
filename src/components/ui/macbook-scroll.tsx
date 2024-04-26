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
      className="flex  min-h-[200vh] shrink-0 scale-[0.35] flex-col items-center justify-start py-0 [perspective:800px] sm:scale-50 md:scale-100  md:py-80"
    >
      <motion.h2
        style={{
          translateY: textTransform,
          opacity: textOpacity,
        }}
        className="mb-20 text-center text-3xl font-bold text-neutral-800 dark:text-white"
      >
        {title || (
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
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
      <div className="relative -z-10 h-[22rem] w-[32rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
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
          <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black"></div>
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
          alt="get-infos logo"
          fill
          className="absolute inset-0 size-full rounded-lg object-cover object-left-top"
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
      width="25%" className="mx-auto" viewBox="0 0 1079 1079" enable-background="new 0 0 1079 1079">
      <path fill="#000000" opacity="1.000000" stroke="none"
        d="
M607.000000,1080.000000 
	C404.689972,1080.000000 202.879959,1080.000000 1.034972,1080.000000 
	C1.034972,720.398193 1.034972,360.796387 1.034972,1.097292 
	C360.560242,1.097292 720.120483,1.097292 1079.840332,1.097292 
	C1079.840332,360.666595 1079.840332,720.333313 1079.840332,1080.000000 
	C922.462646,1080.000000 764.981323,1080.000000 607.000000,1080.000000 
M934.948669,635.500000 
	C934.949646,534.673889 934.913879,433.847717 934.988708,333.021637 
	C935.000732,316.776794 933.806030,300.686035 929.957947,284.892456 
	C921.034851,248.269394 902.943970,217.138412 874.604187,191.969360 
	C859.451355,178.511978 842.720581,167.806442 824.068970,160.011505 
	C802.785767,151.116745 780.544556,146.136719 757.547729,146.103958 
	C614.223083,145.899750 470.897827,145.895447 327.573486,146.177322 
	C314.364563,146.203293 300.882904,147.439285 288.005005,150.277878 
	C245.545883,159.636887 210.409439,181.502823 183.758698,215.962524 
	C158.700546,248.362946 146.176025,285.517914 146.115799,326.438171 
	C145.909271,466.762848 145.929962,607.088257 146.219421,747.412598 
	C146.248917,761.716919 147.596863,776.214172 150.186981,790.280518 
	C157.776688,831.498657 178.499695,865.512085 210.382553,892.406311 
	C244.506012,921.190247 284.438965,934.816711 328.969849,934.838196 
	C467.961548,934.905396 606.953552,934.975281 745.944702,934.686890 
	C760.798767,934.656067 775.889832,933.539856 790.454102,930.750610 
	C834.390320,922.336365 870.066528,899.699890 897.402649,864.399353 
	C923.525269,830.665955 935.170288,791.994751 934.986511,749.493164 
	C934.823608,711.829407 934.949463,674.164429 934.948669,635.500000 
z"/>
      <path fill="#00D4FE" opacity="1.000000" stroke="none"
        d="
M934.948242,636.000000 
	C934.949463,674.164429 934.823608,711.829407 934.986511,749.493164 
	C935.170288,791.994751 923.525269,830.665955 897.402649,864.399353 
	C870.066528,899.699890 834.390320,922.336365 790.454102,930.750610 
	C775.889832,933.539856 760.798767,934.656067 745.944702,934.686890 
	C606.953552,934.975281 467.961548,934.905396 328.969849,934.838196 
	C284.438965,934.816711 244.506012,921.190247 210.382553,892.406311 
	C178.499695,865.512085 157.776688,831.498657 150.186981,790.280518 
	C147.596863,776.214172 146.248917,761.716919 146.219421,747.412598 
	C145.929962,607.088257 145.909271,466.762848 146.115799,326.438171 
	C146.176025,285.517914 158.700546,248.362946 183.758698,215.962524 
	C210.409439,181.502823 245.545883,159.636887 288.005005,150.277878 
	C300.882904,147.439285 314.364563,146.203293 327.573486,146.177322 
	C470.897827,145.895447 614.223083,145.899750 757.547729,146.103958 
	C780.544556,146.136719 802.785767,151.116745 824.068970,160.011505 
	C842.720581,167.806442 859.451355,178.511978 874.604187,191.969360 
	C902.943970,217.138412 921.034851,248.269394 929.957947,284.892456 
	C933.806030,300.686035 935.000732,316.776794 934.988708,333.021637 
	C934.913879,433.847717 934.949646,534.673889 934.948242,636.000000 
M513.718750,852.873596 
	C515.883667,852.945557 518.055786,852.928894 520.212463,853.102722 
	C551.660400,855.637695 582.683777,852.711243 613.247986,845.255188 
	C682.920349,828.258850 740.513550,791.953674 785.343811,735.931091 
	C828.316833,682.229614 850.652100,620.615112 853.759705,552.053772 
	C855.000122,524.687744 852.281799,497.578156 845.999451,470.873047 
	C828.512756,396.540802 789.514099,336.020325 728.634888,289.980042 
	C682.620483,255.181320 630.632324,235.081284 573.185608,228.868530 
	C539.429626,225.217880 505.996094,226.939758 473.019562,234.456482 
	C401.206818,250.825607 341.721527,287.455505 295.631317,345.093475 
	C252.677826,398.808838 230.338379,460.418396 227.236298,528.979980 
	C225.921631,558.036865 228.731567,586.858826 236.148300,614.995972 
	C262.552856,715.168030 323.174194,786.558777 417.754517,828.801208 
	C447.954132,842.289307 479.907654,849.584534 513.718750,852.873596 
z"/>
      <path fill="#FEFE1D" opacity="1.000000" stroke="none"
        d="
M513.256042,852.848511 
	C479.907654,849.584534 447.954132,842.289307 417.754517,828.801208 
	C323.174194,786.558777 262.552856,715.168030 236.148300,614.995972 
	C228.731567,586.858826 225.921631,558.036865 227.236298,528.979980 
	C230.338379,460.418396 252.677826,398.808838 295.631317,345.093475 
	C341.721527,287.455505 401.206818,250.825607 473.019562,234.456482 
	C505.996094,226.939758 539.429626,225.217880 573.185608,228.868530 
	C630.632324,235.081284 682.620483,255.181320 728.634888,289.980042 
	C789.514099,336.020325 828.512756,396.540802 845.999451,470.873047 
	C852.281799,497.578156 855.000122,524.687744 853.759705,552.053772 
	C850.652100,620.615112 828.316833,682.229614 785.343811,735.931091 
	C740.513550,791.953674 682.920349,828.258850 613.247986,845.255188 
	C582.683777,852.711243 551.660400,855.637695 520.212463,853.102722 
	C518.055786,852.928894 515.883667,852.945557 513.256042,852.848511 
M762.733276,412.809387 
	C705.918274,314.410614 592.162598,265.608276 481.848846,290.924774 
	C346.395477,322.010620 258.931671,461.135620 290.414886,596.520691 
	C322.515991,734.562927 455.298584,819.694885 593.890381,791.090332 
	C703.125916,768.544739 786.950256,673.813599 795.854980,562.799744 
	C800.114624,509.696014 789.212830,459.902740 762.733276,412.809387 
z"/>
      <path fill="#1212D9" opacity="1.000000" stroke="none"
        d="
M762.899902,413.137634 
	C789.212830,459.902740 800.114624,509.696014 795.854980,562.799744 
	C786.950256,673.813599 703.125916,768.544739 593.890381,791.090332 
	C455.298584,819.694885 322.515991,734.562927 290.414886,596.520691 
	C258.931671,461.135620 346.395477,322.010620 481.848846,290.924774 
	C592.162598,265.608276 705.918274,314.410614 762.899902,413.137634 
M557.289734,528.872375 
	C547.670044,533.333923 537.823975,537.377808 528.520752,542.422974 
	C523.428223,545.184753 518.399353,548.959900 514.825623,553.457153 
	C504.427399,566.542786 511.179749,588.465637 526.624817,594.787598 
	C535.597900,598.460449 544.002808,597.441711 552.605347,594.003113 
	C581.479126,582.461853 608.019043,567.395630 628.554321,543.407227 
	C644.493347,524.787964 653.109985,503.416565 651.862244,478.579163 
	C650.478760,451.039673 640.642090,427.034027 621.970520,406.620514 
	C606.508301,389.715759 587.713379,378.424866 565.528687,373.061310 
	C536.917236,366.143982 509.470367,369.543365 483.572784,383.762390 
	C457.878845,397.869568 440.136566,418.876617 430.708099,446.580231 
	C424.833557,463.841461 437.500946,481.648163 454.696381,483.125610 
	C468.412109,484.304077 479.852448,477.020538 485.248352,462.794769 
	C489.318878,452.063385 496.122437,443.408630 505.445312,436.919739 
	C536.534790,415.281067 579.147766,428.874390 591.914917,464.531982 
	C598.036621,481.629303 596.118408,497.419861 581.881592,509.937775 
	C574.312561,516.592957 565.908691,522.298706 557.289734,528.872375 
M519.995544,702.499878 
	C520.886719,703.231812 521.774536,703.967896 522.669617,704.694946 
	C533.652527,713.615784 548.145569,713.370422 559.621643,704.070740 
	C568.929688,696.528076 571.731689,681.622070 566.020142,670.030945 
	C560.249512,658.319763 546.053650,651.856689 533.223511,655.404419 
	C513.336060,660.903442 504.939026,685.374878 519.995544,702.499878 
z"/>
      <path fill="#FDFD1D" opacity="1.000000" stroke="none"
        d="
M557.585693,528.652710 
	C565.908691,522.298706 574.312561,516.592957 581.881592,509.937775 
	C596.118408,497.419861 598.036621,481.629303 591.914917,464.531982 
	C579.147766,428.874390 536.534790,415.281067 505.445312,436.919739 
	C496.122437,443.408630 489.318878,452.063385 485.248352,462.794769 
	C479.852448,477.020538 468.412109,484.304077 454.696381,483.125610 
	C437.500946,481.648163 424.833557,463.841461 430.708099,446.580231 
	C440.136566,418.876617 457.878845,397.869568 483.572784,383.762390 
	C509.470367,369.543365 536.917236,366.143982 565.528687,373.061310 
	C587.713379,378.424866 606.508301,389.715759 621.970520,406.620514 
	C640.642090,427.034027 650.478760,451.039673 651.862244,478.579163 
	C653.109985,503.416565 644.493347,524.787964 628.554321,543.407227 
	C608.019043,567.395630 581.479126,582.461853 552.605347,594.003113 
	C544.002808,597.441711 535.597900,598.460449 526.624817,594.787598 
	C511.179749,588.465637 504.427399,566.542786 514.825623,553.457153 
	C518.399353,548.959900 523.428223,545.184753 528.520752,542.422974 
	C537.823975,537.377808 547.670044,533.333923 557.585693,528.652710 
z"/>
      <path fill="#FCFC1F" opacity="1.000000" stroke="none"
        d="
M519.786804,702.204834 
	C504.939026,685.374878 513.336060,660.903442 533.223511,655.404419 
	C546.053650,651.856689 560.249512,658.319763 566.020142,670.030945 
	C571.731689,681.622070 568.929688,696.528076 559.621643,704.070740 
	C548.145569,713.370422 533.652527,713.615784 522.669617,704.694946 
	C521.774536,703.967896 520.886719,703.231812 519.786804,702.204834 
z"/>
    </svg>
  );
};
