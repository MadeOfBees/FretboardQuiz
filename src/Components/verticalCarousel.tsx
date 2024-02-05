import { useState } from "react";

interface verticalCarouselProps {
  givenArray: string[];
  setSharpFlat: (input: string) => void;
  sharpFlat: string;
  setCurrentNote: (input: string) => void;
  currentNote: string;
}

export default function verticalCarousel(
  props: verticalCarouselProps
): JSX.Element {
  const { givenArray, setSharpFlat, setCurrentNote } = props;
  const arrayType: string =
    givenArray.length > 4 ? "buttonArray" : "sharpFlatArray";
  const [currentDisplay, setCurrentDisplay] = useState<string[]>([
    givenArray[givenArray.length - 2],
    givenArray[givenArray.length - 1],
    givenArray[0],
    givenArray[1],
    givenArray[2],
  ]);

  function handleClick(input: string) {
    if (arrayType === "buttonArray") {
      setCurrentNote(input);
    } else {
      setSharpFlat(input);
    }
  }

  // Function to shift characters down in the array
  function shiftCharsDown() {
    const lastIndex = givenArray.indexOf(currentDisplay[1]);

    // If the second element is at the beginning of the array
    if (lastIndex === 0) {
      setCurrentDisplay([
        givenArray[givenArray.length - 2],
        givenArray[givenArray.length - 1],
        givenArray[0],
        givenArray[1],
        givenArray[2],
      ]);
    }
    // If the second element is at the end of the array
    else if (lastIndex === givenArray.length - 1) {
      setCurrentDisplay([
        givenArray[givenArray.length - 3],
        givenArray[givenArray.length - 2],
        givenArray[givenArray.length - 1],
        givenArray[0],
        givenArray[1],
      ]);
    }
    // If the second element is in the middle of the array
    else {
      setCurrentDisplay([
        givenArray[lastIndex - 2],
        givenArray[lastIndex - 1],
        givenArray[lastIndex],
        givenArray[lastIndex + 1],
        givenArray[lastIndex + 2],
      ]);
    }

    // Trigger a click event with the second element in the new display
    handleClick(currentDisplay[1]);
  }

  function shiftCharsUp() {
    const nextIndex = givenArray.indexOf(currentDisplay[3]);
    // if the second element is at the end of the array
    if (nextIndex === givenArray.length - 1) {
      setCurrentDisplay([
        givenArray[givenArray.length - 3],
        givenArray[givenArray.length - 2],
        givenArray[givenArray.length - 1],
        givenArray[0],
        givenArray[1],
      ]);
      // else if the second element is at the beginning of the array
    } else if (nextIndex === 0) {
      setCurrentDisplay([
        givenArray[givenArray.length - 2],
        givenArray[givenArray.length - 1],
        givenArray[0],
        givenArray[1],
        givenArray[2],
      ]);
      // else if the second element is in the middle of the array
    } else {
      setCurrentDisplay([
        givenArray[nextIndex - 2],
        givenArray[nextIndex - 1],
        givenArray[nextIndex],
        givenArray[nextIndex + 1],
        givenArray[nextIndex + 2],
      ]);
    }
    handleClick(currentDisplay[3]);
  }

  return (
    // TODO: this
    <div className="flex flex-col">
      {/* top button is the first val of the currentDisplay array */}
      <div
        style={{ borderRadius: "2px", height: "20px", width: "20px" }}
        className="flex flex-row"
      >
        <button onClick={() => shiftCharsUp()}>{currentDisplay[1]}</button>
      </div>
      <div
        style={{ borderRadius: "2px", height: "20px", width: "20px" }}
        className="flex flex-row"
      >
        <button>{currentDisplay[2]}</button>
      </div>
      <div
        style={{ borderRadius: "2px", height: "20px", width: "20px" }}
        className="flex flex-row"
      >
        <button onClick={() => shiftCharsDown()}>{currentDisplay[3]}</button>
      </div>
    </div>
  );
}
