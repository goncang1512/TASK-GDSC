import { useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const timeIDN = (dateString) => {
  try {
    const [year, month, day] = dateString.split("-");
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const monthName = months[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid date";
  }
};

export const TimeClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const amOrPm = hours >= 12 ? "PM" : "AM";
      const twelveHourFormat = hours % 12 || 12;
      const timeString = `${twelveHourFormat}:${minutes}:${seconds} ${amOrPm}`;
      setTime(timeString);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <p className="pb-3 text-center">{time}</p>;
};
