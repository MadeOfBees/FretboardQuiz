import Chordagram from "./chordagram";

interface rams {
  firstFret: number[];
  finalFret: number[];
  tuning: string[];
}

export default function fretboard(rams: rams): JSX.Element {
  const output: {
    strings: string[];
    firstFret: number[];
    finalFret: number[];
    chosenFret: number[];
  } = {
    strings: [],
    firstFret: [],
    finalFret: [],
    chosenFret: [],
  };

  // Function to pick a random fret on the user's instrument
  function pickRandomFret(): number[] {
    const fretMatrix: number[][] = [];
    // Create a matrix of all available frets
    for (let i = 0; i < rams.tuning.length; i++) {
      const stringFrets: number[] = [];
      for (let j = rams.firstFret[i]; j <= rams.finalFret[i]; j++) {
        stringFrets.push(j);
      }
      fretMatrix.push(stringFrets);
    }
    console.log(fretMatrix);

    // Pick a random string that has available frets
    let randomStringIndex: number;
    do {
      randomStringIndex = Math.floor(Math.random() * fretMatrix.length);
    } while (fretMatrix[randomStringIndex].length === 0);

    // Pick a random fret valid fret on the chosen string
    let randomFretIndex: number;

    // Keep generating a random fret index until it's non-zero
    while (
      (randomFretIndex = Math.floor(
        Math.random() * fretMatrix[randomStringIndex].length
      )) === 0
    );

    // Form an array representing the chosen fret [stringIndex, fretIndex]
    const chosenFret = [
      randomStringIndex + 1,
      fretMatrix[randomStringIndex][randomFretIndex],
    ];

    return chosenFret;
  }

  function setOutput(): void {
    output.strings = rams.tuning;
    output.firstFret = rams.firstFret;
    output.finalFret = rams.finalFret;
    output.chosenFret = pickRandomFret();
  }

  setOutput();

  return (
    <div>
      <Chordagram draw={output} />
    </div>
  );
}
