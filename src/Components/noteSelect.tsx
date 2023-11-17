import { useState, useEffect } from "react";
import verticalCarousel from "./verticalCarousel";

interface NoteSelectProps {
  handleNoteClick: (note: string) => void;
}

export default function NoteSelect(props: NoteSelectProps): JSX.Element {
  const buttonArray: string[] = ["A", "B", "C", "D", "E", "F", "G"];
  const sharpFlatArray: string[] = ["⠀", "#", "b"];
  const [currentNote, setCurrentNote] = useState<string>("A");
  const [sharpFlat, setSharpFlat] = useState<string>("⠀");
  const [outputNote, setoutputNote] = useState<string>("A");
  const [altDisplayNote, setAltDisplayNote] = useState<string>("A");

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

  const convertSharpToFlat = (note: string): string => {
    switch (note) {
      case "A":
        return "Bb";
      case "B":
        return "C";
      case "C":
        return "Db";
      case "D":
        return "Eb";
      case "E":
        return "F";
      case "F":
        return "Gb";
      case "G":
        return "Ab";
      default:
        return "error";
    }
  };

  const addNoteTogetherForDisplay = (
    note: string,
    sharpFlat: string
  ): string => {
    switch (sharpFlat) {
      case "b":
        setAltDisplayNote(convertFlatToSharp(note));
        return convertFlatToSharp(note);
      case "#":
        setAltDisplayNote(convertSharpToFlat(note));
        return convertSharpToFlat(note);
      default:
        setAltDisplayNote(note);
        return note;
    }
  };

  const addNoteTogetherForOutput = (
    note: string,
    sharpFlat: string
  ): string => {
    switch (sharpFlat) {
      case "⠀":
        setoutputNote(note);
        return note;
      case "b":
        setoutputNote(convertFlatToSharp(note));
        return convertFlatToSharp(note);
      default:
        setoutputNote(note + "#");
        return note + "#";
    }
  };

  useEffect(() => {
    addNoteTogetherForDisplay(currentNote, sharpFlat);
    addNoteTogetherForOutput(currentNote, sharpFlat);
  }, [currentNote, sharpFlat]);

  return (
    <div className="flex flex-row">
      {verticalCarousel({
        arrayType: buttonArray,
        setSharpFlat: setSharpFlat,
        setCurrentNote: setCurrentNote,
        sharpFlatArray: sharpFlatArray,
      })}
      {verticalCarousel({
        arrayType: sharpFlatArray,
        setSharpFlat: setSharpFlat,
        setCurrentNote: setCurrentNote,
        sharpFlatArray: sharpFlatArray,
      })}
      {currentNote}
      {sharpFlat}
      {currentNote !== altDisplayNote ? `(${altDisplayNote})` : null}
      <button
        className="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-700"
        onClick={() => props.handleNoteClick(outputNote)}
      >
        Submit
      </button>
    </div>
  );
}
