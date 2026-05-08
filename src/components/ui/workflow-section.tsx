"use client"

import { useState } from "react"
import { Badge } from "./badge"
import { Repeat, Settings, BarChart3, Clock, TrendingUp } from "lucide-react"

export type Workflow = {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  steps: Array<{ label: string; description: string }>
  features: string[]
  stats: { time: string; reach: string }
}

export function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}

export function WorkflowSection({
  workflows,
  title,
  subtitle,
}: {
  workflows: Workflow[]
  title: string
  subtitle: string
}) {
  const [activeWorkflow, setActiveWorkflow] = useState(0)
  const workflow = workflows[activeWorkflow]
  const Icon = workflow.icon

  return (
    <div className="mb-12">
      <BentoCard delay={100}>
        <div className="bg-card border border-border rounded-3xl p-6 mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
      </BentoCard>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {workflows.map((wf, index) => (
          <BentoCard key={wf.id} delay={150 + index * 50}>
            <button
              onClick={() => setActiveWorkflow(index)}
              className={`w-full bg-card border border-border rounded-3xl p-5 h-full text-left hover:shadow-md transition-all ${
                activeWorkflow === index ? "ring-2 ring-[var(--accent-color)]" : ""
              }`}
            >
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center mb-3">
                <wf.icon className={`w-5 h-5 ${wf.color}`} />
              </div>
              <h4 className="font-bold text-sm mb-1">{wf.title}</h4>
              <p className="text-muted-foreground text-xs line-clamp-2">{wf.description}</p>
            </button>
          </BentoCard>
        ))}
      </div>

      <BentoCard delay={400}>
        <div className="bg-card border border-border rounded-3xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon className={`w-6 h-6 ${workflow.color}`} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-1">{workflow.title}</h4>
              <p className="text-muted-foreground text-sm">{workflow.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold mb-4 flex items-center gap-2">
                <Repeat className="w-4 h-4 text-[var(--accent-color)]" />
                Workflow Steps
              </h5>
              <div className="space-y-4">
                {workflow.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {index + 1}
                      </div>
                      {index < workflow.steps.length - 1 && (
                        <div className="w-px h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-sm">{step.label}</p>
                      <p className="text-muted-foreground text-xs mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[var(--accent-color)]" />
                  Features
                </h5>
                <div className="flex flex-wrap gap-2">
                  {workflow.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[var(--accent-color)]" />
                  Impact
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <Clock className="w-5 h-5 mx-auto mb-2 text-[var(--accent-color)]" />
                    <p className="font-bold text-sm">{workflow.stats.time}</p>
                  </div>
                  <div className="bg-secondary rounded-xl p-4 text-center">
                    <TrendingUp className="w-5 h-5 mx-auto mb-2 text-[var(--accent-color)]" />
                    <p className="font-bold text-sm">{workflow.stats.reach}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>
    </div>
  )
}
