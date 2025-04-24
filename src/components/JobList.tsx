
import { useState } from "react"
import JobCard, { JobCardProps } from "./JobCard"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data for job listings
const JOBS_DATA: JobCardProps[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedAt: "1 day ago",
    description: "We are looking for a Senior Frontend Developer with expertise in React.js to join our growing team. You will be responsible for developing responsive user interfaces and implementing features using modern JavaScript frameworks.",
    featured: true,
  },
  {
    id: "2",
    title: "UX Designer",
    company: "Creative Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    postedAt: "2 days ago",
    description: "Join our design team to create beautiful and intuitive user experiences for web and mobile applications. The ideal candidate has a strong portfolio demonstrating UX methodologies and a keen eye for detail.",
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "DataDriven Co.",
    location: "Chicago, IL",
    type: "Remote",
    salary: "$80,000 - $95,000",
    postedAt: "3 days ago",
    description: "We're seeking a Data Analyst to help interpret complex data and provide actionable insights. The role involves working with large datasets, creating visualizations, and communicating findings to stakeholders.",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $130,000",
    postedAt: "1 week ago",
    description: "Looking for an experienced DevOps Engineer to help us build and maintain our cloud infrastructure. Knowledge of AWS, Docker, and CI/CD pipelines is required for this position.",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    company: "GrowthHackers",
    location: "Remote",
    type: "Part-time",
    salary: "$60,000 - $75,000",
    postedAt: "1 week ago",
    description: "Join our marketing team to develop and implement digital marketing strategies. This role involves SEO optimization, content creation, social media management, and campaign analysis.",
  },
]

// Similar jobs data
const SIMILAR_JOBS_DATA: JobCardProps[] = [
  {
    id: "6",
    title: "Backend Developer",
    company: "WebStack Ltd.",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110,000 - $135,000",
    postedAt: "2 days ago",
    description: "Develop and maintain server-side applications using Node.js and Express. Experience with database design and RESTful API development is required.",
  },
  {
    id: "7",
    title: "Mobile App Developer",
    company: "AppFactory Inc.",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$90 - $110 hourly",
    postedAt: "3 days ago",
    description: "We need an experienced mobile developer to build cross-platform applications using React Native. Knowledge of native iOS or Android development is a plus.",
  },
  {
    id: "8",
    title: "Product Manager",
    company: "InnovateTech",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$115,000 - $140,000",
    postedAt: "5 days ago",
    description: "Lead product development from conception to launch. You'll work with engineers, designers, and stakeholders to define product roadmaps and prioritize features.",
  },
]

const JobList = () => {
  const [showAllJobs, setShowAllJobs] = useState(false)

  const displayedJobs = showAllJobs ? JOBS_DATA : JOBS_DATA.slice(0, 3)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
        <div className="space-y-4 jobify-fade-in">
          {displayedJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
        
        {!showAllJobs && JOBS_DATA.length > 3 && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => setShowAllJobs(true)}
              className="border-jobify-blue text-jobify-blue hover:bg-jobify-blue hover:text-white"
            >
              Show More Jobs <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
        <div className="space-y-4 jobify-fade-in">
          {SIMILAR_JOBS_DATA.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default JobList
