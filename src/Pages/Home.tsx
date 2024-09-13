
import { useNavigate } from "react-router-dom";
import { generateUsers, uploadUserFile } from "../Services/ApiService";
import { useState } from "react";
import json from "/src/assets/json.png";
import json2 from "/src/assets/json2.png";

function Home() {
    const [userCount, setUserCount] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const handleGenerateUsers = async () => {
    await generateUsers(userCount);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadFile = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    try {
      const result = await uploadUserFile(file);
      setUploadResult(result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full text-center py-10 mb-6 rounded-lg">
        <h1 className="text-4xl font-bold">Welcome to the MiniProject App</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10 max-w-4xl">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-5">
          <div className="flex items-center gap-3">
            <img className="w-8 h-8" src={json} alt="JSON Icon" />
            <h2 className="text-xl font-semibold">Generate Users</h2>
          </div>
          <p className="mb-4">
            Generate a JSON file containing random user data.
          </p>
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={userCount}
              onChange={(e) => setUserCount(Number(e.target.value))}
              className="w-32 p-2 border border-gray-300 rounded"
              min="1"
              placeholder="Count"
            />
            <button
              onClick={handleGenerateUsers}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Generate Users
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-5 flex flex-col">
          <div className="flex items-center gap-3">
            <img className="w-8 h-8" src={json2} alt="JSON Icon" />
            <h2 className="text-xl font-semibold">Upload User File</h2>
          </div>
          <p className="mb-4">
            Upload a JSON file to create users in the database.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleUploadFile}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Upload
            </button>
          </div>

          {uploadResult && (
            <div className="mt-4 p-2 border border-gray-300 rounded grow">
              <p>Total Records: {uploadResult.totalRecords}</p>
              <p>Successfully Imported: {uploadResult.successfullyImported}</p>
              <p>Not Imported: {uploadResult.notImported}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;