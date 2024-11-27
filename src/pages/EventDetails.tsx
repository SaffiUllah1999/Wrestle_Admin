import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../partials/Sidebar";
import CommonDataService from "../services/commondataservice";
import { SERVICE_ROUTE } from "../services/endpoints";
import { IoIosAddCircle } from "react-icons/io"; // Import the add icon
import { useLocation } from "react-router-dom";

export default function EventDetails() {
  const location = useLocation();
  const { dataset } = location.state || {}; // Safely access the passed data
  const [data_set, setDataset] = useState(dataset);
  const commonDataService = new CommonDataService();

  console.log(data_set?.wrestlers)

  const Get_Products = () => {
    setLoading(true); // Start loading
    commonDataService
      .fetchData_2(SERVICE_ROUTE.GET_EVENT_BY_ID, data_set?._id)
      .then((res) => {
        setDataset(res?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  useEffect(() => {
    Get_Products();
  }, []);

  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    image: "",
    seats: 0,
    venue: "",
  });
  const [loading, setLoading] = useState(false);

  console.log(dataset.wrestle1, "===" + dataset.wrestle2);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewArticle((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const Add_Article = () => {
    setLoading(true);
    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPLOAD_PRODUCTS, newArticle)
      .then((res) => {
        // Assuming you want to add the new article to the dataset
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const UpdateWrestler1 = (_id, name, email, image) => {
    setLoading(true);
    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPDATE_EVENT_WRESTLE1, {
        _id,
        name,
        email,
        image,
      })
      .then((res) => {
        // Assuming you want to add the new article to the dataset
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const UpdateWrestler2 = (_id, name) => {
    setLoading(true);
    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPDATE_EVENT_WRESTLE2, { _id, name })
      .then((res) => {
        // Assuming you want to add the new article to the dataset
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleApprove = (participant) => {
    // Implement your approval logic here
    console.log(`Approved participant: ${participant.name}`);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-semibold">Event Details</h2>
          {/* Add your icon for opening modal here */}
        </header>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        )}

        {/* Modal for Adding Events */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
              className="bg-white p-5 rounded-lg shadow-lg"
              style={{ width: "500px" }}
            >
              <h2 className="text-xl mb-4">Add New Events</h2>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) =>
                  setNewArticle({ ...newArticle, title: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="number"
                placeholder="No of Seats"
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    seats: parseInt(e.target.value),
                  })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Venue"
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    venue: e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
              />
              <textarea
                placeholder="Enter Details"
                onChange={(e) =>
                  setNewArticle({
                    ...newArticle,
                    description: e.target.value,
                  })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <button
                onClick={handleButtonClick}
                className="mr-2 bg-gray-300 hover:bg-gray-400"
              >
                Upload Image
              </button>

              <div className="flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="mr-2 bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={Add_Article}
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Render Event Data */}
        <div className="p-5">
          <div key={data_set?._id} className="border rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{data_set?.title}</h3>
            <img
              style={{ height: 300, width: 300 }}
              src={data_set?.image}
              alt={data_set?.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <p>
              <strong>Description:</strong> {data_set?.description}
            </p>
            <p>
              <strong>Seats:</strong> {data_set?.seats}
            </p>
            <p>
              <strong>Venue:</strong> {data_set?.venue}
            </p>
            {/* <p>
              <strong>Wrestlers:</strong> --{data_set?.wrestle1} VS{" "}
              {data_set?.wrestle2}--
            </p> */}
            <p>
              <strong>Participants:</strong>
              <ul style={{ marginTop: "10px" }}>
                {data_set?.participants.map((participant, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center"
                    style={{
                      marginBottom: "10px",
                      backgroundColor: "#cccc",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <span>
                      <strong>Wrestler Name :</strong> {participant.name}{" "}
                      <strong> Email :</strong> {participant.email}
                    </span>
                    {dataset?.wrestlers?.find(c=> c?.name === participant.name)? (
                      <></>
                    ) : (
                      <button
                        onClick={() =>
                          UpdateWrestler1(
                            data_set?._id,
                            participant?.name,
                            participant?.email,
                            participant?.image
                          )
                        }
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
