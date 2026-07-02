import imgMapImage from "figma:asset/1f5cbd94e64bd6468d47d611846ed0c8a6eaf1a1.png";

export default function MapContainer() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end relative size-full" data-name="Map Container">
      <div className="absolute h-[433px] left-0 top-[-130px] w-[477px]" data-name="Map Image">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgMapImage} />
      </div>
    </div>
  );
}