import svgPaths from "./svg-dcqwlchl43";

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#5f6269] text-[14px] text-nowrap">
          <span className="text-[#9a9faa]">TRIP ID:</span> <span className="font-medium">RF_25_001</span>
        </p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[23.99px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <Text />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <Container />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[182px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#dcfce7] content-stretch flex h-[23.974px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[8px] shrink-0" data-name="Badge">
      <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Upcoming</p>
    </div>
  );
}

function PermitInfo() {
  return (
    <div className="bg-[#f7faff] relative shrink-0 w-full" data-name="Permit Info">
      <div aria-hidden="true" className="absolute border-[#eff0f3] border-[1.108px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[8px] pt-[16px] px-[16px] relative w-full">
          <Container2 />
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-semibold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] text-nowrap text-right">Los Angeles, CA</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start justify-center relative shrink-0" data-name="Container">
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap uppercase">Origin</p>
      <Text1 />
      <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">12-16-2025</p>
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
    <div className="[grid-area:1_/_1] bg-[#0b1215] content-stretch flex items-center ml-[35px] mt-0 p-[6px] relative rounded-[11px] size-[22px]" data-name="Route icon">
      <Icon />
    </div>
  );
}

function RouteIconContainer() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Route icon container">
      <div className="[grid-area:1_/_1] h-0 ml-0 mt-[10px] relative w-[92px]">
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

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-semibold leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] text-nowrap text-right">San Francisco, CA</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-px items-end relative shrink-0" data-name="Container">
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap uppercase">Destination</p>
      <Text2 />
      <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap text-right">12-25-2025</p>
    </div>
  );
}

function PermitRouteContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Permit route container">
      <Container3 />
      <RouteIconContainer />
      <Container4 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15.993px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap tracking-[0.6px] uppercase">Permit(s):</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#ecfdf3] relative rounded-[5px] shrink-0 w-[36px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-full">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#067647] text-[12px] text-nowrap">CA</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#abefc6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[8px] items-center relative">
        <Badge1 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[7.997px] inset-0 items-center justify-center" data-name="Container">
      <Text3 />
      <Container5 />
    </div>
  );
}

function StatesListCollapse() {
  return (
    <div className="h-[30.216px] relative shrink-0 w-full" data-name="States List collapse">
      <Container6 />
    </div>
  );
}

function StatesContainer() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[8px] px-0 relative shrink-0 w-[372px]" data-name="States container">
      <StatesListCollapse />
    </div>
  );
}

function PermitDetailsContainer() {
  return (
    <div className="bg-[#f6faff] relative shrink-0 w-full" data-name="Permit details container">
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[16px] py-[12px] relative w-full">
        <PermitRouteContainer />
        <StatesContainer />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9933 15.9933">
        <g id="Icon">
          <path d="M7.99667 9.99584V1.99917" id="Vector" stroke="var(--stroke-0, #2383F8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p2cbd88c0} id="Vector_2" stroke="var(--stroke-0, #2383F8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p513700} id="Vector_3" stroke="var(--stroke-0, #2383F8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#2383f8] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[9px] items-center justify-center px-[55px] py-[12px] relative w-full">
          <Icon1 />
          <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#2383f8] text-[14px] text-center text-nowrap">Download Permit(s)</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Button />
    </div>
  );
}

function RightIcon() {
  return (
    <div className="h-[14px] relative shrink-0 w-[8px]" data-name="Right Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
        <g id="Right Icon">
          <path d={svgPaths.p369edd30} fill="var(--fill-0, #1A1A1A)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[20px] py-[12px] relative rounded-[8px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="capitalize flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap">
        <p className="leading-[normal]">Details</p>
      </div>
      <RightIcon />
    </div>
  );
}

function DownloadButtonContainer() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative shrink-0 w-full" data-name="Download button container">
      <Container7 />
      <Button1 />
    </div>
  );
}

function TripDatesContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Trip dates container">
      <div className="content-stretch flex flex-col items-start pb-[16px] pt-[12px] px-[16px] relative w-full">
        <DownloadButtonContainer />
      </div>
    </div>
  );
}

export default function CardContent() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="CardContent">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <PermitInfo />
        <PermitDetailsContainer />
        <TripDatesContainer />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.2)]" />
    </div>
  );
}