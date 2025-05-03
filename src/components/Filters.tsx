
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const JobTypes = [
  { id: "full-time", label: "Full Time" },
  { id: "part-time", label: "Part Time" },
  { id: "remote", label: "Remote" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
]

const Locations = [
  { id: "new-york", label: "New York" },
  { id: "san-francisco", label: "San Francisco" },
  { id: "los-angeles", label: "Los Angeles" },
  { id: "chicago", label: "Chicago" },
  { id: "remote-any", label: "Remote (Any)" },
]

const Industries = [
  { id: "technology", label: "Technology" },
  { id: "healthcare", label: "Healthcare" },
  { id: "finance", label: "Finance" },
  { id: "education", label: "Education" },
  { id: "marketing", label: "Marketing" },
]

const Experience = [
  { id: "entry", label: "Entry Level" },
  { id: "mid", label: "Mid Level" },
  { id: "senior", label: "Senior Level" },
  { id: "executive", label: "Executive" },
]

export interface FilterState {
  jobTypes: string[];
  locations: string[];
  salaryRange: number[];
  industries: string[];
  experience: string;
}

interface FiltersProps {
  onApplyFilters: (filters: FilterState) => void;
}

const Filters = ({ onApplyFilters }: FiltersProps) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [salaryRange, setSalaryRange] = useState([30000, 150000])
  const { toast } = useToast();
  
  // State for filter selections
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState("mid")

  const formatSalary = (value: number) => {
    return `$${Math.round(value / 1000)}k`
  }

  const toggleJobType = (id: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }

  const toggleLocation = (id: string) => {
    setSelectedLocations(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }

  const toggleIndustry = (id: string) => {
    setSelectedIndustries(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }

  const handleApplyFilters = () => {
    const filters: FilterState = {
      jobTypes: selectedJobTypes,
      locations: selectedLocations,
      salaryRange,
      industries: selectedIndustries,
      experience: selectedExperience
    }
    
    onApplyFilters(filters)
    
    toast({
      title: "Filters Applied",
      description: "Job listings have been updated based on your filters.",
    })
    
    if (isMobileFilterOpen) {
      setIsMobileFilterOpen(false)
    }
  }

  const handleResetFilters = () => {
    setSelectedJobTypes([])
    setSelectedLocations([])
    setSalaryRange([30000, 150000])
    setSelectedIndustries([])
    setSelectedExperience("mid")
    
    onApplyFilters({
      jobTypes: [],
      locations: [],
      salaryRange: [30000, 150000],
      industries: [],
      experience: "mid"
    })
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    })
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <Button 
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full bg-white text-jobify-blue border border-jobify-blue hover:bg-jobify-blue hover:text-white"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter Jobs
        </Button>
      </div>

      {/* Filter Sidebar - Desktop (always visible) and Mobile (conditional) */}
      <aside className={`
        ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-4' : 'hidden'}
        md:block md:relative md:z-0 md:bg-transparent
      `}>
        <div className="md:sticky md:top-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filters</h2>
            {isMobileFilterOpen && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          <Accordion type="multiple" defaultValue={["job-type", "location", "salary"]}>
            <AccordionItem value="job-type">
              <AccordionTrigger>Job Type</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {JobTypes.map(type => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={type.id} 
                        checked={selectedJobTypes.includes(type.id)}
                        onCheckedChange={() => toggleJobType(type.id)}
                      />
                      <Label htmlFor={type.id}>{type.label}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger>Location</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {Locations.map(location => (
                    <div key={location.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={location.id} 
                        checked={selectedLocations.includes(location.id)}
                        onCheckedChange={() => toggleLocation(location.id)}
                      />
                      <Label htmlFor={location.id}>{location.label}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="salary">
              <AccordionTrigger>Salary Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Slider
                    value={salaryRange}
                    max={300000}
                    min={0}
                    step={5000}
                    onValueChange={(values) => setSalaryRange(values)}
                  />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">{formatSalary(salaryRange[0])}</span>
                    <span className="text-sm text-gray-600">{formatSalary(salaryRange[1])}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="industry">
              <AccordionTrigger>Industry</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {Industries.map(industry => (
                    <div key={industry.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={industry.id} 
                        checked={selectedIndustries.includes(industry.id)}
                        onCheckedChange={() => toggleIndustry(industry.id)}
                      />
                      <Label htmlFor={industry.id}>{industry.label}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience">
              <AccordionTrigger>Experience Level</AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={selectedExperience} onValueChange={setSelectedExperience}>
                  {Experience.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.id} id={level.id} />
                      <Label htmlFor={level.id}>{level.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 space-y-2">
            <Button 
              className="w-full bg-jobify-blue hover:bg-jobify-blue-dark"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-gray-300"
              onClick={handleResetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Filters
