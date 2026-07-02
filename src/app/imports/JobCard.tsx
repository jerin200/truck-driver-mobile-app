import svgPaths from "./svg-biv2flftkh";

function Input() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center pl-[41.108px] pr-[1.108px] py-[1.108px] relative size-full">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#83838d] text-[14px] text-nowrap">
            <p className="leading-[normal]">Search ID, Driver, Origin and desti...</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[15.993px] top-[14.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9933 15.9933">
        <g id="Icon">
          <path d={svgPaths.p233b7e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p14a64180} id="Vector_2" stroke="var(--stroke-0, #83838D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="basis-0 content-stretch flex gap-[10px] grow h-[45px] items-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Input />
      <Icon />
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[45px]" data-name="Button">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)", "--stroke-0": "rgba(229, 231, 235, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
          <g id="Button">
            <mask fill="white" id="path-1-inside-1_317_83">
              <path d={svgPaths.p251af980} />
            </mask>
            <path d={svgPaths.p251af980} fill="var(--fill-0, white)" />
            <path d={svgPaths.p12f5800} fill="var(--stroke-0, #E5E7EB)" mask="url(#path-1-inside-1_317_83)" />
            <path d={svgPaths.p3cd66b80} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container />
      <Button />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[16px] py-[7px] relative rounded-[5px] shadow-[0px_0px_2px_0px_#949ec5] shrink-0 w-[93.398px]" data-name="Primitive.button" style={{ backgroundImage: "linear-gradient(136.686deg, rgb(37, 99, 235) 29.703%, rgb(78, 121, 216) 92.928%)" }}>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">All</p>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[13.108px] py-[7.108px] relative rounded-[8px] shrink-0 w-[93.398px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center text-nowrap">Assigned</p>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[13.108px] py-[7.108px] relative rounded-[8px] shrink-0 w-[93.398px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center text-nowrap">Open</p>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[13.108px] py-[7.108px] relative rounded-[8px] shrink-0 w-[93.398px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center text-nowrap">Completed</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[14px] shrink-0 w-full" data-name="Tab List">
      <PrimitiveButton />
      <PrimitiveButton1 />
      <PrimitiveButton2 />
      <PrimitiveButton3 />
    </div>
  );
}

function TabBar() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Tab bar">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[5px] relative w-full">
          <TabList />
        </div>
      </div>
    </div>
  );
}

export default function JobCard() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="Job card">
      <Container1 />
      <TabBar />
    </div>
  );
}