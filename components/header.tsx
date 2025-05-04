"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Animate header on load
    gsap.fromTo(".header", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 })

    // Handle scroll event for header background change
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`header fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="#home" className="text-2xl font-bold font-poppins tracking-tight">
          <span className="text-primary">A</span>leena<span className="text-primary">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
          <a
          href="https://drive.google.com/file/d/1SWh3LtFADOn8REEwXX-KlG2jb4xmefoo/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          >
          <Button className="ml-4">Resume</Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-foreground" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
            href="https://drive.google.com/file/d/1SWh3LtFADOn8REEwXX-KlG2jb4xmefoo/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Button className="mt-4 w-full">Resume</Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
