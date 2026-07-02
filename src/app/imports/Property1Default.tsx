function RadioButton() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="RadioButton">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="RadioButton">
          <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 2" r="9" stroke="var(--stroke-0, #2383F8)" strokeWidth="2" />
          <circle cx="10" cy="10" fill="var(--fill-0, #2383F8)" id="Ellipse 4" r="5" />
        </g>
      </svg>
    </div>
  );
}

export default function Property1Default() {
  return (
    <div className="bg-[rgba(35,131,248,0.08)] content-stretch flex gap-[16px] items-center p-[16px] relative rounded-[8px] size-full" data-name="Property 1=Default">
      <div aria-hidden="true" className="absolute border border-[#2383f8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_4px_5px_0px_rgba(35,131,248,0.1)]" />
      <RadioButton />
      <div className="flex flex-[1_0_0] flex-col font-['Poppins:Regular',sans-serif] h-full justify-center leading-[20px] min-h-px min-w-px not-italic relative text-[#0b1215] text-[0px]">
        <p className="css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold mb-0 text-[16px]">Company</p>
        <p className="css-4hzbpn font-['Inter:Regular',sans-serif] font-normal text-[14px]">Represents a business entity.</p>
      </div>
    </div>
  );
}