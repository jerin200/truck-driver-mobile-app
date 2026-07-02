import svgPaths from "./svg-16b8lbubgm";

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p8610270} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p34f23c00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#16a34a] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[65px] not-italic text-[#0f172a] text-[15px] text-center top-[-2px] translate-x-[-50%]">Trailer Information</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[32px] relative shrink-0 w-[169.063px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container />
        <Heading />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M5 7.5L10 12.5L15 7.5" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex h-[56px] items-center justify-between left-0 px-[12px] py-0 top-0 w-[583.844px]" data-name="Button">
      <Container1 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#0f172a] text-[15px] top-[-2px]">Jeep</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Unit #</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">UASJT01</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-0 w-[156.609px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Axles</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">2</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Wheels per Axle</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">4</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[361.22px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0 w-[156px]">Distance from previous unit to first axle of Jeep</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">168 in</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-0 top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Tare</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">5,000 lbs</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-[180.61px] top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph8 />
      <Paragraph9 />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Year</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">2019</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-[361.22px] top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Make</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Fontaine</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph12 />
      <Paragraph13 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">VIN</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">1FUJGHDV1CLBP3589</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph14 />
      <Paragraph15 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Vehicle Type</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Jeep</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[361.22px] top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph16 />
      <Paragraph17 />
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0 w-[140px]">Annual Inspection Expiry Date</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">12/31/2025</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-0 top-[178.5px] w-[156.609px]" data-name="Container">
      <Paragraph18 />
      <Paragraph19 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[238px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#f8fafc] h-[272px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container12 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[335.5px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Heading1 />
      <Container13 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#0f172a] text-[15px] top-[-2px]">Booster</p>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Unit #</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">UABST01</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-0 w-[156.609px]" data-name="Container">
      <Paragraph20 />
      <Paragraph21 />
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Axles</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">2</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph22 />
      <Paragraph23 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Wheels per Axle</p>
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">8</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[361.22px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph24 />
      <Paragraph25 />
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0 w-[156px]">Distance from previous unit to first axle of Booster</p>
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">192 in</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-0 top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph26 />
      <Paragraph27 />
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Tare</p>
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">12,000 lbs</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-[180.61px] top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph28 />
      <Paragraph29 />
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Year</p>
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">2020</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-[361.22px] top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph30 />
      <Paragraph31 />
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Make</p>
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Trail King</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph32 />
      <Paragraph33 />
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">VIN</p>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">1XNAP40X6YN456789</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph34 />
      <Paragraph35 />
    </div>
  );
}

function Paragraph36() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Vehicle Type</p>
    </div>
  );
}

function Paragraph37() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Booster</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[361.22px] top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph36 />
      <Paragraph37 />
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0 w-[140px]">Annual Inspection Expiry Date</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">06/30/2026</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-0 top-[178.5px] w-[156.609px]" data-name="Container">
      <Paragraph38 />
      <Paragraph39 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[238px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#f8fafc] h-[272px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container25 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[335.5px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Heading2 />
      <Container26 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#0f172a] text-[15px] top-[-2px]">Trailer</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Unit #</p>
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">TRL-001</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-0 w-[156.609px]" data-name="Container">
      <Paragraph40 />
      <Paragraph41 />
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Axles</p>
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">3</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph42 />
      <Paragraph43 />
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Wheels per Axle</p>
    </div>
  );
}

function Paragraph45() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">8</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[361.22px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph44 />
      <Paragraph45 />
    </div>
  );
}

function Paragraph46() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0 w-[156px]">Distance from previous unit to first axle of Trailer</p>
    </div>
  );
}

function Paragraph47() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">192 in</p>
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-0 top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph46 />
      <Paragraph47 />
    </div>
  );
}

function Paragraph48() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Tare</p>
    </div>
  );
}

function Paragraph49() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">15,000 lbs</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-[180.61px] top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph48 />
      <Paragraph49 />
    </div>
  );
}

function Paragraph50() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Axle Spacing</p>
    </div>
  );
}

function Paragraph51() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">54 in</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-[361.22px] top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph50 />
      <Paragraph51 />
    </div>
  );
}

function Paragraph52() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Year</p>
    </div>
  );
}

function Paragraph53() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">2021</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph52 />
      <Paragraph53 />
    </div>
  );
}

function Paragraph54() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Make</p>
    </div>
  );
}

function Paragraph55() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Fontaine</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph54 />
      <Paragraph55 />
    </div>
  );
}

function Paragraph56() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">VIN</p>
    </div>
  );
}

function Paragraph57() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">4KZDC0929YS234567</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[361.22px] top-[125px] w-[156.609px]" data-name="Container">
      <Paragraph56 />
      <Paragraph57 />
    </div>
  );
}

function Paragraph58() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Vehicle Type</p>
    </div>
  );
}

function Paragraph59() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Flatbed</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-0 top-[178.5px] w-[156.609px]" data-name="Container">
      <Paragraph58 />
      <Paragraph59 />
    </div>
  );
}

function Paragraph60() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0 w-[140px]">Annual Inspection Expiry Date</p>
    </div>
  );
}

function Paragraph61() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">06/30/2026</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[59.5px] items-start left-[180.61px] top-[178.5px] w-[156.609px]" data-name="Container">
      <Paragraph60 />
      <Paragraph61 />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[238px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container40() {
  return (
    <div className="bg-[#f8fafc] h-[272px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container39 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[335.5px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Heading3 />
      <Container40 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[4.17%_3.95%_4.17%_4.42%]" data-name="Group">
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p15572b00} id="Vector" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[4.17%_3.95%_4.17%_4.42%]" data-name="Vector">
        <div className="absolute inset-[-4.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9945 16">
            <path d={svgPaths.p2c9d6900} id="Vector" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function SettingsIcon() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start relative shrink-0 w-full" data-name="SettingsIcon">
      <Icon2 />
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[rgba(37,99,235,0.1)] relative rounded-[10px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-full">
        <SettingsIcon />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[21px] relative shrink-0 w-[165.516px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#0f172a] text-[14px] top-0">Additional Configuration</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Heading4 />
    </div>
  );
}

function Paragraph62() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Neck Configuration</p>
    </div>
  );
}

function Paragraph63() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Detachable</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-0 w-[156.609px]" data-name="Container">
      <Paragraph62 />
      <Paragraph63 />
    </div>
  );
}

function Paragraph64() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Tonnage Rating (ton)</p>
    </div>
  );
}

function Paragraph65() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">55 tons</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph64 />
      <Paragraph65 />
    </div>
  );
}

function Paragraph66() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Trailer Configuration</p>
    </div>
  );
}

function Paragraph67() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Single Drop</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[361.22px] top-0 w-[156.609px]" data-name="Container">
      <Paragraph66 />
      <Paragraph67 />
    </div>
  );
}

function Paragraph68() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Deck Type</p>
    </div>
  );
}

function Paragraph69() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Flatbed</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph68 />
      <Paragraph69 />
    </div>
  );
}

function Paragraph70() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Deck/Neck Span</p>
    </div>
  );
}

function Paragraph71() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">29 ft</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[180.61px] top-[53.5px] w-[156.609px]" data-name="Container">
      <Paragraph70 />
      <Paragraph71 />
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[95px] relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Container45 />
      <Container46 />
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-[#f8fafc] h-[129px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container49 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[194px] items-start pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container43 />
      <Container50 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[4.17%_3.95%_4.17%_4.42%]" data-name="Group">
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p15572b00} id="Vector" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[4.17%_3.95%_4.17%_4.42%]" data-name="Vector">
        <div className="absolute inset-[-4.55%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9945 16">
            <path d={svgPaths.p2c9d6900} id="Vector" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group1 />
    </div>
  );
}

function SettingsIcon1() {
  return (
    <div className="content-stretch flex flex-col h-[16px] items-start relative shrink-0 w-full" data-name="SettingsIcon">
      <Icon3 />
    </div>
  );
}

function Container52() {
  return (
    <div className="bg-[rgba(37,99,235,0.1)] relative rounded-[10px] shrink-0 size-[28px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-0 pt-[6px] px-[6px] relative size-full">
        <SettingsIcon1 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[21px] relative shrink-0 w-[98.188px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[#0f172a] text-[14px] top-0">Weight Details</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <Container52 />
      <Heading5 />
    </div>
  );
}

function Paragraph72() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Axle Weight - Jeep</p>
    </div>
  );
}

function Paragraph73() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">Combined</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-0 top-0 w-[246.922px]" data-name="Container">
      <Paragraph72 />
      <Paragraph73 />
    </div>
  );
}

function Paragraph74() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#64748b] text-[12px] top-0">Axle Weight - Trailer</p>
    </div>
  );
}

function Paragraph75() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#0f172a] text-[13px] top-0">70%</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[41.5px] items-start left-[270.92px] top-0 w-[246.922px]" data-name="Container">
      <Paragraph74 />
      <Paragraph75 />
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[41.5px] relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Container55 />
    </div>
  );
}

function Container57() {
  return (
    <div className="bg-[#f8fafc] h-[75.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container56 />
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[139.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container53 />
      <Container57 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[1436px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container27 />
      <Container41 />
      <Container51 />
      <Container58 />
    </div>
  );
}

function TrailerDetailsDisplay() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1453px] items-start left-[16px] pb-0 pt-[17px] px-0 top-[68px] w-[551.844px]" data-name="TrailerDetailsDisplay">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Container59 />
    </div>
  );
}

export default function Container60() {
  return (
    <div className="border border-[#e5e7eb] border-solid relative rounded-[10px] size-full" data-name="Container">
      <Button />
      <TrailerDetailsDisplay />
    </div>
  );
}