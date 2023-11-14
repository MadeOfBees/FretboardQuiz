interface ChordagramProps {
  draw: {
    strings: string[];
    finalFret: number[];
    firstFret: number[];
    chosenFret: number[];
    orientation: string;
    labelChosenFret: boolean;
  };
}

export default function Chordagram(props: ChordagramProps): JSX.Element {
  const dottedFret: number[] = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
  // Takes a number of units and converts it to vh
  function unitConvert(num: number): string {
    return `${num * 2}vh`;
  }

  function findRange() {
    const { chosenFret, firstFret, finalFret } = props.draw;
    const chosenString = chosenFret[0] - 1;
    const fretDifference = finalFret[chosenString] - firstFret[chosenString];
    let range = [];
    if (fretDifference <= 4) {
      range = [finalFret[chosenString] - 4, finalFret[chosenString]];
    } else if (chosenFret[1] - firstFret[chosenString] <= 2) {
      range = [firstFret[chosenString] + 1, firstFret[chosenString] + 5];
    } else if (finalFret[chosenString] - chosenFret[1] <= 2) {
      range = [finalFret[chosenString] - 4, finalFret[chosenString]];
    } else {
      range = [chosenFret[1] - 2, chosenFret[1] + 2];
    }
    return range;
  }

  // Function to determine the background color of a fret
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

  // Function to create the fret grid
  function createFretGrid() {
    const strings = props.draw.strings;
    const range = findRange();
    const frets: JSX.Element[][] = [];
    if (props.draw.orientation === "vertical") {
      for (let fret = range[0]; fret <= range[1]; fret++) {
        const fretRow: JSX.Element[] = [];
        for (let stringIndex = 0; stringIndex < strings.length; stringIndex++) {
          const color = getFretBG(stringIndex, fret);
          fretRow.push(
            <div
              key={`${stringIndex}-${fret}`}
              style={{
                width: unitConvert(4),
                height: unitConvert(6),
                backgroundColor: color,
                borderTop: `${unitConvert(0.4)} solid black`,
                borderBottom: `${unitConvert(0.4)} solid black`,
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
                    borderLeft: `${unitConvert(0.2)} solid black`,
                  }}
                ></div>
              }
              {/* if this is the chosen fret put a circle in the center */}
              {props.draw.chosenFret[0] - 1 === stringIndex &&
                props.draw.chosenFret[1] === fret && (
                  <div
                    style={{
                      width: unitConvert(3.5),
                      height: unitConvert(3.5),
                      borderRadius: "50%",
                      backgroundColor: "#e38120",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* if labelChosenFret is true, display the fret number in the center */}
                    {props.draw.labelChosenFret && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          width: "100%",
                          fontWeight: "bold",
                          fontSize: unitConvert(2),
                        }}
                      >
                        {fret}
                      </div>
                    )}
                  </div>
                )}
            </div>
          );
        }
        frets.push(fretRow);
      }
      return frets;

      // horozontal layout
    } else {
      for (let stringIndex = 0; stringIndex < strings.length; stringIndex++) {
        const fretRow: JSX.Element[] = [];
        for (let fret = range[0]; fret <= range[1]; fret++) {
          const color = getFretBG(stringIndex, fret);
          fretRow.push(
            <div
              key={`${stringIndex}-${fret}`}
              style={{
                width: unitConvert(6),
                height: unitConvert(4),
                backgroundColor: color,
                borderLeft: `${unitConvert(0.4)} solid black`,
                borderRight: `${unitConvert(0.4)} solid black`,
                position: "relative",
              }}
            >
              {
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    borderTop: `${unitConvert(0.2)} solid black`,
                  }}
                ></div>
              }
              {/* if this is the chosen fret put a circle in the center */}
              {props.draw.chosenFret[0] - 1 === stringIndex &&
                props.draw.chosenFret[1] === fret && (
                  <div
                    style={{
                      width: unitConvert(3.5),
                      height: unitConvert(3.5),
                      borderRadius: "50%",
                      backgroundColor: "#e38120",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* if labelChosenFret is true, display the fret number in the center */}
                    {props.draw.labelChosenFret && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                          width: "100%",
                          fontWeight: "bold",
                          fontSize: unitConvert(2),
                        }}
                      >
                        {fret}
                      </div>
                    )}
                  </div>
                )}
            </div>
          );
        }
        frets.push(fretRow);
      }
      return frets;
    }
  }

  function drawChordagram() {
    const strings = props.draw.strings;
    const fretGrid = createFretGrid();
    let chordagram: JSX.Element;
    if (props.draw.orientation === "vertical") {
      chordagram = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Displaying the string labels */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: unitConvert(0.4),
              marginBottom: unitConvert(0.4),
            }}
          >
            {strings.map((string, index) => (
              <div
                key={index}
                style={{
                  width: unitConvert(4),
                  height: unitConvert(4),
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: unitConvert(2.5),
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
                borderLeft: `${unitConvert(0.4)} solid black`,
              }}
            >
              {row}
              {/* Displaying the fret numbers */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: unitConvert(4),
                  height: unitConvert(6),
                  fontWeight: "bold",
                  fontSize: unitConvert(2.5),
                  borderLeft: `${unitConvert(0.4)} solid black`,
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
    } else {
      // chordagram with horizontal orientation has string labels on left side and fret numbers on top
      const numberOfFrets = 5;
      chordagram = (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Displaying the fret numbers */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: unitConvert(0.4),
                marginBottom: unitConvert(0.4),
              }}
            >
              {Array.from(Array(numberOfFrets).keys()).map((fret, index) => (
                <div
                  key={fret}
                  style={{
                    width: unitConvert(6),
                    height: unitConvert(4),
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: unitConvert(2.5),
                  }}
                >
                  {/* only write number if it shows up in the dottedFret array */}
                  {dottedFret.includes(findRange()[0] + index) &&
                    findRange()[0] + index}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: unitConvert(0.4),
                marginBottom: unitConvert(0.4),
              }}
            ></div>
            <div
              style={{
                marginLeft: unitConvert(0.4),
                borderTop: `${unitConvert(0.4)} solid black`,
                borderBottom: `${unitConvert(0.4)} solid black`,
              }}
            >
              {fretGrid.map((row, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {row}
                </div>
              ))}
            </div>
          </div>
          {/* Displaying the string labels */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: unitConvert(0.4),
              justifyContent: "flex-end",
            }}
          >
            {strings.map((string, index) => (
              <div
                key={index}
                style={{
                  width: unitConvert(4),
                  height: unitConvert(4),
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: unitConvert(2.5),
                }}
              >
                {string}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return chordagram;
  }
  return <div>{drawChordagram()}</div>;
}
