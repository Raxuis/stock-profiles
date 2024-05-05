import { clsx } from 'clsx';

/**
 * A component meant to be used in the landing page.
 * It displays a grid of short testimonials.
 *
 * Use this to highlight short customer testimonials or reviews. These are not meant for reviews, but short validation and are usually support for a primary or secondary Call to action.
 */
export const LandingTestimonialInline = ({
  className,
  children,
  withBackground = false,
  variant = 'primary',
  containerType = 'ultrawide',
}: {
  className?: string;
  children?: React.ReactNode;
  withBackground?: boolean;
  variant?: 'primary' | 'secondary';
  containerType?: 'narrow' | 'wide' | 'ultrawide';
}) => {
  return (
    <section
      className={clsx(
        'flex w-full flex-col items-center justify-center gap-8 p-6 py-12 lg:py-16',
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
          'relative isolate grid gap-4 !p-0 md:grid-cols-2 lg:grid-cols-4',
          `${containerType}-container`,
        )}
      >
        {children}
      </div>
    </section>
  );
};
