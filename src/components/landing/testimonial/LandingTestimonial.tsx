import clsx from 'clsx';
import { BadgeCheck } from 'lucide-react';
import Image from '@/components/shared/Image';

export interface TestimonialItem {
  className?: string;
  url?: string;
  text: string;
  imageSrc: string;
  name: string;
  handle: string;
  featured?: boolean;
  verified?: boolean;
  size?: 'full' | 'half' | 'third'; // NB: Only applies to testimonials in a list, not grid.
}

/**
 * Shows a testimonial with an image, name, and handle.
 *
 * Meant to be used with a `LandingTestimonialList` or `LandingTestimonialGrid`.
 */
export const LandingTestimonial = ({
  className,
  url,
  text,
  imageSrc,
  name,
  handle,
  featured,
  verified = true,
}: TestimonialItem) => {
  const missingUrl = !url || url === '#';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'inline-block w-full rounded-2xl bg-white shadow-md ring-1 ring-gray-900/5 dark:bg-neutral-900',
        featured ? 'shadow-xl' : 'p-6',
        missingUrl
          ? 'pointer-events-none cursor-default'
          : 'cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800',
        className,
      )}
    >
      <figure>
        <blockquote
          className={clsx(
            'text-gray-900 dark:text-gray-100',
            featured
              ? 'p-6 text-lg font-semibold leading-7 tracking-tight sm:text-xl sm:leading-8'
              : '',
          )}
        >
          <p className="whitespace-pre-line">{`“${text}”`}</p>
        </blockquote>

        <figcaption
          className={clsx(
            'flex items-center gap-x-4',
            featured
              ? 'flex-wrap gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap'
              : 'mt-6',
          )}
        >
          <Image
            width={100}
            height={100}
            className="size-10 flex-none rounded-full bg-gray-50"
            src={imageSrc}
            alt=""
          />
          <div className="flex-auto">
            <div className="flex items-center gap-0.5 font-semibold">
              {name}{' '}
              {verified && (
                <BadgeCheck className="size-4 shrink-0 fill-blue-500 text-white" />
              )}
            </div>
            <div className="text-gray-600">{`${handle}`}</div>
          </div>
        </figcaption>
      </figure>
    </a>
  );
};
