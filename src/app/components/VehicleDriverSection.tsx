import svgPaths from "../imports/svg-heht3luwni";
import { Phone } from 'lucide-react';

interface DriverDetails {
  name: string;
  license: string;
  state: string;
  phone: string;
}

interface TruckDetails {
  unit: string;
  plate: string;
  make: string;
  year: string;
  vin: string;
  axleConfig: string;
  grossWeight: string;
  unladenWeight: string;
}

interface TrailerDetails {
  unit: string;
  plate: string;
  type: string;
  length: string;
  axles: string;
  width: string;
}

interface VehicleDriverSectionProps {
  driver: DriverDetails;
  truck: TruckDetails;
  trailer: TrailerDetails;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[19.992px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path d={svgPaths.p173acb00} stroke="#008236" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
        <path d={svgPaths.p2e8cae00} stroke="#008236" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
      </svg>
    </div>
  );
}

export default function VehicleDriverSection({ driver, truck, trailer }: VehicleDriverSectionProps) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative w-full">
      <h3 className="font-semibold leading-[20px] text-[#101828] text-[14px]">Vehicle & Driver</h3>
      
      {/* Driver Card */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
            <div className="h-[75.968px] relative shrink-0 w-full">
              <div className="flex flex-row items-center size-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
                  <div className="h-[39.983px] relative shrink-0">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
                      <div className="bg-[#dcfce7] relative rounded-[3.71704e+07px] shrink-0 size-[39.983px]">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
                          <Icon />
                        </div>
                      </div>
                      <div className="h-[35.985px] relative shrink-0">
                        <p className="font-medium leading-[20px] text-[#101828] text-[14px]">{driver.name}</p>
                        <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] mt-[2px]">Lic: {driver.license} ({driver.state})</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-[8px] shrink-0 size-[31.987px] flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      </div>

      {/* Truck Card */}
      <div className="bg-white relative rounded-[8px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
            {/* Header */}
            <div className="bg-[#f9fafb] relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
              <div className="size-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
                  <div className="h-[19.992px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between relative size-full">
                        <p className="font-medium leading-[20px] text-[#101828] text-[14px]">Truck</p>
                        <div className="bg-white h-[19.992px] relative rounded-[5px] shrink-0">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[9.108px] py-[3.108px] relative rounded-[inherit]">
                            <p className="font-medium leading-[15px] text-[#0a0a0a] text-[12px]">{truck.unit}</p>
                          </div>
                          <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="h-[162px] relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                {/* Make/Year */}
                <div className="absolute left-[12px] top-[11.99px] w-[178.488px]">
                  <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">Make/Year</p>
                  <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{truck.make} {truck.year}</p>
                </div>
                
                {/* Plate */}
                <div className="absolute h-[31.987px] left-[198.48px] top-[12px] w-[178.488px]">
                  <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">Plate</p>
                  <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{truck.plate}</p>
                </div>
                
                {/* VIN */}
                <div className="absolute h-[31.987px] left-[12px] top-[59.98px] w-[364.974px]">
                  <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">VIN</p>
                  <p className="tabular-nums tracking-wide leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{truck.vin}</p>
                </div>
                
                {/* Axles */}
                <div className="absolute h-[31.987px] left-[12px] top-[107.97px] w-[178.488px]">
                  <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">Axles</p>
                  <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{truck.axleConfig}</p>
                </div>
                
                {/* GVW */}
                <div className="absolute h-[31.987px] left-[198.48px] top-[107.97px] w-[178.488px]">
                  <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">GVW</p>
                  <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{truck.grossWeight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      </div>

      {/* Trailer Card */}
      <div className="bg-white relative rounded-[14px] shrink-0 w-full">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
            {/* Header */}
            <div className="bg-[#f9fafb] relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
              <div className="size-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
                  <div className="h-[19.992px] relative shrink-0 w-full">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center justify-between relative size-full">
                        <p className="font-medium leading-[20px] text-[#101828] text-[14px]">Trailer</p>
                        <div className="bg-white h-[19.992px] relative rounded-[5px] shrink-0">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[9.108px] py-[3.108px] relative rounded-[inherit]">
                            <p className="font-medium leading-[15px] text-[#0a0a0a] text-[12px]">{trailer.unit}</p>
                          </div>
                          <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative shrink-0 w-full">
              <div className="size-full">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-start flex flex-wrap gap-[16px_8px] items-start p-[12px] relative w-full">
                  {/* Type */}
                  <div className="h-[31.987px] relative shrink-0 w-[178.488px]">
                    <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">Type</p>
                    <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{trailer.type}</p>
                  </div>
                  
                  {/* Plate */}
                  <div className="h-[31.987px] relative shrink-0 w-[178.488px]">
                    <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">Plate</p>
                    <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{trailer.plate}</p>
                  </div>
                  
                  {/* Length */}
                  <div className="h-[31.987px] relative shrink-0 w-[178.488px]">
                    <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">Length</p>
                    <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{trailer.length}</p>
                  </div>
                  
                  {/* Width */}
                  <div className="h-[31.987px] relative shrink-0 w-[178.488px]">
                    <p className="font-normal leading-[16px] text-[#4a5565] text-[12px] uppercase">Width</p>
                    <p className="font-medium leading-[16px] text-[#0a0a0a] text-[14px] mt-[4px]">{trailer.width}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}
