import Chordagram from "./chordagram";
import { useState, useEffect } from "react";

interface rams {
  firstFret: number[];
  finalFret: number[];
  tuning: string[];
}

export default function fretboard(rams: rams): JSX.Element {
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
    for (let i = 0; i < rams.tuning.length; i++) {
      const stringFrets: number[] = [];
      for (let j = rams.firstFret[i]; j <= rams.finalFret[i]; j++) {
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

  function makeOutput(): void {
    setOutput({
      strings: rams.tuning,
      firstFret: rams.firstFret,
      finalFret: rams.finalFret,
      chosenFret: pickRandomFret(),
    });
  }

  function decodeChosenFret(): string {
    let keyOfString: number = twelveNotes.indexOf(
      output.strings[output.chosenFret[0] - 1]
    );
    let chosenFret: number = output.chosenFret[1];
    let note: string = twelveNotes[(keyOfString + chosenFret) % 12];
    return note;
  }

  // function checkAnswer() checks the user's answer against the correct answer, if the user is correct, it returns/consoles true, if the user is incorrect, it returns/consoles false
  function checkAnswer(userAnswer: string): boolean {
    let correctAnswer: string = decodeChosenFret();
    if (userAnswer === correctAnswer) {
      console.log("Correct!");
      return true;
    } else {
      console.log("Incorrect!");
      return false;
    }
  }

  // function handleAnswer() handles the user's answer by setting the user's answer to the value of the input field
  function handleAnswer(event: React.ChangeEvent<HTMLInputElement>): void {
    setUserAnswer(event.target.value);
  }

  // function handleSubmit() handles the user's submission of their answer by calling the checkAnswer() function
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    checkAnswer(userAnswer);
    setShowCorrectAnswer(true);
  }

  // useEffect() is a React hook that runs when the component is mounted
  useEffect(() => {
    makeOutput();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
      <Chordagram draw={output} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your answer here"
          onChange={handleAnswer}
        />
        <button type="submit">Submit</button>
      </form>
      {showCorrectAnswer ? (
        <h1 className="text-2xl text-center">
          The correct answer was {decodeChosenFret()} you were {checkAnswer(userAnswer) ? "correct" : "incorrect"}
        </h1>
      ) : <div />}

    </div>
  );
}
