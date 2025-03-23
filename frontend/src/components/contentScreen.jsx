import { useState } from "react";
import axios from "axios";

function ContentScreen() {
  const [emailContent, setEmailContent] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/extract-travel", {
        emailContent,
      });

      if (response.data.success) {
        setExtractedData(response.data.data); // Store extracted travel details
      } else {
        alert("Error extracting travel details!");
      }
    } catch (error) {
      alert("Error extracting travel details!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg border">
      <h1 className="text-2xl font-bold mb-4">Travel Info Extractor</h1>

      <textarea
        className="w-full border p-2 rounded-lg mb-4"
        placeholder="Paste Travel Invite"
        value={emailContent}
        onChange={(e) => setEmailContent(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleExtract}
        disabled={loading}
      >
        {loading ? "Extracting..." : "Extract Info"}
      </button>

      {extractedData && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-semibold">Extracted Travel Details:</h2>
          <p><strong>Destination:</strong> {extractedData.destinationCity || "N/A"}</p>
          <p><strong>Departure Date:</strong> {extractedData.travelDate || "N/A"}</p>
          <p><strong>Return Date:</strong> {extractedData.returnDate || "N/A"}</p>
          <p><strong>Purpose:</strong> {extractedData.reasonForTravel || "N/A"}</p>
        </div>
      )}
    </div>
  );
}

export default ContentScreen;
