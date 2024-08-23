import { Button } from '@/components/shared/ui/button';
import { LandingPrimaryImageCtaSection } from '@/components/landing/cta/LandingPrimaryCta';
import { LandingSocialProof } from '@/components/landing/social-proof/LandingSocialProof';
import { motion } from 'framer-motion';
import { ConfettiButton } from './confetti';
import Link from 'next/link';
const LandingSection = () => {
  return (
    <motion.div
      initial={{
        y: -100
      }}
      whileInView={{
        y: 0
      }}
      transition={{ type: "spring", stiffness: 100 }}
      viewport={{ once: true }} >

      <LandingPrimaryImageCtaSection
        title="Stocks Profiles"
        description="Dive into detailed profiles of companies, exploring their financial performance, market trends, and potential investment opportunities. From stock history to analyst ratings, our platform offers a wealth of data to empower your investment decisions."
        imagePosition="center"
        textPosition="center"
      >
        <ConfettiButton asChild>
          <Link href={"/stock-profile"}>
            Try it now
          </Link>
        </ConfettiButton>

        <Button size="xl" variant="outline" asChild>
          <a href="/about">Read more</a>
        </Button>

        <LandingSocialProof
          className="mt-6 flex w-full justify-center"
          showRating
          numberOfUsers={23400}
          avatarItems={[
            {
              imageSrc: 'https://xsgames.co/randomusers/assets/avatars/male/53.jpg',
              name: 'Bryant Gerszewski',
            },
            {
              imageSrc: 'https://xsgames.co/randomusers/assets/avatars/male/51.jpg',
              name: 'Leopoldo Philipsen',
            },
            {
              imageSrc: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
              name: 'Jonathon Newkirk',
            },
          ]}
        />
      </LandingPrimaryImageCtaSection>

    </motion.div>
  )
}

export default LandingSection
