
import { Search, User } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-jobify-blue">
              Jobify<span className="text-jobify-blue-dark">.</span>
            </span>
          </a>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search for jobs, companies, or keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-jobify-blue focus:ring-1 focus:ring-jobify-blue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              variant="default" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full h-8 px-4 bg-jobify-blue hover:bg-jobify-blue-dark"
            >
              Search
            </Button>
          </div>
        </div>

        {/* User Account */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-6 w-6 text-jobify-blue-dark" />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-500 hover:text-jobify-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Search and Navigation (only visible on mobile) */}
      <div className={cn(
        "md:hidden px-4 py-3 bg-white border-t border-gray-100 transition-all duration-300",
        isMobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search for jobs, companies, or keywords..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
