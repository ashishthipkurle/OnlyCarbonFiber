"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from 'next/link';
;
import { Loader2, Check } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isAnimatedAdd?: boolean; // For the "Add to Cart" GSAP sequence
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  isAnimatedAdd,
  onClick,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [addState, setAddState] = useState<"idle" | "loading" | "added">("idle");

  const baseClasses =
    "inline-flex items-center justify-center font-['Jost'] transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#1A1A1A] text-white hover:bg-[#333333]",
    secondary: "bg-[#F4F4F4] text-[#1A1A1A] hover:bg-[#E8E8E8]",
    outline: "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white",
    ghost: "text-[#1A1A1A] hover:bg-[#F9F9F9]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  // Simple hover animation for non-animated-add buttons
  useGSAP(() => {
    if (!buttonRef.current || isAnimatedAdd) return;
    const btn = buttonRef.current;
    
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(btn, { scale: 1.02, duration: 0.2, ease: "power1.out" });

    const handleEnter = () => hoverTl.play();
    const handleLeave = () => hoverTl.reverse();

    btn.addEventListener("mouseenter", handleEnter);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleEnter);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, [isAnimatedAdd]);

  const handleAnimatedAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (addState !== "idle") return;
    if (onClick) onClick(e);
    
    setAddState("loading");
    
    const btn = buttonRef.current;
    if (!btn) return;

    // Sequence: compress -> spinner -> "Added ✓" -> reset
    const tl = gsap.timeline();
    
    tl.to(btn, { scale: 0.95, duration: 0.1 })
      .to(btn, { scale: 1, duration: 0.1 })
      // Simulate network request
      .to({}, { duration: 1, onComplete: () => setAddState("added") })
      // Revert after showing added
      .to({}, { duration: 1.5, onComplete: () => setAddState("idle") });
  };

  const content = isAnimatedAdd ? (
    <div className="relative flex items-center justify-center w-full min-w-[120px]">
      <span className={`transition-opacity duration-200 ${addState === "idle" ? "opacity-100" : "opacity-0 absolute"}`}>
        {children}
      </span>
      <Loader2 className={`animate-spin transition-opacity duration-200 ${addState === "loading" ? "opacity-100" : "opacity-0 absolute"}`} size={20} />
      <span className={`flex items-center gap-2 transition-opacity duration-200 text-[#2D7A4F] ${addState === "added" ? "opacity-100" : "opacity-0 absolute"}`}>
        <Check size={18} /> Added
      </span>
    </div>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} ref={buttonRef as any} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as any}
      className={classes}
      onClick={isAnimatedAdd ? handleAnimatedAdd : onClick}
      {...props}
    >
      {content}
    </button>
  );
}
