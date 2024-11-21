import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Product_1 from "../partials/products/Product_1";
import CommonDataService from "../services/commondataservice";
import { SERVICE_ROUTE } from "../services/endpoints";
import { IoIosAddCircle, IoMdClose } from "react-icons/io";
import { AiOutlineAlignRight, AiOutlineRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Hall_of_Fame() {
  const navigate = useNavigate();
  const commonDataService = new CommonDataService();
  const [dataset, setDataset] = useState([]);
  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    name: "",
    description: "",
    image: "",
    weight: "",
    success_rate: "",
  });

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
    commonDataService
      .fetchData(SERVICE_ROUTE.GET_HALL_FAME)
      .then((res) => {
        setDataset(res?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Add_Article = () => {
    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPLOAD_HALL_FAME, newArticle)
      .then((res) => {
        setDataset((prev) => [...prev, res?.data]);
        setModalOpen(false);
        setNewArticle({
          name: "",
          description: "",
          image: "",
          weight: "",
          success_rate: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Del_Call = (id) => {
    commonDataService
      .removeCall(`/articles/`, id) // Call the DELETE endpoint
      .then(() => {
        setDataset((prev) => prev.filter((article) => article._id !== id)); // Update dataset after deletion
        Get_Products();
      })
      .catch((error) => {
        console.log(error);
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
            <h2 className="font-semibold">Hall Of Fame</h2>
            <IoIosAddCircle
              className="cursor-pointer"
              onClick={() => setModalOpen(true)}
              size={24}
            />
          </header>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl mb-4">
                  Add New Wrestler To HOF(Hall of Fame)
                </h2>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={newArticle.name}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, name: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Weight"
                  value={newArticle.weight}
                  onChange={(e) =>
                    setNewArticle({ ...newArticle, weight: e.target.value })
                  }
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Enter Success rate"
                  value={newArticle.success_rate}
                  onChange={(e) =>
                    setNewArticle({
                      ...newArticle,
                      success_rate: e.target.value,
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

          <div className="p-3">
            <div>
              <tbody>
                {dataset?.map((article, index) => (
                  <div
                    key={article._id}
                    className="bg-white shadow-sm rounded-xl p-3 my-2"
                  >
                    <div className="flex justify-between items-center">
                      <IoMdClose
                        className="cursor-pointer text-red-600"
                        onClick={() => Del_Call(article._id)} // Call delete on click
                      />
                      <AiOutlineRight />
                    </div>
                    <div onClick={()=> navigate('/Bidding', {
                            state: { data : {name: article?.name, image : article?.image} },
                          })}>
                      <div style={{ paddingTop: "20px" }}>
                        {"Product id: " + article?._id}
                      </div>
                      <div>{"Name: " + article?.name}</div>
                      <div>{"Weight: " + article?.weight}</div>
                      <img
                        style={{ height: 100, width: 100 }}
                        src={article?.image}
                        alt="Image"
                      />
                    </div>
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
