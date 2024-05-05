import React from 'react';
import { clsx } from 'clsx';

/**
 * A component meant to be used in the landing page.
 * A fullscreen, brand-colored section that displays a title, description and some product logos.
 *
 * It should be used to 'break' page flow & highlight content such as the product's tech features or an important selling point.
 */
export const LandingBandSection = ({
  children,
  className,
  title,
  titleComponent,
  description,
  descriptionComponent,
  supportingComponent,
  withBackground = true,
  variant = 'primary',
}: {
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  supportingComponent?: React.ReactNode;
  withBackground?: boolean;
  variant?: 'primary' | 'secondary';
}) => {
  return (
    <section
      className={clsx(
        'flex w-full items-center justify-center gap-6 p-2 md:p-6',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-100/60'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-100/60'
          : '',
        className,
      )}
    >
      <div className="container-wide w-full max-w-full items-center gap-6 p-6 lg:flex lg:flex-row">
        <div
          className={clsx(
            'flex w-full max-w-lg shrink-0 flex-col lg:w-auto xl:max-w-3xl',
            withBackground ? 'text-black' : '',
          )}
        >
          {title ? (
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              {title}
            </h2>
          ) : (
            titleComponent
          )}

          {description ? (
            <p className="text-lg">{description}</p>
          ) : (
            descriptionComponent
          )}

          {children}
        </div>

        <div
          className={clsx(
            'ml-auto mt-12 flex shrink gap-8 lg:mt-0 lg:max-w-lg lg:gap-12 xl:max-w-none',
            withBackground ? 'text-black' : '',
            className,
          )}
        >
          {supportingComponent}
        </div>
      </div>
    </section>
  );
};
