import svgPaths from "./svg-w6j1hy9zak";

function Text() {
  return <div className="absolute bg-[rgba(0,201,80,0.23)] left-[-0.99px] rounded-[3.96025e+07px] size-[12px] top-[2.01px]" data-name="Text" />;
}

function Text1() {
  return <div className="absolute bg-[#05df72] left-[-5px] opacity-0 rounded-[3.96025e+07px] size-[19.99px] top-[-5px]" data-name="Text" />;
}

function Text2() {
  return <div className="absolute bg-[#00c950] left-[2.01px] rounded-[3.96025e+07px] size-[6px] top-[2.01px]" data-name="Text" />;
}

function Text3() {
  return (
    <div className="relative shrink-0 size-[9.995px]" data-name="Text">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-[100.358px]" data-name="Text">
      <p className="font-bold leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white tracking-[0.6px] uppercase">In Transit</p>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <Text />
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Container1() {
  return <div className="h-[15px] shrink-0 w-[85px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="bg-[#0b1215] h-[31.977px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[15.989px] py-0 relative size-full">
          <Container />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#5f6269] text-[0px] text-[12px] text-nowrap">
          <span className="text-[#9a9faa]">TRIP ID:</span> <span className="font-medium">RF_25_001</span>
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[23.99px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center relative">
        <Text5 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <Container3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container4 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[11.987px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9869 11.9869">
        <g clipPath="url(#clip0_314_397)" id="Icon">
          <path d={svgPaths.p398aed00} id="Vector" stroke="var(--stroke-0, #2383F8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998907" />
        </g>
        <defs>
          <clipPath id="clip0_314_397">
            <rect fill="white" height="11.9869" width="11.9869" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex gap-[4px] h-[23.974px] items-center justify-center overflow-clip px-[12px] py-[4px] relative rounded-[8px] shrink-0" data-name="Badge">
      <Icon />
      <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#2383f8] text-[12px] text-nowrap">In Transit</p>
    </div>
  );
}

function PermitInfo() {
  return (
    <div className="bg-[#f7faff] relative shrink-0 w-full" data-name="Permit Info">
      <div aria-hidden="true" className="absolute border-[#eff0f3] border-[1.108px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pb-[8px] pt-[16px] px-[16px] relative w-full">
          <Container5 />
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap text-right">New York, NY</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-start justify-center relative shrink-0" data-name="Container">
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap uppercase">Origin</p>
      <Text6 />
      <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">12-05-2025</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-[154.299px]" data-name="Text">
      <p className="font-semibold leading-[16px] not-italic relative shrink-0 text-[#06c] text-[12px] text-center text-nowrap">Richmond, VA (I-95 South)</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap text-right">Miami, FL</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[3px] items-end relative shrink-0" data-name="Container">
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap uppercase">Destination</p>
      <Text8 />
      <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap text-right">12-15-2025</p>
    </div>
  );
}

function PermitRouteContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Permit route container">
      <Container6 />
      <Text7 />
      <Container7 />
    </div>
  );
}

function Container8() {
  return <div className="bg-[#00a63e] h-[5.993px] rounded-[3.96025e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container9() {
  return (
    <div className="bg-[#d6dbe6] h-[5.993px] relative rounded-[3.96025e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[228.47px] py-0 relative size-full">
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Container9 />
    </div>
  );
}

function Text9() {
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
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#067647] text-[12px] text-nowrap">NY</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#abefc6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#eff8ff] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-full">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#2563eb] text-[12px] text-nowrap">NJ</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bfdbfe] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#fef3f2] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-full">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#b42318] text-[12px] text-nowrap">PA</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#fecdca] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#ecfdf3] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-full">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#067647] text-[12px] text-nowrap">CT</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#abefc6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#eff8ff] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-full">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#2563eb] text-[12px] text-nowrap">MA</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bfdbfe] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-[#ecfdf3] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-full">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#067647] text-[12px] text-nowrap">MD</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#abefc6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[#f9f9f9] h-[30.216px] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-semibold leading-[16px] not-italic relative shrink-0 text-[#484848] text-[12px] text-nowrap">+5</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[6px] items-center relative w-full">
        <Badge1 />
        <Badge2 />
        <Badge3 />
        <Badge4 />
        <Badge5 />
        <Badge6 />
        <Badge7 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex gap-[7.997px] inset-0 items-center justify-center" data-name="Container">
      <Text9 />
      <Container11 />
    </div>
  );
}

function StatesListCollapse() {
  return (
    <div className="h-[30.216px] relative shrink-0 w-[372px]" data-name="States List collapse">
      <Container12 />
    </div>
  );
}

function StatesContainer() {
  return (
    <div className="content-stretch flex flex-col items-start pb-0 pt-[8px] px-0 relative shrink-0" data-name="States container">
      <StatesListCollapse />
    </div>
  );
}

function PermitDetailsContainer() {
  return (
    <div className="bg-[#f6faff] relative shrink-0 w-full" data-name="Permit details container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[12px] pt-[8px] px-[16px] relative w-full">
        <PermitRouteContainer />
        <Container10 />
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
          <path d="M7.99667 9.99584V1.99917" id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p2cbd88c0} id="Vector_2" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p513700} id="Vector_3" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#06c] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[9px] items-center justify-center px-[55px] py-[12px] relative w-full">
          <Icon1 />
          <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#06c] text-[14px] text-center text-nowrap">Download Permit(s)</p>
        </div>
      </div>
    </div>
  );
}

function Container13() {
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
      <Container13 />
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
        <Container2 />
        <PermitInfo />
        <PermitDetailsContainer />
        <TripDatesContainer />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.2)]" />
    </div>
  );
}