import svgPaths from "./svg-8sy3yvlqma";
import imgMapImage from "figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png";

function MapContainer() {
  return (
    <div className="content-stretch flex flex-col h-[433px] items-center justify-end relative shrink-0" data-name="Map Container">
      <div className="absolute h-[433px] left-0 top-[-130px] w-[477px]" data-name="Map Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMapImage} />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[16.007px] items-start left-[17.98px] top-0 w-[96.467px]" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap tracking-[0.3px] uppercase">Live Tracking</p>
    </div>
  );
}

function Text1() {
  return <div className="absolute bg-[#00c950] left-[-3.29px] opacity-[0.256] rounded-[3.96025e+07px] size-[16.585px] top-[-3.29px]" data-name="Text" />;
}

function Text2() {
  return <div className="absolute bg-[#00a63e] left-0 rounded-[3.96025e+07px] size-[9.995px] top-0" data-name="Text" />;
}

function Text3() {
  return (
    <div className="absolute left-0 size-[9.995px] top-[3.01px]" data-name="Text">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[16.007px] relative shrink-0 w-[114.447px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text />
        <Text3 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-[#f3f4f6] h-[23.974px] relative rounded-[4px] shrink-0 w-[88.519px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-semibold tabular-nums leading-[16px] left-[7.99px] not-italic text-[#4a5565] text-[12px] top-[2.98px] w-[73px]">ETA: 5h 30m</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[23.974px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container />
      <Text4 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[13.997px] top-px" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_156_1299)" id="Icon">
          <path d={svgPaths.p3e500d80} id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
          <path d="M8.74812 10.4977H5.24887" id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
          <path d={svgPaths.p5753980} id="Vector_3" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
          <path d={svgPaths.p3d9bef00} id="Vector_4" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
          <path d={svgPaths.p3492100} id="Vector_5" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16642" />
        </g>
        <defs>
          <clipPath id="clip0_156_1299">
            <rect fill="white" height="13.997" width="13.997" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[16.007px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[19.99px] not-italic text-[#101828] text-[14px] text-nowrap top-0">Richmond, VA (I-95 South)</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16.007px] relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-start relative">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[14px] text-nowrap">62 mph</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[16.007px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex items-start justify-between relative size-full">
          <Text5 />
          <Text6 />
        </div>
      </div>
    </div>
  );
}

function RouteDetailsContainer() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Route Details Container">
      <Container2 />
    </div>
  );
}

function Container3() {
  return <div className="bg-[#00a63e] h-[7.985px] rounded-[3.96025e+07px] shadow-[0px_0px_10px_0px_rgba(37,99,235,0.5)] shrink-0 w-full" data-name="Container" />;
}

function Container4() {
  return (
    <div className="bg-[#f3f4f6] h-[7.985px] relative rounded-[3.96025e+07px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[228.47px] py-0 relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function RouteInfoContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Route Info Container">
      <RouteDetailsContainer />
      <Container4 />
    </div>
  );
}

function InfoContainer() {
  return (
    <div className="bg-[rgba(255,255,255,0.72)] relative shrink-0 w-full" data-name="Info Container">
      <div className="flex flex-col items-center justify-end size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center justify-end p-[16px] relative w-full">
          <Container1 />
          <RouteInfoContainer />
        </div>
      </div>
    </div>
  );
}

function PermitCreationContent() {
  return (
    <div className="bg-[#d4d3d3] content-stretch flex flex-col h-[294px] items-end justify-between overflow-clip relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Permit creation content">
      <MapContainer />
      <InfoContainer />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Heading 2">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[16px] text-nowrap">Trip - RF_25_001</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Heading />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[9.17px] size-[11.987px] top-[5.18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_156_1351)" id="Icon">
          <path d={svgPaths.p398aed00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998907" />
        </g>
        <defs>
          <clipPath id="clip0_156_1351">
            <rect fill="white" height="11.9869" width="11.9869" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#2383f8] h-[22.351px] relative rounded-[5px] shrink-0 w-[91.285px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon1 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[29.12px] not-italic text-[12px] text-nowrap text-white top-[3.17px]">In Transit</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.18px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex items-start justify-between relative w-full">
          <Container5 />
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.832986 0.832986V4.16493" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.832986 0.832986V4.16493" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p2307f910} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 2">
            <path d="M0.832986 0.832986H15.8267" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[3.71704e+07px] shrink-0 size-[35.985px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[7.997px] px-[7.997px] relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[80.088px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Trip Start</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[80.088px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">2024-12-05</p>
    </div>
  );
}

function ViewPermitRequest1() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[80.088px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function CardContent() {
  return (
    <div className="h-[71.97px] relative shrink-0 w-full" data-name="CardContent">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
          <ViewPermitRequest />
          <ViewPermitRequest1 />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)] shrink-0" data-name="Card">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start relative w-full">
          <CardContent />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[19.992px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.832986 0.832986V4.16493" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.832986 0.832986V4.16493" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p2307f910} id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 2">
            <path d="M0.832986 0.832986H15.8267" id="Vector" stroke="var(--stroke-0, #F54900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest2() {
  return (
    <div className="bg-[#fff7ed] relative rounded-[3.71704e+07px] shrink-0 size-[35.985px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[7.997px] px-[7.997px] relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[76.851px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Trip End</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[76.851px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">2024-12-15</p>
    </div>
  );
}

function ViewPermitRequest3() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[76.851px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function CardContent1() {
  return (
    <div className="h-[71.97px] relative shrink-0 w-full" data-name="CardContent">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
          <ViewPermitRequest2 />
          <ViewPermitRequest3 />
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)] shrink-0" data-name="Card">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start relative w-full">
          <CardContent1 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p11b23400} id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest4() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[119.05px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">Route Information</p>
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center pb-[13.108px] pl-[15.993px] pr-0 pt-[12px] relative w-full">
          <ViewPermitRequest4 />
          <CardTitle />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[#e5e7eb] h-[167px] left-[15.89px] top-[7.84px] w-[2px]" data-name="Container" />;
}

function Paragraph4() {
  return (
    <div className="h-[9.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[-0.18px] uppercase">Origin</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.18px]">New York, NY</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[14px]">Pickup: 08:00</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] h-[51.968px] items-start left-[32px] top-0 w-[319.497px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[#00c950] border-[3.541px] border-solid border-white left-[7.01px] rounded-[3.96025e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[19.99px] top-0" data-name="Container" />;
}

function Paragraph7() {
  return (
    <div className="h-[9.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[-0.18px] uppercase">Current Status</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.18px]">In Transit</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#155dfc] text-[14px]">Richmond, VA (I-95 South)</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] h-[51.968px] items-start left-[32px] top-[83.96px] w-[319.497px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Container12() {
  return <div className="absolute bg-[#2b7fff] border-[3.541px] border-solid border-white left-[7.01px] rounded-[3.96025e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[19.99px] top-[83.96px]" data-name="Container" />;
}

function Paragraph10() {
  return (
    <div className="h-[9.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[-0.18px] uppercase">Destination</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.18px]">Miami, FL</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[14px]">Delivery: By 18:00</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] h-[51.968px] items-start left-[32px] top-[167.93px] w-[319.497px]" data-name="Container">
      <Paragraph10 />
      <Paragraph11 />
      <Paragraph12 />
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-[#fb2c36] border-[3.541px] border-solid border-white left-[7.01px] rounded-[3.96025e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[19.99px] top-[167.93px]" data-name="Container" />;
}

function ViewPermitRequest5() {
  return (
    <div className="h-[219.895px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[15.989px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p34b54c00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d="M9.99291 3.83995V13.8329" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d="M5.99575 2.1558V12.1487" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Total Distance</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">1280 miles</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[35.998px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start relative">
        <Paragraph13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-[104.765px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.985px] items-center relative size-full">
        <Icon5 />
        <Container15 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[#e5e7eb] h-[31.996px] relative shrink-0 w-[0.996px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[15.989px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_156_1313)" id="Icon">
          <path d={svgPaths.p1847f8e0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d={svgPaths.p320b3800} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
        <defs>
          <clipPath id="clip0_156_1313">
            <rect fill="white" height="15.9887" width="15.9887" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Est. Time</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.18px]">2d 4h</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-[52.429px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph15 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-[76.403px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.985px] items-center relative size-full">
        <Icon6 />
        <Container18 />
      </div>
    </div>
  );
}

function ViewPermitRequest6() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.18px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pt-[17.18px] px-[15.989px] relative w-full">
          <Container16 />
          <Container17 />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function CardContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[15.993px] items-start p-[16px] relative w-full">
          <ViewPermitRequest5 />
          <ViewPermitRequest6 />
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader />
          <CardContent2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[387.181px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">Statewise Permits</p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
            <path d={svgPaths.p18603f00} id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p28f96b80} id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0" data-name="CardTitle">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Jurisdictions</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative w-full">
        <Container20 />
        <CardTitle1 />
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-white h-[19.992px] relative rounded-[5px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[9.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-nowrap">7/11 Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function ViewPermitRequest7() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[34.998px] items-center relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Frame />
      <Badge1 />
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
          <ViewPermitRequest7 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">NY</p>
      </div>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[106px]">NY State Permit</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#f0fdf4] h-[19.992px] relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge2 />
      <Text7 />
    </div>
  );
}

function Container23() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph17 />
        <Container22 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container21 />
        <Container23 />
      </div>
    </div>
  );
}

function Icon8() {
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
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function ViewPermitRequest8() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container24 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">NJ</p>
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute h-[19.992px] left-0 top-0 w-[104.182px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[105px]">NJ State Permit</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[#eff6ff] h-[19.992px] left-0 rounded-[8px] top-[19.99px]" data-name="Badge">
      <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#2383f8] text-[12px] text-nowrap">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[104.182px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph18 />
        <Badge3 />
      </div>
    </div>
  );
}

function ViewPermitRequest9() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-[354.761px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
        <Container25 />
        <Container26 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">PA</p>
      </div>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute h-[19.992px] left-0 top-0 w-[103.368px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[104px]">PA State Permit</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[#fef2f2] h-[19.992px] left-0 rounded-[8px] top-[19.99px]" data-name="Badge">
      <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#c10007] text-[12px] text-nowrap">Rejected</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#ffc9c9] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[103.368px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph19 />
        <Badge4 />
      </div>
    </div>
  );
}

function ViewPermitRequest10() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-[354.761px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest10 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">CT</p>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[105px]">CT State Permit</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[#f0fdf4] h-[19.992px] relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge5 />
      <Text8 />
    </div>
  );
}

function Container31() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph20 />
        <Container30 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container29 />
        <Container31 />
      </div>
    </div>
  );
}

function Icon9() {
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

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function ViewPermitRequest11() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container32 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">MA</p>
      </div>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute h-[19.992px] left-0 top-0 w-[108.232px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[109px]">MA State Permit</p>
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-[#eff6ff] h-[19.992px] left-0 rounded-[8px] top-[19.99px]" data-name="Badge">
      <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#2383f8] text-[12px] text-nowrap">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[108.232px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph21 />
        <Badge6 />
      </div>
    </div>
  );
}

function ViewPermitRequest12() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-[354.761px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
        <Container33 />
        <Container34 />
      </div>
    </div>
  );
}

function Card7() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest12 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container35() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">MD</p>
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[109px]">MD State Permit</p>
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[#f0fdf4] h-[19.992px] relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge7 />
      <Text9 />
    </div>
  );
}

function Container37() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph22 />
        <Container36 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container35 />
        <Container37 />
      </div>
    </div>
  );
}

function Icon10() {
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

function Button2() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function ViewPermitRequest13() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container38 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Card8() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">VA</p>
      </div>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[105px]">VA State Permit</p>
    </div>
  );
}

function Badge8() {
  return (
    <div className="bg-[#f0fdf4] h-[19.992px] relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge8 />
      <Text10 />
    </div>
  );
}

function Container41() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph23 />
        <Container40 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container39 />
        <Container41 />
      </div>
    </div>
  );
}

function Icon11() {
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

function Button3() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function ViewPermitRequest14() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container42 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Card9() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest14 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">NC</p>
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[19.992px] left-0 top-0 w-[164.105px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[107px]">NC State Permit</p>
    </div>
  );
}

function Badge9() {
  return (
    <div className="bg-[#f0fdf4] h-[19.992px] relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[7.997px] h-[19.992px] items-center left-0 top-[19.99px] w-[164.105px]" data-name="Container">
      <Badge9 />
      <Text11 />
    </div>
  );
}

function Container45() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph24 />
        <Container44 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container43 />
        <Container45 />
      </div>
    </div>
  );
}

function Icon12() {
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

function Button4() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function ViewPermitRequest15() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container46 />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Card10() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest15 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">SC</p>
      </div>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[105px]">SC State Permit</p>
    </div>
  );
}

function Badge10() {
  return (
    <div className="bg-[#f0fdf4] h-[19.992px] relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge10 />
      <Text12 />
    </div>
  );
}

function Container49() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph25 />
        <Container48 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container47 />
        <Container49 />
      </div>
    </div>
  );
}

function Icon13() {
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

function Button5() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function ViewPermitRequest16() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container50 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Card11() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest16 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container51() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">GA</p>
      </div>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[106px]">GA State Permit</p>
    </div>
  );
}

function Badge11() {
  return (
    <div className="bg-[#f0fdf4] h-[19.992px] relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#008236] text-[12px] text-nowrap">Approved</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge11 />
      <Text13 />
    </div>
  );
}

function Container53() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph26 />
        <Container52 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container51 />
        <Container53 />
      </div>
    </div>
  );
}

function Icon14() {
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

function Button6() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon14 />
      </div>
    </div>
  );
}

function ViewPermitRequest17() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container54 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Card12() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container55() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">FL</p>
      </div>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[19.992px] left-0 top-0 w-[101.707px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] top-[0.11px] w-[102px]">FL State Permit</p>
    </div>
  );
}

function Badge12() {
  return (
    <div className="absolute bg-[#eff6ff] h-[19.992px] left-0 rounded-[8px] top-[19.99px]" data-name="Badge">
      <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[7.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#2383f8] text-[12px] text-nowrap">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[101.707px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph27 />
        <Badge12 />
      </div>
    </div>
  );
}

function ViewPermitRequest18() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
          <Container55 />
          <Container56 />
        </div>
      </div>
    </div>
  );
}

function Card13() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest18 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
      <Card12 />
      <Card13 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Primitive.div">
      <Container57 />
    </div>
  );
}

function CardContent3() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative w-full">
          <PrimitiveDiv />
        </div>
      </div>
    </div>
  );
}

function Card14() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader1 />
          <CardContent3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Card14 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
            <path d={svgPaths.p387cfc00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p2ee18900} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 2">
            <path d="M1.99917 0.666389H0.666389" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 2">
            <path d="M5.9975 0.666389H0.666389" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 2">
            <path d="M5.9975 0.666389H0.666389" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest19() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
        <Icon15 />
      </div>
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[132.603px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">General Information</p>
      </div>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.997px] items-center pb-[13.108px] pt-[12px] px-[16px] relative w-full">
          <ViewPermitRequest19 />
          <CardTitle2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Permit Type</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Oversize</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph28 />
      <Paragraph29 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Duration</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.11px] w-[46px]">5 Days</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph30 />
      <Paragraph31 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Reference</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute tabular-nums tracking-wide leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-0.89px]">N/A</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col h-[34.998px] items-start relative shrink-0 w-[356.977px]" data-name="Container">
      <Paragraph32 />
      <Paragraph33 />
    </div>
  );
}

function ViewPermitRequest20() {
  return (
    <div className="relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="size-full">
        <div className="content-start flex flex-wrap gap-[15px] items-start p-[16px] relative w-full">
          <Container59 />
          <Container60 />
          <Container61 />
        </div>
      </div>
    </div>
  );
}

function Card15() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center p-px relative w-full">
          <CardHeader2 />
          <ViewPermitRequest20 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
            <path d={svgPaths.pe6d3300} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[13.75%] right-[13.75%] top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-20%_-5.75%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 5">
            <path d={svgPaths.p37cc240} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-10%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
            <path d="M0.666389 7.33028V0.666389" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest21() {
  return (
    <div className="bg-[#f3e8ff] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[82.511px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">Load Details</p>
      </div>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.997px] items-center pb-[13.108px] pt-[12px] px-[16px] relative w-full">
          <ViewPermitRequest21 />
          <CardTitle3 />
        </div>
      </div>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Type</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Excavator</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph34 />
      <Paragraph35 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Weight</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">45,000 lbs</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph36 />
      <Paragraph37 />
    </div>
  );
}

function ViewPermitRequest22() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Container62 />
      <Container63 />
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Divisible</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">No</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph38 />
      <Paragraph39 />
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Self-Propelled</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Yes</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph40 />
      <Paragraph41 />
    </div>
  );
}

function ViewPermitRequest23() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-[356.977px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Commodity</p>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[356.977px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Class I - Other</p>
    </div>
  );
}

function ViewPermitRequest24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Paragraph42 />
      <Paragraph43 />
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Description</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Heavy machinery transport</p>
    </div>
  );
}

function ViewPermitRequest25() {
  return (
    <div className="content-stretch flex flex-col h-[34.998px] items-start relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Paragraph44 />
      <Paragraph45 />
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Dimensions</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[104.926px]" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px] text-center">20 ft</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute h-[15.007px] left-0 top-[15.99px] w-[104.926px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[52.93px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Length</p>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute h-[31px] left-0 top-0 w-[104.926px]" data-name="Container">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[103.818px]" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px] text-center">8.5 ft</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute h-[15.007px] left-0 top-[15.99px] w-[103.818px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[52.04px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Width</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid h-[31px] left-[112.92px] top-0 w-[104.926px]" data-name="Container">
      <Container69 />
      <Container70 />
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[103.818px]" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px] text-center">10 ft</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute h-[15.007px] left-0 top-[15.99px] w-[103.818px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[52.3px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Height</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid h-[31px] left-[225.85px] top-0 w-[104.926px]" data-name="Container">
      <Container72 />
      <Container73 />
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[31px] relative shrink-0 w-full" data-name="Container">
      <Container68 />
      <Container71 />
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[80.86px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]">0 ft</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[81.4px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Front Overhang</p>
    </div>
  );
}

function Container78() {
  return (
    <div className="absolute content-stretch flex flex-col h-[31px] items-start left-0 top-[13.1px] w-[161.387px]" data-name="Container">
      <Container76 />
      <Container77 />
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[81.09px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]">2 ft</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[80.49px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Rear Overhang</p>
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute content-stretch flex flex-col h-[31px] items-start left-[169.38px] pl-[1.108px] pr-0 py-0 top-[13.1px] w-[161.387px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <Container79 />
      <Container80 />
    </div>
  );
}

function Container82() {
  return (
    <div className="h-[44.103px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container78 />
      <Container81 />
    </div>
  );
}

function ViewPermitRequest26() {
  return (
    <div className="bg-[#f9fafb] h-[136.307px] relative rounded-[10px] shrink-0 w-full" data-name="ViewPermitRequest">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
          <Paragraph46 />
          <Container75 />
          <Container82 />
        </div>
      </div>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Load Diagram</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3a382d00} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p678c080} id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.5 6.75H6" id="Vector_3" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 9.75H6" id="Vector_4" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 12.75H6" id="Vector_5" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="content-stretch flex h-[15.993px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[12px]">diagram-v1.pdf</p>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#4a5565] text-[10px] text-nowrap top-[0.11px]">2.4 MB • PDF</p>
    </div>
  );
}

function Container83() {
  return (
    <div className="basis-0 grow h-[31px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph48 />
        <Paragraph49 />
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M7.99667 9.99584V1.99917" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p2cbd88c0} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          <path d={svgPaths.p513700} id="Vector_3" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[31.987px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="bg-[#f9fafb] h-[50.196px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[9.105px] py-[1.108px] relative size-full">
          <Icon17 />
          <Container83 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest27() {
  return (
    <div className="content-stretch flex flex-col gap-[3.998px] h-[69.201px] items-start relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Paragraph47 />
      <Container84 />
    </div>
  );
}

function CardContent4() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <ViewPermitRequest22 />
          <ViewPermitRequest23 />
          <ViewPermitRequest24 />
          <ViewPermitRequest25 />
          <ViewPermitRequest26 />
          <ViewPermitRequest27 />
        </div>
      </div>
    </div>
  );
}

function Card16() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader3 />
          <CardContent4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">{`Vehicle & Driver`}</p>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[19.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p173acb00} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          <path d={svgPaths.p2e8cae00} id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
        </g>
      </svg>
    </div>
  );
}

function Container85() {
  return (
    <div className="bg-[#dcfce7] relative rounded-[3.71704e+07px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">John Doe</p>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] top-0 w-[118px]">Lic: D12345678 (NY)</p>
    </div>
  );
}

function Container86() {
  return (
    <div className="h-[35.985px] relative shrink-0 w-[117.735px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph50 />
        <Paragraph51 />
      </div>
    </div>
  );
}

function ViewPermitRequest28() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[169.713px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container85 />
        <Container86 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[31.987px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function CardContent5() {
  return (
    <div className="h-[75.968px] relative shrink-0 w-full" data-name="CardContent">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <ViewPermitRequest28 />
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function Card17() {
  return (
    <div className="bg-white h-[78.184px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <CardContent5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-[42.182px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Truck</p>
      </div>
    </div>
  );
}

function Badge13() {
  return (
    <div className="bg-white h-[19.992px] relative rounded-[5px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[9.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-nowrap">TRK-2025</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function ViewPermitRequest29() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text14 />
          <Badge13 />
        </div>
      </div>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
          <ViewPermitRequest29 />
        </div>
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="content-stretch flex h-[15.993px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap uppercase">Make/Year</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">Kenworth 2022</p>
    </div>
  );
}

function ViewPermitRequest30() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] top-[11.99px] w-[178.488px]" data-name="ViewPermitRequest">
      <Frame1 />
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Plate</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[57.552px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">DEF-5678</p>
    </div>
  );
}

function ViewPermitRequest31() {
  return (
    <div className="absolute h-[31.987px] left-[198.48px] top-[12px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text17 />
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[364.974px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">VIN</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[92.36px]" data-name="Text">
      <p className="tabular-nums tracking-wide leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">1M123456789ABC</p>
    </div>
  );
}

function ViewPermitRequest32() {
  return (
    <div className="absolute h-[31.987px] left-[12px] top-[59.98px] w-[364.974px]" data-name="ViewPermitRequest">
      <Text19 />
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Axles</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[35.985px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">3 Axle</p>
    </div>
  );
}

function ViewPermitRequest33() {
  return (
    <div className="absolute h-[31.987px] left-[12px] top-[107.97px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text21 />
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">GVW</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[61.637px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">80,000 lbs</p>
    </div>
  );
}

function ViewPermitRequest34() {
  return (
    <div className="absolute h-[31.987px] left-[198.48px] top-[107.97px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text23 />
      <Text24 />
    </div>
  );
}

function CardContent6() {
  return (
    <div className="h-[162px] relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ViewPermitRequest30 />
        <ViewPermitRequest31 />
        <ViewPermitRequest32 />
        <ViewPermitRequest33 />
        <ViewPermitRequest34 />
      </div>
    </div>
  );
}

function Card18() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader4 />
          <CardContent6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-[50.178px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Trailer</p>
      </div>
    </div>
  );
}

function Badge14() {
  return (
    <div className="bg-white h-[19.992px] relative rounded-[5px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[9.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-nowrap">TRL-5001</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function ViewPermitRequest35() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text25 />
          <Badge14 />
        </div>
      </div>
    </div>
  );
}

function CardHeader5() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
          <ViewPermitRequest35 />
        </div>
      </div>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Type</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[42.891px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">Flatbed</p>
    </div>
  );
}

function ViewPermitRequest36() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text26 />
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Plate</p>
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[58.158px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">TLR-9988</p>
    </div>
  );
}

function ViewPermitRequest37() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text28 />
      <Text29 />
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Length</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[26.171px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">53 ft</p>
    </div>
  );
}

function ViewPermitRequest38() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text30 />
      <Text31 />
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Width</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[33.562px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">102 in</p>
    </div>
  );
}

function ViewPermitRequest39() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text32 />
      <Text33 />
    </div>
  );
}

function CardContent7() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-start flex flex-wrap gap-[16px_8px] items-start p-[12px] relative w-full">
          <ViewPermitRequest36 />
          <ViewPermitRequest37 />
          <ViewPermitRequest38 />
          <ViewPermitRequest39 />
        </div>
      </div>
    </div>
  );
}

function Card19() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader5 />
          <CardContent7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Card17 />
      <Card18 />
      <Card19 />
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[16px] relative shrink-0 w-[440px]" data-name="Container">
      <Container6 />
      <Container7 />
      <Card2 />
      <Container58 />
      <Card15 />
      <Card16 />
      <Container87 />
    </div>
  );
}

export default function PermitCreationContent1() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-start overflow-clip relative rounded-[16px] size-full" data-name="Permit creation content">
      <PermitCreationContent />
      <Container88 />
    </div>
  );
}