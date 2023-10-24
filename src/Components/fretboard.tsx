import React from "react";

export default function Fretboard(): JSX.Element {
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
  const fretboardDefaults: { frets: number; strings: string[] } = {
    frets: 24,
    strings: ["E", "A", "D", "G", "B", "E"],
  };

  const generateFretboard = (fretboardPerams: {
    frets: number;
    strings: string[];
  }): string[][] => {
    const fretboard: string[][] = [];
    for (let i = 0; i < fretboardPerams.strings.length; i++) {
      const string: string[] = [];
      for (let j = 0; j < fretboardPerams.frets; j++) {
        string.push(
          twelveNotes[
            (twelveNotes.indexOf(fretboardPerams.strings[i]) + j) % 12
          ]
        );
      }
      fretboard.push(string);
    }
    return fretboard;
  };

  const fretboard: string[][] = generateFretboard(fretboardDefaults);

  return (
    <div>
      <table className="fretboard-table">
        <tbody>
          {fretboard.map((stringNotes, index) => (
            <tr key={index}>
              {stringNotes.map((note, fretIndex) => (
                <td key={fretIndex}>{note}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}