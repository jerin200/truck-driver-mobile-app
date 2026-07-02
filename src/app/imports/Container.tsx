import svgPaths from "./svg-heht3luwni";

function Heading() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">{`Vehicle & Driver`}</p>
    </div>
  );
}

function Icon() {
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

function Container() {
  return (
    <div className="bg-[#dcfce7] relative rounded-[3.71704e+07px] shrink-0 size-[39.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.017px] py-0 relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#101828] text-[14px] text-nowrap top-[0.11px]">John Doe</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16px] left-0 not-italic text-[#4a5565] text-[12px] top-0 w-[118px]">Lic: D12345678 (NY)</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[35.985px] relative shrink-0 w-[117.735px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function ViewPermitRequest() {
  return (
    <div className="h-[39.983px] relative shrink-0 w-[169.713px]" data-name="ViewPermitRequest">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.995px] items-center relative size-full">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[31.987px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function CardContent() {
  return (
    <div className="h-[75.968px] relative shrink-0 w-full" data-name="CardContent">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[11.995px] py-0 relative size-full">
          <ViewPermitRequest />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[78.184px] relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative size-full">
          <CardContent />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-[42.182px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Truck</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-white h-[19.992px] relative rounded-[5px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[9.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-nowrap">TRK-2025</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function ViewPermitRequest1() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text />
          <Badge />
        </div>
      </div>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
          <ViewPermitRequest1 />
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex h-[15.993px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#4a5565] text-[12px] text-nowrap uppercase">Make/Year</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">Kenworth 2022</p>
    </div>
  );
}

function ViewPermitRequest2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] top-[11.99px] w-[178.488px]" data-name="ViewPermitRequest">
      <Frame />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Plate</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[57.552px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">DEF-5678</p>
    </div>
  );
}

function ViewPermitRequest3() {
  return (
    <div className="absolute h-[31.987px] left-[198.48px] top-[12px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[364.974px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">VIN</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[92.36px]" data-name="Text">
      <p className="tabular-nums tracking-wide leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">1M123456789ABC</p>
    </div>
  );
}

function ViewPermitRequest4() {
  return (
    <div className="absolute h-[31.987px] left-[12px] top-[59.98px] w-[364.974px]" data-name="ViewPermitRequest">
      <Text5 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Axles</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[35.985px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">3 Axle</p>
    </div>
  );
}

function ViewPermitRequest5() {
  return (
    <div className="absolute h-[31.987px] left-[12px] top-[107.97px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text7 />
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">GVW</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[61.637px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">80,000 lbs</p>
    </div>
  );
}

function ViewPermitRequest6() {
  return (
    <div className="absolute h-[31.987px] left-[198.48px] top-[107.97px] w-[178.488px]" data-name="ViewPermitRequest">
      <Text9 />
      <Text10 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="h-[162px] relative shrink-0 w-full" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <ViewPermitRequest2 />
        <ViewPermitRequest3 />
        <ViewPermitRequest4 />
        <ViewPermitRequest5 />
        <ViewPermitRequest6 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[1.108px] relative w-full">
          <CardHeader />
          <CardContent1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[15.993px] relative shrink-0 w-[50.178px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] text-nowrap">Trailer</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-white h-[19.992px] relative rounded-[5px] shrink-0" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex h-full items-center justify-center overflow-clip px-[9.108px] py-[3.108px] relative rounded-[inherit]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#0a0a0a] text-[12px] text-nowrap">TRL-5001</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function ViewPermitRequest7() {
  return (
    <div className="h-[19.992px] relative shrink-0 w-full" data-name="ViewPermitRequest">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text11 />
          <Badge1 />
        </div>
      </div>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="bg-[#f9fafb] relative shrink-0 w-full" data-name="CardHeader">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[0px_0px_1.108px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[12px] relative w-full">
          <ViewPermitRequest7 />
        </div>
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Type</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[42.891px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">Flatbed</p>
    </div>
  );
}

function ViewPermitRequest8() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text12 />
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Plate</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[58.158px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">TLR-9988</p>
    </div>
  );
}

function ViewPermitRequest9() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text14 />
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Length</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[26.171px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">53 ft</p>
    </div>
  );
}

function ViewPermitRequest10() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text16 />
      <Text17 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute content-stretch flex h-[15.993px] items-start left-0 top-0 w-[178.488px]" data-name="Text">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[#4a5565] text-[12px] uppercase">Width</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute content-stretch flex h-[14.401px] items-start left-0 top-[15.99px] w-[33.562px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-nowrap">102 in</p>
    </div>
  );
}

function ViewPermitRequest11() {
  return (
    <div className="h-[31.987px] relative shrink-0 w-[178.488px]" data-name="ViewPermitRequest">
      <Text18 />
      <Text19 />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="relative shrink-0 w-full" data-name="CardContent">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-start flex flex-wrap gap-[16px_8px] items-start p-[12px] relative w-full">
          <ViewPermitRequest8 />
          <ViewPermitRequest9 />
          <ViewPermitRequest10 />
          <ViewPermitRequest11 />
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
          <CardHeader1 />
          <CardContent2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.108px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

export default function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="Container">
      <Heading />
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}