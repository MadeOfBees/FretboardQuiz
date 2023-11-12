import Fretboard from "./components/fretboardQuiz";

export default function App() {
  const firstFret: number[] = [0, 0, 0, 0, 0, 0]; // Default first frets for the instrument
  const finalFret: number[] = [24, 24, 24, 24, 24, 24]; // Default last frets for the instrument
  const tuning: string[] = ["E", "A", "D", "G", "B", "E"]; // Default tuning for the instrument

  // GARBAGE DATA
  // const tuning: string[] = ["E", "A", "D", "G", "B", "E", "A", "D", "G", "B", "E", "A"];
  // const finalFret: number[] = [21, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24]; 
  // const firstFret: number[] = [12, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0];
  // GARBAGE DATA

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
      <Fretboard
        firstFret={firstFret} // Passing the firstFret property to Fretboard component
        finalFret={finalFret} // Passing the finalFret property to Fretboard component
        tuning={tuning} // Passing the tuning property to Fretboard component
      />
    </div>
  );
}
