import { useState, useEffect } from "react";

function RequestLetter({ state }) {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [course, setCourse] = useState("");
  const [id, setId] = useState(9); // Initialize ID to 9
  const { contract } = state;

  useEffect(() => {
    // This effect will run only once, on component mount
    setId(9); // Initialize ID to 9
  }, []);

  const handleRequest = async () => {
    try {
      // Request recommendation from the contract
      await contract.addStudent(name, course, usn);

      // Increment the ID after a successful request
      setId((prevId) => prevId + 1);

      alert("Transaction ID generated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error generating transaction ID");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
      />
      <input
        type="text"
        placeholder="USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
      />
      <input
        type="text"
        placeholder="Subject Cleared"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
      />

      <button
        onClick={handleRequest}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Get Transaction ID
      </button>
      {id !== "" && (
        <div className="mt-4 text-gray-700">Transaction ID: {id}</div>
      )}
    </div>
  );
}

export default RequestLetter;
