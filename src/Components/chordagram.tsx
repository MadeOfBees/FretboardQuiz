interface ChordagramProps {
  draw: {
    strings: string[];
    finalFret: number;
    chosenFret: number[];
  };
}

export default function Chordagram(props: ChordagramProps): JSX.Element {
      function findRange() {
        let range: number[] = [];
        let finalFret = props.draw.finalFret;
        let chosenFret = props.draw.chosenFret[1];
        if (chosenFret <= 3) {
          range = [0, 6];
        }
        else if (chosenFret >= finalFret-3 && chosenFret <= finalFret) {
          range = [finalFret-6, finalFret];
        }
        else {
          range = [chosenFret-3, chosenFret+3];
        }
        return range;
      }

      console.log(findRange()[1]-findRange()[0]);

  return (
    <div>
      <h1 className="text-2xl text-center">
        Strings: {props.draw.strings}
      </h1>
      <h1 className="text-2xl text-center">
        Final Fret: {props.draw.finalFret}
      </h1>
      <h1 className="text-2xl text-center">
        Chosen Fret: {props.draw.strings[props.draw.chosenFret[0]-1]}-{props.draw.chosenFret[1]}
      </h1>
    </div>
  );
}