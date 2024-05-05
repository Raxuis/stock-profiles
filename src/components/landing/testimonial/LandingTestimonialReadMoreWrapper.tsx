'use client';
import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@/components/shared/ui/button';

/**
 * Wraps the testimonial section in the landing page, and adds a "Read more" button (truncates to the given height).
 */
export const LandingTestimonialReadMoreWrapper = ({
  children,
  className,
  size = 'lg',
  variant = 'primary',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div
      className={clsx(
        'relative flex w-full items-start justify-center overflow-hidden',
        className,

        size === 'lg'
          ? readMore
            ? 'h-auto'
            : 'h-[200vh] sm:h-[150vh] lg:h-[1200px] xl:h-[1100px]'
          : '',
        size === 'md'
          ? readMore
            ? 'h-auto'
            : 'h-[150vh] sm:h-screen lg:h-[800px] xl:h-[700px]'
          : '',
        size === 'sm'
          ? readMore
            ? 'h-auto'
            : 'h-screen sm:h-[50vh] lg:h-[600px] xl:h-[500px]'
          : '',
      )}
    >
      {children}

      {readMore ? null : (
        <>
          <div
            className={clsx(
              'pointer-events-none absolute bottom-0 left-0 z-20 h-2/5 w-full bg-gradient-to-t from-gray-100 via-gray-100/40 dark:from-gray-950 dark:via-gray-950/60',
            )}
          />
          <div className="absolute inset-x-0 bottom-12 z-20 flex items-center justify-center">
            <Button
              variant={variant}
              className="backdrop-blur-sm"
              onClick={() => setReadMore(true)}
            >
              Read more testimonials
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
