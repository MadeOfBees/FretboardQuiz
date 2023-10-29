import boDot from"../fretBGs/boDot.png";
import boDotLast from"../fretBGs/boDotLast.png";
import botDot from"../fretBGs/botDot.png";
import botDotLast from"../fretBGs/botDotLast.png";
import defFret from"../fretBGs/defFret.png";
import defFretLast from"../fretBGs/defFretLast.png";
import midFret from"../fretBGs/midFret.png";
import midFretLast from"../fretBGs/midFretLast.png";
import noLeftFret from"../fretBGs/noLeftFret.png";
import topDot from"../fretBGs/topDot.png";
import zFret from"../fretBGs/zFret.png";

interface Props {
  note: string;
  fret: number;
}

export default function FretDraw(props: Props): JSX.Element {
  const { note, fret } = props;
  let bgPlate: string;
  if (fret == 0) {
    bgPlate = zFret;
  } else if (fret == 1) {
    bgPlate = noLeftFret;
  } else {
    bgPlate = defFret
  }

  return (
    <div
      className="flex justify-center items-center h-12 w-12 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bgPlate})`,
      }}
    >
      <div className={note} />
    </div>
  );
}
