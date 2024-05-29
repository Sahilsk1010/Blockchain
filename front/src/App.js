import abi from "./contract/June.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import RequestLetter from "./components/RequestLetter";
import GetStudents from "./components/GetStudents";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x130486c095Abcc5C9e658F0496dE8260a2eD51FD";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <div className="bg-white min-h-screen text-gray-900 font-serif">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">
          Student Microcredentials
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                Add Student
              </h2>
              <RequestLetter state={state} />
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                Get Details
              </h2>
              <GetStudents state={state} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
