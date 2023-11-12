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

  function getFretBG(stringIndex: number, fret: number): string {
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
        const color = getFretBG(stringIndex, fret);
        fretRow.push(
          <div
            key={`${stringIndex}-${fret}`}
            style={{
              width: "4.0vh",
              height: "6.0vh",
              backgroundColor: color,
              borderTop: ".4vh solid black",
              borderBottom: ".4vh solid black",
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
                  borderLeft: ".2vh solid black",
                }}
              ></div>
            }
            {/* if this is the chosen fret put a circle in the center */}
            {props.draw.chosenFret[0] - 1 === stringIndex &&
              props.draw.chosenFret[1] === fret && (
                <div
                  style={{
                    width: "3.0vh",
                    height: "3.0vh",
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
          <div style={{ display: "flex", flexDirection: "row", marginLeft: ".4vh", marginBottom: ".4vh"}}>
            {strings.map((string, index) => (
              <div
                key={index}
                style={{
                  width: "4.0vh",
                  height: "4.0vh",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "3vh",
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
                borderLeft: ".4vh solid black",
              }}
            >
              {row}
              {/* Displaying the fret numbers */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "4.0vh",
                  height: "6.0vh",
                  fontWeight: "bold",
                  fontSize: "3vh",
                  borderLeft: ".4vh solid black",
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
