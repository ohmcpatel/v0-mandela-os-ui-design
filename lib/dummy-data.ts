import type { Initiative } from "@/lib/types"

export function generateInitiatives(companyDescription: string): Initiative[] {
  // This function would normally call an AI API to generate initiatives
  // For now, we'll return dummy data based on some simple text analysis

  const initiatives: Initiative[] = []

  // Very basic "analysis" of the company description to tailor the initiatives
  const isTech =
    companyDescription.toLowerCase().includes("tech") ||
    companyDescription.toLowerCase().includes("software") ||
    companyDescription.toLowerCase().includes("digital")

  const isFinance =
    companyDescription.toLowerCase().includes("finance") ||
    companyDescription.toLowerCase().includes("fintech") ||
    companyDescription.toLowerCase().includes("banking")

  const isHealthcare =
    companyDescription.toLowerCase().includes("health") ||
    companyDescription.toLowerCase().includes("medical") ||
    companyDescription.toLowerCase().includes("care")

  const isSustainable =
    companyDescription.toLowerCase().includes("sustainable") ||
    companyDescription.toLowerCase().includes("green") ||
    companyDescription.toLowerCase().includes("environment")

  // Add Digital Literacy initiative if tech company
  if (isTech) {
    initiatives.push({
      id: "initiative-1",
      name: "Digital Literacy for All",
      theme: "Education",
      partners: ["Code.org", "Local School Districts"],
      metrics: [
        "Train 500 students in basic coding",
        "Donate 100 refurbished computers",
        "20% employee participation as mentors",
      ],
      executionPlan: {
        roadmap: [
          {
            name: "Planning Phase",
            timeline: "Weeks 1-2",
            description: "Define program scope and establish partnerships",
            tasks: [
              { name: "Identify target schools", owner: "CSR Lead" },
              { name: "Develop curriculum outline", owner: "Education Team" },
              { name: "Establish budget", owner: "Finance" },
            ],
          },
          {
            name: "Implementation Phase",
            timeline: "Weeks 3-8",
            description: "Launch program and begin training sessions",
            tasks: [
              { name: "Recruit employee volunteers", owner: "HR" },
              { name: "Schedule training sessions", owner: "Program Manager" },
              { name: "Prepare training materials", owner: "Education Team" },
            ],
          },
          {
            name: "Evaluation Phase",
            timeline: "Weeks 9-12",
            description: "Measure impact and gather feedback",
            tasks: [
              { name: "Collect participant feedback", owner: "Program Manager" },
              { name: "Analyze program metrics", owner: "Data Analyst" },
              { name: "Prepare impact report", owner: "CSR Lead" },
            ],
          },
        ],
        tools: [
          { name: "Airtable", purpose: "Track program metrics and participant data" },
          { name: "Slack", purpose: "Coordinate volunteer efforts and share updates" },
          { name: "Google Classroom", purpose: "Host digital learning materials" },
        ],
        partnerEmail: {
          subject: "Partnership Opportunity: Digital Literacy Program",
          body: "We're launching a Digital Literacy initiative aimed at bridging the digital divide in our community. Given Code.org's expertise in computer science education, we believe there's a strong alignment between our goals. We're looking to develop a comprehensive program that includes coding workshops, computer donations, and mentorship opportunities for underserved students.",
        },
        kickoffMessage:
          "I'm excited to announce our new Digital Literacy for All initiative! This program aligns perfectly with our mission to make technology accessible to everyone. We'll be partnering with Code.org and local schools to teach coding skills and donate refurbished computers to students who need them most. We're looking for volunteers to serve as mentors - no technical experience required, just a passion for helping others learn!",
      },
    })
  }

  // Add Financial Inclusion initiative if finance company
  if (isFinance) {
    initiatives.push({
      id: "initiative-2",
      name: "Financial Literacy Workshops",
      theme: "Financial Inclusion",
      partners: ["Junior Achievement", "Community Centers"],
      metrics: ["Reach 1,000 underserved individuals", "Improve financial knowledge by 40%", "15 workshops conducted"],
      executionPlan: {
        roadmap: [
          {
            name: "Content Development",
            timeline: "Weeks 1-3",
            description: "Create workshop materials and training guides",
            tasks: [
              { name: "Develop curriculum", owner: "Financial Education Team" },
              { name: "Create presentation materials", owner: "Marketing" },
              { name: "Translate materials to multiple languages", owner: "Localization Team" },
            ],
          },
          {
            name: "Community Outreach",
            timeline: "Weeks 4-6",
            description: "Establish partnerships and promote workshops",
            tasks: [
              { name: "Identify community partners", owner: "CSR Lead" },
              { name: "Schedule workshop dates", owner: "Program Manager" },
              { name: "Develop promotional materials", owner: "Marketing" },
            ],
          },
          {
            name: "Workshop Delivery",
            timeline: "Weeks 7-12",
            description: "Conduct workshops and gather feedback",
            tasks: [
              { name: "Train employee volunteers", owner: "L&D Team" },
              { name: "Deliver workshops", owner: "Volunteer Team" },
              { name: "Collect participant feedback", owner: "Program Manager" },
            ],
          },
        ],
        tools: [
          { name: "Canva", purpose: "Design workshop materials and handouts" },
          { name: "Eventbrite", purpose: "Manage workshop registration" },
          { name: "SurveyMonkey", purpose: "Collect participant feedback" },
        ],
        partnerEmail: {
          subject: "Partnership Opportunity: Financial Literacy Workshops",
          body: "We're launching a series of Financial Literacy Workshops aimed at empowering underserved communities with essential financial knowledge. Given Junior Achievement's expertise in financial education, we believe there's a strong alignment between our goals. We're looking to develop a comprehensive program that includes budgeting basics, saving strategies, and responsible credit use.",
        },
        kickoffMessage:
          "I'm thrilled to announce our new Financial Literacy Workshop series! This initiative directly supports our mission of financial inclusion and empowerment. We'll be partnering with Junior Achievement and local community centers to deliver practical financial education to those who need it most. We're looking for volunteers to help facilitate these workshops - training will be provided, and it's a great opportunity to make a direct impact in our community!",
      },
    })
  }

  // Add Healthcare Access initiative if healthcare company
  if (isHealthcare) {
    initiatives.push({
      id: "initiative-3",
      name: "Community Health Screenings",
      theme: "Healthcare Access",
      partners: ["American Heart Association", "Local Clinics"],
      metrics: ["Conduct 20 screening events", "Screen 2,000 individuals", "Connect 500 people to ongoing care"],
      executionPlan: {
        roadmap: [
          {
            name: "Program Design",
            timeline: "Weeks 1-2",
            description: "Define screening protocols and logistics",
            tasks: [
              { name: "Develop screening protocols", owner: "Medical Team" },
              { name: "Identify target communities", owner: "CSR Lead" },
              { name: "Establish referral network", owner: "Community Relations" },
            ],
          },
          {
            name: "Resource Mobilization",
            timeline: "Weeks 3-4",
            description: "Secure equipment, supplies, and volunteers",
            tasks: [
              { name: "Procure screening equipment", owner: "Procurement" },
              { name: "Recruit medical volunteers", owner: "HR" },
              { name: "Prepare educational materials", owner: "Health Education Team" },
            ],
          },
          {
            name: "Screening Implementation",
            timeline: "Weeks 5-12",
            description: "Conduct screening events and follow-up",
            tasks: [
              { name: "Schedule community events", owner: "Program Manager" },
              { name: "Conduct screenings", owner: "Medical Team" },
              { name: "Manage referrals and follow-up", owner: "Care Coordinators" },
            ],
          },
        ],
        tools: [
          { name: "REDCap", purpose: "Secure data collection for health screenings" },
          { name: "Calendly", purpose: "Schedule screening appointments" },
          { name: "Twilio", purpose: "Send appointment reminders and follow-ups" },
        ],
        partnerEmail: {
          subject: "Partnership Opportunity: Community Health Screenings",
          body: "We're launching a Community Health Screening initiative aimed at improving healthcare access in underserved areas. Given the American Heart Association's expertise in cardiovascular health, we believe there's a strong alignment between our goals. We're looking to develop a comprehensive program that includes free health screenings, education, and referrals to ongoing care.",
        },
        kickoffMessage:
          "I'm excited to announce our new Community Health Screening initiative! This program directly supports our mission of improving healthcare access for all. We'll be partnering with the American Heart Association and local clinics to provide free health screenings in underserved communities. We're looking for volunteers with medical backgrounds to help conduct screenings, as well as general volunteers to assist with event logistics and education.",
      },
    })
  }

  // Add Sustainability initiative if sustainable or as a default
  if (isSustainable || initiatives.length < 3) {
    initiatives.push({
      id: "initiative-4",
      name: "Green Office Transformation",
      theme: "Sustainability",
      partners: ["World Wildlife Fund", "Green Building Council"],
      metrics: ["Reduce office waste by 50%", "Lower energy consumption by 30%", "90% employee participation"],
      executionPlan: {
        roadmap: [
          {
            name: "Assessment Phase",
            timeline: "Weeks 1-2",
            description: "Audit current practices and set targets",
            tasks: [
              { name: "Conduct waste audit", owner: "Facilities Team" },
              { name: "Measure energy baseline", owner: "Sustainability Lead" },
              { name: "Survey employee behaviors", owner: "HR" },
            ],
          },
          {
            name: "Implementation Phase",
            timeline: "Weeks 3-8",
            description: "Roll out new systems and educate employees",
            tasks: [
              { name: "Install recycling stations", owner: "Facilities Team" },
              { name: "Replace lighting with LEDs", owner: "Facilities Team" },
              { name: "Conduct employee training", owner: "Sustainability Lead" },
            ],
          },
          {
            name: "Monitoring Phase",
            timeline: "Weeks 9-12",
            description: "Track progress and make adjustments",
            tasks: [
              { name: "Monitor waste reduction", owner: "Facilities Team" },
              { name: "Track energy savings", owner: "Sustainability Lead" },
              { name: "Gather employee feedback", owner: "HR" },
            ],
          },
        ],
        tools: [
          { name: "Sense", purpose: "Real-time energy monitoring" },
          { name: "Rubicon", purpose: "Waste tracking and recycling management" },
          { name: "Microsoft Forms", purpose: "Employee feedback and suggestions" },
        ],
        partnerEmail: {
          subject: "Partnership Opportunity: Green Office Transformation",
          body: "We're launching a Green Office Transformation initiative aimed at significantly reducing our environmental footprint. Given the World Wildlife Fund's expertise in corporate sustainability, we believe there's a strong alignment between our goals. We're looking to develop a comprehensive program that includes waste reduction, energy conservation, and employee engagement in sustainability practices.",
        },
        kickoffMessage:
          "I'm thrilled to announce our new Green Office Transformation initiative! This program aligns perfectly with our commitment to environmental responsibility. We'll be partnering with the World Wildlife Fund and Green Building Council to transform our workplace into a model of sustainability. Everyone can participate by adopting new recycling practices, conserving energy, and suggesting green innovations. Together, we can make a significant positive impact on our planet while creating a healthier workplace!",
      },
    })
  }

  // Add Mental Health initiative as a third option if needed
  if (initiatives.length < 3) {
    initiatives.push({
      id: "initiative-5",
      name: "Workplace Mental Wellness",
      theme: "Mental Health",
      partners: ["Mental Health America", "Headspace"],
      metrics: [
        "100% of employees with access to resources",
        "50% reduction in stress-related absences",
        "80% employee participation in at least one program",
      ],
      executionPlan: {
        roadmap: [
          {
            name: "Needs Assessment",
            timeline: "Weeks 1-2",
            description: "Identify key mental health challenges and needs",
            tasks: [
              { name: "Conduct anonymous employee survey", owner: "HR" },
              { name: "Review absence and productivity data", owner: "HR Analytics" },
              { name: "Research best practices", owner: "Wellness Team" },
            ],
          },
          {
            name: "Program Development",
            timeline: "Weeks 3-4",
            description: "Design comprehensive mental wellness program",
            tasks: [
              { name: "Select digital wellness platform", owner: "Wellness Team" },
              { name: "Develop workshop schedule", owner: "L&D Team" },
              { name: "Create communication plan", owner: "Internal Comms" },
            ],
          },
          {
            name: "Implementation",
            timeline: "Weeks 5-12",
            description: "Roll out program and encourage participation",
            tasks: [
              { name: "Launch digital resources", owner: "IT" },
              { name: "Conduct wellness workshops", owner: "Wellness Team" },
              { name: "Train mental health first aiders", owner: "L&D Team" },
            ],
          },
        ],
        tools: [
          { name: "Headspace", purpose: "Meditation and mindfulness resources" },
          { name: "Microsoft Teams", purpose: "Host virtual wellness sessions" },
          { name: "Culture Amp", purpose: "Track employee wellbeing metrics" },
        ],
        partnerEmail: {
          subject: "Partnership Opportunity: Workplace Mental Wellness Program",
          body: "We're launching a Workplace Mental Wellness initiative aimed at supporting our employees' psychological wellbeing. Given Mental Health America's expertise in workplace mental health, we believe there's a strong alignment between our goals. We're looking to develop a comprehensive program that includes digital resources, workshops, and training to create a supportive work environment.",
        },
        kickoffMessage:
          "I'm excited to announce our new Workplace Mental Wellness initiative! This program reflects our commitment to supporting the whole person, not just the employee. We'll be partnering with Mental Health America and Headspace to provide a comprehensive suite of mental health resources, including a subscription to the Headspace app, regular wellness workshops, and trained mental health first aiders in every department. Your wellbeing matters, and we're here to support you!",
      },
    })
  }

  return initiatives
}
