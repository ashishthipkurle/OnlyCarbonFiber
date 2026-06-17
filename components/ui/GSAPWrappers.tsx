"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const location = usePathname();

  useGSAP(() => {
    // Scroll to top on route change without animation to prevent scroll jumps mid-animation
    window.scrollTo(0, 0);
    
    gsap.fromTo(
      container.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, [location.pathname]);

  return <div ref={container}>{children}</div>;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: delay,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Trigger when top of section is 85% down the viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className={className}>
      {children}
    </section>
  );
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;
      // Clear the text initially
      textRef.current.innerHTML = "";
      gsap.to(textRef.current, {
        text: text,
        duration: text.length * 0.03, // Character by character speed
        ease: "none",
        delay: delay,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
        },
      });
    },
    { scope: textRef }
  );

  return <span ref={textRef} className={className}></span>;
}

export function Marquee({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      
      // We assume children contains the content duplicated twice
      gsap.to(track, {
        xPercent: -50, // Move left by 50% of the total width (since it's duplicated)
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap bg-[#1A1A1A] py-3 flex border-y border-[#333]">
      <div ref={trackRef} className="flex min-w-max">
        {/* We render children twice inside the implementation where we call Marquee to ensure seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
}

export function CounterNumber({
  endValue,
  suffix = "",
}: {
  endValue: number;
  suffix?: string;
}) {
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!numRef.current) return;
    
    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numRef.current,
        start: "top 90%",
      },
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.innerHTML = Math.floor(obj.val) + suffix;
        }
      },
    });
  }, []);

  return <span ref={numRef} className="font-['IBM_Plex_Mono'] font-medium">0{suffix}</span>;
}
