import svgPaths from "./svg-0x7j9zwtbo";

export default function DropdownBox() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative rounded-[6px] size-full" data-name="Dropdown box">
      <div aria-hidden="true" className="absolute border border-[#cfcdcd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[20px] min-h-px min-w-px not-italic relative text-[#717182] text-[14px] whitespace-pre-wrap">Select type</p>
      <div className="h-[7px] relative shrink-0 w-[12px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 7">
          <path d={svgPaths.p27e72140} fill="var(--fill-0, #404041)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}