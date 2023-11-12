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
      range.push(firstFret + 1);
      range.push(firstFret + 6);
    } else if (finalFret - chosenFret <= 2) {
      range.push(finalFret - 4);
      range.push(finalFret + 1);
    } else {
      range.push(chosenFret - 2);
      range.push(chosenFret + 3);
    }
    return range;
  }

  function getFretType(stringIndex: number, fret: number): string {
    if (
      fret < props.draw.firstFret[stringIndex] ||
      fret > props.draw.finalFret[stringIndex]
    ) {
      return "grey";
    } else {
      return "#473534";
    }
  }

  function createFretGrid() {
    const strings = props.draw.strings;
    const range = findRange();
    const frets: JSX.Element[][] = [];
    for (let fret = range[0]; fret <= range[1] - 1; fret++) {
      const fretRow: JSX.Element[] = [];
      for (let stringIndex = 0; stringIndex < strings.length; stringIndex++) {
        const color = getFretType(stringIndex, fret);
        fretRow.push(
          <div
            key={`${stringIndex}-${fret}`}
            style={{
              width: "40px",
              height: "60px",
              backgroundColor: color,
              borderTop: "3px solid black",
              borderBottom: "3px solid black",
              position: "relative",
            }}
          >
            {
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: "50%",
                  borderLeft: "2px solid black",
                }}
              ></div>
            }
            {/* if this is the chosen fret put a circle in the center */}
            {props.draw.chosenFret[0] - 1 === stringIndex &&
              props.draw.chosenFret[1] === fret && (
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "#e38120",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
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
    const chordagram = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Displaying the string labels */}
          <div style={{ display: "flex", flexDirection: "row", marginLeft: "4px" }}>
            {strings.map((string, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {string}
              </div>
            ))}
          </div>
          {/* Displaying the frets */}
          {fretGrid.map((row, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                borderLeft: "4px solid black",
              }}
            >
              {row}
              {/* Displaying the fret numbers */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40px",
                  height: "60px",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  borderLeft: "4px solid black",
                }}
              >
                {/* Displaying the fret number only if it's in the dottedFret array */}
                {dottedFret.includes(findRange()[0] + index) &&
                  findRange()[0] + index}
              </div>
            </div>
          ))}
        </div>
    );
    // Wrapping the chordagram in a container div
    return <div className="flex flex-col">{chordagram}</div>;
  }

  return <div>{drawChordagram()}</div>;
}
