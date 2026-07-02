import svgPaths from "./svg-dbn1vrgv5r";

function Icon() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Icon">
          <path d={svgPaths.p3e36f100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p21cb9c80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function RouteIcon() {
  return (
    <div className="absolute bg-[#0b1215] content-stretch flex items-center left-[35px] p-[6px] rounded-[11px] size-[22px] top-[-1px]" data-name="Route icon">
      <Icon />
    </div>
  );
}

export default function RouteIconContainer() {
  return (
    <div className="relative size-full" data-name="Route icon container">
      <div className="absolute h-0 left-0 top-[10px] w-[92px]">
        <div className="absolute inset-[-0.5px_-0.54%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 93 1">
            <path d="M0.5 0.5H92.5" id="Vector 6" stroke="var(--stroke-0, #D5D5D5)" strokeDasharray="4 5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <RouteIcon />
    </div>
  );
}