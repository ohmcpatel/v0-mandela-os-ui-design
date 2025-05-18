# MandelaOS - CSR Department Automation Platform

MandelaOS is an agentic operating system that builds and runs CSR (Corporate Social Responsibility) departments for companies. This platform provides a comprehensive solution for managing CSR initiatives, virtual teams, reporting, and partner relationships.

## Local Setup

1. Clone the repository
   \`\`\`
   git clone https://github.com/your-org/mandela-os.git
   \`\`\`
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

### Core Functionality
- **AI-Powered Initiative Generation**: Create tailored CSR initiatives based on company description
- **Virtual CSR Team**: Deploy and manage AI team members with specialized roles
- **Execution Planning**: Detailed roadmaps, tasks, and timelines for each initiative
- **Impact Reporting**: Generate professional reports and presentations
- **Partner Network**: Manage relationships with partner organizations

### Technical Features
- **OpenAI Integration**: Uses GPT-4o for generating initiatives, plans, and communications
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Persistent State**: Maintains application state across sessions
- **Interactive Dashboard**: Real-time metrics and KPIs

## Project Structure

- `/app`: Next.js 14 App Router pages
- `/components`: UI components
  - `/ui`: shadcn/ui components including custom sidebar
  - `app-sidebar.tsx`: Main navigation sidebar
  - `dashboard.tsx`: Main layout component
  - `input-panel.tsx`: Company description input
  - `initiatives-dashboard.tsx`: Grid of CSR initiatives
  - `virtual-team.tsx`: AI team management
  - `reports-hub.tsx`: Report generation and management
  - `partners-network.tsx`: Partner organization management
- `/lib`: Utilities and state management
  - `store.ts`: Zustand store for state management
  - `types.ts`: TypeScript interfaces
  - `dummy-data.ts`: Simulated data generation (replace with OpenAI in production)

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: Component library with custom sidebar implementation
- **Zustand**: State management
- **OpenAI API**: AI-powered content generation
- **Lucide React**: Icon library

## Deployment

The application can be deployed to Vercel with a single click:

1. Fork this repository
2. Connect to Vercel
3. Configure environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key

## Future Enhancements

- **Real-time Collaboration**: Allow multiple team members to work simultaneously
- **Integration with Real CSR Tools**: Connect with actual sustainability tracking platforms
- **Advanced Analytics**: Predictive modeling for initiative success
- **Automated Stakeholder Communications**: Generate and schedule communications
- **Custom AI Training**: Fine-tune models on specific company data and industry standards
