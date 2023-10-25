import zeroFret from"../fretBGs/zeroFret.png";
import twelveFret from "../fretBGs/twelveFret.png";
import defaultFret from "../fretBGs/fret.png";

interface Props {
  note: string;
  fret: number;
}

export default function FretDraw(props: Props): JSX.Element {
  const { note, fret } = props;

  let bgPlate: string;
  if (fret == 0) {
    bgPlate = zeroFret;
  } else if (fret % 12 == 0) {
    bgPlate = twelveFret;
  } else {
    bgPlate = defaultFret
  }

  return (
    <div
      className="flex justify-center items-center h-12 w-12 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgPlate})`,
      }}
    >
      <div className="text-black">{note}</div>
    </div>
  );
}
