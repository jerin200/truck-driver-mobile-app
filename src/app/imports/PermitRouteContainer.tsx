import svgPaths from "./svg-d039kfrnio";

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] text-right">Los Angeles, CA</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start justify-center relative shrink-0" data-name="Container">
      <Text />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px]">12-16-2025</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p3e36f100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p21cb9c80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function RouteIcon() {
  return (
    <div className="bg-[#0b1215] col-1 content-stretch flex items-center ml-[35px] mt-0 p-[6px] relative rounded-[11px] row-1 size-[22px]" data-name="Route icon">
      <Icon />
    </div>
  );
}

function RouteIconContainer() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Route icon container">
      <div className="col-1 h-0 ml-0 mt-[10px] relative row-1 w-[92px]">
        <div className="absolute inset-[-0.5px_-0.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 93 1">
            <path d="M0.5 0.5H92.5" id="Vector 6" stroke="var(--stroke-0, #D5D5D5)" strokeDasharray="4 5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <RouteIcon />
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] text-right">San Francisco, CA</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-px items-end relative shrink-0" data-name="Container">
      <Text1 />
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-right">12-25-2025</p>
    </div>
  );
}

export default function PermitRouteContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full" data-name="Permit route container">
      <Container />
      <RouteIconContainer />
      <Container1 />
    </div>
  );
}