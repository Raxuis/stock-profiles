import clsx from 'clsx';
import Image from '@/components/shared/Image';
import { GlowBg } from '@/components/shared/ui/glow-bg';
import { VideoPlayer } from '@/components/shared/VideoPlayer';

const LandingPrimaryCtaContent = ({
  className,
  childrenClassName,
  textPosition = 'left',
  title,
  titleComponent,
  description,
  descriptionComponent,
  leadingComponent,
  children,
}: {
  className?: string;
  childrenClassName?: string;
  textPosition?: 'center' | 'left';
  title: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  leadingComponent?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        textPosition === 'center'
          ? 'items-center text-center'
          : 'justify-center',
        className,
      )}
    >
      {leadingComponent}

      {title ? (
        <h1 className="lg:leading-14 text-4xl font-semibold md:max-w-xl lg:text-5xl">
          {title}
        </h1>
      ) : (
        titleComponent
      )}

      {description ? (
        <p className="md:max-w-lg md:text-lg">{description}</p>
      ) : (
        descriptionComponent
      )}

      <div
        className={clsx(
          'mt-2 flex flex-wrap gap-4',
          textPosition === 'center' ? 'justify-center' : 'justify-start',
          childrenClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};

/**
 * A component meant to be used in the landing page as the primary Call to Action section.
 *
 * A section that shows a title, description and an image.
 * Optionally, it can have actions (children), leading components and a background glow.
 */
export const LandingPrimaryImageCtaSection = ({
  children,
  className,
  innerClassName,
  title,
  titleComponent,
  description,
  descriptionComponent,
  leadingComponent,
  footerComponent,
  textPosition = 'left',
  imageSrc,
  imageAlt = '',
  imagePosition = 'right',
  imagePerspective = 'none',
  imageShadow = 'hard',
  minHeight = 350,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant = 'primary',
}: {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  title: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  leadingComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
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
          ? 'bg-primary'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary'
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
          'relative flex w-full flex-col gap-8 p-6',
          imagePosition === 'center'
            ? 'container-narrow'
            : 'container-wide grid max-w-full items-center lg:grid-cols-2',
          textPosition === 'center' ? 'items-center' : 'items-start',
          innerClassName,
        )}
        style={{
          minHeight,
        }}
      >
        <LandingPrimaryCtaContent
          className={clsx(
            imagePosition === 'left' && 'lg:col-start-2 lg:row-start-1',
          )}
          title={title}
          titleComponent={titleComponent}
          description={description}
          descriptionComponent={descriptionComponent}
          textPosition={textPosition}
          leadingComponent={leadingComponent}
        >
          {children}
        </LandingPrimaryCtaContent>

        {imageSrc ? (
          <>
            {withBackgroundGlow ? (
              <div className="pointer-events-none absolute hidden size-full justify-center lg:flex ">
                <GlowBg
                  className={clsx(
                    'z-0 h-auto w-full dark:opacity-50 lg:w-1/2 ',
                    imagePosition === 'center' ? 'top-5' : ' -top-1/3',
                    imagePerspective === 'paper' ? 'opacity-70' : 'opacity-100',
                  )}
                  variant={backgroundGlowVariant}
                />
              </div>
            ) : null}

            {imagePosition === 'center' ? (
              <section className={clsx('mt-6 w-full md:mt-8 border-white border-2 rounded-lg border-opacity-30')}>
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
                  'relative z-10 w-full rounded-md',
                  imageShadow === 'soft' && 'shadow-md',
                  imageShadow === 'hard' && 'hard-shadow',
                  imagePerspective === 'left' && 'lg:perspective-left',
                  imagePerspective === 'right' && 'lg:perspective-right',
                  imagePerspective === 'bottom' && 'lg:perspective-bottom',
                  imagePerspective === 'bottom-lg' &&
                  'lg:perspective-bottom-lg',
                  imagePerspective === 'paper' &&
                  'lg:perspective-paper lg:ml-[7%]',
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

      {footerComponent}
    </section>
  );
};

/**
 * A component meant to be used in the landing page as the primary Call to Action section.
 *
 * A section that shows a title, description and a video.
 * Optionally, it can have actions (children), leading components and a background glow.
 */
export const LandingPrimaryVideoCtaSection = ({
  children,
  className,
  innerClassName,
  title,
  titleComponent,
  description,
  descriptionComponent,
  leadingComponent,
  footerComponent,
  textPosition = 'left',
  videoSrc,
  videoPoster,
  videoPosition = 'right',
  videoMaxWidth = 'none',
  videoShadow = 'hard',
  autoPlay = false,
  controls = false,
  loop = false,
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
  leadingComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  textPosition?: 'center' | 'left';
  videoSrc?: string;
  videoPoster?: string;
  videoPosition?: 'left' | 'right' | 'center';
  videoMaxWidth?: string;
  videoShadow?: 'none' | 'soft' | 'hard';
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
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
        withBackgroundGlow ? 'overflow-hidden' : '',
        className,
      )}
    >
      <div
        className={clsx(
          'relative flex w-full flex-col gap-8 p-6',
          videoPosition === 'center'
            ? 'container-narrow'
            : 'container-wide grid max-w-full items-center lg:grid-cols-2',
          textPosition === 'center' ? 'items-center' : 'items-start',
          innerClassName,
        )}
        style={{
          minHeight,
        }}
      >
        <LandingPrimaryCtaContent
          className={clsx(
            videoPosition === 'left' && 'lg:col-start-2 lg:row-start-1',
          )}
          title={title}
          titleComponent={titleComponent}
          description={description}
          descriptionComponent={descriptionComponent}
          textPosition={textPosition}
          leadingComponent={leadingComponent}
        >
          {children}
        </LandingPrimaryCtaContent>

        {videoSrc ? (
          <>
            {withBackgroundGlow ? (
              <div className="pointer-events-none absolute hidden size-full justify-center lg:flex">
                <GlowBg
                  className={clsx(
                    'z-0 h-auto w-full dark:opacity-50 lg:w-1/2',
                    videoPosition === 'center' ? 'top-5' : ' -top-1/3',
                  )}
                  variant={backgroundGlowVariant}
                />
              </div>
            ) : null}

            {videoPosition === 'center' ? (
              <section className={clsx('mt-6 w-full md:mt-8')}>
                <VideoPlayer
                  className={clsx(
                    'w-full overflow-hidden rounded-md',
                    videoShadow === 'soft' && 'shadow-md',
                    videoShadow === 'hard' && 'hard-shadow',
                  )}
                  poster={videoPoster}
                  src={videoSrc}
                  autoPlay={autoPlay}
                  controls={controls}
                  loop={loop}
                  maxWidth={videoMaxWidth}
                  variant={variant}
                />
              </section>
            ) : null}

            {videoPosition === 'left' || videoPosition === 'right' ? (
              <VideoPlayer
                className={clsx(
                  'w-full overflow-hidden rounded-md',
                  videoShadow === 'soft' && 'shadow-md',
                  videoShadow === 'hard' && 'hard-shadow',
                )}
                poster={videoPoster}
                src={videoSrc}
                autoPlay={autoPlay}
                controls={controls}
                loop={loop}
                maxWidth={videoMaxWidth}
                variant={variant}
              />
            ) : null}
          </>
        ) : null}
      </div>

      {footerComponent}
    </section>
  );
};

/**
 * A component meant to be used in the landing page as the primary Call to Action section.
 *
 * A section that shows a title & description.
 * Optionally, it can have actions (children) and a background.
 */
export const LandingPrimaryTextCtaSection = ({
  children,
  className,
  innerClassName,
  title,
  titleComponent,
  description,
  descriptionComponent,
  leadingComponent,
  footerComponent,
  textPosition = 'center',
  withBackground = false,
  variant = 'primary',
}: {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  leadingComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  textPosition?: 'center' | 'left';
  withBackground?: boolean;
  variant?: 'primary' | 'secondary';
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
        className,
      )}
    >
      <div
        className={clsx(
          'relative flex w-full flex-col gap-8 p-6',
          textPosition === 'center'
            ? 'container-narrow'
            : 'container-wide max-w-full',
          textPosition === 'center' ? 'items-center' : 'items-start',
          innerClassName,
        )}
      >
        <LandingPrimaryCtaContent
          className={clsx(
            textPosition === 'center' ? 'items-center' : 'items-start',
          )}
          childrenClassName={clsx(
            textPosition === 'center' ? 'flex-col items-center' : '',
          )}
          title={title}
          titleComponent={titleComponent}
          description={description}
          descriptionComponent={descriptionComponent}
          textPosition={textPosition}
          leadingComponent={leadingComponent}
        >
          {children}
        </LandingPrimaryCtaContent>
      </div>

      {footerComponent}
    </section>
  );
};
