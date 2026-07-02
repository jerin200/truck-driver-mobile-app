import * as React from "react"
import { MapPin } from "lucide-react"
import { cn } from "./ui/utils"
import { Input } from "./ui/input"

const MOCK_ADDRESSES = [
  "123 Warehouse Rd, New York, NY 10001",
  "456 Logistics Blvd, Los Angeles, CA 90001",
  "789 Industry Dr, Chicago, IL 60601",
  "321 Commerce Way, Atlanta, GA 30301",
  "555 Oil Road, Houston, TX 77001",
  "999 Port Ave, Miami, FL 33101",
  "777 Desert Hwy, Phoenix, AZ 85001",
  "222 Mountain View, Denver, CO 80201",
  "888 Lake Shore, Seattle, WA 98101",
  "111 Broad St, Philadelphia, PA 19101",
  "100 Main St, Boston, MA 02101",
  "200 Market St, San Francisco, CA 94101",
  "300 Broadway, Nashville, TN 37201",
  "400 River Rd, New Orleans, LA 70101"
]

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  iconColor?: string
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Search address...",
  className,
  iconColor = "text-gray-400"
}: AddressAutocompleteProps) {
  const [open, setOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  // Simple filtering logic
  const filteredAddresses = MOCK_ADDRESSES.filter(addr => 
    addr.toLowerCase().includes((value || "").toLowerCase())
  )

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <div className="relative">
        <MapPin className={cn("absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10", iconColor)} />
        <Input
          className="pl-9"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
      </div>
      
      {open && value && filteredAddresses.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredAddresses.map((address) => (
            <div
              key={address}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-gray-700"
              onClick={() => {
                onChange(address)
                setOpen(false)
              }}
            >
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              {address}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}