import { clsx } from 'clsx';
import { LandingFeature } from '@/components/landing/feature/LandingFeature';
import { GlowBg } from '@/components/shared/ui/glow-bg';

export interface FeatureListItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * A component meant to be used on the landing page.
 * It displays a grid list of features.
 *
 * Each feature has a title, description and icon.
 */
export const LandingFeatureList = ({
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  featureItems,
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
  featureItems: FeatureListItem[];
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
        <div className="absolute -bottom-1/2 hidden size-full justify-center lg:flex">
          <GlowBg
            className={clsx('z-0 h-auto w-full lg:w-2/3')}
            variant={backgroundGlowVariant}
          />
        </div>
      ) : null}

      <div
        className={clsx('container-wide relative z-10 w-full max-w-full p-6')}
      >
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

        <div className="mt-12 flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          {featureItems.map((featureItem, index) => (
            <LandingFeature
              key={index}
              title={featureItem.title}
              description={featureItem.description}
              icon={featureItem.icon}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
