import type { SVGProps } from "react";

export function SiteLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4" />
      <path d="M11 10v11" />
      <path d="M15 17H6" />
    </svg>
  );
}
