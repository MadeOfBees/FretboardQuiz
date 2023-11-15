import { useState, useEffect  } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Chordagram from "./chordagram";
import NoteSelect from "./noteSelect";

// Define the interface for the component's props
interface FretboardProps {
  firstFret: number[];
  finalFret: number[];
  tuning: string[];
  orientation: string;
  labelChosenFret: boolean;
}

// Fretboard component
export default function Fretboard(props: FretboardProps): JSX.Element {
  // State variables
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean>(false);

  const [output, setOutput] = useState<{
    strings: string[];
    firstFret: number[];
    finalFret: number[];
    chosenFret: number[];
    orientation: string;
    labelChosenFret: boolean;
  }>({
    strings: [],
    firstFret: [],
    finalFret: [],
    chosenFret: [],
    orientation: "",
    labelChosenFret: false,
  });
  let [isOpen, setIsOpen] = useState(false);

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

  const handleNoteClick = (note: string) => {
    setUserAnswer(note);
    setIsOpen(false);
  };

  function QuizModal(): JSX.Element {
    return (
      <Transition
        // Show or hide the component based on the isOpen prop
        show={isOpen}
        // Configuration for entering the transition
        enter="transition duration-100 ease-out" // Set the entering transition duration and easing
        enterFrom="transform scale-95 opacity-0" // Initial state when entering (scaled down and transparent)
        enterTo="transform scale-100 opacity-100" // Final state when entering (full scale and opaque)
        // Configuration for leaving the transition
        leave="transition duration-75 ease-out" // Set the leaving transition duration and easing
        leaveFrom="transform scale-100 opacity-100" // Initial state when leaving (full scale and opaque)
        leaveTo="transform scale-95 opacity-0" // Final state when leaving (scaled down and transparent)
      >
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} tabIndex={0}>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Blurred background */}
            <div className="relative backdrop-filter backdrop-blur-md bg-white p-8">
              <Dialog.Panel style={{ height: "50vh", width: "50vh" }}>
                {/* noteSelect */}
                <NoteSelect handleNoteClick={handleNoteClick} />
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }

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
    if (props.orientation !== "horizontal-reverse") {
      setOutput({
        strings: props.tuning,
        firstFret: props.firstFret,
        finalFret: props.finalFret,
        chosenFret: pickRandomFret(),
        orientation: props.orientation,
        labelChosenFret: props.labelChosenFret,
      });
    } else {
      setOutput({
        strings: [...props.tuning].reverse(),
        firstFret: [...props.firstFret].reverse(),
        finalFret: [...props.finalFret].reverse(),
        chosenFret: pickRandomFret(),
        orientation: props.orientation,
        labelChosenFret: props.labelChosenFret,
      });
    }
  }

  //  Function to decode the chosen fret into a musical note
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

  // Initialize the component's state on mount
  useEffect(() => {
    updateOutput();
  }, []);

  // when userAnswer changes, check if it's correct
  useEffect(() => {
    if (checkAnswer(userAnswer)) {
      setAnswerIsCorrect(true);
    } else {
      setAnswerIsCorrect(false);
    }
  }, [userAnswer]);

  return (
    <div
      className="flex flex-col items-center bg-slate-600"
      onClick={() => setIsOpen(true)}
    >
      {/* h1 with vh 20 text */}
      <h1 className="text-6xl text-center text-white pt-10 pb-10">
        Fretboard Quiz!
      </h1>
      {/* Chordagram */}
      <Chordagram draw={output} />
      <QuizModal />
      {/* if there's a userAnswer  display if it was right or not  */}
      {userAnswer ? (
        <h1 className="text-6xl text-center text-white pt-10 pb-10">
          {answerIsCorrect ? "Correct!" : "Incorrect!"}
        </h1>
      ) : null}
    </div>
  );
}
