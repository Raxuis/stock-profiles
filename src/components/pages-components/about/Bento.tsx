"use client";
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { buttonVariants } from '../../ui/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { FaGithub, FaStackOverflow, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from 'next-view-transitions';
import ReactCountryFlag from "react-country-flag"
import { TextGenerateEffect } from "../../ui/text-generate-effect";

const Bento = () => {
  return (
    <div className='min-h-screen w-full py-12'>
      <motion.div initial="initial" animate="animate" transition={{
        staggerChildren: 0.1
      }} className='mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4'>
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <MoreAboutBlock title={'France'} description={'Location'}>
          <ReactCountryFlag countryCode="FR" svg style={{
            width: '50px',
            height: '50px',
          }} />
        </MoreAboutBlock>
        <MoreAboutBlock title={'Charles Leclerc'} description={'Favorite Formula Driver'}>
          <Image src='/charles-leclerc.webp' alt='charles-leclerc-avatar' priority={false} width={50} height={50} className='mb-4 size-14 rounded-full object-cover' />
        </MoreAboutBlock>
        <MoreAboutBlock title={'Mr Robot'} description={'Favorite TV Series'}>
          <Image src='/mrrobot.jpeg' alt='mr-robot-avatar' priority={false} width={50} height={50} className='mb-4 size-14 rounded-full object-cover' />
        </MoreAboutBlock>
        <MoreAboutBlock title={'LeBron James'} description={'Favorite NBA Player'}>
          <Image src='/lebron-james.png' alt='lebron-james-avatar' priority={false} width={50} height={50} className='mb-4 size-14 rounded-full object-cover' />
        </MoreAboutBlock>
      </motion.div>
    </div>
  )
}

export default Bento

type Props = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: Props) => {
  return <motion.div
    variants={{
      initial: {
        scale: 0.5,
        y: -50,
        opacity: 0,
      },
      animate: {
        scale: 1,
        y: 0,
        opacity: 1
      },
    }}
    transition={{
      type: 'spring',
      stiffness: 400,
      damping: 50,
      mass: 3
    }}
    className={twMerge("col-span-4 rounded-lg border p-6", className)} {...rest} />
}

const HeaderBlock = () => {
  const words = "Hi, I'm Raphaël | Raxuis. A Junior Front End Developer."
  return <Block className='col-span-12 row-span-2 md:col-span-6'>
    <Image src='/edited-raph.jpg' alt='raphael-avatar' priority={false} width={50} height={50} className='mb-4 size-14 rounded-full object-cover' />
    <TextGenerateEffect words={words} />
    <Link href='https://raphaelraclot.vercel.app/contact' className={buttonVariants(
      {
        variant: 'link',
        size: 'sm',
      }
    )}>Contact Me <ArrowTopRightIcon /> </Link>
  </Block>
}

const SocialsBlock = () => {
  return (
    <>
      <Block whileHover={{
        rotate: '-2.5deg',
        scale: 1.05
      }} className='col-span-6 bg-blue-500 md:col-span-3'>
        <a href="https://www.x.com/i_haruki_i" target='_blank' className='grid h-full place-content-center text-3xl text-white'>
          <FaTwitter />
        </a>
      </Block>
      <Block whileHover={{
        rotate: '2.5deg',
        scale: 1.05
      }} className='col-span-6 bg-card md:col-span-3'>
        <a href="https://github.com/raxuis" target='_blank' className='grid h-full place-content-center text-3xl text-white'>
          <FaGithub />
        </a>
      </Block>
      <Block whileHover={{
        rotate: '2.5deg',
        scale: 1.05
      }} className='col-span-6 bg-orange-500 md:col-span-3'>
        <a href="https://stackoverflow.com/users/22539453/haruki" target='_blank' className='grid h-full place-content-center text-3xl text-white'>
          <FaStackOverflow />
        </a>
      </Block>
      <Block whileHover={{
        rotate: '-2.5deg',
        scale: 1.05
      }} className='col-span-6 bg-red-500 md:col-span-3'>
        <a href="https://www.youtube.com/channel/UCni1RGwtSZXMZUzHeKukSjw" target='_blank' className='grid h-full place-content-center text-3xl text-white'>
          <FaYoutube />
        </a>
      </Block>
    </>
  );
}
const AboutBlock = () => {
  return (
    <Block className='col-span-12 text-2xl leading-snug'>
      <p>
        My passions are Basketball, Fitness, Formula 1, coding and cybersecurity. {" "}
        <span className='text-zinc-400'>
          I mainly code in React and Tailwind CSS. However, I&apos;m really curious so I&apos;ve already tried Prisma, NextJS, Svelte, PHP, Vanilla JavaScript, SCSS, Python, C, MySQL, Bash. Finally, for React, I use TypeScript for my code&apos;s safety.
        </span>
      </p>
    </Block>
  )
};


type MoreProps = {
  children?: React.ReactNode;
  title: string;
  description: string;
}

const MoreAboutBlock = ({ children, title, description }: MoreProps) => {
  return (
    <Block whileHover={{
      transform: 'translateY(+5px)'
    }} className='col-span-12 flex flex-col items-center justify-around gap-4 md:col-span-3'>
      {children}
      <div className='flex flex-col items-center'>
        <p className='text-xl text-zinc-400'>{title}</p>
        <p className='text-xs text-zinc-500'>{description}</p>
      </div>
    </Block>
  )
}
