import { useState, useEffect } from "react";

interface NoteSelectProps {
  handleNoteClick: (note: string) => void;
}

export default function NoteSelect(props: NoteSelectProps): JSX.Element {
  const buttonArray: string[] = ["A", "B", "C", "D", "E", "F", "G"];
  const sharpFlatArray: string[] = ["⠀", "#", "b"];
  const [currentNote, setCurrentNote] = useState<string>("A");
  const [sharpFlat, setSharpFlat] = useState<string>("⠀");
  const [pNote, setPNote] = useState<string>("A");

  const convertFlatToSharp = (note: string): string => {
    switch (note) {
      case "A":
        return "G#";
      case "B":
        return "A#";
      case "C":
        return "B";
      case "D":
        return "C#";
      case "E":
        return "D#";
      case "F":
        return "E";
      case "G":
        return "F#";
      default:
        return "error";
    }
  };

  const addNoteTogether = (note: string, sharpFlat: string): string => {
    switch (sharpFlat) {
      case "b":
        setPNote(convertFlatToSharp(note));
        console.log(convertFlatToSharp(note));
        return convertFlatToSharp(note);
      case "⠀":
        setPNote(note);
        console.log(note);
        return note;
      default:
        setPNote(note + "#");
        console.log(note + "#");
        return note + "#";
    }
  };

  //   every time currentNote or sharpFlat changes, update pNote
  useEffect(() => {
    addNoteTogether(currentNote, sharpFlat);
  }, [currentNote, sharpFlat]);

  const verticalCarousel = (arrayType: string[]): JSX.Element => {
    return (
      <div className="flex flex-col">
        {arrayType.map((input: string, index: number) => (
          <button
            className="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-700"
            key={index}
            onClick={() => {
              if (arrayType === sharpFlatArray) {
                setSharpFlat(input);
              } else {
                setCurrentNote(input);
              }
            }}
          >
            {input}
          </button>
        ))}
      </div>
    );
  };

  return (
    // two vertical carousels side by side, first one is notes, second one is sharp/flat
    <div className="flex flex-row">
      {verticalCarousel(buttonArray)}
      {verticalCarousel(sharpFlatArray)}
      {pNote}
      {/* submit button */}
      <button
        className="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-700"
        onClick={() => props.handleNoteClick(pNote)}
      >
        Submit
      </button>
    </div>
  );
}
