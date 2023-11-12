interface ChordagramProps {
  draw: {
    strings: string[];
    finalFret: number[];
    firstFret: number[];
    chosenFret: number[];
  };
}

export default function Chordagram(props: ChordagramProps): JSX.Element {
  const dottedFret: number[] = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
  function findRange() {
    let range: number[] = [];
    let chosenString = props.draw.chosenFret[0] - 1;
    let firstFret = props.draw.firstFret[chosenString];
    let finalFret = props.draw.finalFret[chosenString];
    let chosenFret = props.draw.chosenFret[1];

    if (chosenFret - firstFret <= 2) {
      range.push(firstFret+1);
      range.push(firstFret + 6);
    }else if (finalFret - chosenFret <= 2) {
      range.push(finalFret - 4);
      range.push(finalFret + 1);
    } else {
      range.push(chosenFret - 2);
      range.push(chosenFret + 3);
    }

    return range;
  }

  function getFretColor(stringIndex: number, fret: number): string {
    const { chosenFret } = props.draw;
    const chosenString = chosenFret[0] - 1;

    if (stringIndex === chosenString && fret === chosenFret[1]) {
      return "blue";
    } else if (fret < props.draw.firstFret[stringIndex] || fret > props.draw.finalFret[stringIndex]) {
      return "grey";
    } else {
      return "white"
    }
  }

  function createFretGrid() {
    const strings = props.draw.strings;
    const range = findRange();
    const frets: JSX.Element[][] = [];
  
    for (let fret = range[0]; fret <= range[1] - 1; fret++) {
      const fretRow: JSX.Element[] = [];
  
      for (let stringIndex = 0; stringIndex < strings.length; stringIndex++) {
        const color = getFretColor(stringIndex, fret);
        const isGrey = color === "grey";
  
        fretRow.push(
          <div
            key={`${stringIndex}-${fret}`}
            style={{
              width: "40px",
              height: "60px",
              backgroundColor: color,
              borderTop: "3px solid black",
              borderBottom: "3px solid black",
              borderLeft: isGrey ? "2px solid grey" : "",
              borderRight: isGrey ? "2px solid grey" : "",
              position: "relative",
            }}
          >
            {!isGrey && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  borderLeft: "2px solid black",
                }}
              ></div>
            )}
          </div>
        );
      }
  
      frets.push(fretRow);
    }
    return frets;
  }
  
  

  function drawChordagram() {
    const strings = props.draw.strings;
    const fretGrid = createFretGrid();
    console.log(props.draw.chosenFret);
    const chordagram = (
      <div>
        <div style={{ display: "flex", flexDirection: "column"}}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {strings.map((string, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                {string}
              </div>
            ))}
          </div>
          {fretGrid.map((row, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "row", borderLeft: "3px solid black" }}>
              {row}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "60px",
                  fontWeight: "bold",
                  borderLeft: "3px solid black",
                }}
              >
                {dottedFret.includes(findRange()[0] + index) &&
                  findRange()[0] + index}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="flex flex-col">
        {chordagram}
      </div>
    );
  }

  return (
    <div>
      {drawChordagram()}
    </div>
  );
}
