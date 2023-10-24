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

  const defaultFretboard: string[][] = generateFretboard(fretboardDefaults);

  console.log(defaultFretboard);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
     <h1>Fretboard:</h1>

    </div>
  );
}