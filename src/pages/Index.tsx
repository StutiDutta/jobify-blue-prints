
import { useState } from "react"
import Header from "@/components/Header"
import Filters, { FilterState } from "@/components/Filters"
import JobList from "@/components/JobList"

const Index = () => {
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    jobTypes: [],
    locations: [],
    salaryRange: [0, 300000],
    industries: [],
    experience: "mid"
  });

  const handleApplyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <Filters onApplyFilters={handleApplyFilters} />
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <JobList />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-jobify-blue">
                Jobify<span className="text-jobify-blue-dark">.</span>
              </span>
              <p className="text-sm text-gray-500 mt-1">Find your dream job today</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-jobify-blue">About</a>
              <a href="#" className="text-gray-500 hover:text-jobify-blue">Contact</a>
              <a href="#" className="text-gray-500 hover:text-jobify-blue">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-jobify-blue">Terms</a>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Jobify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index
