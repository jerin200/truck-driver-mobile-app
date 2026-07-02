export default function Input() {
  return (
    <div className="bg-white relative rounded-[6px] size-full" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip px-[16px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px]">e.g. Excavator</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#cfcdcd] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}