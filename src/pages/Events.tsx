import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../partials/Sidebar";
import CommonDataService from "../services/commondataservice";
import { SERVICE_ROUTE } from "../services/endpoints";
import { IoIosAddCircle, IoMdTrash } from "react-icons/io"; // Import the trash icon
import { IoChevronForward, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const navigate = useNavigate();
  const commonDataService = new CommonDataService();
  const [dataset, setDataset] = useState([]);
  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    image: "",
    seats: 0,
    venue: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

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

  const Get_Products = () => {
    setLoading(true); // Start loading
    commonDataService
      .fetchData(SERVICE_ROUTE.GET_PRODUCTS)
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

  const Add_Article = () => {
    setLoading(true); // Start loading
    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPLOAD_PRODUCTS, newArticle)
      .then((res) => {
        setDataset((prev) => [...prev, res?.data]);
        setModalOpen(false);
        setNewArticle({
          title: "",
          description: "",
          image: "",
          venue: "",
          seats: 0,
        });
        Get_Products(); // Refresh dataset
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  };

  const Del_Call = (id) => {
    setLoading(true); // Start loading
    commonDataService
      .removeCall(SERVICE_ROUTE.DELETE_EVENT, id)
      .then(() => {
        //setDataset((prev) => prev.filter((article) => article._id !== id)); // Update dataset after deletion
        Get_Products();
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

  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <div>
          <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-semibold">Events</h2>
            <IoIosAddCircle
              className="cursor-pointer"
              onClick={() => setModalOpen(true)}
              size={24}
            />
          </header>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-center items-center h-full">
              <p>Loading...</p> {/* You can replace this with a spinner */}
            </div>
          )}

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div
                className="bg-white p-5 rounded-lg shadow-lg"
                style={{ width: "500px" }}
              >
                <h2 className="text-xl mb-4">Add New Events</h2>
                <input
                  type="text"
                  placeholder="Subject"
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, title: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="No of Seats"
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      seats: parseFloat(e.target.value),
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

          <div style={{ width: "100%" }}>
            <div>
              <tbody>
                {dataset?.map((article) => (
                  <div
                    key={article._id}
                    className="bg-white shadow-sm rounded-xl p-3 my-2"
                  >
                    {/* Main flex container */}
                    <div style={{display: "flex",justifyContent:"flex-end", justifyItems:'flex-end',alignItems:"flex-end"}}>
                      <IoTrashOutline
                        className="cursor-pointer text-red-600 ml-5" // Styling for the icon
                        onClick={() => Del_Call(article._id)} // Call delete on click
                        size={20} // Set the size of the icon
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      {/* Left content */}
                      <div
                        className="flex-grow cursor-pointer"
                        onClick={() =>
                          navigate("/EventDetails", {
                            state: { dataset: article },
                          })
                        }
                      >
                        <div>{"Product id: " + article?._id}</div>
                        <div>{"Name: " + article?.title}</div>
                        <div>{"Description: " + article?.description}</div>
                        <div>{"Seats: " + article?.seats}</div>
                      </div>

                      {/* Right content */}
                      <div className="flex items-center">
                        <IoChevronForward
                          className="cursor-pointer text-red-600 ml-5" // Add margin for spacing
                        />
                      </div>
                    </div>

                    {/* Image below the details */}
                    <img
                      style={{ height: 100, width: 100 }}
                      src={article?.image}
                      alt="Image"
                      className="mt-3"
                    />
                  </div>
                ))}
              </tbody>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
