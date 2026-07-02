import svgPaths from "./svg-d83k5odgph";
import imgBackgroundImage from "figma:asset/30d63c16443d23997a77793462ca51f8a7d0f983.png";
import imgBackgroundImage1 from "figma:asset/53221d9fa382526d47dfeba5fd6fdac3a8d01af0.png";

function SignalIcons() {
  return (
    <div className="h-[11.5px] relative shrink-0 w-[18.366px]" data-name="Signal Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3662 11.5">
        <g id="Signal Icons">
          <rect fill="var(--fill-0, white)" height="11.5" id="signal-4" opacity="0.2" rx="1" width="3.47464" x="14.8916" />
          <path d={svgPaths.p2db675a8} fill="var(--fill-0, white)" id="signal-3" />
          <path d={svgPaths.p1f6d9500} fill="var(--fill-0, white)" id="signa-2" />
          <path d={svgPaths.paccab00} fill="var(--fill-0, white)" id="signal-1" />
        </g>
      </svg>
    </div>
  );
}

function WiFiIcons() {
  return (
    <div className="h-[10.751px] relative shrink-0 w-[15.884px]" data-name="WiFi Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8841 10.7503">
        <g id="WiFi Icons">
          <path d={svgPaths.p28412700} fill="var(--fill-0, white)" id="wifi-low" />
          <path d={svgPaths.p325b1d00} fill="var(--fill-0, white)" id="wifi-medium" />
          <path d={svgPaths.p3fdac200} fill="var(--fill-0, white)" id="wifi-high" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}

function BatteryIcons() {
  return (
    <div className="h-[12.5px] relative shrink-0 w-[26.308px]" data-name="Battery Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.308 12.5">
        <g id="Battery Icons">
          <path d={svgPaths.pfeeb200} fill="var(--fill-0, white)" id="level-start" />
          <path d={svgPaths.pcc9ec00} fill="var(--fill-0, white)" id="level-2" />
          <path d={svgPaths.p8c94a00} fill="var(--fill-0, white)" id="level-3" />
          <path d={svgPaths.p373ee600} fill="var(--fill-0, white)" id="level-4" />
          <path d={svgPaths.p26dd6e00} fill="var(--fill-0, white)" id="level-5" />
          <path d={svgPaths.p1fdbd300} fill="var(--fill-0, white)" id="level-6" />
          <path d={svgPaths.p187f3280} fill="var(--fill-0, white)" id="level-7" />
          <path d={svgPaths.p3bd9fd80} fill="var(--fill-0, white)" id="level-last" />
          <g id="Vector" opacity="0.5">
            <path clipRule="evenodd" d={svgPaths.p129d0d00} fill="white" fillRule="evenodd" />
            <path d={svgPaths.p12a75000} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StatusIcons() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Status Icons">
      <SignalIcons />
      <WiFiIcons />
      <BatteryIcons />
    </div>
  );
}

function MobileTopBar() {
  return (
    <div className="content-stretch flex h-[61px] items-start justify-between p-[20px] relative shrink-0 w-[440px]" data-name="MobileTopBar">
      <p className="css-ew64yg font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[16px] text-right text-white tracking-[-0.32px]">11:39</p>
      <StatusIcons />
    </div>
  );
}

function Close() {
  return (
    <div className="h-[22px] relative w-[24px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 22">
        <g id="Close">
          <path d={svgPaths.p14e55b00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center px-[19px] py-[16px] relative rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 size-[44px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Close />
        </div>
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-[44px]" data-name="Back Button">
      <Frame />
    </div>
  );
}

function Close1() {
  return (
    <div className="h-[22px] relative w-[24px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 22">
        <g id="Close">
          <path d={svgPaths.p9523440} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[19px] py-[16px] relative rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 size-[44px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg]">
          <Close1 />
        </div>
      </div>
    </div>
  );
}

function BackButton1() {
  return (
    <div className="content-stretch flex items-center justify-center opacity-0 relative size-[44px]" data-name="Back Button">
      <Frame1 />
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="Title">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[16px] pt-[12px] px-[16px] relative w-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <BackButton />
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] min-h-px min-w-px not-italic relative text-[20px] text-center text-white">
            <p className="css-4hzbpn leading-[normal]">My Jobs</p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg]">
              <BackButton1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundGraphics() {
  return (
    <div className="absolute h-[220px] left-[-18.5px] top-[-49px] w-[444.5px]" data-name="Background graphics">
      <div className="absolute inset-[-0.21%_0_-0.13%_-0.06%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 444.752 220.73">
          <g id="Background graphics">
            <path d={svgPaths.p326f6280} id="Vector 4" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.15" />
            <line id="Line 5" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.05" x1="93.1978" x2="192.198" y1="0.226346" y2="195.226" />
            <path d={svgPaths.p6c41b00} id="Vector 4_2" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.15" />
            <path d={svgPaths.p3326ce00} id="Vector 5" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.1" />
            <circle cx="49.2519" cy="172.953" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 27" r="1.5" />
            <circle cx="31.7519" cy="123.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.5" id="Ellipse 28" r="1" />
            <circle cx="171.752" cy="155.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.5" id="Ellipse 29" r="2" />
            <circle cx="362.752" cy="94.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 34" r="1" />
            <circle cx="443.752" cy="92.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 39" r="1" />
            <circle cx="400.752" cy="56.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 40" r="1" />
            <circle cx="388.752" cy="58.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 41" r="1" />
            <circle cx="186.752" cy="100.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.3" id="Ellipse 35" r="1" />
            <circle cx="237.252" cy="90.9527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.3" id="Ellipse 36" r="0.5" />
            <circle cx="216.752" cy="111.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.3" id="Ellipse 37" r="1" />
            <circle cx="110.752" cy="138.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.2" id="Ellipse 38" r="1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Header" style={{ backgroundImage: "linear-gradient(109.083deg, rgb(11, 18, 21) 0.3559%, rgb(48, 48, 49) 106.2%)" }}>
      <div className="absolute h-[720px] left-[-310px] top-[-437px] w-[1080px]" data-name="Background image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackgroundImage} />
      </div>
      <div className="absolute left-[-480px] size-[1430px] top-[-617px]" data-name="Background image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBackgroundImage1} />
      </div>
      <MobileTopBar />
      <Title />
      <BackgroundGraphics />
    </div>
  );
}