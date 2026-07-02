import svgPaths from "./svg-um4346jcgb";

function ArrowBack() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_back">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_back">
          <mask height="24" id="mask0_130_1064" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1064)">
            <path d={svgPaths.p38ded900} fill="var(--fill-0, #1C1B1F)" id="arrow_back_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center left-0 p-[10px] top-0">
      <ArrowBack />
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Add Job
      </p>
    </div>
  );
}

function ArrowDropDown() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Import from Existing Permit
      </p>
      <FieldInputContainer />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72px] items-center left-[44px] top-[65px] w-[320px]">
      <Frame />
    </div>
  );
}

function FieldInputContainer1() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Job Title
      </p>
      <FieldInputContainer1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField1 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72px] items-center left-[44px] top-[191px] w-[247px]">
      <Frame1 />
    </div>
  );
}

function ArrowDropDown1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer2() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField2() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Job Type
      </p>
      <FieldInputContainer2 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField2 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72px] items-center left-[297px] top-[191px] w-[247px]">
      <Frame2 />
    </div>
  );
}

function ArrowDropDown2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer3() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown2 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField3() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>{` Job Nature`}</p>
      <FieldInputContainer3 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[320px]">
      <FormField3 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="absolute h-[72px] left-[551px] top-[191px] w-[247px]">
      <Frame3 />
    </div>
  );
}

function FieldInputContainer4() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[13px] relative shrink-0 text-[9px] text-black w-[302px]" style={{ fontVariationSettings: "'opsz' 14" }}>
            State the location for which Pilot Cars are not going to receive any payment.
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField4() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Disclaimer
      </p>
      <FieldInputContainer4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[320px]">
      <FormField4 />
    </div>
  );
}

function Frame77() {
  return (
    <div className="absolute h-[72px] left-[883.31px] top-[189px] w-[320px]">
      <Frame5 />
    </div>
  );
}

function Upload() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="upload">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="upload">
          <mask height="24" id="mask0_130_1083" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1083)">
            <path d={svgPaths.p1a103880} fill="var(--fill-0, #1C1B1F)" id="upload_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function UploadButtonContainer() {
  return (
    <div className="content-stretch flex items-center justify-center p-[5px] relative shrink-0 w-[111px]" data-name="Upload Button Container">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[12px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Choose File
      </p>
    </div>
  );
}

function UploadBox() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Upload Box">
      <UploadButtonContainer />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[10px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Drag and drop or click to upload (Max 10 MB, JPG/PNG)
      </p>
    </div>
  );
}

function UploadContainer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Upload Container">
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center px-[221px] py-[15px] relative w-full">
          <Upload />
          <UploadBox />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-dashed inset-[-0.5px] pointer-events-none" />
    </div>
  );
}

function UploadSection() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[154px] items-start left-[44.31px] top-[285px] w-[648px]" data-name="Upload Section">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Freight Image Upload*
      </p>
      <UploadContainer />
    </div>
  );
}

function FieldInputContainer5() {
  return (
    <div className="bg-white h-[114px] relative shrink-0 w-[654px]" data-name="Field Input Container">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField5() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Freight Description
      </p>
      <FieldInputContainer5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col h-[148px] items-start left-[44px] top-[461px] w-[657.695px]">
      <FormField5 />
    </div>
  );
}

function ArrowDropDown3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer6() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown3 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField6() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Commodity Class
      </p>
      <FieldInputContainer6 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField6 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame7 />
    </div>
  );
}

function ArrowDropDown4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer7() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown4 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField7() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Commodity Type
      </p>
      <FieldInputContainer7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField7 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame8 />
    </div>
  );
}

function Frame50() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[44px] top-[631px] w-[657.695px]">
      <Frame42 />
      <Frame34 />
    </div>
  );
}

function FieldInputContainer8() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField8() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Overall Height
      </p>
      <FieldInputContainer8 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField8 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame9 />
    </div>
  );
}

function FieldInputContainer9() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField9() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Overall Width
      </p>
      <FieldInputContainer9 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField9 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-[320px]">
      <Frame10 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame35 />
      <Frame36 />
    </div>
  );
}

function FieldInputContainer10() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField10() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Overall Length
      </p>
      <FieldInputContainer10 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField10 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame11 />
    </div>
  );
}

function FieldInputContainer11() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField11() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Load Weight
      </p>
      <FieldInputContainer11 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField11 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame12 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <Frame37 />
      <Frame38 />
    </div>
  );
}

function FieldInputContainer12() {
  return (
    <div className="bg-white h-[114px] relative shrink-0 w-[654px]" data-name="Field Input Container">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField12() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Special Handling Instructions
      </p>
      <FieldInputContainer12 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col h-[148px] items-start relative shrink-0 w-full">
      <FormField12 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] items-start relative shrink-0 w-full">
      <Frame51 />
      <Frame52 />
      <Frame39 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Load Details
      </p>
      <Frame53 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[36px] p-[10px] top-[739px] w-[676px]">
      <Frame54 />
    </div>
  );
}

function LocationOn() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location_on">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on">
          <mask height="24" id="mask0_130_1068" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1068)">
            <path d={svgPaths.p1179fd00} fill="var(--fill-0, #1C1B1F)" id="location_on_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer13() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <LocationOn />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField13() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        From Location
      </p>
      <FieldInputContainer13 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField13 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame13 />
    </div>
  );
}

function LocationOn1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location_on">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on">
          <mask height="24" id="mask0_130_1068" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1068)">
            <path d={svgPaths.p1179fd00} fill="var(--fill-0, #1C1B1F)" id="location_on_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer14() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <LocationOn1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField14() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        To Location
      </p>
      <FieldInputContainer14 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField14 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame14 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="absolute content-stretch flex gap-[8px] items-center left-[44.31px] top-[1197px] w-[654px]">
      <Frame40 />
      <Frame41 />
    </div>
  );
}

function Radio() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(230, 230, 230, 1)", "--stroke-0": "rgba(44, 44, 44, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Radio">
            <mask fill="white" id="path-1-inside-1_130_1076">
              <path d={svgPaths.p180dff00} />
            </mask>
            <path d={svgPaths.p180dff00} fill="var(--fill-0, #E6E6E6)" />
            <path d={svgPaths.p3837fff0} fill="var(--stroke-0, #2C2C2C)" mask="url(#path-1-inside-1_130_1076)" />
            <circle cx="8" cy="8" fill="var(--fill-0, #1E1E1E)" id="Radio_2" r="5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CheckboxAndLabel() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0 w-[66px]" data-name="Checkbox and Label">
      <Radio />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] w-[85.325px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Yes
      </p>
    </div>
  );
}

function Radio1() {
  return (
    <div className="bg-[#e6e6e6] relative rounded-[9999px] shrink-0 size-[16px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function CheckboxAndLabel1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0" data-name="Checkbox and Label">
      <Radio1 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        No
      </p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[131px]">
      <CheckboxAndLabel />
      <CheckboxAndLabel1 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[44.31px] top-[1279px] w-[179px]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Pre-specified Route?
      </p>
      <Frame27 />
    </div>
  );
}

function LocationOn2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location_on">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="location_on">
          <mask height="24" id="mask0_130_1072" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1072)">
            <path d={svgPaths.p1179fd00} fill="var(--fill-0, white)" id="location_on_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-black content-stretch flex gap-[10px] h-[38px] items-center justify-center left-[44.31px] p-[10px] top-[1342px] w-[152px]" data-name="Button">
      <LocationOn2 />
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Select Route
      </p>
    </div>
  );
}

function FieldInputContainer15() {
  return <div className="absolute bg-white border border-black border-solid h-[138px] left-[44.31px] top-[1424px] w-[654px]" data-name="Field Input Container" />;
}

function Radio2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(230, 230, 230, 1)", "--stroke-0": "rgba(44, 44, 44, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Radio">
            <mask fill="white" id="path-1-inside-1_130_1076">
              <path d={svgPaths.p180dff00} />
            </mask>
            <path d={svgPaths.p180dff00} fill="var(--fill-0, #E6E6E6)" />
            <path d={svgPaths.p3837fff0} fill="var(--stroke-0, #2C2C2C)" mask="url(#path-1-inside-1_130_1076)" />
            <circle cx="8" cy="8" fill="var(--fill-0, #1E1E1E)" id="Radio_2" r="5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CheckboxAndLabel2() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0 w-[66px]" data-name="Checkbox and Label">
      <Radio2 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] w-[85.325px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Yes
      </p>
    </div>
  );
}

function Radio3() {
  return (
    <div className="bg-[#e6e6e6] relative rounded-[9999px] shrink-0 size-[16px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function CheckboxAndLabel3() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0" data-name="Checkbox and Label">
      <Radio3 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        No
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[131px]">
      <CheckboxAndLabel2 />
      <CheckboxAndLabel3 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[209px]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Route Survey Required?
      </p>
      <Frame29 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="absolute content-stretch flex items-start left-[44.31px] top-[1588px]">
      <Frame43 />
    </div>
  );
}

function DateRange() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="date_range">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="date_range">
          <mask height="24" id="mask0_130_1060" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1060)">
            <path d={svgPaths.pc5b0ff0} fill="var(--fill-0, #1C1B1F)" id="date_range_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer16() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <DateRange />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField15() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Travel End Date
      </p>
      <FieldInputContainer16 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField15 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72px] items-center left-[446.31px] top-[1697px] w-[251px]">
      <Frame15 />
    </div>
  );
}

function Radio4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(230, 230, 230, 1)", "--stroke-0": "rgba(44, 44, 44, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Radio">
            <mask fill="white" id="path-1-inside-1_130_1076">
              <path d={svgPaths.p180dff00} />
            </mask>
            <path d={svgPaths.p180dff00} fill="var(--fill-0, #E6E6E6)" />
            <path d={svgPaths.p3837fff0} fill="var(--stroke-0, #2C2C2C)" mask="url(#path-1-inside-1_130_1076)" />
            <circle cx="8" cy="8" fill="var(--fill-0, #1E1E1E)" id="Radio_2" r="5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CheckboxAndLabel4() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0" data-name="Checkbox and Label">
      <Radio4 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] w-[85.325px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Date Range
      </p>
    </div>
  );
}

function Radio5() {
  return (
    <div className="bg-[#e6e6e6] relative rounded-[9999px] shrink-0 size-[16px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function CheckboxAndLabel5() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0" data-name="Checkbox and Label">
      <Radio5 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Fixed Date
      </p>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[9px] items-center relative shrink-0 w-full">
      <CheckboxAndLabel4 />
      <CheckboxAndLabel5 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[229.325px]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Travel Date Type
      </p>
      <Frame46 />
    </div>
  );
}

function DateRange1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="date_range">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="date_range">
          <mask height="24" id="mask0_130_1060" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1060)">
            <path d={svgPaths.pc5b0ff0} fill="var(--fill-0, #1C1B1F)" id="date_range_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer17() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <DateRange1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField16() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Travel Start Date
      </p>
      <FieldInputContainer17 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField16 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[150px]">
      <Frame16 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[17px] items-end relative shrink-0 w-[396px]">
      <Frame47 />
      <Frame48 />
    </div>
  );
}

function Frame58() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5px] items-start left-[44px] top-[1665px]">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] min-w-full relative shrink-0 text-[18px] text-black w-[min-content]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Travel Dates
      </p>
      <Frame57 />
    </div>
  );
}

function Radio6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Radio">
      <div className="absolute inset-0" style={{ "--fill-0": "rgba(230, 230, 230, 1)", "--stroke-0": "rgba(44, 44, 44, 1)" } as React.CSSProperties}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="Radio">
            <mask fill="white" id="path-1-inside-1_130_1076">
              <path d={svgPaths.p180dff00} />
            </mask>
            <path d={svgPaths.p180dff00} fill="var(--fill-0, #E6E6E6)" />
            <path d={svgPaths.p3837fff0} fill="var(--stroke-0, #2C2C2C)" mask="url(#path-1-inside-1_130_1076)" />
            <circle cx="8" cy="8" fill="var(--fill-0, #1E1E1E)" id="Radio_2" r="5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function CheckboxAndLabel6() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0 w-[137px]" data-name="Checkbox and Label">
      <Radio6 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] w-[126.889px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        PC Group Only
      </p>
    </div>
  );
}

function Radio7() {
  return (
    <div className="bg-[#e6e6e6] relative rounded-[9999px] shrink-0 size-[16px]" data-name="Radio">
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

function CheckboxAndLabel7() {
  return (
    <div className="content-stretch flex gap-[12px] h-[19px] items-center relative shrink-0" data-name="Checkbox and Label">
      <Radio7 />
      <p className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1e1e1e] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        All Qualified PCs
      </p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex gap-[17px] items-center relative shrink-0 w-full">
      <CheckboxAndLabel6 />
      <CheckboxAndLabel7 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[303.306px]">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Allotment Preference
      </p>
      <Frame65 />
    </div>
  );
}

function ArrowDropDown5() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer18() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown5 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField17() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Select PC Group
      </p>
      <FieldInputContainer18 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField17 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame17 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="content-stretch flex gap-[14px] items-end relative shrink-0 w-full">
      <Frame66 />
      <Frame73 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[44px] top-[2253px] w-[640.469px]">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Allocation Details
      </p>
      <Frame74 />
    </div>
  );
}

function ArrowDropDown6() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer19() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown6 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField18() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Price Type
      </p>
      <FieldInputContainer19 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField18 />
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame18 />
    </div>
  );
}

function FieldInputContainer20() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField19() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Price Value
      </p>
      <FieldInputContainer20 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField19 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame19 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <Frame60 />
      <Frame61 />
    </div>
  );
}

function FieldInputContainer21() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField20() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Layover Cost
      </p>
      <FieldInputContainer21 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField20 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame20 />
    </div>
  );
}

function FieldInputContainer22() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField21() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Survey Pricing (Flat)
      </p>
      <FieldInputContainer22 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField21 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame22 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <Frame62 />
      <Frame63 />
    </div>
  );
}

function FieldInputContainer23() {
  return (
    <div className="bg-white h-[38px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[38px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField22() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Survey Pricing (Mileage)
      </p>
      <FieldInputContainer23 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField22 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame23 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-full">
      <Frame70 />
      <Frame71 />
      <Frame64 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[44px] top-[1930.54px] w-[653.162px]">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Pricing
      </p>
      <Frame72 />
    </div>
  );
}

function FieldInputContainer24() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="h-[80px] w-full" />
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField23() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Any Additional Conditions for the Pilot Car to Agree To
      </p>
      <FieldInputContainer24 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField23 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="absolute content-stretch flex flex-col h-[72px] items-center left-[44.31px] top-[2377px] w-[637px]">
      <Frame24 />
    </div>
  );
}

function ArrowDropDown7() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer25() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown7 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField24() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        PC Type(s) Required
      </p>
      <FieldInputContainer25 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField24 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame25 />
    </div>
  );
}

function ArrowDropDown8() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_drop_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_drop_down">
          <mask height="24" id="mask0_130_1087" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1087)">
            <path d="M12 15L7 10H17L12 15Z" fill="var(--fill-0, #1C1B1F)" id="arrow_drop_down_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function FieldInputContainer26() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Field Input Container">
      <div className="flex flex-row items-center justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-end px-[9px] py-[7px] relative w-full">
          <ArrowDropDown8 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function FormField25() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] h-[72px] items-start relative shrink-0 w-full" data-name="Form Field">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Number of PCs
      </p>
      <FieldInputContainer26 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <FormField25 />
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-col h-[72px] items-center relative shrink-0 w-[320px]">
      <Frame26 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <Frame44 />
      <Frame59 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] items-start left-[44px] top-[1803px] w-[653.162px]">
      <p className="font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] relative shrink-0 text-[18px] text-black w-full" style={{ fontVariationSettings: "'opsz' 14" }}>
        Pilot Car Requirements
      </p>
      <Frame68 />
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center p-[10px] relative shrink-0 w-[133px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none" />
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Cancel
      </p>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f2f2f2] content-stretch flex items-center justify-center p-[10px] relative shrink-0 w-[133px]" data-name="Button">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-black text-nowrap whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        Save as draft
      </p>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-black content-stretch flex items-center justify-center p-[10px] relative shrink-0 w-[190px]" data-name="Button">
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>
        List Qualified PC
      </p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute content-stretch flex gap-[14px] items-center left-[44px] top-[2507px]">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Add() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="add">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="add">
          <mask height="24" id="mask0_130_1079" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_130_1079)">
            <path d={svgPaths.p2a6e0600} fill="var(--fill-0, white)" id="add_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-black content-stretch flex gap-[10px] h-[38px] items-center justify-center left-[705.31px] p-[10px] top-[1871px] w-[91px]" data-name="Button">
      <Add />
      <p className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] relative shrink-0 text-[18px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'opsz' 14" }}>{`Add `}</p>
    </div>
  );
}

export default function Frame78() {
  return (
    <div className="relative size-full">
      <Frame30 />
      <Frame4 />
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] left-[44px] text-[18px] text-black top-[157px] w-[657.695px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Job Overview
      </p>
      <Frame31 />
      <Frame32 />
      <Frame33 />
      <Frame77 />
      <UploadSection />
      <Frame6 />
      <Frame50 />
      <Frame55 />
      <p className="absolute font-['DM_Sans:Bold',sans-serif] font-bold leading-[24px] left-[44.31px] text-[18px] text-black top-[1163px] w-[654px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Route Information
      </p>
      <Frame56 />
      <Frame28 />
      <Button />
      <p className="absolute font-['DM_Sans:Medium',sans-serif] font-medium leading-[24px] left-[44.31px] text-[18px] text-black top-[1390px] w-[654px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        Driving Direction
      </p>
      <FieldInputContainer15 />
      <Frame45 />
      <Frame49 />
      <Frame58 />
      <Frame75 />
      <Frame76 />
      <Frame67 />
      <Frame69 />
      <Frame21 />
      <Button4 />
      <div className="absolute font-['DM_Sans:Medium',sans-serif] font-medium h-[119px] leading-[24px] left-[61.31px] text-[14px] text-black top-[1434px] w-[592.056px]" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="mb-0">Begin traveling on Road due North</p>
        <p className="mb-0">After 0.355 km turn right onto 92 Avenue due East</p>
        <p className="mb-0">After 0.759 km turn left onto Highway 60 due North</p>
        <p className="mb-0">After 230.907 km continue on 44 Street due East</p>
        <p>Continue for 4.08 km to the exit point</p>
      </div>
    </div>
  );
}