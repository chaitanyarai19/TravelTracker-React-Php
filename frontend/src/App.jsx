import { useState } from "react";
import axios from "axios";
import TravelForm from "./components/bookingScreen";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [travelData, setTravelData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/extract-travel", {
        emailContent,
      });

      console.log("API Response Data:", response.data); // Debugging
      setTravelData(response.data.data);
    } catch (error) {
      alert("Error extracting travel details!");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Travel Info Extractor</h1>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Paste Travel Invite"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows={5}
          />
          <button
            onClick={handleExtract}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            {loading ? "Extracting..." : "Extract Info"}
          </button>
        </div>
      </div>

      {/* Pass travelData as a prop */}
      {travelData && <TravelForm travelData={travelData} />}
    </>
  );
}

export default App;
