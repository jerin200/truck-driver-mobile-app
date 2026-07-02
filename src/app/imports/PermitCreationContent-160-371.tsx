import svgPaths from "./svg-hsbprh67qc";
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

export default function PermitCreationContent() {
  return (
    <div className="bg-[#d4d3d3] content-stretch flex flex-col items-end justify-between overflow-clip relative rounded-tl-[16px] rounded-tr-[16px] size-full" data-name="Permit creation content">
      <MapContainer />
      <InfoContainer />
    </div>
  );
}