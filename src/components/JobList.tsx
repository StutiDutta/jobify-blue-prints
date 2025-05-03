
import { useState, useEffect } from "react"
import JobCard, { JobCardProps } from "./JobCard"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { FilterState } from "./Filters"

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

// Helper function to extract salary range as numbers
const extractSalaryRange = (salaryStr: string | undefined): [number, number] => {
  if (!salaryStr) return [0, 0];
  
  // Extract numbers from string like "$120,000 - $150,000"
  const matches = salaryStr.match(/\$?([\d,]+)/g);
  if (!matches || matches.length < 2) return [0, 0];
  
  const min = parseInt(matches[0].replace(/\$|,/g, ''));
  const max = parseInt(matches[1].replace(/\$|,/g, ''));
  
  return [min, max];
}

// Helper function to extract city from location
const extractCity = (location: string): string => {
  if (location === "Remote") return "remote-any";
  const city = location.split(',')[0].trim().toLowerCase().replace(' ', '-');
  return city;
}

// Helper to map job type to filter id
const mapTypeToFilterId = (type: string): string => {
  if (type === "Full-time") return "full-time";
  if (type === "Part-time") return "part-time";
  if (type === "Remote") return "remote";
  if (type === "Contract") return "contract";
  return "internship";
}

const JobList = () => {
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    jobTypes: [],
    locations: [],
    salaryRange: [0, 300000],
    industries: [],
    experience: "mid"
  });
  const [filteredJobs, setFilteredJobs] = useState<JobCardProps[]>(JOBS_DATA);
  const [filteredSimilarJobs, setFilteredSimilarJobs] = useState<JobCardProps[]>(SIMILAR_JOBS_DATA);

  // Apply filters to jobs
  useEffect(() => {
    const applyFilters = (jobs: JobCardProps[]) => {
      return jobs.filter(job => {
        // Filter by job type if any selected
        if (filters.jobTypes.length > 0) {
          const jobTypeId = mapTypeToFilterId(job.type);
          if (!filters.jobTypes.includes(jobTypeId)) {
            return false;
          }
        }
        
        // Filter by location if any selected
        if (filters.locations.length > 0) {
          const jobCity = extractCity(job.location);
          if (!filters.locations.includes(jobCity)) {
            return false;
          }
        }
        
        // Filter by salary range
        const [minSalary, maxSalary] = extractSalaryRange(job.salary);
        const [filterMin, filterMax] = filters.salaryRange;
        
        // If the job's salary range overlaps with the filter range
        if (maxSalary < filterMin || minSalary > filterMax) {
          return false;
        }
        
        // For industry and experience level, we would need more data
        // In a real app we would filter these too
        
        return true;
      });
    };

    setFilteredJobs(applyFilters(JOBS_DATA));
    setFilteredSimilarJobs(applyFilters(SIMILAR_JOBS_DATA));
  }, [filters]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const displayedJobs = showAllJobs ? filteredJobs : filteredJobs.slice(0, 3);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
        {filteredJobs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-md shadow">
            <p className="text-gray-600">No jobs match your current filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 jobify-fade-in">
              {displayedJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
            
            {!showAllJobs && filteredJobs.length > 3 && (
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
          </>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
        {filteredSimilarJobs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-md shadow">
            <p className="text-gray-600">No similar jobs match your current filters.</p>
          </div>
        ) : (
          <div className="space-y-4 jobify-fade-in">
            {filteredSimilarJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default JobList;
