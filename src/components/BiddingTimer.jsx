import { useState, useEffect } from "react";

const BiddingTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, new Date(endTime) - new Date())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = Math.max(0, new Date(endTime) - new Date());
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        clearInterval(timer);
        alert("Bidding has ended!");
        // Optionally refresh or disable further actions
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [endTime]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return <div>Time Left: {formatTime(timeLeft)}</div>;
};

export default BiddingTimer;
