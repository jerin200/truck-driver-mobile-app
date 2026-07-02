import svgPaths from "./svg-1r7ssbm4qq";
import imgBackgroundImage from "figma:asset/fb4f962093615e3cf7b32715358ad50f0ba641ed.png";

function SignalIcons() {
  return (
    <div className="h-[11.5px] relative shrink-0 w-[18.366px]" data-name="Signal Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 12">
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
    <div className="h-[10.75px] relative shrink-0 w-[15.884px]" data-name="WiFi Icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 11">
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
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 13">
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

function BackButton() {
  return <div className="content-stretch flex items-center justify-between size-[28px]" data-name="Back Button" />;
}

function Logout() {
  return <div className="shrink-0 size-[28px]" data-name="Logout" />;
}

function NotificationsNone() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Notifications none">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g clipPath="url(#clip0_1_1761)" id="Notifications none">
          <g id="Vector"></g>
          <path d={svgPaths.p244b5e00} fill="var(--fill-0, white)" id="Vector_2" />
          <circle cx="22" cy="4" fill="var(--fill-0, #D72C2C)" id="Ellipse 23" r="3" />
        </g>
        <defs>
          <clipPath id="clip0_1_1761">
            <rect fill="white" height="28" width="28" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Logout1() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Logout">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Logout">
          <path d={svgPaths.p27f40380} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <NotificationsNone />
      <Logout1 />
    </div>
  );
}

function BackgroundGraphics() {
  return (
    <div className="absolute h-[220px] left-[-18.5px] top-[-49px] w-[444.5px]" data-name="Background graphics">
      <div className="absolute bottom-[-0.13%] left-[-0.06%] right-0 top-[-0.21%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 445 221">
          <g id="Background graphics">
            <path d={svgPaths.p326f6280} id="Vector 4" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.3" />
            <line id="Line 5" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.13" x1="93.1978" x2="192.198" y1="0.226346" y2="195.226" />
            <path d={svgPaths.p6c41b00} id="Vector 4_2" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.3" />
            <path d={svgPaths.p3326ce00} id="Vector 5" stroke="var(--stroke-0, #80FBFC)" strokeOpacity="0.25" />
            <circle cx="49.2519" cy="172.953" fill="var(--fill-0, #80FBFC)" fillOpacity="0.7" id="Ellipse 27" r="1.5" />
            <circle cx="31.7519" cy="123.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.88" id="Ellipse 28" r="1" />
            <circle cx="171.752" cy="155.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.88" id="Ellipse 29" r="2" />
            <circle cx="362.752" cy="94.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 34" r="1" />
            <circle cx="443.752" cy="92.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 39" r="1" />
            <circle cx="400.752" cy="56.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 40" r="1" />
            <circle cx="388.752" cy="58.4527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.4" id="Ellipse 41" r="1" />
            <circle cx="186.752" cy="100.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.5" id="Ellipse 35" r="1" />
            <circle cx="237.252" cy="90.9527" fill="var(--fill-0, #80FBFC)" fillOpacity="0.5" id="Ellipse 36" r="0.5" />
            <circle cx="216.752" cy="111.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.5" id="Ellipse 37" r="1" />
            <circle cx="110.752" cy="138.453" fill="var(--fill-0, #80FBFC)" fillOpacity="0.6" id="Ellipse 38" r="1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Header">
      <div className="box-border content-stretch flex h-[61px] items-start justify-between p-[20px] relative shrink-0 w-[440px]" data-name="Top bar">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] not-italic relative shrink-0 text-[16px] text-nowrap text-right text-white tracking-[-0.32px] whitespace-pre">11:39</p>
        <StatusIcons />
      </div>
      <div className="h-[72px] relative shrink-0 w-full" data-name="header">
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[8px] h-[72px] items-center pb-[16px] pt-[12px] px-[16px] relative w-full">
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg]">
                <BackButton />
              </div>
            </div>
            <Logout />
            <div className="basis-0 flex flex-col font-['Inter:Bold',sans-serif] font-bold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-center text-white">
              <p className="leading-[normal]">Complete Profile</p>
            </div>
            <Frame1 />
          </div>
        </div>
      </div>
      <BackgroundGraphics />
    </div>
  );
}

function ProgressContent() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="progress-content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#202020] text-[14px] w-full">
        <p className="leading-[20px]">
          <span className="font-['Inter:Bold',sans-serif] font-bold not-italic">{`Great progress! `}</span>
          <span>{`Complete the remaining `}</span>
          <span className="font-['Inter:Bold',sans-serif] font-bold not-italic">10%</span>
          <span>{` of your profile to access every feature.`}</span>
        </p>
      </div>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Progress Bar">
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-5px]" style={{ "--stroke-0": "rgba(220, 237, 226, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 376 5">
            <line id="Line 1" stroke="var(--stroke-0, #DCEDE2)" strokeLinecap="round" strokeWidth="5" x1="2.5" x2="373.5" y1="2.5" y2="2.5" />
          </svg>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[326px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-5px]" style={{ "--stroke-0": "rgba(0, 166, 62, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 326 5">
            <line id="Line 2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeWidth="5" x1="2.5" x2="323.5" y1="2.5" y2="2.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ProfileProgress() {
  return (
    <div className="relative rounded-[10px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)] shrink-0 w-full" data-name="profile-progress">
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start justify-center p-[16px] relative w-full">
          <ProgressContent />
          <ProgressBar />
        </div>
      </div>
    </div>
  );
}

function EmailAddressContent() {
  return (
    <div className="basis-0 content-stretch flex gap-[4px] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-nowrap" data-name="email-address-content">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#0b1215]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Email :</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-black">
        <p className="leading-[normal] text-nowrap whitespace-pre">John.doe@abc.com</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <EmailAddressContent />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#0b1215]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Account Type :</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-black">
        <p className="leading-[normal] text-nowrap whitespace-pre">Individual</p>
      </div>
    </div>
  );
}

function Service() {
  return (
    <div className="bg-[#eef4ff] box-border content-stretch flex items-center px-[8px] py-[4px] relative rounded-[16px] shrink-0" data-name="Service">
      <div aria-hidden="true" className="absolute border border-[#c7d7fe] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Offer a pilot car</p>
      </div>
    </div>
  );
}

function Service1() {
  return (
    <div className="bg-[#eff8ff] box-border content-stretch flex items-center px-[8px] py-[4px] relative rounded-[16px] shrink-0" data-name="Service">
      <div aria-hidden="true" className="absolute border border-[#b2ddff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Find a pilot car</p>
      </div>
    </div>
  );
}

function Service2() {
  return (
    <div className="bg-[#f9f5ff] box-border content-stretch flex items-center px-[8px] py-[4px] relative rounded-[16px] shrink-0" data-name="Service">
      <div aria-hidden="true" className="absolute border border-[#e9d7fe] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Need a permit</p>
      </div>
    </div>
  );
}

function ServicesSelected() {
  return (
    <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-name="Services Selected">
      <Service />
      <Service1 />
      <Service2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[14px] w-full">
        <p className="leading-[normal]">Selected Services</p>
      </div>
      <ServicesSelected />
    </div>
  );
}

function AccountInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="account Info">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-black w-[min-content]">
        <p className="leading-[normal]">Account Information</p>
      </div>
      <div className="bg-white box-border content-stretch flex flex-col gap-[12px] items-center overflow-clip p-[16px] relative rounded-[8px] shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05)] shrink-0" data-name="Account Info Card">
        <Container />
        <div className="h-0 relative shrink-0 w-[376px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 376 1">
              <line id="Line 5" stroke="var(--stroke-0, #E2E9F1)" x2="376" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Container1 />
        <div className="h-0 relative shrink-0 w-[376px]">
          <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 376 1">
              <line id="Line 5" stroke="var(--stroke-0, #E2E9F1)" x2="376" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <Container2 />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[17.1px] relative shrink-0 w-[19px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 18">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p1452be00} fill="var(--fill-0, #0B1215)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p34eaa00} fill="var(--fill-0, #0B1215)" fillRule="evenodd" id="Vector_2" />
          <path d={svgPaths.p22421780} fill="var(--fill-0, #0B1215)" id="Vector_3" />
          <path d={svgPaths.p224b0100} fill="var(--fill-0, #0B1215)" id="Vector_4" />
          <path d={svgPaths.p3aa9b4c0} fill="var(--fill-0, #0B1215)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-0 pt-[7px] px-0 relative shrink-0 w-[19px]" data-name="Frame">
      <Group />
    </div>
  );
}

function AgreementDetails() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Agreement Details">
      <Frame />
      <div className="basis-0 flex flex-col font-['Poppins:Regular',sans-serif] grow justify-center leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#0b1215] text-[0px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-0 text-[14px]">Documents Required</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[13px]">Review required documents before proceeding.</p>
      </div>
    </div>
  );
}

function AgreementItem() {
  return (
    <button className="bg-white cursor-pointer relative rounded-[8px] shrink-0 w-full" data-name="Agreement Item">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center px-[16px] py-[12px] relative w-full">
          <AgreementDetails />
          <div className="h-[12px] relative shrink-0 w-[7.41px]" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 12">
              <path d={svgPaths.p2cf22800} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Header Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black text-nowrap">
        <p className="leading-[normal] whitespace-pre">Complete your profile</p>
      </div>
    </div>
  );
}

function Article() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Article">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1730)" id="Article">
          <path d={svgPaths.p338b9300} fill="var(--fill-0, #3D485C)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1730">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepDescription() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0" data-name="Step Description">
      <Article />
      <div className="basis-0 flex flex-col font-['Inter:Medium',sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#373e49] text-[14px]">
        <p className="leading-[normal]">Legal Information</p>
      </div>
    </div>
  );
}

function StepStatus() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[21px] items-center justify-center px-[8px] py-px relative rounded-[12.5px] shrink-0 w-[85px]" data-name="step status">
      <div aria-hidden="true" className="absolute border border-[#319661] border-solid inset-0 pointer-events-none rounded-[12.5px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#319661] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Completed</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Keyboard arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1726)" id="Keyboard arrow right">
          <g id="Vector"></g>
          <path d={svgPaths.p16e51a00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1726">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepStatusContainer() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0" data-name="Step Status Container">
      <StepStatus />
      <KeyboardArrowRight />
    </div>
  );
}

function ProfileStep() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Profile Step">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <StepDescription />
          <StepStatusContainer />
        </div>
      </div>
    </div>
  );
}

function Article1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Article">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_1_1723)" id="Article">
          <path d={svgPaths.p338b9300} fill="var(--fill-0, #3D485C)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1723">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepDescription1() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Step Description">
      <Article1 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#202021] text-[14px] w-[297.947px]">
        <p className="leading-[normal]">Tax Information</p>
      </div>
    </div>
  );
}

function StepStatus1() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[21px] items-center justify-center px-[8px] py-px relative rounded-[12.5px] shrink-0 w-[85px]" data-name="step status">
      <div aria-hidden="true" className="absolute border border-[#d45153] border-solid inset-0 pointer-events-none rounded-[12.5px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#d45153] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Pending</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Keyboard arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1726)" id="Keyboard arrow right">
          <g id="Vector"></g>
          <path d={svgPaths.p16e51a00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1726">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepStatusContainer1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Step status container">
      <StepStatus1 />
      <KeyboardArrowRight1 />
    </div>
  );
}

function ProfileStep1() {
  return (
    <div className="bg-white opacity-[0.55] relative rounded-[8px] shrink-0 w-full" data-name="Profile Step">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <StepDescription1 />
          <StepStatusContainer1 />
        </div>
      </div>
    </div>
  );
}

function LockOutline() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12px]" data-name="Lock outline">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
        <g clipPath="url(#clip0_1_1720)" id="Lock outline">
          <path d={svgPaths.p104cf80} fill="var(--fill-0, #3D485C)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1720">
            <rect fill="white" height="16" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepDescription2() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Step Description">
      <LockOutline />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#202021] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Regulatory Information</p>
      </div>
    </div>
  );
}

function StepStatus2() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[21px] items-center justify-center px-[8px] py-px relative rounded-[25px] shrink-0 w-[85px]" data-name="step status">
      <div aria-hidden="true" className="absolute border border-[#d45153] border-solid inset-0 pointer-events-none rounded-[25px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#d45153] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Pending</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Keyboard arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1726)" id="Keyboard arrow right">
          <g id="Vector"></g>
          <path d={svgPaths.p16e51a00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1726">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepStatusContainer2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Step status container">
      <StepStatus2 />
      <KeyboardArrowRight2 />
    </div>
  );
}

function ProfileStep2() {
  return (
    <div className="bg-white opacity-[0.55] relative rounded-[8px] shrink-0 w-full" data-name="Profile Step">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <StepDescription2 />
          <StepStatusContainer2 />
        </div>
      </div>
    </div>
  );
}

function StepDescription3() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Step Description">
      <div className="h-[16px] relative shrink-0 w-[12px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
          <path d={svgPaths.p104cf80} fill="var(--fill-0, #3D485C)" id="Vector" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#202021] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Basic Information</p>
      </div>
    </div>
  );
}

function StepStatus3() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[21px] items-center justify-center px-[8px] py-px relative rounded-[25px] shrink-0 w-[85px]" data-name="step status">
      <div aria-hidden="true" className="absolute border border-[#d45153] border-solid inset-0 pointer-events-none rounded-[25px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#d45153] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Pending</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Keyboard arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1726)" id="Keyboard arrow right">
          <g id="Vector"></g>
          <path d={svgPaths.p16e51a00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1726">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepStatusContainer3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Step status container">
      <StepStatus3 />
      <KeyboardArrowRight3 />
    </div>
  );
}

function ProfileStep3() {
  return (
    <div className="bg-white opacity-[0.55] relative rounded-[8px] shrink-0 w-full" data-name="Profile Step">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <StepDescription3 />
          <StepStatusContainer3 />
        </div>
      </div>
    </div>
  );
}

function StepDescription4() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Step Description">
      <div className="h-[16px] relative shrink-0 w-[12px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
          <path d={svgPaths.p104cf80} fill="var(--fill-0, #3D485C)" id="Vector" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#202021] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Location Information</p>
      </div>
    </div>
  );
}

function StepStatus4() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[21px] items-center justify-center px-[8px] py-px relative rounded-[25px] shrink-0 w-[85px]" data-name="step status">
      <div aria-hidden="true" className="absolute border border-[#d45153] border-solid inset-0 pointer-events-none rounded-[25px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#d45153] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Pending</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Keyboard arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1726)" id="Keyboard arrow right">
          <g id="Vector"></g>
          <path d={svgPaths.p16e51a00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1726">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepStatusContainer4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Step status container">
      <StepStatus4 />
      <KeyboardArrowRight4 />
    </div>
  );
}

function ProfileStep4() {
  return (
    <div className="bg-white opacity-[0.55] relative rounded-[8px] shrink-0 w-full" data-name="Profile Step">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <StepDescription4 />
          <StepStatusContainer4 />
        </div>
      </div>
    </div>
  );
}

function StepDescription5() {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Step Description">
      <div className="h-[16px] relative shrink-0 w-[12px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
          <path d={svgPaths.p104cf80} fill="var(--fill-0, #3D485C)" id="Vector" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#202021] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Contact Information</p>
      </div>
    </div>
  );
}

function StepStatus5() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[21px] items-center justify-center px-[8px] py-px relative rounded-[25px] shrink-0 w-[85px]" data-name="step status">
      <div aria-hidden="true" className="absolute border border-[#d45153] border-solid inset-0 pointer-events-none rounded-[25px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#d45153] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Pending</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Keyboard arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1726)" id="Keyboard arrow right">
          <g id="Vector"></g>
          <path d={svgPaths.p16e51a00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1726">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepStatusContainer5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Step status container">
      <StepStatus5 />
      <KeyboardArrowRight5 />
    </div>
  );
}

function ProfileStep5() {
  return (
    <div className="bg-white opacity-[0.55] relative rounded-[8px] shrink-0 w-full" data-name="Profile Step">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <StepDescription5 />
          <StepStatusContainer5 />
        </div>
      </div>
    </div>
  );
}

function StepDescription6() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Step Description">
      <div className="h-[16px] relative shrink-0 w-[12px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 16">
          <path d={svgPaths.p104cf80} fill="var(--fill-0, #0E2650)" id="Vector" />
        </svg>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#202021] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Payment Information</p>
      </div>
    </div>
  );
}

function StepStatus6() {
  return (
    <div className="box-border content-stretch flex gap-[4px] h-[21px] items-center justify-center px-[8px] py-px relative rounded-[25px] shrink-0 w-[85px]" data-name="step status">
      <div aria-hidden="true" className="absolute border border-[#d45153] border-solid inset-0 pointer-events-none rounded-[25px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#d45153] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Incomplete</p>
      </div>
    </div>
  );
}

function KeyboardArrowRight6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Keyboard arrow right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_1_1726)" id="Keyboard arrow right">
          <g id="Vector"></g>
          <path d={svgPaths.p16e51a00} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1726">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function StepStatusContainer6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Step status container">
      <StepStatus6 />
      <KeyboardArrowRight6 />
    </div>
  );
}

function ProfileStep6() {
  return (
    <div className="bg-white opacity-[0.55] relative rounded-[8px] shrink-0 w-full" data-name="Profile Step">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <StepDescription6 />
          <StepStatusContainer6 />
        </div>
      </div>
    </div>
  );
}

function CompleteProfile() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="complete profile">
      <HeaderContainer />
      <ProfileStep />
      <ProfileStep1 />
      <ProfileStep2 />
      <ProfileStep3 />
      <ProfileStep4 />
      <ProfileStep5 />
      <ProfileStep6 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto relative shrink-0 w-full">
      <AccountInfo />
      <AgreementItem />
      <CompleteProfile />
    </div>
  );
}

function MainContent() {
  return (
    <div className="basis-0 bg-[#f3f3f3] box-border content-stretch flex flex-col gap-[20px] grow items-start min-h-px min-w-px overflow-x-clip overflow-y-auto p-[16px] relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-[440px]" data-name="main content">
      <ProfileProgress />
      <Frame2 />
    </div>
  );
}

function MainContent1() {
  return (
    <div className="basis-0 bg-[#f6f6f6] content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Main content">
      <MainContent />
    </div>
  );
}

export default function ProfileCompletionPage() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-center relative size-full" data-name="Profile Completion Page">
      <div className="absolute left-[-81px] size-[962px] top-[-40px]" data-name="Background image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBackgroundImage} />
      </div>
      <Header />
      <MainContent1 />
    </div>
  );
}