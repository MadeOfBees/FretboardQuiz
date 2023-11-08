import FretDraw from "./fretDraw";

interface rams {
  maxFret: number;
  tuning: string[];
}

export default function fretboard(rams: rams): JSX.Element {
  const output: {
    strings: string[];
    finalFret: number;
    chosenFret: number[];
  } = {
    strings: [],
    finalFret: 0,
    chosenFret: []
  };

// Function that picks a random fret number within the possible fret range
function pickRandomFret(): number[] {
  // A blank array to store the chosen random string and fret
  const chosenFret: number[] = [];
  // The maximum fret number from the rams object
  const maxFret: number = rams.maxFret;
  // Determining the number of strings in the guitar tuning
  const numberOfStrings: number = rams.tuning.length;
  // Generating a random number to select a random guitar string
  const randomString: number = Math.floor(Math.random() * numberOfStrings) + 1;
  // Generating a random fret within the maximum fret limit
  const randomFret: number = Math.floor(Math.random() * maxFret) + 1;
  // Adding the randomly chosen string and fret to the chosenFret array
  chosenFret.push(randomString, randomFret);
  // Returning the array containing the random string and fret on said string as an array of 2 numbers
  return chosenFret;
}


  // function setOutput sets the output object to the desired values
  function setOutput(): void {
    output.strings = rams.tuning;
    output.finalFret = rams.maxFret;
    output.chosenFret = pickRandomFret();
  }

  // Calling the setOutput function
  setOutput();
  
  return (
    <div>
      <FretDraw
        draw={output}
      />
    </div>
  );
}
