import { useEffect, useState } from "react";

const ReadMoreLess = ({ text, maxLength: lanjut, textFont }) => {
  const [isFullTextShown, setIsFullTextShown] = useState(false);
  const [panjangWord, setPanjangWord] = useState();
  const toggleShowText = () => {
    setIsFullTextShown(!isFullTextShown);
  };

  useEffect(() => {
    setPanjangWord(window.innerWidth < 768 ? lanjut[0] : lanjut[1]);
  }, [lanjut]);

  return (
    <div>
      {isFullTextShown ? (
        <div className={textFont}>
          {text}
          <span
            onClick={toggleShowText}
            className="text-gray-400 cursor-pointer"
          >
            {" "}
            sembunyikan
          </span>
        </div>
      ) : (
        <p className={textFont}>
          {text && text.slice(0, panjangWord)}
          {text && text.length > panjangWord && (
            <span onClick={toggleShowText}>
              ...
              <span className="text-gray-400 cursor-pointer">
                {" "}
                lihat lainnya
              </span>
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default ReadMoreLess;
