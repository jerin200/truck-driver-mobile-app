import svgPaths from "./svg-efzgnhvhbq";

function PasswordDots() {
  return (
    <div className="h-[7px] relative shrink-0 w-[79px]" data-name="Password Dots">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79 7">
        <g id="Password Dots">
          <circle cx="3.5" cy="3.5" fill="var(--fill-0, #0B1215)" id="Ellipse 6" r="3.5" />
          <circle cx="15.5" cy="3.5" fill="var(--fill-0, #0B1215)" id="Ellipse 7" r="3.5" />
          <circle cx="27.5" cy="3.5" fill="var(--fill-0, #0B1215)" id="Ellipse 8" r="3.5" />
          <circle cx="39.5" cy="3.5" fill="var(--fill-0, #0B1215)" id="Ellipse 9" r="3.5" />
          <circle cx="51.5" cy="3.5" fill="var(--fill-0, #0B1215)" id="Ellipse 10" r="3.5" />
          <circle cx="63.5" cy="3.5" fill="var(--fill-0, #0B1215)" id="Ellipse 11" r="3.5" />
          <circle cx="75.5" cy="3.5" fill="var(--fill-0, #0B1215)" id="Ellipse 12" r="3.5" />
        </g>
      </svg>
    </div>
  );
}

function RemoveRedEye() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Remove red eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_361_1579)" id="Remove red eye">
          <g id="Vector"></g>
          <path d={svgPaths.pc087f80} fill="var(--fill-0, #585858)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_361_1579">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[16px] py-[12px] relative rounded-[6px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cfcdcd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <PasswordDots />
      <RemoveRedEye />
    </div>
  );
}