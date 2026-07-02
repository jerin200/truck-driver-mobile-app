import svgPaths from "./svg-wog97i87cz";

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[16px] text-neutral-950 text-nowrap text-right whitespace-pre">New York, NY</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Container">
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap uppercase whitespace-pre">Origin</p>
      <Text />
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
    <div className="[grid-area:1_/_1] bg-[#0b1215] content-stretch flex items-center ml-[47.5px] mt-0 p-[6px] relative rounded-[11px] size-[22px]" data-name="Route icon">
      <Icon />
    </div>
  );
}

function RouteIconContainer() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Route icon container">
      <div className="[grid-area:1_/_1] flex h-[0.972px] items-center justify-center ml-0 mt-[10.03px] relative w-[117.25px]" style={{ "--transform-inner-width": "117.25", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-[359.525deg]">
          <div className="h-0 relative w-[117.254px]">
            <div className="absolute inset-[-0.5px_-0.43%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 119 1">
                <path d="M0.5 0.5H117.754" id="Vector 6" stroke="var(--stroke-0, #D5D5D5)" strokeDasharray="4 5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
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
        <p className="font-medium leading-[20px] not-italic relative shrink-0 text-[16px] text-neutral-950 text-nowrap text-right whitespace-pre">Miami, FL</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0" data-name="Container">
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap uppercase whitespace-pre">Destination</p>
      <Text1 />
    </div>
  );
}

function PermitRouteContainer() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Permit route container">
      <Container />
      <RouteIconContainer />
      <Container1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[15.993px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.993px] items-start relative">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap tracking-[0.6px] uppercase whitespace-pre">State(s):</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#ecfdf3] relative rounded-[5px] shrink-0 w-[36px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-[36px]">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#067647] text-[12px] text-nowrap whitespace-pre">NY</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#abefc6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#eff8ff] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-[35.639px]">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-blue-600 text-nowrap whitespace-pre">NJ</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-blue-200 border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#fef3f2] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-[35.639px]">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#b42318] text-[12px] text-nowrap whitespace-pre">PA</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#fecdca] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[#ecfdf3] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-[35.639px]">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#067647] text-[12px] text-nowrap whitespace-pre">CT</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#abefc6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[#eff8ff] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-[35.639px]">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[12px] text-blue-600 text-nowrap whitespace-pre">MA</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-blue-200 border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#ecfdf3] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[13.108px] py-[7.108px] relative rounded-[inherit] w-[35.639px]">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#067647] text-[12px] text-nowrap whitespace-pre">MD</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#abefc6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-[#ededed] h-[30.216px] relative rounded-[5px] shrink-0 w-[35.639px]" data-name="Badge">
      <div className="content-stretch flex h-[30.216px] items-center justify-center overflow-clip px-[17px] py-[8px] relative rounded-[inherit] w-[35.639px]">
        <p className="font-semibold leading-[16px] not-italic relative shrink-0 text-[#484848] text-[12px] text-nowrap whitespace-pre">+5</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cecece] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-center flex flex-wrap gap-[8px] items-center relative w-full">
        <Badge />
        <Badge1 />
        <Badge2 />
        <Badge3 />
        <Badge4 />
        <Badge5 />
        <Badge6 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[7.997px] inset-0 items-center justify-center" data-name="Container">
      <Text2 />
      <Container2 />
    </div>
  );
}

function StatesListCollapse() {
  return (
    <div className="h-[30.216px] relative shrink-0 w-[372px]" data-name="States List collapse">
      <Container3 />
    </div>
  );
}

function StatesContainer() {
  return (
    <div className="content-stretch flex flex-col items-start px-0 py-[8px] relative shrink-0" data-name="States container">
      <StatesListCollapse />
    </div>
  );
}

function Text3() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-normal leading-[24px] not-italic relative shrink-0 text-[#101828] text-[13px] text-nowrap whitespace-pre">Trip ID: RF_25_001</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[23.99px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[23.99px] items-center relative">
        <Text3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <Container4 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-[182px]" data-name="Container">
      <Container5 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[13.986px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.p2b50cf70} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
          <path d={svgPaths.p3da82f00} id="Vector_2" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16546" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-[53.934px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.993px] items-start overflow-clip relative rounded-[inherit] w-[53.934px]">
        <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-nowrap whitespace-pre">John Doe</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[5.989px] h-[15.993px] items-center relative shrink-0 w-[179.596px]" data-name="Container">
      <Icon1 />
      <Text4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Container7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Container6 />
      <Container8 />
    </div>
  );
}

function PermitDetailsContainer() {
  return (
    <div className="bg-[#f6faff] relative shrink-0 w-full" data-name="Permit details container">
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[16px] py-[12px] relative w-full">
          <PermitRouteContainer />
          <StatesContainer />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[13.328px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[13.328px] items-start relative">
        <p className="font-normal leading-[13.333px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap tracking-[0.5px] uppercase whitespace-pre">Trip start date</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[15.993px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.993px] items-start relative">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap whitespace-pre">12-05-2025</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[29.321px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] h-[29.321px] items-start relative">
        <Text5 />
        <Text6 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-gray-200 h-[29.321px] relative shrink-0 w-[0.987px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid h-[29.321px] w-[0.987px]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[13.328px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[13.328px] items-start relative">
        <p className="font-normal leading-[13.333px] not-italic relative shrink-0 text-[#6a7282] text-[12px] text-nowrap tracking-[0.5px] uppercase whitespace-pre">Trip end date</p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-[79px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-[15.993px] items-center justify-between relative w-[79px]">
        <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap text-right whitespace-pre">12-15-2025</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[29.321px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] h-[29.321px] items-end justify-center relative">
        <Text7 />
        <Text8 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-white content-stretch flex items-start justify-between px-0 py-[8px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function PermitItem() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="PermitItem">
      <div aria-hidden="true" className="absolute border-[0px_0px_1.108px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start px-[16px] py-[8px] relative w-full">
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
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
          <Icon2 />
          <p className="font-medium leading-[16px] not-italic relative shrink-0 text-[#2383f8] text-[14px] text-center text-nowrap whitespace-pre">Download Permit(s)</p>
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
    <div className="bg-[#fdbb6b] content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[20px] py-[12px] relative rounded-[8px] shrink-0" data-name="button">
      <div aria-hidden="true" className="absolute border border-[#f89823] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="capitalize flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Details</p>
      </div>
      <RightIcon />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p39a1e780} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p11974af0} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p133c1580} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[31.987px]" data-name="Button">
      <Icon3 />
    </div>
  );
}

function PermitDetailsContainer1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Permit details container">
      <Button2 />
    </div>
  );
}

function DownloadButtonContainer() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Download button container">
      <Container13 />
      <Button1 />
      <PermitDetailsContainer1 />
    </div>
  );
}

function TripDatesContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Trip dates container">
      <div aria-hidden="true" className="absolute border-[#eeeeee] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[16px] pt-[12px] px-[16px] relative w-full">
          <DownloadButtonContainer />
        </div>
      </div>
    </div>
  );
}

export default function CardContent() {
  return (
    <div className="bg-white relative rounded-[8px] size-full" data-name="CardContent">
      <div className="content-stretch flex flex-col items-center overflow-clip relative rounded-[inherit] size-full">
        <PermitDetailsContainer />
        <PermitItem />
        <TripDatesContainer />
      </div>
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.2)]" />
    </div>
  );
}