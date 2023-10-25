import zeroFret from"../fretBGs/zFret.png";
import twelveFret from "../fretBGs/midFret.png";
import defaultFret from "../fretBGs/defFret.png";
import noLeftFret from "../fretBGs/defFret.png";

interface Props {
  note: string;
  fret: number;
}

export default function FretDraw(props: Props): JSX.Element {
  const { note, fret } = props;

  let bgPlate: string;
  if (fret == 0) {
    bgPlate = zeroFret;
  } else if (fret == 1) {
    bgPlate = noLeftFret;
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
    </div>
  );
}
