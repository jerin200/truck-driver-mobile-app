function Container() {
  return (
    <div className="bg-white h-[50px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cfcdcd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] relative size-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19.714px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[16px] w-[183px]">
            <p className="css-4hzbpn leading-[normal]">jondoe@overwize.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Textbox() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative size-full" data-name="textbox">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[0px] w-full">
        <p className="css-4hzbpn font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px]">
          <span className="leading-[10px] text-[#202021]">Email Address</span>
          <span className="leading-[10px]"> </span>
          <span className="leading-[10px] text-[red]">*</span>
        </p>
      </div>
      <Container />
    </div>
  );
}