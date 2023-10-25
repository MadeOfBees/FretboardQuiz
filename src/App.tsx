import Fretboard from "./components/fretboard";

function App() {
  return (
    // tailwind centered div vertically and horizontally
    <div className="flex flex-col items-center justify-center h-screen bg-slate-600">
      <Fretboard />
    </div>
  );
}

export default App;
