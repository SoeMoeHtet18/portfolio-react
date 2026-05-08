import { useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowUpRight, FileText, Clock, Calendar, Sun, Moon } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { blogPosts, type BlogPost } from "@/data/blog-posts"

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

function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function PostCard({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) {
  const categoryColors: Record<string, string> = {
    Architecture: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "Best Practices": "bg-green-500/10 text-green-400 border-green-500/30",
    Backend: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    Leadership: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    DevOps: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    Security: "bg-red-500/10 text-red-400 border-red-500/30",
  }

  return (
    <BentoCard delay={index * 80}>
      <div
        className="bg-card border border-border rounded-3xl p-6 h-full hover:shadow-md transition-all duration-300 group cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${categoryColors[post.category] || "bg-secondary text-muted-foreground"}`}>
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent-color)] transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[var(--accent-color)] transition-colors" />
        </div>
      </div>
    </BentoCard>
  )
}

export default function BlogPage() {
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(true)

  const categories = [...new Set(blogPosts.map((p) => p.category))]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = selectedCategory ? blogPosts.filter((p) => p.category === selectedCategory) : blogPosts

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <span className="font-semibold">Blog</span>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <BentoCard delay={0}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-[var(--accent-color)]" />
              </div>
              <h1 className="text-3xl font-bold">Blog</h1>
            </div>
            <p className="text-muted-foreground mb-8">
              Thoughts on software architecture, backend engineering, and leading technical teams.
            </p>
          </BentoCard>

          <BentoCard delay={100}>
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  !selectedCategory
                    ? "bg-[var(--accent-color)] text-primary-foreground border-[var(--accent-color)]"
                    : "bg-secondary text-muted-foreground border-border hover:border-[var(--accent-color)]"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    selectedCategory === cat
                      ? "bg-[var(--accent-color)] text-primary-foreground border-[var(--accent-color)]"
                      : "bg-secondary text-muted-foreground border-border hover:border-[var(--accent-color)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </BentoCard>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} onClick={() => navigate(`/blog/${post.slug}`)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No posts found in this category.</p>
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  )
}
