import clsx from 'clsx';
import { StarHalfIcon, StarIcon } from 'lucide-react';

/**
 * Shows a rating with stars.
 */
export const LandingRating = ({
  className,
  rating = 5,
  maxRating = 5,
  size = 'medium',
}: {
  className?: string;
  rating?: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
}) => {
  return (
    <div
      className={clsx('flex items-center gap-1', className)}
      aria-description={`Rating: ${rating} out of ${maxRating}`}
    >
      {Array.from({ length: maxRating }).map((_, index) => {
        return (
          <div
            key={index}
            className={clsx(
              size === 'small' ? 'size-3' : '',
              size === 'medium' ? 'size-4' : '',
              size === 'large' ? 'size-5' : '',
            )}
          >
            {
              // Return half star for half ratings
              rating % 1 !== 0 &&
              index === Math.floor(rating) &&
              index + 1 === Math.ceil(rating) ? (
                <div className="relative" key={index}>
                  <StarIcon
                    className="absolute left-0 top-0 size-full fill-gray-300 text-gray-300"
                    aria-hidden="true"
                  />

                  <StarHalfIcon
                    className="relative z-10 size-full fill-yellow-400 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <StarIcon
                  key={index}
                  className={clsx('size-full', {
                    'text-yellow-400 fill-yellow-400': index < rating,
                    'text-gray-300 fill-gray-300': index >= rating,
                  })}
                  aria-hidden="true"
                />
              )
            }
          </div>
        );
      })}
    </div>
  );
};
