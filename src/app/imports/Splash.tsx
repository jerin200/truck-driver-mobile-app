import svgPaths from "./svg-eawhsxd0ao";
import imgBackgroundImage from "figma:asset/fb4f962093615e3cf7b32715358ad50f0ba641ed.png";
import imgGeneratedImageOctober152025215Pm1 from "figma:asset/a4b9e1b4148701bb4d4711395ad48c1655b07676.png";
import imgGeneratedImageOctober152025215Pm2 from "figma:asset/b5bed63d817092626fc53e42a82bc2fe3d95baa4.png";
import imgMobileBg1 from "figma:asset/470e69abf0cba381154514d73b0febe932913d92.png";
import img8E1D941B65Aae70A5F47074383649296C4Ad55931 from "figma:asset/53221d9fa382526d47dfeba5fd6fdac3a8d01af0.png";
import imgOverwizeLogo4CReverse1 from "figma:asset/301912cdbe5d9dbba0d6e512840a47fd48940f76.png";

function Container() {
  return (
    <div className="bg-white h-[50px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cfcdcd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[50px] items-center px-[16px] py-[12px] relative w-full">
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19.714px] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[16px] w-[183px]">
            <p className="leading-[normal]">jondoe@overwize.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <g clipPath="url(#clip0_1_1896)" id="Remove red eye">
          <g id="Vector"></g>
          <path d={svgPaths.pc087f80} fill="var(--fill-0, #202021)" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1896">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white h-[50px] relative rounded-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#cfcdcd] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[50px] items-center justify-between px-[16px] py-[12px] relative w-full">
          <PasswordDots />
          <RemoveRedEye />
        </div>
      </div>
    </div>
  );
}

function InputFields() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Input Fields">
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="textbox">
        <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[0px] w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] text-[14px]">
            <span>{`Email Address `}</span>
            <span className="text-[red]">*</span>
          </p>
        </div>
        <Container />
      </div>
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="textbox">
        <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[0px] w-full">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[10px] text-[14px]">
            <span className="text-[#202021]">Password</span> <span className="text-[red]">*</span>
          </p>
        </div>
        <Container1 />
      </div>
    </div>
  );
}

function StateLayer() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-0 py-[11px] relative rounded-[100px] shrink-0" data-name="state-layer">
      <div className="relative rounded-[2px] shrink-0 size-[18px]" data-name="container">
        <div aria-hidden="true" className="absolute border-2 border-[#49454f] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
    </div>
  );
}

function RememberMeOption() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Remember Me Option">
      <div className="box-border content-stretch flex flex-col h-[48px] items-center justify-center pl-0 pr-[12px] py-[4px] relative shrink-0" data-name="Checkboxes">
        <StateLayer />
      </div>
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[16px] text-nowrap">
        <p className="leading-[10px] whitespace-pre">Remember me</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Options">
      <RememberMeOption />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-blue-600 text-nowrap">
        <p className="leading-[10px] whitespace-pre">Forgot Password</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[19px] items-start relative shrink-0 w-full" data-name="Container">
      <InputFields />
      <Options />
      <div className="bg-[#f89823] relative rounded-[8px] shrink-0 w-full" data-name="button">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="box-border content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[14px] relative w-full">
            <div className="capitalize flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#1a1a1a] text-[17px] text-nowrap">
              <p className="leading-[normal] whitespace-pre">Sign in</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Poppins:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0b1215] text-[0px] text-center w-full">
        <p className="text-[16px] whitespace-pre-wrap">
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[35px] text-black">{`Don't have an account?`}</span>
          <span className="font-['Inter:Medium',sans-serif] font-medium leading-[10px]"> </span>
          <span className="font-['Inter:Bold',sans-serif] font-bold leading-[10px] text-blue-600">Create account</span>
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] h-[483px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[32px] not-italic relative shrink-0 text-[0px] text-black text-center w-[397px]">
        <p className="mb-0 text-[22px]">Sign in</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal text-[16px]">Enter your credentials to proceed with your account.</p>
      </div>
      <Container2 />
    </div>
  );
}

function Signin() {
  return (
    <div className="bg-white relative rounded-tl-[20px] rounded-tr-[20px] shrink-0 w-full" data-name="signin">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-center justify-center pb-[56px] pt-[48px] px-[24px] relative w-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function ScreenContent() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[10px] h-[956px] items-center justify-end left-0 overflow-clip pb-0 pt-[56px] px-0 top-0 w-[450px]" data-name="screen content">
      <Signin />
    </div>
  );
}

export default function Splash() {
  return (
    <button className="bg-[#f6f6f6] block cursor-pointer relative size-full" data-name="Splash">
      <div className="absolute left-[-66px] size-[962px] top-[-3px]" data-name="Background image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBackgroundImage} />
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(217,217,217,0)] h-[956px] left-0 to-[#000000] to-[63.942%] top-0 via-[53.365%] via-[rgba(0,0,0,0.482)] w-[450px]" data-name="Background" />
      <div className="absolute left-[-120px] size-[956px] top-0" data-name="Generated Image October 15, 2025 - 2_15PM 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgGeneratedImageOctober152025215Pm1} />
      </div>
      <div className="absolute left-[-120px] size-[956px] top-0" data-name="Generated Image October 15, 2025 - 2_15PM 2">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgGeneratedImageOctober152025215Pm2} />
      </div>
      <div className="absolute left-[-140px] size-[1024px] top-0" data-name="mobile BG 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMobileBg1} />
      </div>
      <div className="absolute left-[-517px] size-[1430px] top-[-177px]" data-name="8e1d941b65aae70a5f47074383649296c4ad5593 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img8E1D941B65Aae70A5F47074383649296C4Ad55931} />
      </div>
      <div className="absolute bg-gradient-to-t from-50% from-[rgba(0,0,0,0)] h-[956px] left-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] to-[rgba(0,0,0,0.6)] top-0 w-[450px]" data-name="Background" />
      <div className="absolute h-[956px] left-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-0 w-[450px]" data-name="Background" />
      <div className="absolute h-[95px] left-1/2 top-[69px] translate-x-[-50%] w-[142px]" data-name="Overwize-logo-4C-reverse 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgOverwizeLogo4CReverse1} />
      </div>
      <ScreenContent />
    </button>
  );
}