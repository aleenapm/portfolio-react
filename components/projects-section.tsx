"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import zoul from "@/components/assets/zoul.jpg"
import ums from "@/components/assets/ums.png"
import olx from "@/components/assets/olx.png"
const projects = [
  {
    id: 1,
    title: "ZOUL",
    description:
      "A full-stack e-commerce platform with secure user authentication, product browsing, shopping cart, order placement, and Razorpay payment integration. It also includes an admin panel for managing products, orders, and users, enabling complete control over the platform.",
    image: zoul,
    tags: ["JavaScript", "Ejs", "Node.js", "MongoDB", "Express", "Nodemailer", "RazorPay", ],
    github: "https://github.com/aleenapm/zoulwebapp"
  },
  {
    id: 2,
    title: "User Management System",
    description:
      "A full-stack user management system with secure authentication, user registration, and profile management. Includes an admin dashboard for viewing, editing, and managing all users with role-based access control to ensure secure and organized user operations.",
    image: ums,
    tags: ["JavaScript","React", "Redux", "MongoDB", "TypeScript"],
    github: "https://github.com/aleenapm/react-ums"
  },
  {
    id: 3,
    title: "OLX Clone",
    description:
      "An OLX clone developed using React to enhance my frontend skills. It includes user authentication, ad posting, and dynamic product listings, with Context API for global state management and a fully responsive UI for smooth performance across devices.",
    image: olx,
    tags: ["HTML","CSS","JavaScript","React", "Firebase", "ContextAPI"],
    github: "https://github.com/aleenapm/OLX-Clone"
    
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 80%",
          },
        },
      )

      // Staggered animation for project cards
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="section py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="projects-heading text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise in building modern web
            applications.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="project-card overflow-hidden border border-primary/10 bg-card/50 backdrop-blur-sm"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>

              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Code
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="https://github.com/aleenapm?tab=repositories" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" /> View More on GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
