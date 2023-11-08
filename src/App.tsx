import Fretboard from "./components/fretboardQuiz";

export default function App() {

const maxFret: number = 24; // Default maximum fret for the instrument
const tuning: string[] = ["E", "A", "D", "G", "B", "E"]; // Default tuning for the instrument

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
      <Fretboard
        maxFret={maxFret} // Passing the maxFret property to Fretboard component
        tuning={tuning}   // Passing the tuning property to Fretboard component
      />
    </div>
  );
}