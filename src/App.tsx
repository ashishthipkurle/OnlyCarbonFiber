import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { HelmetProvider } from "react-helmet-async";

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
