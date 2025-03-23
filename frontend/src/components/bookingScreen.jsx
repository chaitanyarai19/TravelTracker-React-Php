import { useState, useEffect } from "react";
import { IoCalendarOutline } from "react-icons/io5";

export default function TravelForm({ travelData }) {
  const [leavingFrom, setLeavingFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelPurpose, setTravelPurpose] = useState("");
  const [message, setMessage] = useState(""); // To show success/error messages

  useEffect(() => {
    console.log("Received travelData in form:", travelData);

    if (travelData) {
      setLeavingFrom(travelData["Leaving From"] || "");
      setGoingTo(travelData["Destination City"] || "");
      setDepartureDate(travelData["Travel Date"] || "");
      setReturnDate(travelData["Return Date"] || "");
      setTravelPurpose(travelData["Reason for Travel"] || "");
    }
  }, [travelData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      leavingFrom,
      goingTo,
      departureDate,
      returnDate,
      travelPurpose,
    };

    try {
      const response = await fetch("http://localhost/xampp_api/save_travel_data.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setMessage(<span className="text-green-600">Data submitted successfully!</span>);
      } else {
        setMessage("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Travel Request Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Leaving From & Going To */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 border rounded-lg">
            <p className="text-gray-700 font-semibold">Leaving From *</p>
            <input
              type="text"
              value={leavingFrom}
              onChange={(e) => setLeavingFrom(e.target.value)}
              className="text-lg font-bold w-full border p-2 rounded-lg"
              required
            />
          </div>
          
          <div className="p-4 border rounded-lg">
            <p className="text-gray-700 font-semibold">Going To *</p>
            <input
              type="text"
              value={goingTo}
              onChange={(e) => setGoingTo(e.target.value)}
              className="text-lg font-bold w-full border p-2 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Departure & Return Dates */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Departure *</label>
            <div className="relative">
              <input
                type="text"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full border p-2 rounded-lg"
                required
              />
              <IoCalendarOutline className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold">Return *</label>
            <div className="relative">
              <input
                type="text"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full border p-2 rounded-lg"
                required
              />
              <IoCalendarOutline className="absolute top-3 right-3 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Travel Purpose */}
        <div className="mb-4">
          <label className="text-gray-700 font-semibold">Travel Purpose *</label>
          <input
            type="text"
            value={travelPurpose}
            onChange={(e) => setTravelPurpose(e.target.value)}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-700" style={{ backgroundColor: "#1a1a1a" }}>
          Submit Travel Data
        </button>

        {/* Message Display */}
        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </form>
    </div>
  );
}
