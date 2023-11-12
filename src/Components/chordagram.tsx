interface ChordagramProps {
  draw: {
    strings: string[];
    finalFret: number[];
    firstFret: number[];
    chosenFret: number[];
  };
}

export default function Chordagram(props: ChordagramProps): JSX.Element {
  
      function findRange() {
        // first set up our variables
        let range: number[] = [];
        let chosenString = props.draw.chosenFret[0]-1;
        let firstFret = props.draw.firstFret[chosenString];
        let finalFret = props.draw.finalFret[chosenString];
        let chosenFret = props.draw.chosenFret[1];
        // if the chosen fret is 2 frets or less away from the first fret
        if (chosenFret - firstFret <= 2) {
          range.push(firstFret);
          range.push(firstFret + 5);
        }
        // iF the chosen fret is 3 frets or less away from the final fret
        else if (finalFret - chosenFret <= 3) {
          range.push(finalFret - 5);
          range.push(finalFret);
        }
        else {
          range.push(chosenFret - 2);
          range.push(chosenFret + 3);
        }
        // now we return the range
        return range;
      }


  return (
    <div>
      <h1 className="text-2xl text-center">
        Strings: {props.draw.strings}
      </h1>
      <h1 className="text-2xl text-center">
        Chosen Fret: {props.draw.strings[props.draw.chosenFret[0]-1]}-{props.draw.chosenFret[1]}
      </h1>
      <h1 className="text-2xl text-center">
        Range: {findRange()}
      </h1>
    </div>
  );
}