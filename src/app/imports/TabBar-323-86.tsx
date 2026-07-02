function PrimitiveButton() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[16px] py-[7px] relative rounded-[5px] shadow-[0px_0px_2px_0px_#949ec5] shrink-0 w-[93.398px]" data-name="Primitive.button" style={{ backgroundImage: "linear-gradient(136.686deg, rgb(37, 99, 235) 29.703%, rgb(78, 121, 216) 92.928%)" }}>
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[14px] text-center text-white">All</p>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[13.108px] py-[7.108px] relative rounded-[8px] shrink-0 w-[93.398px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center">Assigned</p>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[13.108px] py-[7.108px] relative rounded-[8px] shrink-0 w-[93.398px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center">Open</p>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="content-stretch flex h-[38.997px] items-center justify-center px-[13.108px] py-[7.108px] relative rounded-[8px] shrink-0 w-[93.398px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.108px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <p className="css-ew64yg font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center">Completed</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative rounded-[14px] shrink-0 w-full" data-name="Tab List">
      <PrimitiveButton />
      <PrimitiveButton1 />
      <PrimitiveButton2 />
      <PrimitiveButton3 />
    </div>
  );
}

export default function TabBar() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center p-[5px] relative rounded-[8px] size-full" data-name="Tab bar">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <TabList />
    </div>
  );
}