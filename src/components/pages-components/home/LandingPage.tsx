"use client";
import { ProblemsSection } from '@/components/pages-components/home/ProblemsSection';
import LandingSection from '@/components/pages-components/home/LandingSection';
import { BorderBeam } from '@/components/magicui/border-beam';
import Image from 'next/image';
import CompaniesStack from '@/components/CompaniesStack';
import { Cursor2 } from '@/components/cursor/CursorFunctions';
import { BorderBeamUser } from './BorderBeamUser';

export default function LandingPage() {
  return (
    <>
      <LandingSection />
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Cursor2 text="Website screenshot">
          <Image src="/stocks-profiles.png" alt="Hero Image" width={1000} height={500} className='size-full object-contain' priority />
          <BorderBeam size={250} duration={12} delay={9} />
        </Cursor2>
      </div>
      <ProblemsSection />
      <BorderBeamUser />
      <CompaniesStack />
    </>
  )
}
