import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import CommonDataService from "../services/commondataservice";
import { SERVICE_ROUTE } from "../services/endpoints";
import { useLocation } from "react-router-dom";

function Bidding() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { data } = location.state || {}; // Safely access the passed data
  const commonDataService = new CommonDataService();
  const [dataset, setDataset] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newBid, setNewBid] = useState({
    wrestleName: data?.name,
    image: data?.image,
    startingBid: "",
    duration: 15, // Duration in minutes
  });
   
  console.log(newBid?.image)
  // Fetch Bids
  const Get_Bids = () => {
    setLoading(true);
    commonDataService
      .fetchData(`${SERVICE_ROUTE.GET_BIDDING_BY_NAME}${data?.name}`)
      .then((res) => {
        setDataset(res?.data?.data);
        console.log("BIDS" + JSON.stringify(res?.data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Add New Bid
  const Add_Bidding = () => {
    setLoading(true);
    commonDataService
      .executeApiCall(SERVICE_ROUTE.START_BIDDING, newBid)
      .then((res) => {
        setDataset((prev) => [...prev, res?.data]);
        setModalOpen(false);
        setNewBid({
          wrestleName: "",
          image: "",
          startingBid: "",
          duration: 15,
        });
        Get_Bids();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Timer for Active Bids
  const formatTimeLeft = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    Get_Bids(); // Fetch bids on component mount
    const interval = setInterval(() => {
      // Auto-refresh dataset to handle expired bids
      Get_Bids();
    }, 1); // Refresh every 60 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div>
            <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-semibold">Bidding</h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(true)}
              >
                Add New Bid
              </button>
            </header>

            <div className="p-5">
              <div>
                {dataset?.map((bid) => {
                  const timeLeft = Math.max(
                    0,
                    new Date(bid?.endTime) - new Date()
                  );

                  return (
                    <div
                      key={bid?._id}
                      className="bg-white p-4 shadow-sm rounded-lg my-2 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">
                          Wrestler: {bid?.wrestleName}
                        </h3>
                        <p>Starting Bid: {bid?.startingBid}</p>
                        <p>
                          Current Bid: {bid?.currentBid || bid?.startingBid}
                        </p>
                      </div>
                      <div>
                        {timeLeft > 0 ? (
                          <span className="text-green-500 font-bold">
                            Time Left: {formatTimeLeft(timeLeft)}
                          </span>
                        ) : (
                          <span className="text-red-500 font-bold">
                            Bidding Closed
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding a New Bid */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg w-1/3">
            <h3 className="font-semibold mb-3">Add New Bid</h3>
            <input
              type="text"
              className="border p-2 w-full mb-3"
              placeholder="Wrestler Name"
              value={data?.name}
              disabled
              onChange={(e) =>
                setNewBid({ ...newBid, wrestleName: e.target.value })
              }
            />
            <input
              type="text"
              className="border p-2 w-full mb-3"
              placeholder="Image URL"
              value={newBid.image}
              onChange={(e) => setNewBid({ ...newBid, image: e.target.value })}
            />
            <input
              type="text"
              className="border p-2 w-full mb-3"
              placeholder="Starting Bid"
              value={newBid.startingBid}
              onChange={(e) =>
                setNewBid({ ...newBid, startingBid: e.target.value })
              }
            />
            <input
              type="number"
              className="border p-2 w-full mb-3"
              placeholder="Duration (minutes)"
              value={newBid.duration}
              onChange={(e) =>
                setNewBid({ ...newBid, duration: Number(e.target.value) })
              }
            />
            <div className="flex justify-end">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={Add_Bidding}
              >
                Add Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bidding;
