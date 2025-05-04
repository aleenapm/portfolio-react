"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import image from '@/components/assets/aleena.jpg'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Split text animation for the heading
      const heading = sectionRef.current?.querySelector(".about-heading")
      if (heading) {
        const chars = heading.textContent?.split("") || []
        heading.textContent = ""

        chars.forEach((char) => {
          const span = document.createElement("span")
          span.textContent = char
          span.className = "inline-block"
          heading.appendChild(span)
        })

        gsap.fromTo(
          heading.querySelectorAll("span"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.5,
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
            },
          },
        )
      }

      // Image and content reveal
      gsap.fromTo(
        ".about-image",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".about-content",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".about-content",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="about-heading text-3xl md:text-4xl font-bold text-center mb-16">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-image relative">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border border-primary/20">
              <Image
                src={image}
                alt="Aleena P M"
                width={450}
                height={400}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>

          <div className="about-content space-y-6">
            <h3 className="text-2xl font-semibold">
              A passionate <span className="text-primary">MERN stack developer</span> with a creative edge
            </h3>

            <p className="text-muted-foreground">
              I'm Aleena, a full-stack developer specializing in building exceptional digital experiences. With a strong
              foundation in the MERN stack (MongoDB, Express.js, React, and Node.js), I create dynamic and user-friendly
              web applications that solve real-world problems.
            </p>

            <p className="text-muted-foreground">
              My journey in web development began with a curiosity about how things work on the internet. That curiosity
              evolved into a passion for crafting clean, efficient, and scalable code. I believe in writing code that is
              not only functional but also maintainable and readable.
            </p>

            <p className="text-muted-foreground">
            When I'm not coding, you can find me exploring emerging technologies, brainstorming new project ideas, 
            or refining my skills through tech articles, tutorials, and hands-on experiments.
            </p>

            <Button className="mt-4" asChild>
              <a href="https://drive.google.com/file/d/1SWh3LtFADOn8REEwXX-KlG2jb4xmefoo/view?usp=drive_link"
               target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" /> View Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
