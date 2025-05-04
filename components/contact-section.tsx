"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Send } from "lucide-react"
import emailjs from "@emailjs/browser"
import { toast, Toaster } from "sonner"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

    const templateParams = {
      name: formState.name,
      email: formState.email,
      subject: formState.subject,
      message: formState.message,
    }

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response)
        // Show success toast
        toast.success("Message Sent!", {
          description: "Thank you for your message! I'll get back to you soon.",
          duration: 5000,
        })
        setFormState({ name: "", email: "", subject: "", message: "" })
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error sending email:", error)
        // Show error toast
        toast.error("Failed to Send", {
          description: "Oops! Something went wrong. Please try again later.",
          duration: 5000,
        })
        setIsLoading(false)
      })
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 80%",
          },
        }
      )

      gsap.fromTo(
        ".contact-info",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-container",
            start: "top 80%",
          },
        }
      )

      gsap.fromTo(
        ".contact-form",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-container",
            start: "top 80%",
          },
        }
      )

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Toaster component positioned at bottom right corner */}
      <div className="fixed bottom-0 right-0 z-[9999]">
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              backgroundColor: "#121212", // Matte black
              border: "1px solid #8B5CF6", // Violet border
              color: "#A78BFA", // Violet text
              maxWidth: "90vw", // Limit width on small screens
              margin: "0", // Remove center alignment
              marginRight: "16px", // Add some space from the right edge
              marginBottom: "16px", // Add some space from the bottom edge
            },
            // Responsive styling
            className: "max-w-md mx-auto", // Tailwind classes for responsive width
            success: {
              style: {
                backgroundColor: "#121212",
                border: "1px solid #8B5CF6",
                color: "#A78BFA",
              },
              icon: '✓',
            },
            error: {
              style: {
                backgroundColor: "#121212",
                border: "1px solid #8B5CF6",
                color: "#A78BFA",
              },
              icon: '✕',
            },
          }}
        />
      </div>

      <section ref={sectionRef} id="contact" className="section py-20 md:py-32 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="contact-heading text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
            </p>
          </div>

          <div className="contact-container grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="contact-info space-y-8">
              <Card className="border border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:aleenaallu2003@gmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          aleenaallu2003@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">Kochi, Kerala, India</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground">
                      I'm currently open to freelance opportunities, full-time positions, and interesting projects. Let's
                      create something amazing together!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="contact-form">
              <Card className="border border-primary/10 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Sending..." : <>
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </>}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}