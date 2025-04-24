
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

const Filters = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [salaryRange, setSalaryRange] = useState([30000, 150000])

  const formatSalary = (value: number) => {
    return `$${Math.round(value / 1000)}k`
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
                      <Checkbox id={type.id} />
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
                      <Checkbox id={location.id} />
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
                    defaultValue={salaryRange}
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
                      <Checkbox id={industry.id} />
                      <Label htmlFor={industry.id}>{industry.label}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience">
              <AccordionTrigger>Experience Level</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="mid">
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
            <Button className="w-full bg-jobify-blue hover:bg-jobify-blue-dark">
              Apply Filters
            </Button>
            <Button variant="outline" className="w-full border-gray-300">
              Reset
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Filters
