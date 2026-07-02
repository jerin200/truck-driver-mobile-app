function RadioButton() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="RadioButton">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="RadioButton">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 2" r="9" stroke="var(--stroke-0, #CFCDCD)" strokeWidth="2" />
          <circle cx="10" cy="10" fill="var(--fill-0, #12B38C)" id="Ellipse 4" opacity="0" r="1" />
        </g>
      </svg>
    </div>
  );
}

function Property1Default() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Property 1=Default">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <RadioButton />
          <div className="flex flex-[1_0_0] flex-col font-['Poppins:Regular',sans-serif] h-full justify-center leading-[20px] min-h-px min-w-px not-italic relative text-[#0b1215] text-[0px]">
            <p className="css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold mb-0 text-[16px]">Individual Operator</p>
            <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal text-[14px]">Represents a sole operator.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RadioButton1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="RadioButton">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="RadioButton">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 2" r="9" stroke="var(--stroke-0, #CFCDCD)" strokeWidth="2" />
          <circle cx="10" cy="10" fill="var(--fill-0, #12B38C)" id="Ellipse 4" opacity="0" r="1" />
        </g>
      </svg>
    </div>
  );
}

function Property1Default1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Property 1=Default">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <RadioButton1 />
          <div className="flex flex-[1_0_0] flex-col font-['Poppins:Regular',sans-serif] h-full justify-center leading-[20px] min-h-px min-w-px not-italic relative text-[#0b1215] text-[0px]">
            <p className="css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold mb-0 text-[16px]">Company</p>
            <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal text-[14px]">Represents a business entity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndividualCompany() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative size-full" data-name="individual/company">
      <Property1Default />
      <Property1Default1 />
    </div>
  );
}