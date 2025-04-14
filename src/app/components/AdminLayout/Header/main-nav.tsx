/**
 *
 * Header
 *
 */
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from 'utils/twm';
interface Props {
  className?: string;
}

export const MainNav = memo((props: Props) => {
  return (
    <nav
      className={cn(
        'flex items-center space-x-4 lg:space-x-6',
        props.className,
      )}
      {...props}
    ></nav>
  );
});
