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

  // Takes a number of units and converts it to vh
  function unitConvert(num: number): string {
    return `${num * 2}vh`;
  }

  // Function to find the range of frets to display
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
    for (let fret = range[0]; fret <= range[1] - 1; fret++) {
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
              borderTop: `${unitConvert(.4)} solid black`,
              borderBottom: `${unitConvert(.4)} solid black`,
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
                  borderLeft: `${unitConvert(.2)} solid black`,
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: unitConvert(.4),
            marginBottom: unitConvert(.4)
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
                fontSize: unitConvert(2.5)
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
              borderLeft: `${unitConvert(.4)} solid black`
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
                borderLeft: `${unitConvert(.4)} solid black`
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
