import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Code,
  Zap,
  Users,
  Award,
  Send,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Terminal,
  Layers,
  Cloud,
  ArrowUpRight,
  MessageSquare,
  FileText,
  Workflow,
  Sparkles,
  Cpu,
  Database,
  Globe,
  Moon,
  Sun,
  Eye,
  EyeClosed,
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { blogPosts } from "@/data/blog-posts"

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isInView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function ModernPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExperience = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("https://formspree.io/f/xzzvlvpp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for your message! I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error("Failed to send message")
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error. Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" })
    }
  }

  const downloadCV = async () => {
    const url = "/Soe_Moe_Htet_CV.pdf"
    setSubmitStatus({ type: null, message: "Checking file..." })

    try {
      let res = await fetch(url, { method: "HEAD" })
      if (!res.ok) {
        res = await fetch(url, { method: "GET" })
      }

      if (!res.ok) {
        setSubmitStatus({
          type: "error",
          message: `CV not available (HTTP ${res.status}).`,
        })
        window.open(url, "_blank")
        return
      }

      const blobRes = await fetch(url)
      if (!blobRes.ok) {
        setSubmitStatus({
          type: "error",
          message: `Failed to fetch CV file (HTTP ${blobRes.status}).`,
        })
        return
      }

      const blob = await blobRes.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = "Soe_Moe_Htet_CV.pdf"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)

      setSubmitStatus({
        type: "success",
        message: "Download started!",
      })
    } catch (err) {
      console.error("downloadCV error:", err)
      setSubmitStatus({
        type: "error",
        message: "Network error while downloading CV.",
      })
      window.open(url, "_blank")
    }
  }

  const skills = {
    frontend: ["React.js", "Next.js", "Vue.js", "TypeScript"],
    backend: ["Node.js", "NestJS", "PHP", "Laravel"],
    tools: ["Git", "Docker", "AWS S3", "Digital Ocean", "WebSocket", "Firebase"],
    concepts: ["Clean Architecture", "Microservices", "System Design", "Design Patterns", "CI/CD", "CQRS", "EDA", "Idempotency", "Eventual Consistency"],
    leadership: ["Team Leadership", "Architecture Decision", "Code Review", "Mentoring", "Technical Strategy", "Agile/Scrum"],
  }

  const experiences = [
    {
      title: "Senior Backend Engineer",
      company: "Passion Geek (FreshMoe)",
      period: "12/2024 - Present",
      location: "Rangoon, Myanmar",
      type: "Full-time",
      description: [
        "Built FreshMoe, a multi-subdomain produce trading platform — freshmoe.com (core), supplier.freshmoe.com (supplier portal), b2b.freshmoe.com (B2B buyer portal), and franchise.freshmoe.com (franchise management).",
        "Spearheaded the transition from monolithic architecture to microservices, improving performance, scalability, and maintainability.",
        "Directed the migration from Laravel to Nest.js to deliver a more modular and efficient backend architecture.",
        "Architected and developed a multi-tier dashboard system: Root (BOD dashboards with full authorization access), Super Admin (controls and oversees all admin actions), HR, and Admin — with granular RBAC.",
        "Implemented hierarchical authorization — BOD (Root) holds full access across all modules, Super Admins monitor and control Admin actions with audit trails and approval workflows.",
        "Architected and implemented a Centralized Authentication Gateway (Hub-and-Spoke model) using Role-Based Redirection to securely manage access across multiple subdomains",
        "Designed dynamic, location-aware features with multi-country configuration support.",
        "Developed dedicated dashboards for B2B buyer management, supplier coordination, franchise store monitoring, and produce logistics workflows.",
        "Led design and implementation of CI/CD pipelines using Docker to automate deployment workflows.",
        "Mentored junior engineers on NestJS, Clean Architecture, and coding standards through regular code reviews and pair programming sessions.",
        "Collaborated with product and design teams to translate business requirements into technical specifications and architectural blueprints.",
      ],
      highlights: ["FreshMoe Platform", "Microservices", "Centralized Authentication"],
    },
    {
      title: "Mid Web Developer",
      company: "Hapeye Co. Ltd",
      period: "01/2024 - 11/2024",
      location: "Rangoon, Myanmar",
      type: "Full-time",
      description: [
        "Developed online tools and systems to streamline sales and content management, improving operational efficiency by 30%.",
        "Designed and implemented RESTful APIs and dashboard interfaces that enabled real-time sales tracking and content publishing for cross-functional teams.",
        "Led integration of third-party services and internal platforms to ensure seamless communication and reliable data workflows across systems.",
        "Optimized existing dashboards and management systems with performance improvements, reducing page load times and enabling better decision-making.",
        "Collaborated with stakeholders to define technical requirements and translate business needs into scalable software solutions.",
      ],
      highlights: ["API Design", "System Integration", "Performance Optimization"],
    },
    {
      title: "Junior Full Stack Developer",
      company: "Revelio",
      period: "01/2023 - 12/2023",
      location: "Rangoon, Myanmar",
      type: "Full-time",
      description: [
        "Designed and executed comprehensive test automation strategy across API routes, achieving 90%+ coverage and significantly reducing production defects.",
        "Led frontend feature development with Vue.js and Ant Design, building intuitive, responsive interfaces that improved user engagement metrics.",
        "Architected and executed a full database migration from MySQL to MongoDB, designing the data model and migration strategy to improve query performance by 40% and support horizontal scaling.",
        "Designed and built a unified delivery ecosystem from the ground up — admin dashboard for fleet management, shop-facing order app, and rider mobile interface — integrating the entire delivery lifecycle.",
      ],
      highlights: ["Test Automation", "DB Migration", "Delivery Ecosystem"],
    },
    {
      title: "Technical Consultant",
      company: "Self-employed",
      period: "02/2025 - Present",
      location: "Rangoon, Myanmar",
      type: "Contract",
      description: [
        "Designed and delivered robust backend solutions for local businesses using Laravel, Node.js, and Next.js, emphasizing scalable APIs, microservices, and enterprise-grade system architecture.",
        "Developed a Firebase-powered e-commerce platform using event-driven architecture with Laravel events, enabling real-time updates and decoupled workflows.",
        "Built a government Learning Management System (LMS) website leveraging structured system design to support large-scale user access and secure content delivery.",
        "Engineered internal management systems for government projects, including multi-vendor e-commerce platforms and POS solutions with modular, maintainable architecture.",
        "Developed a POS dashboard for rice-selling operations with clear workflows for inventory, sales, and reporting.",
        "Optimized deployment workflows using DigitalOcean, reducing server provisioning time for small-scale regional clients.",
        "Implemented WebSocket-driven real-time features for e-commerce platforms to enhance customer engagement and responsiveness.",
        "Advised clients on technology selection, system architecture, and development roadmaps — helping startups make informed technical decisions.",
      ],
      highlights: ["Event-driven", "Real-time", "Clean Architecture"],
    },
  ]

  const projects = [
    {
      title: "FreshMoe — Main Platform",
      description: "Architected the core platform with portfolio management, product catalog, analytics dashboards, and multi-channel marketing automation. Led a team of 3 engineers.",
      tech: ["NestJS", "PostgreSQL", "Redis", "Docker"],
      image: "🥬",
      size: "large",
      link: "https://freshmoe.com",
    },
    {
      title: "FreshMoe B2B Portal",
      description: "Designed and built the B2B buyer portal for restaurants, retailers, and wholesalers — catalog browsing, tier pricing, order placement, and payment tracking.",
      tech: ["Next.js", "NestJS", "PostgreSQL"],
      image: "🤝",
      size: "normal",
      link: "https://b2b.freshmoe.com",
    },
    {
      title: "FreshMoe Supplier Portal",
      description: "Architected the supplier-facing portal for produce listing, PO management, intake tracking, settlement review, and quality feedback — serving 50+ suppliers.",
      tech: ["Next.js", "NestJS", "WebSocket"],
      image: "📦",
      size: "normal",
      link: "https://supplier.freshmoe.com",
    },
    {
      title: "FreshMoe Franchise",
      description: "Architected the franchise management system with store onboarding, inventory distribution, revenue sharing, and franchisee reporting for 30+ franchise locations.",
      tech: ["React", "NestJS", "PostgreSQL"],
      image: "🏪",
      size: "large",
      link: "https://franchise.freshmoe.com",
    },
    {
      title: "FreshMoe POS",
      description: "Retail POS system for FreshMoe stores with scale integration, shelf-life tracking, per-store analytics, and real-time synchronization across franchise locations.",
      tech: ["React", "Node.js", "WebSocket"],
      image: "💳",
      size: "normal",
      link: "https://github.com/SoeMoeHtet18",
    },
    {
      title: "Multi-Tier Admin Dashboard",
      description: "Designed and built a multi-role RBAC system with Root (BOD), Super Admin, HR, and Admin levels — featuring granular permissions, audit trails, approval workflows, and full access logging.",
      tech: ["Next.js", "NestJS", "SSO"],
      image: "🔐",
      size: "normal",
      link: "https://github.com/SoeMoeHtet18",
    },
    {
      title: "Government LMS",
      description: "Architected a Learning Management System with secure content delivery, role-based access, and large-scale user support for a government agency serving thousands of concurrent learners.",
      tech: ["Next.js", "PostgreSQL", "AWS"],
      image: "🎓",
      size: "normal",
      link: "https://lms.mnhrc.org.mm",
    },
    {
      title: "Delivery Ecosystem",
      description: "Architected a unified delivery platform with admin dashboard, shop app, and rider integration — coordinating end-to-end delivery logistics.",
      tech: ["Vue.js", "MongoDB", "API"],
      image: "🚚",
      size: "large",
      link: "https://github.com/SoeMoeHtet18",
    },
  ]

  const stats = [
    { icon: Code, label: "Projects", value: "25+" },
    { icon: Users, label: "Clients", value: "15+" },
    { icon: Zap, label: "Experience", value: "3.5+ yrs" },
    { icon: Award, label: "Technologies", value: "15+" },
  ]

  const navigate = useNavigate()

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity group"
                >
                  SM<span className="text-[var(--accent-color)] group-hover:opacity-70">H</span>tet
                </button>

              <div className="hidden md:flex items-center gap-8">
                <button onClick={() => scrollToSection("about")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent-color)] after:transition-all hover:after:w-full">
                  About
                </button>
                <button onClick={() => scrollToSection("skills")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent-color)] after:transition-all hover:after:w-full">
                  Skills
                </button>
                <button onClick={() => scrollToSection("experience")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent-color)] after:transition-all hover:after:w-full">
                  Experience
                </button>
                <button onClick={() => scrollToSection("workflows")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent-color)] after:transition-all hover:after:w-full">
                  Workflows
                </button>
                <button onClick={() => scrollToSection("projects")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent-color)] after:transition-all hover:after:w-full">
                  Projects
                </button>
                <button onClick={() => scrollToSection("blog")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent-color)] after:transition-all hover:after:w-full">
                  Blog
                </button>
                <button onClick={() => scrollToSection("contact")} className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[var(--accent-color)] after:transition-all hover:after:w-full">
                  Contact
                </button>
              </div>

              <div className="flex gap-3 items-center">
                <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)}>
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.open("https://github.com/SoeMoeHtet18", "_blank")}>
                  <GitHubIcon />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => window.open("https://www.linkedin.com/in/smhtet182", "_blank")}>
                  <LinkedInIcon />
                </Button>
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-border">
                <div className="flex flex-col space-y-4 pt-4">
                  {["about", "skills", "experience", "workflows", "projects", "blog", "contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="text-muted-foreground hover:text-foreground transition-colors text-left capitalize text-sm font-medium"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Bento Grid */}
        <section id="hero" className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Main Hero Card */}
              <BentoCard className="md:col-span-2 md:row-span-2" delay={0}>
                <div className="bg-card border border-border rounded-3xl p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-5 h-5 text-[var(--accent-color)]" />
                      <span className="text-muted-foreground text-sm">Available for projects</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                      Soe Moe Htet
                    </h1>
                    <p className="text-xl text-muted-foreground mb-6">
                      Senior Software Engineer & Systems Architect
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Architecting scalable, high-performance systems with Clean Architecture principles. Leading teams to deliver enterprise-grade solutions — from microservices migrations and centralized authentication hubs to multi-tenant e-commerce platforms serving thousands of users.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button className="bg-[var(--accent-color)] hover:opacity-90 text-primary-foreground" onClick={() => scrollToSection("contact")}>
                      <Mail className="w-4 h-4 mr-2" />
                      Let&apos;s Connect
                    </Button>
                    <Button variant="outline" onClick={downloadCV}>
                      <Download className="w-4 h-4 mr-2" />
                      Download CV
                    </Button>
                  </div>
                </div>
              </BentoCard>

              {/* Profile Image */}
              <BentoCard className="md:col-span-1 md:row-span-1" delay={100}>
                <div className="bg-card border border-border rounded-3xl p-6 h-full flex items-center justify-center overflow-hidden">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-secondary">
                      <img width={256} height={256} src="/logo.png" alt="Soe Moe Htet" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                  </div>
                </div>
              </BentoCard>

              {/* Location Card */}
              <BentoCard className="md:col-span-1 md:row-span-1" delay={200}>
                <div className="bg-card border border-border rounded-3xl p-6 h-full flex flex-col justify-center">
                  <MapPin className="w-6 h-6 text-[var(--accent-color)] mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Based in</p>
                  <p className="font-semibold">Taungoo, Bago</p>
                  <p className="text-sm text-muted-foreground mt-2">Myanmar</p>
                </div>
              </BentoCard>

              {/* Stats Cards */}
              {stats.map((stat, index) => (
                <BentoCard key={index} delay={300 + index * 100}>
                  <div className="bg-card border border-border rounded-3xl p-6 h-full">
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mb-3">
                      <stat.icon className="w-5 h-5 text-[var(--accent-color)]" />
                    </div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </BentoCard>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BentoCard className="md:col-span-2" delay={0}>
                <div className="bg-card border border-border rounded-3xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-[var(--accent-color)]" />
                    </div>
                    <h2 className="text-2xl font-bold">About Me</h2>
                  </div>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      I&apos;m a senior software engineer passionate about architecting clean, scalable, and high-performance systems. My unique journey from medical sciences to software engineering gives me a disciplined, analytical approach to solving complex technical challenges — I see patterns others miss and design systems that stand the test of scale.
                    </p>
                    <p>
                      I specialize in backend architecture, microservices design, and leading engineering teams toward technical excellence. Over the past 3.5 years, I&apos;ve spearheaded major architectural migrations (monolith to microservices, MySQL to MongoDB, Laravel to NestJS), designed centralized authentication gateways serving multiple subdomains, built multi-tier RBAC systems with audit trails, and established engineering best practices that have significantly improved team velocity and code quality.
                    </p>
                    <p>
                      Beyond coding, I mentor developers in Clean Architecture and system design, drive technical strategy, and contribute to open-source projects. I believe in building systems that are not just functional but elegant — and teams that are not just productive but empowered.
                    </p>
                  </div>
                </div>
              </BentoCard>

              <BentoCard className="md:col-span-1" delay={200}>
                <div className="bg-card border border-border rounded-3xl p-8 h-full">
                  <h3 className="text-xl font-bold mb-6">Quick Facts</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Experience</span>
                      <span className="font-semibold text-sm">3.5+ Years</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground text-sm">Languages</span>
                      <span className="font-semibold text-sm">EN, MM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground text-sm">Education</span>
                      <span className="font-semibold text-sm text-right">CS @ UoP</span>
                    </div>
                    <div className="pt-4 space-y-2">
                      <p className="text-xs text-muted-foreground">M.B.B.S (2018-2022)</p>
                      <p className="text-xs text-muted-foreground">CS50 (2022)</p>
                      <p className="text-xs text-muted-foreground">Assoc. CS - UoP (2025+)</p>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <BentoCard delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <Layers className="w-5 h-5 text-[var(--accent-color)]" />
                </div>
                <h2 className="text-2xl font-bold">Technical Expertise</h2>
              </div>
            </BentoCard>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <BentoCard delay={100}>
                <div className="bg-card border border-border rounded-3xl p-6 h-full hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6 text-[var(--accent-color)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </BentoCard>

              <BentoCard delay={200}>
                <div className="bg-card border border-border rounded-3xl p-6 h-full hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Database className="w-6 h-6 text-[var(--accent-color)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </BentoCard>

              <BentoCard delay={300}>
                <div className="bg-card border border-border rounded-3xl p-6 h-full hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Cloud className="w-6 h-6 text-[var(--accent-color)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Tools & Cloud</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </BentoCard>

              <BentoCard delay={400}>
                <div className="bg-card border border-border rounded-3xl p-6 h-full hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Cpu className="w-6 h-6 text-[var(--accent-color)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.concepts.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </BentoCard>

              <BentoCard delay={500}>
                <div className="bg-card border border-border rounded-3xl p-6 h-full hover:shadow-md transition-shadow group">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-[var(--accent-color)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">Leadership</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.leadership.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <BentoCard delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[var(--accent-color)]" />
                </div>
                <h2 className="text-2xl font-bold">Professional Journey</h2>
              </div>
            </BentoCard>

            <div className="space-y-4">
              {experiences.map((exp, index) => {
                const isExpanded = expandedIndex === index
                const previewCount = 2
                const previewItems = exp.description.slice(0, previewCount)
                const remainingItems = exp.description.slice(previewCount)

                return (
                  <BentoCard key={index} delay={index * 100}>
                    <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{exp.title}</h3>
                              <div className="flex items-center gap-3 text-[var(--accent-color)] text-sm font-medium">
                                <span>{exp.company}</span>
                                <Badge variant="outline" className="text-xs">
                                  {exp.type}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {exp.highlights.map((highlight, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {highlight}
                              </Badge>
                            ))}
                          </div>

                          <ul className="space-y-2 mb-3">
                            {previewItems.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                                <div className="w-1.5 h-1.5 bg-[var(--accent-color)] rounded-full mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                            {isExpanded &&
                              remainingItems.map((item, idx) => (
                                <li key={previewCount + idx} className="flex items-start gap-3 text-muted-foreground text-sm">
                                  <div className="w-1.5 h-1.5 bg-[var(--accent-color)] rounded-full mt-2 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                          </ul>

                          {exp.description.length > previewCount && (
                            <button
                              onClick={() => toggleExperience(index)}
                              className="inline-flex items-center gap-1 text-sm text-[var(--accent-color)] hover:opacity-70 transition-opacity"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                              {isExpanded ? "Show less" : "Show more"}
                            </button>
                          )}
                        </div>

                        <div className="lg:text-right text-muted-foreground lg:min-w-[160px]">
                          <div className="text-sm font-semibold mb-1">{exp.period}</div>
                          <div className="flex items-center gap-1.5 lg:justify-end text-xs">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Workflows Section */}
        <section id="workflows" className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <BentoCard delay={0}>
              <div className="bg-card border-2 border-[var(--accent-color)]/20 rounded-3xl p-8 hover:border-[var(--accent-color)]/60 hover:shadow-lg hover:shadow-[var(--accent-color)]/5 transition-all duration-300 cursor-pointer group" onClick={() => navigate("/workflows?company=passiongeek")}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Workflow className="w-5 h-5 text-[var(--accent-color)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Platform Workflows</h2>
                    <p className="text-[var(--accent-color)] text-sm font-medium">Architecture workflows I designed and led</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm text-[var(--accent-color)] font-medium">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { name: "PassionGeek", desc: "FreshMoe: Procurement, B2B Sales, POS, Franchise" },
                    { name: "Revelio", desc: "Test Automation, UI/UX, DB Migration, Delivery Ecosystem" },
                  ].map((wf) => (
                    <div key={wf.name} className="bg-secondary rounded-2xl p-4 hover:bg-[var(--accent-color)]/10 hover:border hover:border-[var(--accent-color)]/30 transition-all duration-200">
                      <h3 className="font-semibold text-sm">{wf.name}</h3>
                      <p className="text-muted-foreground text-xs mt-1">{wf.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <BentoCard delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-[var(--accent-color)]" />
                </div>
                <h2 className="text-2xl font-bold">Featured Projects</h2>
              </div>
            </BentoCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((project, index) => {
                const isGitHub = project.link.includes("github.com")

                return (
                  <BentoCard
                    key={index}
                    delay={index * 100}
                    className={project.size === "large" ? "md:col-span-2" : ""}
                  >
                    <div
                      className={`relative bg-card border-2 border-border rounded-3xl p-6 h-full transition-all duration-300 group ${
                        isGitHub ? "" : "cursor-pointer hover:border-[var(--accent-color)]/40 hover:shadow-lg hover:shadow-[var(--accent-color)]/5"
                      }`}
                      onClick={() => !isGitHub && window.open(project.link, "_blank")}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{project.image}</span>
                        {isGitHub ? (
                          <div className="group/tooltip relative">
                            <EyeClosed className="w-5 h-5 text-muted-foreground/40" />
                            <div className="absolute right-0 top-8 w-44 bg-foreground text-background text-xs font-medium rounded-xl px-3 py-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                              Can&apos;t preview this project
                              <div className="absolute -top-1 right-4 w-2 h-2 bg-foreground rotate-45" />
                            </div>
                          </div>
                        ) : (
                          <div className="group/tooltip relative">
                            <Eye className="w-5 h-5 text-muted-foreground group-hover:text-[var(--accent-color)] transition-colors" />
                            <div className="absolute right-0 top-8 w-44 bg-foreground text-background text-xs font-medium rounded-xl px-3 py-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 text-center">
                              Preview project
                              <div className="absolute -top-1 right-4 w-2 h-2 bg-foreground rotate-45" />
                            </div>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </BentoCard>
                )
              })}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <BentoCard delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[var(--accent-color)]" />
                </div>
                <h2 className="text-2xl font-bold">Latest Posts</h2>
              </div>
            </BentoCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogPosts.slice(0, 6).map((post, index) => (
                <BentoCard key={post.slug} delay={index * 100}>
                  <div
                    className="bg-card border-2 border-border rounded-3xl p-6 h-full hover:border-[var(--accent-color)]/40 hover:shadow-lg hover:shadow-[var(--accent-color)]/5 transition-all duration-300 group cursor-pointer"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent-color)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[var(--accent-color)] transition-colors" />
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>

            <BentoCard delay={500}>
              <div className="flex justify-center mt-6">
                <Button variant="outline" onClick={() => navigate("/blog")} className="gap-2">
                  <FileText className="w-4 h-4" />
                  View All Posts
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BentoCard className="md:col-span-2" delay={0}>
                <div className="bg-card border border-border rounded-3xl p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[var(--accent-color)]" />
                    </div>
                    <h2 className="text-2xl font-bold">Get in Touch</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Looking for a senior engineer to architect your next system or lead your engineering team? Let&apos;s discuss how I can help.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-secondary/50 border-border"
                        disabled={isSubmitting}
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-secondary/50 border-border"
                        disabled={isSubmitting}
                      />
                    </div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="bg-secondary/50 border-border"
                      disabled={isSubmitting}
                    />

                    {submitStatus.type && (
                      <Alert
                        className={
                          submitStatus.type === "success"
                            ? "bg-green-500/10 border-green-500/30 text-green-600"
                            : "bg-red-500/10 border-red-500/30 text-red-600"
                        }
                      >
                        {submitStatus.type === "success" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>{submitStatus.message}</AlertDescription>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[var(--accent-color)] hover:opacity-90 text-primary-foreground w-full disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </BentoCard>

              <BentoCard className="md:col-span-1" delay={200}>
                <div className="bg-card border-2 border-border rounded-3xl p-8 h-full flex flex-col justify-between hover:border-[var(--accent-color)]/40 hover:shadow-lg hover:shadow-[var(--accent-color)]/5 transition-all duration-300">
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:border-[var(--accent-color)]/40 hover:text-[var(--accent-color)] transition-all duration-300"
                      onClick={() => (window.location.href = "mailto:smhtet182@gmail.com")}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">smhtet182@gmail.com</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:border-[var(--accent-color)]/40 hover:text-[var(--accent-color)] transition-all duration-300"
                      onClick={() => (window.location.href = "tel:+959798819540")}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">09 798 819540</span>
                    </Button>
                    <div className="pt-4 space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:text-[var(--accent-color)] transition-colors"
                        onClick={() => window.open("https://github.com/SoeMoeHtet18", "_blank")}
                      >
                        <GitHubIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">GitHub</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start hover:text-[var(--accent-color)] transition-colors"
                        onClick={() => window.open("https://www.linkedin.com/in/smhtet182", "_blank")}
                      >
                        <LinkedInIcon className="w-4 h-4 mr-2" />
                        <span className="text-sm">LinkedIn</span>
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Education</p>
                    <p className="text-xs text-muted-foreground">M.B.B.S (2018-2022)</p>
                    <p className="text-xs text-muted-foreground">CS50 (2022)</p>
                    <p className="text-xs text-muted-foreground">Assoc. CS - UoP (2025+)</p>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-lg font-bold tracking-tight hover:opacity-70 transition-opacity"
            >
              Soe Moe Htet
            </button>
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Soe Moe Htet. Built with React and Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
