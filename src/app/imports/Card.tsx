import svgPaths from "./svg-dhpwx0eb0i";

function TripDetailsDrawer() {
  return (
    <div className="h-[24.011px] relative shrink-0 w-full" data-name="TripDetailsDrawer">
      <p className="absolute leading-[24px] left-0 not-italic text-[#101828] text-[16px] text-nowrap top-[-1.82px]">Actions</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[13.17px] size-[15.989px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_156_678)" id="Icon">
          <path d={svgPaths.p343c61f2} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d={svgPaths.p3887d700} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d={svgPaths.p137a1c00} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d={svgPaths.p1d4a0600} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d={svgPaths.p1d044780} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
        <defs>
          <clipPath id="clip0_156_678">
            <rect fill="white" height="15.9887" width="15.9887" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[35.998px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.18px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon />
      <p className="absolute leading-[20px] left-[104.13px] not-italic text-[14px] text-black text-center text-nowrap top-[6px] translate-x-[-50%]">Share Tracking Link</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[13.17px] size-[15.989px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_156_674)" id="Icon">
          <path d={svgPaths.pda2a3e0} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d={svgPaths.p3028d80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
        <defs>
          <clipPath id="clip0_156_674">
            <rect fill="white" height="15.9887" width="15.9887" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[35.998px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.18px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon1 />
      <p className="absolute leading-[20px] left-[134.63px] not-italic text-[14px] text-black text-center text-nowrap top-[6px] translate-x-[-50%]">Request Route/Time Change</p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[13.17px] size-[15.989px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_156_669)" id="Icon">
          <path d={svgPaths.p38855d00} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d="M7.99433 5.99575V8.66052" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
          <path d="M7.99433 11.3253H8.00099" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33239" />
        </g>
        <defs>
          <clipPath id="clip0_156_669">
            <rect fill="white" height="15.9887" width="15.9887" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[35.998px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#d1d5dc] border-[1.18px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon2 />
      <p className="absolute leading-[20px] left-[83.63px] not-italic text-[14px] text-black text-center text-nowrap top-[6px] translate-x-[-50%]">Log Incident</p>
    </div>
  );
}

function TripDetailsDrawer1() {
  return (
    <div className="content-stretch flex flex-col gap-[7.985px] h-[123.963px] items-start relative shrink-0 w-full" data-name="TripDetailsDrawer">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="h-[199.941px] relative shrink-0 w-[336.26px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.987px] items-start pb-0 pt-[15.989px] px-[15.989px] relative size-full">
        <TripDetailsDrawer />
        <TripDetailsDrawer1 />
      </div>
    </div>
  );
}

export default function Card() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[1.18px] relative rounded-[14px] size-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.18px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <CardContent />
    </div>
  );
}