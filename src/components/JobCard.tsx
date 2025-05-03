
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Clock } from "lucide-react"

export interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary?: string
  postedAt: string
  description: string
  featured?: boolean
}

const JobCard = ({
  title,
  company,
  location,
  type,
  salary,
  postedAt,
  description,
  featured = false,
}: JobCardProps) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`job-card p-5 bg-white rounded-lg shadow-sm transition-all duration-200 ${featured ? 'border-l-4 border-l-jobify-blue' : ''}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{title}</h3>
          <div className="flex items-center text-gray-600 mb-1">
            <Building size={16} className="mr-1" />
            <span className="text-sm">{company}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm mr-3">{location}</span>
            <Clock size={16} className="mr-1" />
            <span className="text-sm">{postedAt}</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <Badge 
            className={`${type === 'Full-time' ? 'bg-green-100 text-green-800' : 
              type === 'Part-time' ? 'bg-blue-100 text-blue-800' : 
              'bg-purple-100 text-purple-800'} mb-2`}
          >
            {type}
          </Badge>
          {salary && <span className="text-sm font-medium text-jobify-blue-dark">{salary}</span>}
        </div>
      </div>
      
      <p className={`text-sm text-gray-600 mb-4 ${expanded ? '' : 'line-clamp-2'}`}>
        {description}
      </p>

      <div className="flex justify-end">
        <Button 
          size="sm" 
          className="bg-jobify-blue hover:bg-jobify-blue-dark text-white"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "View More"}
        </Button>
      </div>
    </div>
  )
}

export default JobCard
