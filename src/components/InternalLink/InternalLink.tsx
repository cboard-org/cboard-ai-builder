'use client';
import React from 'react';
import LinkMUI from '@mui/material/Link';
import { LinkProps as LinkMUIProps } from '@mui/material';
import { LinkProps as NextLinkProps } from 'next/link';
import { Link as NextLink } from '@/navigation';

export default function InternalLink({
  href,
  children,
  ...props
}: LinkMUIProps & NextLinkProps) {
  return (
    <LinkMUI href={href} component={NextLink} {...props}>
      {children}
    </LinkMUI>
  );
}
