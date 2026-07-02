import svgPaths from "../imports/svg-3kjyofh18w";

function Icon() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
            <path d={svgPaths.p387cfc00} id="Vector" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p2ee18900} id="Vector" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 2">
            <path d="M1.99917 0.666389H0.666389" id="Vector" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 2">
            <path d="M5.9975 0.666389H0.666389" id="Vector" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 2">
            <path d="M5.9975 0.666389H0.666389" id="Vector" stroke="#4A5565" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface GeneralInformationCardProps {
  permitType: string;
  duration: string;
  reference: string;
}

export default function GeneralInformationCard({ permitType, duration, reference }: GeneralInformationCardProps) {
  return (
    <div className="bg-white relative rounded-[14px] w-full" data-name="Card">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center overflow-clip p-px relative size-full">
          {/* CardHeader */}
          <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
            <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[7.997px] items-center pb-[13.108px] pt-[12px] px-[16px] relative w-full">
                <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 size-[27.971px]">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
                    <Icon />
                  </div>
                </div>
                <div className="h-[19.992px] relative shrink-0">
                  <p className="font-semibold leading-[20px] text-[#101828] text-[14px]">General Information</p>
                </div>
              </div>
            </div>
          </div>

          {/* CardContent */}
          <div className="relative shrink-0 w-full">
            <div className="size-full">
              <div className="content-start flex flex-wrap gap-[15px] items-start p-[16px] relative w-full">
                {/* Permit Type */}
                <div className="h-[34.998px] relative shrink-0 w-[170.492px]">
                  <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Permit Type</p>
                  </div>
                  <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]">
                    <p className="capitalize font-medium leading-[20px] text-[#0a0a0a] text-[14px]">{permitType}</p>
                  </div>
                </div>

                {/* Duration */}
                <div className="h-[34.998px] relative shrink-0 w-[170.492px]">
                  <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Duration</p>
                  </div>
                  <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]">
                    <p className="font-medium leading-[20px] text-[#0a0a0a] text-[14px]">{duration}</p>
                  </div>
                </div>

                {/* Reference */}
                <div className="content-stretch flex flex-col h-[34.998px] items-start relative shrink-0 w-full">
                  <div className="h-[15.007px] relative shrink-0 w-full">
                    <p className="font-semibold leading-[15px] text-[#4a5565] text-[12px] uppercase">Reference</p>
                  </div>
                  <div className="h-[19.992px] relative shrink-0 w-full">
                    <p className="tabular-nums tracking-wide leading-[20px] text-[#0a0a0a] text-[14px]">{reference}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}
