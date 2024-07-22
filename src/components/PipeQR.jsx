import { useState, useEffect } from "react";

const PipeQR = ({ qr }) => {
  const [showQr, setShowQr] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Reset animationStarted to false when qr changes
    setAnimationStarted(false);

    // Check if qr is present and then start the animation
    if (qr) {
      setAnimationStarted(true);
      // Trigger the animation here if needed
    }
  }, [qr]); // Depend on qr alone to reset and trigger the animation

  return (
    <div className=" w-full h-full flex flex-col justify-end">
      <img
        src={showQr ? qr : "/assets/icons/box.png"}
        id="box"
        className={`${
          animationStarted ? "sendBox" : ""
        } cursor-pointer w-28 h-28 mx-auto`}
        onClick={() => setShowQr(!showQr)}
      />
      <img
        id="coin"
        src="/assets/icons/coin.png"
        className={`${animationStarted ? "insertCoin" : ""} h-20 w-20 mx-auto`}
      />
      <img
        id="pipe"
        src="/assets/icons/pipe.png"
        className="h-40 w-40 mx-auto translate-y-10"
      />
    </div>
  );
};

export default PipeQR;
