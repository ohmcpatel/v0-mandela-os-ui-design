export interface Initiative {
  id: string
  name: string
  theme: string
  partners: string[]
  metrics: string[]
  executionPlan: ExecutionPlan
}

export interface ExecutionPlan {
  roadmap: Phase[]
  tools: Tool[]
  partnerEmail: {
    subject: string
    body: string
  }
  kickoffMessage: string
}

export interface Phase {
  name: string
  timeline: string
  description: string
  tasks: Task[]
}

export interface Task {
  name: string
  owner: string
}

export interface Tool {
  name: string
  purpose: string
}

export interface VirtualTeamMember {
  id: string
  name: string
  role: string
  avatar: string
  skills: string[]
  bio: string
  workload: number
  initiatives: string[]
}

export interface Partner {
  id: string
  name: string
  logo: string
  type: string
  initiatives: string[]
  status: "Active" | "Pending" | "Inactive"
  contactName: string
  contactEmail: string
  website: string
  description: string
}

export interface Report {
  id: string
  title: string
  type: "quarterly" | "annual" | "executive" | "stakeholder"
  date: string
  initiatives: string[]
  status: "draft" | "published"
}
