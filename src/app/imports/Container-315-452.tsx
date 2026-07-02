import svgPaths from "./svg-xujrs56d33";

function Heading() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Heading 2">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[16px] text-nowrap">Trip - RF_25_001</p>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Heading />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[9.17px] size-[11.987px] top-[5.18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9869 11.9869">
        <g clipPath="url(#clip0_314_1017)" id="Icon">
          <path d={svgPaths.p398aed00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.998907" />
        </g>
        <defs>
          <clipPath id="clip0_314_1017">
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
        <Icon />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[29.12px] not-italic text-[12px] text-nowrap text-white top-[3.17px]">In Transit</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.18px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative w-full">
          <Container />
          <Badge />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9942 13.9942">
            <path d={svgPaths.p11b23400} id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
        <Icon1 />
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
          <ViewPermitRequest />
          <CardTitle />
        </div>
      </div>
    </div>
  );
}

function Container2() {
  return <div className="absolute bg-[#e5e7eb] h-[167px] left-[15.89px] top-[7.84px] w-[2px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="h-[9.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[-0.18px] uppercase">Origin</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.18px]">New York, NY</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[14px]">Pickup: 08:00</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] h-[51.968px] items-start left-[32px] top-0 w-[319.497px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-[#00c950] border-[3.541px] border-solid border-white left-[7.01px] rounded-[3.96025e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[19.99px] top-0" data-name="Container" />;
}

function Paragraph3() {
  return (
    <div className="h-[9.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[-0.18px] uppercase">Current Status</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.18px]">In Transit</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#155dfc] text-[14px]">Richmond, VA (I-95 South)</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] h-[51.968px] items-start left-[32px] top-[83.96px] w-[319.497px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-[#2b7fff] border-[3.541px] border-solid border-white left-[7.01px] rounded-[3.96025e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[19.99px] top-[83.96px]" data-name="Container" />;
}

function Paragraph6() {
  return (
    <div className="h-[9.995px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[-0.18px] uppercase">Destination</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[0.18px]">Miami, FL</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[14px]">Delivery: By 18:00</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] h-[51.968px] items-start left-[32px] top-[167.93px] w-[319.497px]" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[#fb2c36] border-[3.541px] border-solid border-white left-[7.01px] rounded-[3.96025e+07px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] size-[19.99px] top-[167.93px]" data-name="Container" />;
}

function ViewPermitRequest1() {
  return (
    <div className="h-[219.895px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15.989px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9887 15.9887">
        <g id="Icon">
          <path d={svgPaths.p34b54c00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d="M9.99291 3.83995V13.8329" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d="M5.99575 2.1558V12.1487" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Total Distance</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Paragraph">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">1280 miles</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[35.998px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col h-full items-start relative">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-[104.765px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.985px] items-center relative size-full">
        <Icon2 />
        <Container9 />
      </div>
    </div>
  );
}

function Container11() {
  return <div className="bg-[#e5e7eb] h-[31.996px] shrink-0 w-[0.996px]" data-name="Container" />;
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15.989px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9887 15.9887">
        <g clipPath="url(#clip0_314_1057)" id="Icon">
          <path d={svgPaths.p1847f8e0} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d={svgPaths.p320b3800} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
        <defs>
          <clipPath id="clip0_314_1057">
            <rect fill="white" height="15.9887" width="15.9887" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[16.007px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap">Est. Time</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[19.99px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.18px]">2d 4h</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-[52.429px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[35.998px] relative shrink-0 w-[76.403px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.985px] items-center relative size-full">
        <Icon3 />
        <Container12 />
      </div>
    </div>
  );
}

function ViewPermitRequest2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.18px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-0 pt-[17.18px] px-[15.989px] relative w-full">
          <Container10 />
          <Container11 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function CardContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[15.993px] items-start p-[16px] relative w-full">
        <ViewPermitRequest1 />
        <ViewPermitRequest2 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader />
          <CardContent />
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

function Icon4() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.995 14.6604">
            <path d={svgPaths.p18603f00} id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33111 5.33111">
            <path d={svgPaths.p28f96b80} id="Vector" stroke="var(--stroke-0, #0066CC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#dbeafe] content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="Container">
      <Icon4 />
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
        <Container14 />
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

function ViewPermitRequest3() {
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[16px] py-[12px] relative w-full">
        <ViewPermitRequest3 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">NY</p>
      </div>
    </div>
  );
}

function Paragraph13() {
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

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge2 />
      <Text />
    </div>
  );
}

function Container17() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph13 />
        <Container16 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container15 />
        <Container17 />
      </div>
    </div>
  );
}

function Icon5() {
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
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function ViewPermitRequest4() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container18 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">NJ</p>
      </div>
    </div>
  );
}

function Paragraph14() {
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

function Container20() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[104.182px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph14 />
        <Badge3 />
      </div>
    </div>
  );
}

function ViewPermitRequest5() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-[354.761px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">PA</p>
      </div>
    </div>
  );
}

function Paragraph15() {
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

function Container22() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[103.368px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph15 />
        <Badge4 />
      </div>
    </div>
  );
}

function ViewPermitRequest6() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-[354.761px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">CT</p>
      </div>
    </div>
  );
}

function Paragraph16() {
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

function Text1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge5 />
      <Text1 />
    </div>
  );
}

function Container25() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph16 />
        <Container24 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container23 />
        <Container25 />
      </div>
    </div>
  );
}

function Icon6() {
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

function Button1() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function ViewPermitRequest7() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container26 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white h-[66.189px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <ViewPermitRequest7 />
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
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">MA</p>
      </div>
    </div>
  );
}

function Paragraph17() {
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

function Container28() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[108.232px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph17 />
        <Badge6 />
      </div>
    </div>
  );
}

function ViewPermitRequest8() {
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
          <ViewPermitRequest8 />
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
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">MD</p>
      </div>
    </div>
  );
}

function Paragraph18() {
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

function Text2() {
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
      <Badge7 />
      <Text2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph18 />
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

function Icon7() {
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

function Button2() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function ViewPermitRequest9() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container32 />
          <Button2 />
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
          <ViewPermitRequest9 />
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
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">VA</p>
      </div>
    </div>
  );
}

function Paragraph19() {
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

function Text3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge8 />
      <Text3 />
    </div>
  );
}

function Container35() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph19 />
        <Container34 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container33 />
        <Container35 />
      </div>
    </div>
  );
}

function Icon8() {
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

function Button3() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function ViewPermitRequest10() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container36 />
          <Button3 />
        </div>
      </div>
    </div>
  );
}

function Card7() {
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

function Container37() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">NC</p>
      </div>
    </div>
  );
}

function Paragraph20() {
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

function Text4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex gap-[7.997px] h-[19.992px] items-center left-0 top-[19.99px] w-[164.105px]" data-name="Container">
      <Badge9 />
      <Text4 />
    </div>
  );
}

function Container39() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph20 />
        <Container38 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container37 />
        <Container39 />
      </div>
    </div>
  );
}

function Icon9() {
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

function Button4() {
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
          <Container40 />
          <Button4 />
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
          <ViewPermitRequest11 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">SC</p>
      </div>
    </div>
  );
}

function Paragraph21() {
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

function Text5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge10 />
      <Text5 />
    </div>
  );
}

function Container43() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph21 />
        <Container42 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container41 />
        <Container43 />
      </div>
    </div>
  );
}

function Icon10() {
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

function Button5() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function ViewPermitRequest12() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container44 />
          <Button5 />
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
          <ViewPermitRequest12 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">GA</p>
      </div>
    </div>
  );
}

function Paragraph22() {
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

function Text6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative w-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#676d77] text-[12px] text-nowrap">Expires: 2024-12-10</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex gap-[7.997px] h-[19.992px] items-center relative shrink-0 w-full" data-name="Container">
      <Badge11 />
      <Text6 />
    </div>
  );
}

function Container47() {
  return (
    <div className="basis-0 grow h-[39.983px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph22 />
        <Container46 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[216.083px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container45 />
        <Container47 />
      </div>
    </div>
  );
}

function Icon11() {
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

function Button6() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[35.985px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function ViewPermitRequest13() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <Container48 />
          <Button6 />
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
          <ViewPermitRequest13 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container49() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[10px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[24px] not-italic relative shrink-0 text-[#4a5565] text-[16px] text-nowrap">FL</p>
      </div>
    </div>
  );
}

function Paragraph23() {
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

function Container50() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[101.707px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph23 />
        <Badge12 />
      </div>
    </div>
  );
}

function ViewPermitRequest14() {
  return (
    <div className="bg-white h-[63.973px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center pl-[11.995px] pr-0 py-0 relative size-full">
          <Container49 />
          <Container50 />
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
          <ViewPermitRequest14 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e3df] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Primitive.div">
      <Container51 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[16px] relative w-full">
        <PrimitiveDiv />
      </div>
    </div>
  );
}

function Card12() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader1 />
          <CardContent1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Card12 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.995 14.6606">
            <path d={svgPaths.p387cfc00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.33%_16.67%_66.67%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33111 5.33111">
            <path d={svgPaths.p2ee18900} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_58.33%_62.5%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.66556 1.33278">
            <path d="M1.99917 0.666389H0.666389" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_33.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66389 1.33278">
            <path d="M5.9975 0.666389H0.666389" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_33.33%_29.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66389 1.33278">
            <path d="M5.9975 0.666389H0.666389" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest15() {
  return (
    <div className="bg-[#f3f4f6] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
        <Icon12 />
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
          <ViewPermitRequest15 />
          <CardTitle2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Permit Type</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Oversize</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph24 />
      <Paragraph25 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Duration</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.11px] w-[46px]">5 Days</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph26 />
      <Paragraph27 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Reference</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute tabular-nums tracking-wide leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[-0.89px]">N/A</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col h-[34.998px] items-start relative shrink-0 w-[356.977px]" data-name="Container">
      <Paragraph28 />
      <Paragraph29 />
    </div>
  );
}

function ViewPermitRequest16() {
  return (
    <div className="relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="content-start flex flex-wrap gap-[15px] items-start p-[16px] relative w-full">
        <Container53 />
        <Container54 />
        <Container55 />
      </div>
    </div>
  );
}

function Card13() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center p-px relative w-full">
          <CardHeader2 />
          <ViewPermitRequest16 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[15.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.34%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3278 14.6578">
            <path d={svgPaths.pe6d3300} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[13.75%] right-[13.75%] top-[29.17%]" data-name="Vector">
        <div className="absolute inset-[-20%_-5.75%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.9282 4.66484">
            <path d={svgPaths.p37cc240} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
        <div className="absolute inset-[-10%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.33278 7.99667">
            <path d="M0.666389 7.33028V0.666389" id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33278" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest17() {
  return (
    <div className="bg-[#f3e8ff] relative rounded-[8px] shrink-0 size-[27.971px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[5.989px] px-[5.989px] relative size-full">
        <Icon13 />
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
          <ViewPermitRequest17 />
          <CardTitle3 />
        </div>
      </div>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Type</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Excavator</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph30 />
      <Paragraph31 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Weight</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">45,000 lbs</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph32 />
      <Paragraph33 />
    </div>
  );
}

function ViewPermitRequest18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Container56 />
      <Container57 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="absolute h-[15.007px] left-0 top-0 w-[170.492px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Divisible</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">No</p>
    </div>
  );
}

function Container58() {
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
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Self-Propelled</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="absolute h-[19.992px] left-0 top-[15.01px] w-[170.492px]" data-name="Paragraph">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Yes</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[34.998px] relative shrink-0 w-[170.492px]" data-name="Container">
      <Paragraph36 />
      <Paragraph37 />
    </div>
  );
}

function ViewPermitRequest19() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Container58 />
      <Container59 />
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-[356.977px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Commodity</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-[356.977px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Class I - Other</p>
    </div>
  );
}

function ViewPermitRequest20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Paragraph38 />
      <Paragraph39 />
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Description</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] text-nowrap top-[0.11px]">Heavy machinery transport</p>
    </div>
  );
}

function ViewPermitRequest21() {
  return (
    <div className="content-stretch flex flex-col h-[34.998px] items-start relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Paragraph40 />
      <Paragraph41 />
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Dimensions</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[104.926px]" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px] text-center">20 ft</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute h-[15.007px] left-0 top-[15.99px] w-[104.926px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[52.93px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Length</p>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute h-[31px] left-0 top-0 w-[104.926px]" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[103.818px]" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px] text-center">8.5 ft</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute h-[15.007px] left-0 top-[15.99px] w-[103.818px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[52.04px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Width</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid h-[31px] left-[112.92px] top-0 w-[104.926px]" data-name="Container">
      <Container63 />
      <Container64 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[103.818px]" data-name="Container">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[14px] text-center">10 ft</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute h-[15.007px] left-0 top-[15.99px] w-[103.818px]" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[52.3px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Height</p>
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid h-[31px] left-[225.85px] top-0 w-[104.926px]" data-name="Container">
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[31px] relative shrink-0 w-full" data-name="Container">
      <Container62 />
      <Container65 />
      <Container68 />
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[80.86px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]">0 ft</p>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[81.4px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Front Overhang</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex flex-col h-[31px] items-start left-0 top-[13.1px] w-[161.387px]" data-name="Container">
      <Container70 />
      <Container71 />
    </div>
  );
}

function Container73() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[16px] left-[81.09px] not-italic text-[#101828] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]">2 ft</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[80.49px] not-italic text-[#4a5565] text-[12px] text-center text-nowrap top-[0.11px] translate-x-[-50%]">Rear Overhang</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex flex-col h-[31px] items-start left-[169.38px] pl-[1.108px] pr-0 py-0 top-[13.1px] w-[161.387px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0px_0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <Container73 />
      <Container74 />
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[44.103px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Container72 />
      <Container75 />
    </div>
  );
}

function ViewPermitRequest22() {
  return (
    <div className="bg-[#f9fafb] h-[136.307px] relative rounded-[10px] shrink-0 w-full" data-name="ViewPermitRequest">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative size-full">
        <Paragraph42 />
        <Container69 />
        <Container76 />
      </div>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#4a5565] text-[12px] text-nowrap top-[0.11px] uppercase">Load Diagram</p>
    </div>
  );
}

function Icon14() {
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

function Paragraph44() {
  return (
    <div className="content-stretch flex h-[15.993px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Medium',sans-serif] font-medium grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#101828] text-[12px]">diagram-v1.pdf</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[15.007px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#4a5565] text-[10px] text-nowrap top-[0.11px]">2.4 MB • PDF</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="basis-0 grow h-[31px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph44 />
        <Paragraph45 />
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9933 15.9933">
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
        <Icon15 />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="bg-[#f9fafb] h-[50.196px] relative rounded-[8px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[9.105px] py-[1.108px] relative size-full">
          <Icon14 />
          <Container77 />
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function ViewPermitRequest23() {
  return (
    <div className="content-stretch flex flex-col gap-[3.998px] h-[69.201px] items-start relative shrink-0 w-full" data-name="ViewPermitRequest">
      <Paragraph43 />
      <Container78 />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <ViewPermitRequest18 />
        <ViewPermitRequest19 />
        <ViewPermitRequest20 />
        <ViewPermitRequest21 />
        <ViewPermitRequest22 />
        <ViewPermitRequest23 />
      </div>
    </div>
  );
}

function Card14() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader3 />
          <CardContent2 />
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

function Icon16() {
  return (
    <div className="relative shrink-0 size-[19.992px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9917 19.9917">
        <g id="Icon">
          <path d={svgPaths.p173acb00} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
          <path d={svgPaths.p2e8cae00} id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66597" />
        </g>
      </svg>
    </div>
  );
}

function Container79() {
  return (
    <div className="bg-[#dcfce7] relative rounded-[3.71704e+07px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon16 />
      </div>
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">John Doe</p>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] top-0 w-[118px]">Lic: D12345678 (NY)</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[35.985px] relative shrink-0 w-[117.735px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph46 />
        <Paragraph47 />
      </div>
    </div>
  );
}

function ViewPermitRequest24() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[169.713px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container79 />
        <Container80 />
      </div>
    </div>
  );
}

function Icon17() {
  return <div className="shrink-0 size-[15.993px]" data-name="Icon" />;
}

function Button8() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[31.987px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon17 />
      </div>
    </div>
  );
}

function CardContent3() {
  return (
    <div className="h-[75.968px] relative shrink-0 w-full" data-name="CardContent">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <ViewPermitRequest24 />
          <Button8 />
        </div>
      </div>
    </div>
  );
}

function Card15() {
  return (
    <div className="bg-white h-[78.184px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <CardContent3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text7() {
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

function ViewPermitRequest25() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text7 />
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
        <ViewPermitRequest25 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="content-stretch flex h-[15.993px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap uppercase">Make/Year</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">Kenworth 2022</p>
    </div>
  );
}

function ViewPermitRequest26() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] top-[11.99px] w-[178.488px]" data-name="ViewPermitRequest">
      <Frame1 />
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Plate</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[57.552px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">DEF-5678</p>
    </div>
  );
}

function ViewPermitRequest27() {
  return (
    <div className="absolute h-[31.987px] left-[198.48px] top-[12px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[364.974px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">VIN</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[92.36px]" data-name="Text">
      <p className="tabular-nums tracking-wide leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">1M123456789ABC</p>
    </div>
  );
}

function ViewPermitRequest28() {
  return (
    <div className="absolute h-[31.987px] left-[12px] top-[59.98px] w-[364.974px]" data-name="ViewPermitRequest">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Axles</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[35.985px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">3 Axle</p>
    </div>
  );
}

function ViewPermitRequest29() {
  return (
    <div className="absolute h-[31.987px] left-[12px] top-[107.97px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">GVW</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[61.637px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">80,000 lbs</p>
    </div>
  );
}

function ViewPermitRequest30() {
  return (
    <div className="absolute h-[31.987px] left-[198.48px] top-[107.97px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text16 />
      <Text17 />
    </div>
  );
}

function CardContent4() {
  return (
    <div className="h-[162px] relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ViewPermitRequest26 />
        <ViewPermitRequest27 />
        <ViewPermitRequest28 />
        <ViewPermitRequest29 />
        <ViewPermitRequest30 />
      </div>
    </div>
  );
}

function Card16() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader4 />
          <CardContent4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text18() {
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

function ViewPermitRequest31() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text18 />
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
        <ViewPermitRequest31 />
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Type</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[42.891px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">Flatbed</p>
    </div>
  );
}

function ViewPermitRequest32() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text19 />
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Plate</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[58.158px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">TLR-9988</p>
    </div>
  );
}

function ViewPermitRequest33() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text21 />
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Length</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[26.171px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">53 ft</p>
    </div>
  );
}

function ViewPermitRequest34() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text23 />
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Width</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[33.562px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">102 in</p>
    </div>
  );
}

function ViewPermitRequest35() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text25 />
      <Text26 />
    </div>
  );
}

function CardContent5() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-start flex flex-wrap gap-[16px_8px] items-start p-[12px] relative w-full">
        <ViewPermitRequest32 />
        <ViewPermitRequest33 />
        <ViewPermitRequest34 />
        <ViewPermitRequest35 />
      </div>
    </div>
  );
}

function Card17() {
  return (
    <div className="bg-white relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader5 />
          <CardContent5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Card15 />
      <Card16 />
      <Card17 />
    </div>
  );
}

export default function Container82() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full" data-name="Container">
      <Container1 />
      <Card />
      <Container52 />
      <Card13 />
      <Card14 />
      <Container81 />
    </div>
  );
}