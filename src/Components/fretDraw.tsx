interface FretDrawProps {
  draw: {
    strings: string[];
    finalFret: number;
    chosenFret: number[];
  };
}

export default function FretDraw(props: FretDrawProps): JSX.Element {
  const twelveNotes: string[] = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];

  // TEMP
  console.log(twelveNotes)
  // TEMP

  return (
    <div>
      <h1 className="text-2xl text-center">
        Strings: {props.draw.strings}
      </h1>
      <h1 className="text-2xl text-center">
        Final Fret: {props.draw.finalFret}
      </h1>
      <h1 className="text-2xl text-center">
        Chosen Fret: {props.draw.strings[props.draw.chosenFret[0]-1]}-{props.draw.chosenFret[1]}
      </h1>
    </div>
  );
}