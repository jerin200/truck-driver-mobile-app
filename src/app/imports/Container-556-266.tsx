import svgPaths from "./svg-2knpr8g8jk";

function Text() {
  return (
    <div className="h-[21px] relative shrink-0 w-[17.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#2563eb] text-[14px] top-0">TX</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[#eff6ff] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bfdbfe] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-px pr-[1.016px] py-px relative size-full">
        <Text />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#202224] text-[15px] top-[-2px]">Texas</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#6b7280] text-[12px] top-0">Texas Dept. of Transportation</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[40.5px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[40.5px] relative shrink-0 w-[220.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_556_270)" id="Icon">
          <path d={svgPaths.p1832a80} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pd7eb500} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_556_270">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#15803d] text-[12px] top-0">Approved</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-[#f0fdf4] h-[28px] relative rounded-[10px] shrink-0 w-[96.813px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#86efac] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center px-[11px] py-px relative size-full">
        <Icon />
        <Text1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[40.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container6 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[13px] size-[16px] top-[11px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19bc7f80} id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#b91c1c] text-[12px] top-0">⚠️ Permit Expired</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#b91c1c] text-[11px] top-0 w-[330px] whitespace-pre-wrap">Expired 399 days ago. This permit is no longer valid for the trip.</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[36.5px] items-start left-[37px] top-[9px] w-[329.5px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#fef2f2] h-[54.5px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#fca5a5] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon1 />
      <Container8 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#6b7280] text-[11px] top-0">Permit Number</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#202224] text-[13px] top-0">TX-2024-08000</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-0 top-[13px] w-[193.313px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#6b7280] text-[11px] top-0">Total Fee</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#202224] text-[13px] top-0">$225.00</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-[209.31px] top-[13px] w-[193.313px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[#6b7280] text-[11px] top-0">Payment Type</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#202224] text-[13px] top-0">Full Upfront</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[40px] items-start left-[418.63px] top-[13px] w-[193.313px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[66px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid border-t inset-0 pointer-events-none" />
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 1.33333V14.6667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pfd86880} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[190.984px]" data-name="Heading 5">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[#0a0a0a] text-[12px] top-0">{`Fee Breakdown & Payment Status`}</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Heading1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[18px] relative shrink-0 w-[76.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#0a0a0a] text-[12px] top-0">Overwize Fee</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[43.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#0a0a0a] text-[13px] top-0">$33.75</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[19.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[18px] relative shrink-0 w-[60.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#0a0a0a] text-[12px] top-0">Permit Fee</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[47.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#0a0a0a] text-[13px] top-0">$191.25</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[19.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-[113.797px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#0a0a0a] text-[13px] top-0">Total Payable Now</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[58.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#0a0a0a] text-[15px] top-[-2px]">$225.00</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[31.5px] items-center justify-between pt-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-solid border-t inset-0 pointer-events-none" />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[9px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_556_270)" id="Icon">
          <path d={svgPaths.p1832a80} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.pd7eb500} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_556_270">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[#4b5563] text-[12px] top-0">Payment Status</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[18px] relative shrink-0 w-[111.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon3 />
        <Text8 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] h-[18px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[#202224] text-[12px] top-0">$225.00</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="bg-[#dcfce7] h-[20.5px] relative rounded-[4px] shrink-0 w-[38.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[8px] not-italic text-[#16a34a] text-[11px] top-[2px]">Paid</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20.5px] relative shrink-0 w-[93.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text9 />
        <Text10 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[20.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[132px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#f9fafb] h-[188px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[13px] px-[13px] relative size-full">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] left-0 not-italic text-[#6b7280] text-[12px] top-0">Permit approved for Texas. All requirements met.</p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[16px] size-[14px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M7 8.75V1.75" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p34aacb00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p27169580} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#16a34a] h-[34px] relative rounded-[10px] shrink-0 w-[150.594px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon4 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[86px] not-italic text-[12px] text-center text-white top-[8px]">Download Permit</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[34px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Button />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[494.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[12px] items-start pt-[16px] px-[16px] relative size-full">
        <Container2 />
        <Container7 />
        <Container9 />
        <Container13 />
        <Paragraph9 />
        <Container23 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-px relative rounded-[10px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_2px_8px_0px_rgba(95,95,95,0.12)]" />
      <Container1 />
    </div>
  );
}