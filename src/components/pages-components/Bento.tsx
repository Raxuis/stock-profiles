"use client";
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import { buttonVariants } from '../ui/button';
import { ArrowTopRightIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Link } from 'next-view-transitions';
const Bento = () => {
  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4'>
        <HeaderBlock />
        <SocialBlock />
        <Block></Block>
        <Block></Block>
        <Block></Block>
        <Block></Block>
      </div>
    </div>
  )
}

export default Bento

type Props = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: Props) => {
  return <motion.div
    className={twMerge("col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6", className)} {...rest} />
}

const HeaderBlock = () => {
  return <Block className='col-span-12 row-span-2 max-md:col-span-6'>
    <Image src='/edited-raph.jpg' alt='raphael-avatar' priority={false} width={50} height={50} className='mb-4 size-14 rounded-full object-cover' />
    <h1 className='mb-12 text-2xl font-medium leading-tight'>
      Hi, I&apos;m Raphaël | Raxuis. {" "}
      <span className="text-zinc-400">
        A French junior Front End Developer 🇫🇷
      </span>
    </h1>
    <Link href='https://raphaelraclot.vercel.app/' className={buttonVariants(
      {
        variant: 'link',
        size: 'sm',
      }
    )}>Contact Me <ArrowTopRightIcon /> </Link>
  </Block>
}

const SocialBlock = () => {
  return (
    <>
      <Block className='col-span-6 bg-card md:col-span-3'>
        <Link href="https://www.x.com/i_haruki_i" className='grid h-full place-content-center text-3xl text-white'>
          <TwitterLogoIcon />
        </Link>
      </Block>
    </>
  );
}