import { Button } from '@/components/shared/ui/button';
import { LandingPrimaryImageCtaSection } from '@/components/landing/cta/LandingPrimaryCta';
import { LandingDiscount } from '@/components/landing/discount/LandingDiscount';
import { LandingProductHuntAward } from '@/components/landing/social-proof/LandingProductHuntAward';
import { LandingSocialProof } from '@/components/landing/social-proof/LandingSocialProof';
import { LandingSocialProofBand } from '@/components/landing/social-proof/LandingSocialProofBand';
import { LandingSocialProofBandItem } from '@/components/landing/social-proof/LandingSocialProofBandItem';
import { buttonVariants } from '@/components/ui/button';
const LandingSection = () => {
  return (
    <>
      {/* <LandingPrimaryImageCtaSection
        title="Stocks Profiles"
        description="Dive into detailed profiles of companies, exploring their financial performance, market trends, and potential investment opportunities. From stock history to analyst ratings, our platform offers a wealth of data to empower your investment decisions."
        imageSrc="/stocks-profiles.png"
        imageAlt="Stocks-Profile"
        withBackgroundGlow
      >
        <Button size="xl" asChild variant="destructive">
          <a href="#">
            Buy now
          </a>
        </Button>

        <Button size="xl" variant="outline">
          <a href="#">Read more</a>
        </Button>

        <LandingSocialProof
          className="mt-12 w-full"
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
      </LandingPrimaryImageCtaSection> */}

      <LandingPrimaryImageCtaSection
        title="Stocks Profiles"
        description="Dive into detailed profiles of companies, exploring their financial performance, market trends, and potential investment opportunities. From stock history to analyst ratings, our platform offers a wealth of data to empower your investment decisions."
        imageSrc="/stocks-profiles.png"
        imageAlt="Stocks-Profile"
        imagePosition="center"
        textPosition="center"
      >
        <Button size="xl" asChild variant="destructive">
          <a href="#">
            Buy now
          </a>
        </Button>

        <Button size="xl" variant="outline">
          <a href="#">Read more</a>
        </Button>

        <LandingSocialProof
          className="mt-6 w-full flex justify-center"
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

    </>
  )
}

export default LandingSection