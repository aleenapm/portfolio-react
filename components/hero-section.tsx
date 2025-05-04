"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import image from '@/components/assets/linkedin.jpg'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered animation for hero elements
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(".hero-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.8 })
        .fromTo(".hero-subtitle", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
        .fromTo(".hero-description", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
        .fromTo(".hero-buttons", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")
        .fromTo(".hero-social", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.6")

      // Floating animation for the hero image container
      gsap.to(".hero-image", {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="home" className="section min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
              Hi, I'm <span className="text-primary">Aleena P M</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">MERN Stack Developer</span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl font-medium text-muted-foreground">
              I build exceptional digital experiences
            </p>

            <p className="hero-description text-muted-foreground max-w-lg">
              A passionate full-stack developer focused on creating dynamic and user-friendly web applications with
              modern technologies.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 pt-2">
              <Button size="lg" asChild>
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>

            <div className="hero-social flex items-center gap-6 pt-4">
              <Link
                href="https://github.com/aleenapm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={24} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/aleenapm/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              
            </div>
          </div>

          <div className="hero-image relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl"></div>
              <div className="relative z-10 w-full h-full rounded-full border border-primary/20 overflow-hidden flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 rounded-full overflow-hidden border-4 border-primary/30">
                  <Image 
                    src={image}
                    alt="Aleena P M" 
                    className="rounded-full object-cover"
                    fill
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 via-primary/20 to-primary/0 animate-pulse"></div>
                </div>
                <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}