"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Layout, Server, Settings, Smartphone } from "lucide-react"

const skills = [
  {
    id: 1,
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with modern frameworks and libraries.",
    icon: Layout,
    items: ["React.js", "HTML5", "CSS3", "JavaScript/TypeScript", "Redux"],
  },
  {
    id: 2,
    title: "Backend Development",
    description: "Creating robust server-side applications and RESTful APIs.",
    icon: Server,
    items: ["Node.js", "Express.js", "REST API", "Authentication", "Authorization"],
  },
  {
    id: 3,
    title: "Database Management",
    description: "Designing and implementing efficient database structures.",
    icon: Database,
    items: ["MongoDB", "MySQL", "Firebase", "Redis"],
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Crafting intuitive and visually appealing user experiences.",
    icon: Smartphone,
    items: ["Responsive Design", "Figma", "Prototyping"],
  },
  {
    id: 5,
    title: "Deployment",
    description: "Automating workflows and deploying applications to production.",
    icon: Settings,
    items: ["Git/GitHub", "AWS", "Vercel", "Netlify"],
  },
  {
    id: 6,
    title: "Programming Languages",
    description: "Proficient in multiple programming languages for various use cases.",
    icon: Code,
    items: ["JavaScript", "React", "TypeScript", "HTML", "CSS"],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        ".skills-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".skills-heading",
            start: "top 80%",
          },
        },
      )

      // Staggered animation for skill cards
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="section py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="skills-heading text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise in various domains of web development.
          </p>
        </div>

        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <Card key={skill.id} className="skill-card border border-primary/10 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <skill.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{skill.title}</h3>
                </div>

                <p className="text-muted-foreground mb-4">{skill.description}</p>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
