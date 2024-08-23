/* eslint-disable @next/next/no-img-element */
"use client";
import { ProblemsSection } from '@/components/pages-components/home/ProblemsSection';
import LandingSection from '@/components/pages-components/home/LandingSection';
import { BorderBeam } from '@/components/magicui/border-beam';
import Image from 'next/image';
import CompaniesStack from '@/components/CompaniesStack';

export default function LandingPage(props) {
  return (
    <>
      <LandingSection />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <img src="/stocks-profiles.png" alt="Hero Image" className='size-full object-contain' />
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
      <ProblemsSection />
      <CompaniesStack />
    </>
  )
}
