"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import react from "@/components/assets/React.png"
import nodejs from "@/components/assets/Node.js.png"
import express from "@/components/assets/Express.png"
import mongodb from "@/components/assets/MongoDB.png"
import js from "@/components/assets/JavaScript.png"
import ts from "@/components/assets/TypeScript.png"
import redux from "@/components/assets/Redux.png"
import html from "@/components/assets/HTML5.png"
import css from "@/components/assets/CSS3.png"
import vite from "@/components/assets/Vite.js.png"
import nginx from "@/components/assets/NGINX.png"
import git from "@/components/assets/Git.png"

const technologies = [
  { name: "React", image: react },
  { name: "Node.js", image: nodejs },
  { name: "MongoDB", image: mongodb },
  { name: "Express", image: express },
  { name: "JavaScript", image: js },
  { name: "TypeScript", image: ts },
  { name: "Redux", image: redux },
  { name: "HTML5", image: html },
  { name: "CSS3", image: css },
  { name: "Vite.js", image: vite },
  { name: "NGINX", image: nginx },
  { name: "Git", image: git },
]

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const techItemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".tech-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".tech-heading",
            start: "top 80%",
          },
        }
      )
      
      // Staggered animation for tech icons
      gsap.fromTo(
        ".tech-item",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".tech-grid",
            start: "top 80%",
          },
        }
      )
      
      // Add hover animations for each tech item
      techItemsRef.current.forEach((item) => {
        if (!item) return
        
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            y: -10,
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
            ease: "power2.out"
          })
          
          // Find and animate the image container
          const imageContainer = item.querySelector(".tech-image-container") as HTMLElement
          if (imageContainer) {
            gsap.to(imageContainer, {
              rotation: 5,
              duration: 0.4,
              ease: "elastic.out(1, 0.3)"
            })
          }
        })
        
        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.3,
            ease: "power2.out"
          })
          
          // Reset image container animation
          const imageContainer = item.querySelector(".tech-image-container") as HTMLElement
          if (imageContainer) {
            gsap.to(imageContainer, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            })
          }
        })
      })
    }, sectionRef)
    
    return () => ctx.revert()
  }, [])
  
  // Add tech items to refs
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !techItemsRef.current.includes(el)) {
      techItemsRef.current.push(el)
    }
  }
  
  return (
    <section ref={sectionRef} id="tech-stack" className="section py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="tech-heading text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These are the technologies I work with to bring ideas to life.
          </p>
        </div>
        <div className="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              ref={addToRefs}
              className="tech-item flex flex-col items-center justify-center p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-primary/10 backdrop-blur-sm transition-all duration-300 cursor-pointer"
              style={{ 
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                willChange: "transform, box-shadow" 
              }}
            >
              <div 
                className="tech-image-container relative w-16 h-16 mb-3 bg-white dark:bg-neutral-700 rounded-full p-2 flex items-center justify-center"
                style={{ transition: "transform 0.3s ease" }}
              >
                <Image
                  src={tech.image || "/placeholder.svg"}
                  alt={tech.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}