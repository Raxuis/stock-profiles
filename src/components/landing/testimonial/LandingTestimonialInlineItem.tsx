import { LandingRating } from '@/components/landing/rating/LandingRating';
import { LandingAvatar } from '@/components/landing/social-proof/LandingAvatar';
import { clsx } from 'clsx';

/**
 * Use this component to display a single testimonial inline. Use this to highlight short customer testimonials or reviews. are meant as short validation and are usually support for a primary or secondary Call to action.
 *
 * Can be used with the `LandingTestimonialInline` component.
 */
export const LandingTestimonialInlineItem = ({
  className,
  imageSrc,
  text,
  name,
  suffix,
}: {
  className?: string;
  imageSrc: string;
  text: string;
  name: string;
  suffix?: string;
}) => {
  return (
    <div className={clsx('flex flex-col text-center', className)}>
      <div className="flex items-center justify-center gap-2">
        <div className="shrink-0 opacity-90">
          <LandingAvatar
            imageSrc={imageSrc}
            name={name}
            size="large"
            className="rounded-full border-2 border-opacity-75"
          />
        </div>

        <div className="flex flex-col items-center truncate text-xs">
          <LandingRating rating={5} />

          {text ? (
            <p className="mt-2 w-full truncate text-gray-500" title={text}>
              &quot;{text}&quot;
            </p>
          ) : null}

          <p
            className="w-full truncate text-gray-500"
            title={`${name}${suffix ? `, ${suffix}` : ''}`}
          >
            <b>{name}</b>
            {suffix ? <>, {suffix}</> : null}
          </p>
        </div>
      </div>
    </div>
  );
};
