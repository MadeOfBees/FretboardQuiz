import FretDraw from "./fretDraw";

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
  const singleDotFret: number[] = [3, 5, 7, 9, 15, 17, 19, 21];
  const doubleDotFret: number[] = [12, 24];

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
      for (let j = 0; j < fretboardPerams.frets + 1; j++) {
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

  const defaultFretboard: string[][] = generateFretboard(fretboardDefaults);

  return (
    <div>
      <h1>Fretboard</h1>
    </div>
  );
}
