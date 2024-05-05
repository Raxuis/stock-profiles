import clsx from 'clsx';
import { GiftIcon } from 'lucide-react';

/**
 * A component meant to be used in the landing page.
 *
 * Use this to show a discount or offer to encourage users to take action, typically used under call to action buttons.
 */
export const LandingDiscount = ({
  className,
  discountValueText = '$200 off',
  discountDescriptionText = '',
  animated = true,
}: {
  className?: string;
  discountValueText: string;
  discountDescriptionText?: string;
  animated?: boolean;
}) => {
  return (
    <p className={clsx('flex flex-wrap items-center gap-1 text-sm', className)}>
      <span className="flex shrink-0 items-center gap-1 text-green-500">
        <GiftIcon
          className={clsx(
            'relative -top-0.5 size-5',
            animated ? 'animate-pulse' : '',
          )}
        />{' '}
        <span className="font-bold">{discountValueText}</span>
      </span>{' '}
      {discountDescriptionText}
    </p>
  );
};
