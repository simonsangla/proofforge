"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { track } from "@vercel/analytics";

export function trackEvent(name: string, props?: Record<string, string>) {
  console.log(`[ANALYTICS] Event: ${name}`, { timestamp: new Date().toISOString(), ...props });
  try {
    track(name, props);
  } catch (e) {
    // Non-fatal if analytics isn't mounted
  }
}

interface TrackedLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  eventName: string;
}

export function TrackedLink({ 
  href, 
  eventName, 
  children, 
  className,
  ...props 
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventName, { href: href.toString() });
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}

interface TrackedButtonProps extends ComponentPropsWithoutRef<"button"> {
  eventName: string;
}

export function TrackedButton({ 
  eventName, 
  children, 
  className,
  ...props 
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackEvent(eventName);
    if (props.onClick) props.onClick(e);
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  );
}

