import { clsx } from 'clsx';
import { GlowBg } from '@/components/shared/ui/glow-bg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/ui/accordion';

export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

/**
 * A component meant to be used in the landing page.
 * It displays a collapsible list of frequently asked questions and their answers.
 */
export const LandingFaqCollapsibleSection = ({
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  faqItems,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
}: {
  className?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  faqItems: FaqItem[];
  withBackground?: boolean;
  withBackgroundGlow?: boolean;
  variant?: 'primary' | 'secondary';
  backgroundGlowVariant?: 'primary' | 'secondary';
}) => {
  return (
    <section
      className={clsx(
        'relative flex w-full flex-col items-center justify-center gap-8 py-12 lg:py-16',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        withBackgroundGlow ? 'overflow-hidden' : '',
        className,
      )}
    >
      {withBackgroundGlow ? (
        <div className="pointer-events-none absolute -bottom-1/2 hidden size-full justify-center lg:flex">
          <GlowBg
            className={clsx('z-0 h-auto w-full lg:w-2/3')}
            variant={backgroundGlowVariant}
          />
        </div>
      ) : null}

      <div className={clsx(className, 'container-narrow w-full p-6')}>
        {title ? (
          <h2 className="fancyHeading max-w-xs text-3xl font-semibold leading-tight sm:max-w-none md:text-4xl lg:text-5xl">
            {title}
          </h2>
        ) : (
          titleComponent
        )}

        {description ? (
          <p className="mt-6 md:text-xl">{description}</p>
        ) : (
          descriptionComponent
        )}

        <Accordion
          type="single"
          collapsible
          className="relative z-10 mt-12 w-full"
        >
          {faqItems.map((faqItem, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={clsx(
                withBackground && variant === 'primary'
                  ? 'border-primary-500/10'
                  : '',
                withBackground && variant === 'secondary'
                  ? 'border-secondary-500/10'
                  : '',
              )}
            >
              <AccordionTrigger className="text-left">
                {faqItem.question}
              </AccordionTrigger>
              <AccordionContent>{faqItem.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
