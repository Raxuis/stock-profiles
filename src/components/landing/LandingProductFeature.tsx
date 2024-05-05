import clsx from 'clsx';
import Image from '@/components/shared/Image';
import { GlowBg } from '@/components/shared/ui/glow-bg';

/**
 * A component meant to be used in the landing page.
 * It displays a title, description and optionally, an image of a product's feature.
 *
 * The image could either be left, right or center (larger).
 * The image can either be shown in perspective or flat.
 * The section can have a background or not.
 */
export const LandingProductFeature = ({
  children,
  className,
  innerClassName,
  title,
  titleComponent,
  description,
  descriptionComponent,
  textPosition = 'left',
  imageSrc,
  imageAlt = '',
  imagePosition = 'right',
  imagePerspective = 'paper',
  imageShadow = 'hard',
  zoomOnHover = true,
  minHeight = 350,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
}: {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  textPosition?: 'center' | 'left';
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right' | 'center';
  imagePerspective?:
    | 'none'
    | 'left'
    | 'right'
    | 'bottom'
    | 'bottom-lg'
    | 'paper';
  imageShadow?: 'none' | 'soft' | 'hard';
  zoomOnHover?: boolean;
  minHeight?: number;
  withBackground?: boolean;
  withBackgroundGlow?: boolean;
  variant?: 'primary' | 'secondary';
  backgroundGlowVariant?: 'primary' | 'secondary';
}) => {
  return (
    <section
      className={clsx(
        'flex w-full flex-col items-center justify-center gap-8 py-12 lg:py-16',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        withBackgroundGlow || imagePerspective !== 'none'
          ? 'overflow-x-hidden'
          : '',
        imagePerspective === 'paper' ? 'md:pb-24' : '',
        className,
      )}
    >
      <div
        className={clsx(
          'relative flex w-full flex-col items-center p-6',
          imagePosition === 'center'
            ? 'container-narrow'
            : 'container-wide grid max-w-full lg:grid-cols-2',
          innerClassName,
        )}
        style={{
          minHeight,
        }}
      >
        <div
          className={clsx(
            'flex flex-col gap-4',
            imagePosition === 'left' && 'lg:col-start-2 lg:row-start-1',
            textPosition === 'center'
              ? 'items-center text-center md:max-w-lg'
              : 'items-start',
          )}
        >
          {title ? (
            <h2 className="text-4xl font-semibold">{title}</h2>
          ) : (
            titleComponent
          )}

          {description ? (
            <p className="mt-4 md:text-xl">{description}</p>
          ) : (
            descriptionComponent
          )}

          {children}
        </div>

        {imageSrc ? (
          <>
            {withBackgroundGlow ? (
              <div className="pointer-events-none absolute hidden size-full justify-center lg:flex">
                <GlowBg
                  className={clsx(
                    'z-0 h-auto w-full dark:opacity-50 lg:w-1/2',
                    imagePosition === 'center' ? 'top-5' : ' -top-1/3',
                    imagePerspective === 'paper' ? 'opacity-70' : 'opacity-100',
                  )}
                  variant={backgroundGlowVariant}
                />
              </div>
            ) : null}

            {imagePosition === 'center' ? (
              <section className="mt-auto w-full pt-4 md:pt-6">
                <Image
                  className={clsx(
                    'w-full overflow-hidden rounded-md',
                    imageShadow === 'soft' && 'shadow-md',
                    imageShadow === 'hard' && 'hard-shadow',
                  )}
                  src={imageSrc}
                  alt={imageAlt}
                  width={minHeight + 75}
                  height={minHeight + 75}
                />
              </section>
            ) : null}

            {imagePosition === 'left' || imagePosition === 'right' ? (
              <Image
                className={clsx(
                  'relative w-full rounded-md',
                  zoomOnHover
                    ? 'transition-all hover:scale-100 lg:scale-90'
                    : '',
                  imageShadow === 'soft' && 'shadow-md',
                  imageShadow === 'hard' && 'hard-shadow',
                  imagePosition === 'left' && 'lg:-left-6',
                  imagePosition === 'right' && 'lg:-right-6',
                  imagePerspective === 'left' && 'lg:perspective-left',
                  imagePerspective === 'right' && 'lg:perspective-right',
                  imagePerspective === 'bottom' && 'lg:perspective-bottom',
                  imagePerspective === 'bottom-lg' &&
                    'lg:perspective-bottom-lg',
                  imagePerspective === 'paper' &&
                    'lg:perspective-paper hover:scale-90',
                  imagePerspective === 'none' ? 'my-4' : 'my-8',
                )}
                alt={imageAlt}
                src={imageSrc}
                width={minHeight + 75}
                height={minHeight + 75}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
};
