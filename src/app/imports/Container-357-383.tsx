import svgPaths from "./svg-r1m19e83i2";

function Heading() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Heading 3">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#202224] text-[15px] top-[-2px]">Job Information</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-[61.56px] top-[2px] w-[7px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#dc2626] text-[14px]">*</p>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[355.25px]" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0">Job Title</p>
      <Text />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute content-stretch flex h-[21px] items-center left-[12px] overflow-clip top-[12px] w-[331.25px]" data-name="Text Input">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#81818d] text-[14px]">Pilot Car Job – Sacramento, CA to Phoenix, AZ</p>
    </div>
  );
}

function Container() {
  return <div className="absolute border border-[#c8c3bc] border-solid h-[45px] left-0 rounded-[6px] top-0 w-[355.25px]" data-name="Container" />;
}

function Container1() {
  return (
    <div className="absolute bg-white h-[45px] left-0 rounded-[6px] top-[25px] w-[355.25px]" data-name="Container">
      <TextInput />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="col-[1] css-3foyfs relative row-[1] self-stretch shrink-0" data-name="Container">
      <Label />
      <Container1 />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-[65.11px] top-[2px] w-[7px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#dc2626] text-[14px]">*</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[355.25px]" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0">Job Type</p>
      <Text1 />
    </div>
  );
}

function Option() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-[-2px] w-0">Select job type</p>
    </div>
  );
}

function Option1() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-[-2px] w-0">Convoy</p>
    </div>
  );
}

function Option2() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Option">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-[-2px] w-0">Route Survey</p>
    </div>
  );
}

function Dropdown() {
  return (
    <div className="absolute content-stretch flex flex-col h-[21px] items-start left-[12px] pl-[-1196.75px] pr-[1528px] pt-[-268.5px] top-[12px] w-[331.25px]" data-name="Dropdown">
      <Option />
      <Option1 />
      <Option2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[327.25px] size-[16px] top-[14.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #81818D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[45px] left-0 top-0 w-[355.25px]" data-name="Container">
      <Dropdown />
      <Icon />
    </div>
  );
}

function Container4() {
  return <div className="absolute border border-[#c8c3bc] border-solid h-[45px] left-0 rounded-[6px] top-0 w-[355.25px]" data-name="Container" />;
}

function Container5() {
  return (
    <div className="absolute bg-white h-[45px] left-0 rounded-[6px] top-[25px] w-[355.25px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="col-[2] css-3foyfs relative row-[1] self-stretch shrink-0" data-name="Container">
      <Label1 />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[70px] relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[117.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container7 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Heading 3">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#202224] text-[15px] top-[-2px]">Load Details</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-[116.59px] top-[2px] w-[7px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#dc2626] text-[14px]">*</p>
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[355.25px]" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0">Commodity Type</p>
      <Text2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0">Standard</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#6b7280] text-[11px] top-0">From Load Info</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[65.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[12px] px-[12px] relative size-full">
        <Paragraph />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[67.5px] items-start left-0 p-px rounded-[6px] top-[25px] w-[355.25px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="col-[1] css-3foyfs relative row-[1] self-stretch shrink-0" data-name="Container">
      <Label2 />
      <Container10 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-[143.91px] top-[2px] w-[7px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#dc2626] text-[14px]">*</p>
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[355.25px]" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0">Gross Vehicle Weight</p>
      <Text3 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0 w-[67px]">80000 lbs</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#6b7280] text-[11px] top-0">From Load Info</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[65.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[12px] px-[12px] relative size-full">
        <Paragraph2 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col h-[67.5px] items-start left-0 p-px rounded-[6px] top-[25px] w-[355.25px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="col-[2] css-3foyfs relative row-[1] self-stretch shrink-0" data-name="Container">
      <Label3 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[92.5px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[140px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container15 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[31.5px] relative shrink-0 w-full" data-name="Heading 3">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#202224] text-[15px] top-[-2px]">Additional Information</p>
    </div>
  );
}

function Label4() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[726.5px]" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0">Special Instructions (Optional)</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="absolute content-stretch flex h-[80px] items-start left-[12px] overflow-clip top-[12px] w-[702.5px]" data-name="Text Area">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#81818d] text-[14px]">Any special instructions or requirements for this job...</p>
    </div>
  );
}

function Container17() {
  return <div className="absolute border border-[#c8c3bc] border-solid h-[104px] left-0 rounded-[6px] top-0 w-[726.5px]" data-name="Container" />;
}

function Container18() {
  return (
    <div className="absolute bg-white h-[104px] left-0 rounded-[6px] top-[25px] w-[726.5px]" data-name="Container">
      <TextArea />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[129px] relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Container18 />
    </div>
  );
}

function Label5() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[726.5px]" data-name="Label">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-black top-0">Requested Route</p>
    </div>
  );
}

function TextArea1() {
  return (
    <div className="absolute content-stretch flex h-[80px] items-start left-[12px] overflow-clip top-[12px] w-[702.5px]" data-name="Text Area">
      <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[21px] not-italic relative shrink-0 text-[#81818d] text-[14px]">Enter requested route details...</p>
    </div>
  );
}

function Container20() {
  return <div className="absolute border border-[#c8c3bc] border-solid h-[104px] left-0 rounded-[6px] top-0 w-[726.5px]" data-name="Container" />;
}

function Container21() {
  return (
    <div className="absolute bg-white h-[104px] left-0 rounded-[6px] top-[25px] w-[726.5px]" data-name="Container">
      <TextArea1 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[129px] relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[321.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container19 />
      <Container22 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[15px] items-start left-[160.41px] top-0 w-[6.313px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] not-italic relative shrink-0 text-[#dc2626] text-[12px] tracking-[0.3px] uppercase">*</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-[-1px] tracking-[0.3px] uppercase">Pilot Car Requirement</p>
      <Text4 />
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <div className="content-stretch flex flex-col items-start pr-[559.781px] pt-[6px] relative size-full">
        <Text5 />
      </div>
    </div>
  );
}

function RadioButton() {
  return <div className="bg-white shrink-0 size-[16px]" data-name="Radio Button" />;
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#374151] text-[13px] top-0 w-[196px]">Choose from Existing Permit (4)</p>
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[219.484px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <RadioButton />
        <Text6 />
      </div>
    </div>
  );
}

function RadioButton1() {
  return <div className="bg-white shrink-0 size-[16px]" data-name="Radio Button" />;
}

function Text7() {
  return (
    <div className="flex-[1_0_0] h-[19.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#374151] text-[13px] top-0">Select Manually</p>
      </div>
    </div>
  );
}

function Label8() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[120.953px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <RadioButton1 />
        <Text7 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Label7 />
      <Label8 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19416e00} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e059a80} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5ecae80} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#1c398e] text-[13px] top-0">Select permits and configure pilot car requirements per state</p>
    </div>
  );
}

function Container25() {
  return <div className="bg-[#155dfc] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text8() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#1c398e] text-[11px] top-0 w-[60px]">0/4 permits</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex gap-[6px] h-[26.5px] items-center left-0 px-[11px] py-px rounded-[33554400px] top-0 w-[93.969px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(142,197,255,0.4)] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <Container25 />
      <Text8 />
    </div>
  );
}

function Container27() {
  return <div className="bg-[#00a63e] rounded-[33554400px] shrink-0 size-[6px]" data-name="Container" />;
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#1c398e] text-[11px] top-0 w-[57px]">2 positions</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex gap-[6px] h-[26.5px] items-center left-[101.97px] px-[11px] py-px rounded-[33554400px] top-0 w-[90.734px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(142,197,255,0.4)] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <Container27 />
      <Text9 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[26.5px] relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container28 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[50px] items-start left-[24px] top-0 w-[668.5px]" data-name="Container">
      <Paragraph4 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <Container30 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M8.75 1.75H12.25V5.25" id="Vector" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M12.25 1.75L8.16667 5.83333" id="Vector_2" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M1.75 12.25L5.83333 8.16667" id="Vector_3" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d="M5.25 12.25H1.75V8.75" id="Vector_4" stroke="var(--stroke-0, #1447E6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="flex-[1_0_0] h-[16.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[19px] not-italic text-[#1447e6] text-[11px] text-center top-0 translate-x-[-50%]">Expand</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[6px] h-[36px] items-center left-[607.81px] px-[13px] py-px rounded-[4px] top-0 w-[84.688px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon2 />
      <Text10 />
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-white h-[36px] left-0 rounded-[4px] top-0 w-[599.813px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[36px] pr-[12px] relative rounded-[inherit] size-full">
        <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#99a1af] text-[12px]">Search states or permit numbers...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1066 11.1066" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[599.813px]" data-name="Container">
      <TextInput1 />
      <Icon3 />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container32 />
    </div>
  );
}

function Checkbox() {
  return <div className="absolute bg-white left-0 size-[16px] top-[2px]" data-name="Checkbox" />;
}

function Text11() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[62.438px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#000d26] text-[14px] top-0">California</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[19px] items-start left-[70.44px] px-[8px] py-[2px] rounded-[33554400px] top-px w-[61.672px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#016630] text-[10px]">Approved</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[21px] relative shrink-0 w-[132.109px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text11 />
        <Text12 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33333 5.33333">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Button1 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-0">CA-2024-08000</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[44px] items-start left-[28px] top-0 w-[619.5px]" data-name="Container">
      <Container35 />
      <Paragraph5 />
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute h-[44px] left-[13px] top-[13px] w-[647.5px]" data-name="Container">
      <Checkbox />
      <Container36 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[14px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d={svgPaths.pd1f0180} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p1c197ec0} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p2f209b00} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[16.5px] left-[22px] top-0 w-[124.344px]" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#1c398e] text-[11px] top-0 tracking-[0.275px] uppercase">Permit Information</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[16.5px] left-0 top-0 w-[639.5px]" data-name="Container">
      <Icon5 />
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#9ca3af] text-[10px] top-0 uppercase">Jurisdiction</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#374151] text-[11px] top-0">California Dept. of Transportation</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="col-[1] content-stretch css-vsca90 flex flex-col gap-[2px] items-start relative row-[1] self-stretch shrink-0" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#9ca3af] text-[10px] top-0 uppercase">Valid Period</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-4hzbpn font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#374151] text-[11px] top-0 w-[139px]">2024-12-10 to 2025-01-10</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="col-[2] content-stretch css-vsca90 flex flex-col gap-[2px] items-start relative row-[1] self-stretch shrink-0" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute gap-[8px] grid grid-cols-[repeat(2,_minmax(0,_1fr))] grid-rows-[repeat(1,_minmax(0,_1fr))] h-[33.5px] left-[20px] top-[24.5px] w-[619.5px]" data-name="Container">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container38 />
      <Container41 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[#6b7280] text-[11px] top-0 tracking-[0.275px] uppercase">Pilot Car Positions Needed</p>
    </div>
  );
}

function Checkbox1() {
  return <div className="shrink-0 size-[14px]" data-name="Checkbox" />;
}

function Text13() {
  return (
    <div className="h-[18px] relative shrink-0 w-[27.969px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#374151] text-[12px] top-0">Lead</p>
      </div>
    </div>
  );
}

function Label9() {
  return (
    <div className="h-[18px] relative shrink-0 w-[80px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Checkbox1 />
        <Text13 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[18px] relative shrink-0 w-[37.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-0">Count:</p>
      </div>
    </div>
  );
}

function NumberInput() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[10px]" data-name="Number Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(0,13,38,0.5)]">1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[32px] relative shrink-0 w-[109.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text14 />
        <NumberInput />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[32px] items-center left-0 top-0 w-[639.5px]" data-name="Container">
      <Label9 />
      <Container43 />
    </div>
  );
}

function Checkbox2() {
  return <div className="shrink-0 size-[14px]" data-name="Checkbox" />;
}

function Text15() {
  return (
    <div className="h-[18px] relative shrink-0 w-[25.828px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#374151] text-[12px] top-0">Rear</p>
      </div>
    </div>
  );
}

function Label10() {
  return (
    <div className="h-[18px] relative shrink-0 w-[80px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Checkbox2 />
        <Text15 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[18px] relative shrink-0 w-[37.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-0">Count:</p>
      </div>
    </div>
  );
}

function NumberInput1() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[10px]" data-name="Number Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] relative size-full">
          <p className="css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(0,13,38,0.5)]">1</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[32px] relative shrink-0 w-[109.563px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text16 />
        <NumberInput1 />
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[32px] items-center left-0 top-[42px] w-[639.5px]" data-name="Container">
      <Label10 />
      <Container45 />
    </div>
  );
}

function Checkbox3() {
  return <div className="shrink-0 size-[14px]" data-name="Checkbox" />;
}

function Text17() {
  return (
    <div className="h-[18px] relative shrink-0 w-[54.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#374151] text-[12px] top-0">High Pole</p>
      </div>
    </div>
  );
}

function Label11() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[18px] items-center left-0 top-[84px] w-[80px]" data-name="Label">
      <Checkbox3 />
      <Text17 />
    </div>
  );
}

function Checkbox4() {
  return <div className="shrink-0 size-[14px]" data-name="Checkbox" />;
}

function Text18() {
  return (
    <div className="h-[18px] relative shrink-0 w-[30.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#374151] text-[12px] top-0">Steer</p>
      </div>
    </div>
  );
}

function Label12() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[18px] items-center left-0 top-[112px] w-[80px]" data-name="Label">
      <Checkbox4 />
      <Text18 />
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[130px] relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Container46 />
      <Label11 />
      <Label12 />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[158.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph11 />
      <Container47 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[rgba(249,250,251,0.5)] content-stretch flex flex-col gap-[16px] h-[282.5px] items-start left-px pt-[17px] px-[16px] top-[69px] w-[671.5px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Container42 />
      <Container48 />
    </div>
  );
}

function StateCard() {
  return (
    <div className="bg-white h-[352.5px] relative rounded-[10px] shrink-0 w-full" data-name="StateCard">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container37 />
      <Container49 />
    </div>
  );
}

function Checkbox5() {
  return <div className="absolute bg-white left-0 size-[16px] top-[2px]" data-name="Checkbox" />;
}

function Text19() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[48.875px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#000d26] text-[14px] top-0">Oregon</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[19px] items-start left-[56.88px] px-[8px] py-[2px] rounded-[33554400px] top-px w-[61.672px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#016630] text-[10px]">Approved</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[21px] relative shrink-0 w-[118.547px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text19 />
        <Text20 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
            <path d={svgPaths.p3ec8f700} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Button2 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-0">OR-2024-08100</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[44px] items-start left-[28px] top-0 w-[619.5px]" data-name="Container">
      <Container51 />
      <Paragraph12 />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Checkbox5 />
      <Container52 />
    </div>
  );
}

function StateCard1() {
  return (
    <div className="bg-white h-[70px] relative rounded-[10px] shrink-0 w-full" data-name="StateCard">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container53 />
      </div>
    </div>
  );
}

function Checkbox6() {
  return <div className="absolute bg-white left-0 size-[16px] top-[2px]" data-name="Checkbox" />;
}

function Text21() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[50.5px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#000d26] text-[14px] top-0">Nevada</p>
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[19px] items-start left-[58.5px] px-[8px] py-[2px] rounded-[33554400px] top-px w-[61.672px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#016630] text-[10px]">Approved</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[21px] relative shrink-0 w-[120.172px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text21 />
        <Text22 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
            <path d={svgPaths.p3ec8f700} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container54 />
      <Button3 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-0">NV-2024-08200</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[44px] items-start left-[28px] top-0 w-[619.5px]" data-name="Container">
      <Container55 />
      <Paragraph13 />
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Checkbox6 />
      <Container56 />
    </div>
  );
}

function StateCard2() {
  return (
    <div className="bg-white h-[70px] relative rounded-[10px] shrink-0 w-full" data-name="StateCard">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container57 />
      </div>
    </div>
  );
}

function Checkbox7() {
  return <div className="absolute bg-white left-0 size-[16px] top-[2px]" data-name="Checkbox" />;
}

function Text23() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[49.797px]" data-name="Text">
      <p className="absolute css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#000d26] text-[14px] top-0">Arizona</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[19px] items-start left-[57.8px] px-[8px] py-[2px] rounded-[33554400px] top-px w-[61.672px]" data-name="Text">
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#016630] text-[10px]">Approved</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[21px] relative shrink-0 w-[119.469px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text23 />
        <Text24 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 9.33333">
            <path d={svgPaths.p3ec8f700} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] px-[4px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container58 />
      <Button4 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute css-ew64yg font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-0">AZ-2024-08300</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[44px] items-start left-[28px] top-0 w-[619.5px]" data-name="Container">
      <Container59 />
      <Paragraph14 />
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Container">
      <Checkbox7 />
      <Container60 />
    </div>
  );
}

function StateCard3() {
  return (
    <div className="bg-white h-[70px] relative rounded-[10px] shrink-0 w-full" data-name="StateCard">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container61 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[500px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start pr-[19px] relative size-full">
          <StateCard />
          <StateCard1 />
          <StateCard2 />
          <StateCard3 />
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[648px] relative rounded-[4px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(138.269deg, rgba(239, 246, 255, 0.5) 0%, rgba(238, 242, 255, 0.3) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(190,219,255,0.6)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container31 />
        <Container33 />
        <Container62 />
      </div>
    </div>
  );
}

function StateConfigSection() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[711.5px] items-start relative shrink-0 w-full" data-name="StateConfigSection">
      <Label6 />
      <Container24 />
      <Container63 />
    </div>
  );
}

export default function Container64() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start px-[24px] relative size-full" data-name="Container">
      <Container8 />
      <Container16 />
      <Container23 />
      <StateConfigSection />
    </div>
  );
}