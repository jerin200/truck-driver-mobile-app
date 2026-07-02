import svgPaths from "../imports/svg-77soggv421";

function Icon() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
            <path d={svgPaths.pe6d3300} id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[13.75%] right-[13.75%] top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-20%_-5.75%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 5">
            <path d={svgPaths.p37cc240} id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-10%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
            <path d="M0.666389 7.33028V0.666389" id="Vector" stroke="#9810FA" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface LoadDetailsCardProps {
  type: string;
  weight: string;
  divisible: string;
  selfPropelled: string;
  commodity: string;
  description: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
    frontOverhang: string;
    rearOverhang: string;
  };
  diagramFile?: {
    name: string;
    size: string;
  };
}

export default function LoadDetailsCard({
  type,
  weight,
  divisible,
  selfPropelled,
  commodity,
  description,
  dimensions,
  diagramFile
}: LoadDetailsCardProps) {
  return (
    <div className="bg-white relative rounded-[14px] w-full" data-name="Card">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start overflow-clip p-[1.108px] relative size-full">
          {/* CardHeader */}
          <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
            <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
            <div className="flex flex-row items-center size-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center pb-[13.108px] pt-[12px] px-[16px] relative w-full">
                <div className="bg-[#f3e8ff] relative rounded-[8px] shrink-0 size-[27.971px]">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
                    <Icon />
                  </div>
                </div>
                <div className="h-[19.992px] relative shrink-0">
                  <p className="font-medium leading-[20px] text-[#101828] text-[14px]">Load Details</p>
                </div>
              </div>
            </div>
          </div>

          {/* CardContent */}
          <div className="relative shrink-0 w-full">
            <div className="size-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
                
                {/* Type and Weight */}
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                  <div className="h-[34.998px] relative shrink-0 w-[170.492px]">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Type</p>
                    <p className="font-medium leading-[20px] text-[#0a0a0a] text-[14px] mt-[3px]">{type}</p>
                  </div>
                  <div className="h-[34.998px] relative shrink-0 w-[170.492px]">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Weight</p>
                    <p className="font-medium leading-[20px] text-[#0a0a0a] text-[14px] mt-[3px]">{weight}</p>
                  </div>
                </div>

                {/* Divisible and Self-Propelled */}
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                  <div className="h-[34.998px] relative shrink-0 w-[170.492px]">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Divisible</p>
                    <p className="capitalize font-medium leading-[20px] text-[#0a0a0a] text-[14px] mt-[3px]">{divisible}</p>
                  </div>
                  <div className="h-[34.998px] relative shrink-0 w-[170.492px]">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Self-Propelled</p>
                    <p className="capitalize font-medium leading-[20px] text-[#0a0a0a] text-[14px] mt-[3px]">{selfPropelled}</p>
                  </div>
                </div>

                {/* Commodity */}
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Commodity</p>
                  <p className="font-medium leading-[20px] text-[#0a0a0a] text-[14px] mt-[3px]">{commodity}</p>
                </div>

                {/* Description */}
                <div className="content-stretch flex flex-col h-[34.998px] items-start relative shrink-0 w-full">
                  <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Description</p>
                  <p className="font-medium leading-[20px] text-[#0a0a0a] text-[14px] mt-[3px]">{description}</p>
                </div>

                {/* Dimensions */}
                <div className="bg-[#f9fafb] relative rounded-[10px] shrink-0 w-full">
                  <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[10px]" />
                  <div className="size-full">
                    <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
                      <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Dimensions</p>
                      
                      {/* Main dimensions grid */}
                      <div className="h-[31px] relative shrink-0 w-full">
                        {/* Length */}
                        <div className="absolute h-[31px] left-0 top-0 w-[104.926px]">
                          <p className="font-bold leading-[16px] text-[#101828] text-[14px] text-center">{dimensions.length}</p>
                          <p className="font-normal leading-[15px] text-[#4a5565] text-[12px] text-center mt-[4px]">Length</p>
                        </div>
                        
                        {/* Width */}
                        <div className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid h-[31px] left-[112.92px] top-0 w-[104.926px]">
                          <p className="font-bold leading-[16px] text-[#101828] text-[14px] text-center">{dimensions.width}</p>
                          <p className="font-normal leading-[15px] text-[#4a5565] text-[12px] text-center mt-[4px]">Width</p>
                        </div>
                        
                        {/* Height */}
                        <div className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid h-[31px] left-[225.85px] top-0 w-[104.926px]">
                          <p className="font-bold leading-[16px] text-[#101828] text-[14px] text-center">{dimensions.height}</p>
                          <p className="font-normal leading-[15px] text-[#4a5565] text-[12px] text-center mt-[4px]">Height</p>
                        </div>
                      </div>

                      {/* Overhang section */}
                      <div className="h-[44.103px] relative shrink-0 w-full">
                        <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px_0px_0px] border-solid inset-0 pointer-events-none" />
                        
                        {/* Front Overhang */}
                        <div className="absolute h-[31px] left-0 top-[13.1px] w-[161.387px]">
                          <p className="font-bold leading-[16px] text-[#101828] text-[14px] text-center">{dimensions.frontOverhang}</p>
                          <p className="font-normal leading-[15px] text-[#4a5565] text-[12px] text-center mt-[4px]">Front Overhang</p>
                        </div>
                        
                        {/* Rear Overhang */}
                        <div className="absolute h-[31px] left-[169.38px] top-[13.1px] w-[161.387px] pl-[1.108px]">
                          <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
                          <p className="font-bold leading-[16px] text-[#101828] text-[14px] text-center">{dimensions.rearOverhang}</p>
                          <p className="font-normal leading-[15px] text-[#4a5565] text-[12px] text-center mt-[4px]">Rear Overhang</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Load Diagram */}
                {diagramFile && (
                  <div className="content-stretch flex flex-col gap-[3.998px] items-start relative shrink-0 w-full">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Load Diagram</p>
                    <div className="bg-[#f9fafb] h-[50.196px] relative rounded-[8px] shrink-0 w-full">
                      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
                      <div className="flex flex-row items-center size-full">
                        <div className="content-stretch flex gap-[8px] items-center px-[9.105px] py-[1.108px] relative size-full">
                          {/* PDF Icon */}
                          <div className="relative shrink-0 size-[18px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                              <path d={svgPaths.p3a382d00} stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              <path d={svgPaths.p678c080} stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              <path d="M7.5 6.75H6" stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              <path d="M12 9.75H6" stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                              <path d="M12 12.75H6" stroke="#FB2C36" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            </svg>
                          </div>
                          
                          <div className="basis-0 grow h-[31px] min-h-px min-w-px relative shrink-0">
                            <p className="font-medium leading-[16px] text-[#101828] text-[12px]">{diagramFile.name}</p>
                            <p className="font-normal leading-[15px] text-[#4a5565] text-[10px] mt-[2px]">{diagramFile.size} • PDF</p>
                          </div>
                          
                          {/* Download Icon */}
                          <div className="relative rounded-[8px] shrink-0 size-[31.987px] flex items-center justify-center">
                            <svg className="block size-[15.993px]" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <path d="M7.99667 9.99584V1.99917" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
                              <path d={svgPaths.p2cbd88c0} stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
                              <path d={svgPaths.p513700} stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}
