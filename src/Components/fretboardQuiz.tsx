import Chordagram from "./chordagram";
import { useState, useEffect } from "react";

// Define the interface for the component's props
interface FretboardProps {
  firstFret: number[];
  finalFret: number[];
  tuning: string[];
}

// Fretboard component
export default function Fretboard(props: FretboardProps): JSX.Element {
  // State variables
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
  const [output, setOutput] = useState<{
    strings: string[];
    firstFret: number[];
    finalFret: number[];
    chosenFret: number[];
  }>({
    strings: [],
    firstFret: [],
    finalFret: [],
    chosenFret: [],
  });

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

  // Function to pick a random fret on the user's instrument
  function pickRandomFret(): number[] {
    const fretMatrix: number[][] = [];

    // Create a matrix of all available frets
    for (let i = 0; i < props.tuning.length; i++) {
      const stringFrets: number[] = [];
      for (let j = props.firstFret[i]; j <= props.finalFret[i]; j++) {
        stringFrets.push(j);
      }
      fretMatrix.push(stringFrets);
    }

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

  // Function to update the output state with random fret information
  function updateOutput(): void {
    setOutput({
      strings: props.tuning,
      firstFret: props.firstFret,
      finalFret: props.finalFret,
      chosenFret: pickRandomFret(),
    });
  }

  // Function to decode the chosen fret into a musical note
  function decodeChosenFret(): string {
    let keyOfString: number = twelveNotes.indexOf(
      output.strings[output.chosenFret[0] - 1]
    );
    let chosenFret: number = output.chosenFret[1];
    let note: string = twelveNotes[(keyOfString + chosenFret) % 12];
    return note;
  }

  // Function to check the user's answer against the correct answer
  function checkAnswer(userAnswer: string): boolean {
    let correctAnswer: string = decodeChosenFret();
    if (userAnswer === correctAnswer) {
      return true;
    } else {
      return false;
    }
  }

  // Event handler for input change
  function handleAnswer(event: React.ChangeEvent<HTMLInputElement>): void {
    setUserAnswer(event.target.value);
  }

  // Event handler for form submission
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    checkAnswer(userAnswer);
    setShowCorrectAnswer(true);
  }

  // Initialize the component's state on mount
  useEffect(() => {
    updateOutput();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
      <Chordagram draw={output} />
      {/* spacing div */}
      <div className="h-10" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your answer here"
          onChange={handleAnswer}
        />
        <button type="submit">⠀Submit</button>
      </form>
      {showCorrectAnswer ? (
        <h1 className="text-2xl text-center">
          The correct answer was {decodeChosenFret()} you were{" "}
          {checkAnswer(userAnswer) ? "correct" : "incorrect"}
        </h1>
      ) : (
        <div />
      )}
    </div>
  );
}
