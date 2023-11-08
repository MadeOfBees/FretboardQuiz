import Chordagram from "./chordagram";

interface rams {
  maxFret: number;
  tuning: string[];
}

export default function fretboard(rams: rams): JSX.Element {
  // const sampleOutput: {
  //   strings: string[];
  //   finalFret: number;
  //   chosenFret: number[];
  // } = {
  //   strings: ["E", "A", "D", "G", "B", "E"],
  //   finalFret: 24,
  //   chosenFret: [1,0]
  // };

  const output: {
    strings: string[];
    finalFret: number;
    chosenFret: number[];
  } = {
    strings: [],
    finalFret: 0,
    chosenFret: []
  };

function pickRandomFret(): number[] {
  const chosenFret: number[] = [];
  const maxFret: number = rams.maxFret;
  const numberOfStrings: number = rams.tuning.length;
  const randomString: number = Math.floor(Math.random() * numberOfStrings) + 1;
  const randomFret: number = Math.floor(Math.random() * maxFret) + 1;
  chosenFret.push(randomString, randomFret);
  return chosenFret;
}

  function setOutput(): void {
    output.strings = rams.tuning;
    output.finalFret = rams.maxFret;
    output.chosenFret = pickRandomFret();
  }

  setOutput();
  
  return (
    <div>
      <Chordagram
        draw={output}
      />
    </div>
  );
}
