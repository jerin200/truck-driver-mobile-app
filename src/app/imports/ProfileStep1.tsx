import svgPaths from "./svg-6etbckrnri";

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

function Close() {
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

function Frame() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[19px] py-[16px] relative rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 size-[44px]">
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
    <div className="content-stretch flex gap-[10px] items-center justify-center relative size-[44px]" data-name="Back Button">
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
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[19px] py-[16px] relative rounded-[12px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04)] shrink-0 size-[44px]">
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
    <div className="content-stretch flex gap-[10px] items-center justify-center opacity-0 relative size-[44px]" data-name="Back Button">
      <Frame1 />
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
      <div className="relative shrink-0 w-full" data-name="Progress bar">
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex items-center justify-between pb-[16px] pt-[12px] px-[16px] relative w-full">
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg]">
                <BackButton />
              </div>
            </div>
            <div className="basis-0 flex flex-col font-['Inter:Bold',sans-serif] font-bold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-center text-white">
              <p className="leading-[normal]">Legal Agreements</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div className="flex-none rotate-[180deg]">
                <BackButton1 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundGraphics />
    </div>
  );
}

function Divider() {
  return (
    <div className="basis-0 grow h-[5px] min-h-px min-w-px relative shrink-0" data-name="Divider">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 362 5">
        <g id="Divider">
          <line id="Line 1" stroke="var(--stroke-0, #DCEDE2)" strokeLinecap="round" strokeWidth="5" x1="2.5" x2="359.5" y1="2.5" y2="2.5" />
          <line id="Line 2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeWidth="5" x1="2.5" x2="42.5" y1="2.5" y2="2.5" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="h-[18.324px] relative shrink-0 w-[20.17px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
        <g id="Group">
          <path d={svgPaths.p2497c880} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Handshake() {
  return (
    <div className="box-border content-stretch flex items-center justify-between overflow-clip pb-0 pt-[6px] px-0 relative shrink-0 w-[22px]" data-name="Handshake">
      <Group />
    </div>
  );
}

function AgreementDetails() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Agreement Details">
      <Handshake />
      <div className="basis-0 flex flex-col font-['Poppins:Regular',sans-serif] grow justify-center leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#0b1215] text-[0px] text-[14px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-0">Privacy Policy</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal">Review and accept our privacy policy.</p>
      </div>
    </div>
  );
}

function AgreementItem() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Agreement Item">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <AgreementDetails />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#2383f8] text-[16px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Read</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="h-[18.324px] relative shrink-0 w-[20.17px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
        <g id="Group">
          <path d={svgPaths.p2497c880} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Handshake1() {
  return (
    <div className="box-border content-stretch flex items-center justify-between overflow-clip pb-0 pt-[6px] px-0 relative shrink-0 w-[22px]" data-name="Handshake">
      <Group1 />
    </div>
  );
}

function AgreementDetails1() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Agreement Details">
      <Handshake1 />
      <div className="basis-0 flex flex-col font-['Poppins:Regular',sans-serif] grow justify-center leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#0b1215] text-[0px] text-[14px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-0">{`Terms & Conditions`}</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal">Review and accept our terms and conditions.</p>
      </div>
    </div>
  );
}

function AgreementItem1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Agreement Item">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <AgreementDetails1 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#2383f8] text-[16px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Read</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="h-[18.324px] relative shrink-0 w-[20.17px]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
        <g id="Group">
          <path d={svgPaths.p2497c880} fill="var(--fill-0, black)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Handshake2() {
  return (
    <div className="box-border content-stretch flex items-center justify-between overflow-clip pb-0 pt-[6px] px-0 relative shrink-0 w-[22px]" data-name="Handshake">
      <Group2 />
    </div>
  );
}

function AgreementDetails2() {
  return (
    <div className="basis-0 content-stretch flex gap-[8px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Agreement Details">
      <Handshake2 />
      <div className="basis-0 flex flex-col font-['Poppins:Regular',sans-serif] grow justify-center leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#0b1215] text-[0px] text-[14px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold mb-0">User Service Agreement</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal">Review and electronically sign our service agreement.</p>
      </div>
    </div>
  );
}

function AgreementItem2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="Agreement Item">
      <div aria-hidden="true" className="absolute border border-[#e6e3df] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_24px_0px_rgba(0,0,0,0.05)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center p-[16px] relative w-full">
          <AgreementDetails2 />
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#2383f8] text-[16px] text-nowrap">
            <p className="leading-[normal] whitespace-pre">Review</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AgreementsList() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Agreements List">
      <AgreementItem />
      <AgreementItem1 />
      <AgreementItem2 />
    </div>
  );
}

function LegalAgreementsContainer() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full" data-name="Legal agreements container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[16px] py-[8px] relative size-full">
          <AgreementsList />
        </div>
      </div>
    </div>
  );
}

function ProfileCreationContent() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-center min-h-px min-w-px relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-full" data-name="Profile creation content">
      <div className="relative shrink-0 w-full" data-name="Contact information">
        <div className="flex flex-row items-center size-full">
          <div className="box-border content-stretch flex gap-[10px] items-center pb-[15px] pt-[24px] px-[16px] relative w-full">
            <Divider />
            <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[16px] text-nowrap">
              <p className="leading-[normal] whitespace-pre">1 of 7</p>
            </div>
          </div>
        </div>
      </div>
      <LegalAgreementsContainer />
    </div>
  );
}

function RightButtons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Right buttons">
      <div className="bg-[#f5c78a] box-border content-stretch flex gap-[8px] items-center px-[24px] py-[14px] relative rounded-[8px] shrink-0" data-name="Next button">
        <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[17px] text-[rgba(26,26,26,0.5)] text-nowrap">
          <p className="leading-[normal] whitespace-pre">Next</p>
        </div>
        <div className="content-stretch flex items-center relative shrink-0" data-name="Right Icon">
          <div className="h-[14px] relative shrink-0 w-[8px]" data-name="Vector">
            <div className="absolute inset-0" style={{ "--fill-0": "rgba(26, 26, 26, 1)" } as React.CSSProperties}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
                <path d={svgPaths.p369edd30} fill="var(--fill-0, #1A1A1A)" fillOpacity="0.5" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[16px] items-center justify-end pb-[24px] pt-[16px] px-[16px] relative w-full">
          <RightButtons />
        </div>
      </div>
    </div>
  );
}

function ProfileCreationContent1() {
  return (
    <div className="basis-0 bg-[#f6f6f6] content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Profile creation content">
      <ProfileCreationContent />
      <Footer />
    </div>
  );
}

export default function ProfileStep() {
  return (
    <div className="bg-[#f6f6f6] content-stretch flex flex-col items-center relative size-full" data-name="profile step 1">
      <Header />
      <ProfileCreationContent1 />
    </div>
  );
}