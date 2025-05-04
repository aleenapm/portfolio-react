"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import TechStackSection from "@/components/tech-stack-section"
import ContactSection from "@/components/contact-section"
import ThreeBackground from "@/components/three-background"

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Initialize smooth scrolling and animations
    const ctx = gsap.context(() => {
      // Reveal animations for sections
      gsap.utils.toArray<HTMLElement>(".section").forEach((section, i) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={mainRef} className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ThreeBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <TechStackSection />
        <ContactSection />
      </div>
    </main>
  )
}
