import clsx from 'clsx';
import { Button } from '@/components/shared/ui/button';
import { GlowBg } from '@/components/shared/ui/glow-bg';

/**
 * A component meant to be used in the landing page.
 *
 * A simple section that shows a selling point and call to action button.
 */
export const LandingSaleCtaSection = ({
  children,
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  footerComponent,
  ctaHref = '#',
  ctaLabel,
  secondaryCtaHref = '#',
  secondaryCtaLabel,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
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

        <div className="mt-6 flex w-full flex-wrap items-center gap-4">
          {ctaLabel ? (
            <Button size="xl" asChild variant={variant} className="shrink-0">
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
              </a>
            </Button>
          ) : null}

          {secondaryCtaLabel ? (
            <Button
              className="shrink-0"
              size="xl"
              asChild
              variant={
                variant === 'primary' ? 'outlinePrimary' : 'outlineSecondary'
              }
            >
              <a
                href={secondaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {secondaryCtaLabel}
              </a>
            </Button>
          ) : null}

          {children}
        </div>

        {footerComponent}
      </div>
    </section>
  );
};
