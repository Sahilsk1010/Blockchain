import { useState, useEffect } from "react";

const GetStudents = ({state}) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  const [display, setDisplay] = useState(false);
  const [uniqueCourses, setUniqueCourses] = useState([]);
  const [studentMap, setStudentMap] = useState({});
  const [usn, setUsn] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [showAllStudents, setShowAllStudents] = useState(false);

  const getDetails = async () => {
    if (contract) {
      try {
        const memos = await contract.getStudents();
        setMemos(memos);
        const courses = memos.map((memo) => memo.course);
        setUniqueCourses([...new Set(courses)]);
        const studentMap = memos.reduce((map, memo) => {
          map[memo.usn] = memo;
          return map;
        }, {});
        setStudentMap(studentMap);
        setDisplay(true);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    }
  };

  const searchStudent = () => {
    const student = studentMap[usn];
    if (student) {
      setStudentInfo(student);
      setSearchError("");
    } else {
      setStudentInfo(null);
      setSearchError("No record found");
    }
  };

  useEffect(() => {
    const fetchMemos = async () => {
      if (contract) {
        try {
          const memos = await contract.getStudents();
          setMemos(memos);
          const courses = memos.map((memo) => memo.course);
          setUniqueCourses([...new Set(courses)]);
          const studentMap = memos.reduce((map, memo) => {
            map[memo.usn] = memo;
            return map;
          }, {});
          setStudentMap(studentMap);
        } catch (error) {
          console.error("Error fetching memos:", error);
        }
      }
    };
    fetchMemos();
  }, [contract]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
        Messages
      </h2>
      <button 
        onClick={getDetails} 
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Get All Courses
      </button>
      {display && (
        <div className="text-center text-gray-800 mb-4">
          <h1 className="text-xl font-semibold mb-4">Courses</h1>
          {uniqueCourses.map((course, index) => (
            <div key={index} className="text-lg">
              <p>{index + 1}: {course}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mb-8 text-center">
        <input 
          type="text" 
          value={usn} 
          onChange={(e) => setUsn(e.target.value)} 
          placeholder="Enter USN" 
          className="px-4 py-2 border rounded mr-2 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button 
          onClick={searchStudent} 
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
        >
          Get Student Info
        </button>
      </div>

      {studentInfo && (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{studentInfo.name}</h3>
            <p className="text-sm text-gray-600 mb-2">USN: {studentInfo.usn}</p>
            <p className="text-sm text-gray-600 mb-2">Course: {studentInfo.course}</p>
            <p className="text-sm text-gray-600 mb-2">
              Completion Timestamp:{" "}
              {new Date(Number(studentInfo.completionTimestamp) * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      )}
      {searchError && (
        <div className="text-center text-red-500 mb-4">
          <p>{searchError}</p>
        </div>
      )}

      {/* Toggle button to show/hide all students */}
      {!showAllStudents ? (
        <button
          onClick={() => setShowAllStudents(true)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded"
        >
          Show All Students
        </button>
      ) : (
        <button
          onClick={() => setShowAllStudents(false)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded"
        >
          Hide All Students
        </button>
      )}

      {/* Render all students if showAllStudents is true */}
      {showAllStudents && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {memos.map((memo, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{memo.name}</h3>
                <p className="text-sm text-gray-600 mb-2">USN: {memo.usn}</p>
                <p className="text-sm text-gray-600 mb-2">Course: {memo.course}</p>
              </div>
              <div className="p-4 bg-gray-100 text-gray-600">
                <p className="truncate">From: {memo.completionTimestamp}</p>
                <p>
                  {!isNaN(Number(memo.completionTimestamp))
                    ? new Date(Number(memo.completionTimestamp) * 1000).toLocaleString()
                    : "Invalid Date"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetStudents;
