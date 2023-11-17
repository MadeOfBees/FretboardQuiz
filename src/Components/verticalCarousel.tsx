interface verticalCarouselProps {
    arrayType: string[];
    setSharpFlat: (input: string) => void;
    setCurrentNote: (input: string) => void;
    sharpFlatArray: string[];
  }
  
  export default function verticalCarousel(props: verticalCarouselProps): JSX.Element {
    const { arrayType, setSharpFlat, setCurrentNote, sharpFlatArray } = props;
  
    return (
      <div className="flex flex-col">
        {arrayType.map((input: string, index: number) => (
          <button
            className="px-4 py-2 border border-gray-500 rounded-md hover:bg-gray-700"
            key={index}
            onClick={() => {
              if (arrayType === sharpFlatArray) {
                setSharpFlat(input);
              } else {
                setCurrentNote(input);
              }
            }}
          >
            {input}
          </button>
        ))}
      </div>
    );
  }
  