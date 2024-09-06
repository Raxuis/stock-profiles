"use client";
import React from 'react'
import Image from "next/image"
import Link from "next/link";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <>
      <Link href="/" className="group flex flex-1 items-center gap-2">
        <Image src="/icon.png" priority width={30} height={30} alt="stocks-profiles-logo" className="duration-500 group-hover:scale-105" />
        <motion.p
          className="text-lg"
          animate={
            {
              opacity: 1,
              x: 0,
            }
          }
          initial={
            {
              opacity: 0,
              x: -20,
            }
          }
          transition={
            {
              duration: 0.5,
              ease: "easeInOut",
            }
          }>Stock Profiles</motion.p>
      </Link>
    </>
  )
}

export default Banner
