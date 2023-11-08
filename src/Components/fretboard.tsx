import FretDraw from "./fretDraw";

export default function Fretboard(): JSX.Element {
  const sampleOutPut: {
    strings: string[];
    topString: number;
    botString: number;
    finalFret: number;
    chosenFret: number[];
  } = {
    strings: ["E", "A", "D", "G", "B", "E"],
    topString: 3,
    botString: 7,
    finalFret: 24,
    chosenFret: [1, 5],
  };

  return (
    <div>
      <FretDraw
        draw={sampleOutPut}
      />
    </div>
  );
}
