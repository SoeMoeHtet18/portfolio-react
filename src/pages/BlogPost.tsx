import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Sun, Moon } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
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
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, isInView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function BlogPostPage() {
  const [isDark, setIsDark] = useState(true)
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  const post = blogPosts.find((p) => p.slug === slug)
  const currentIndex = post ? blogPosts.indexOf(post) : -1
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <button onClick={() => navigate("/blog")} className="text-[var(--accent-color)] hover:underline">
            Back to blog
          </button>
        </div>
      </div>
    )
  }

  const categoryColors: Record<string, string> = {
    Architecture: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "Best Practices": "bg-green-500/10 text-green-400 border-green-500/30",
    Backend: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    Leadership: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    DevOps: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    Security: "bg-red-500/10 text-red-400 border-red-500/30",
  }

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/blog")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">All Posts</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <span className="font-semibold text-sm truncate">{post.title}</span>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <article className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[post.category] || "bg-secondary text-muted-foreground"}`}>
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                <ContentRenderer content={post.content} />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              {prevPost ? (
                <button
                  onClick={() => navigate(`/blog/${prevPost.slug}`)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm group text-left"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="font-medium">{prevPost.title}</div>
                  </div>
                </button>
              ) : (
                <div />
              )}
              {nextPost ? (
                <button
                  onClick={() => navigate(`/blog/${nextPost.slug}`)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm group text-right"
                >
                  <div>
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="font-medium">{nextPost.title}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 -translate-y-1 transition-transform" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </FadeIn>
        </article>
      </main>
      </div>
    </div>
  )
}

function ContentRenderer({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLanguage = ""
  let listItems: React.ReactNode[] = []
  let inList = false
  let inOrderedList = false

  const flushList = () => {
    if (listItems.length > 0) {
      if (inOrderedList) {
        elements.push(<ol key={elements.length} className="list-decimal pl-6 space-y-2 my-4 text-muted-foreground leading-relaxed">{listItems}</ol>)
      } else {
        elements.push(<ul key={elements.length} className="list-disc pl-6 space-y-2 my-4 text-muted-foreground leading-relaxed">{listItems}</ul>)
      }
      listItems = []
      inList = false
      inOrderedList = false
    }
  }

  lines.forEach((line, index) => {
    if (line.startsWith("```") && !inCodeBlock) {
      flushList()
      inCodeBlock = true
      codeLanguage = line.slice(3).trim()
      codeLines = []
      return
    }

    if (line.startsWith("```") && inCodeBlock) {
      inCodeBlock = false
      elements.push(
        <pre key={elements.length} className="bg-secondary rounded-xl p-4 my-4 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{codeLines.join("\n")}</code>
        </pre>
      )
      codeLines = []
      return
    }

    if (inCodeBlock) {
      codeLines.push(line)
      return
    }

    if (line.startsWith("## ")) {
      flushList()
      elements.push(<h2 key={elements.length} className="text-xl font-bold mt-8 mb-4">{line.slice(3)}</h2>)
      return
    }

    if (line.startsWith("### ")) {
      flushList()
      elements.push(<h3 key={elements.length} className="text-lg font-bold mt-6 mb-3">{line.slice(4)}</h3>)
      return
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        flushList()
        inList = true
        inOrderedList = false
      }
      listItems.push(<li key={`li-${index}`}>{line.slice(2)}</li>)
      return
    }

    if (/^\d+\.\s/.test(line)) {
      if (!inOrderedList) {
        flushList()
        inOrderedList = true
        inList = true
      }
      listItems.push(<li key={`li-${index}`}>{line.replace(/^\d+\.\s/, "")}</li>)
      return
    }

    if (line.trim() === "") {
      flushList()
      return
    }

    flushList()

    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={elements.length} className="font-semibold my-4 text-foreground">{line.slice(2, -2)}</p>)
      return
    }

    elements.push(<p key={elements.length} className="text-muted-foreground leading-relaxed my-3">{line}</p>)
  })

  flushList()
  if (inCodeBlock) {
    elements.push(
      <pre key={elements.length} className="bg-secondary rounded-xl p-4 my-4 overflow-x-auto text-sm font-mono leading-relaxed">
        <code>{codeLines.join("\n")}</code>
      </pre>
    )
  }

  return <>{elements}</>
}
