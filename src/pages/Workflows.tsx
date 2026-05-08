import { Suspense, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Loader2, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { companyWorkflows } from "@/lib/workflows"
import { WorkflowSection } from "@/components/ui/workflow-section"

function WorkflowsContent() {
  const [isDark, setIsDark] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const companyParam = searchParams.get("company")

  const companies = Object.keys(companyWorkflows)
  const selectedCompany = companyParam && companyWorkflows[companyParam] ? companyParam : companies[0]
  const data = companyWorkflows[selectedCompany]

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
          <span className="font-semibold">Workflows</span>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent-color)]"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Platform Workflows</h1>
              <p className="text-muted-foreground text-sm">Detailed workflow breakdowns by company</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => navigate(`/workflows?company=${encodeURIComponent(company)}`)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  company === selectedCompany
                    ? "bg-[var(--accent-color)] text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {company}
              </button>
            ))}
          </div>

          {data.sections.map((section, index) => (
            <WorkflowSection key={index} workflows={section.workflows} title={section.title} subtitle={section.subtitle} />
          ))}
        </div>
      </section>
      </div>
    </div>
  )
}

function WorkflowsFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-color)]" />
    </div>
  )
}

export default function WorkflowsPage() {
  return (
    <Suspense fallback={<WorkflowsFallback />}>
      <WorkflowsContent />
    </Suspense>
  )
}
