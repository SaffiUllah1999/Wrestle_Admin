import React, { useEffect, useState, useRef } from "react";
import CommonDataService from "../../services/commondataservice";
import { SERVICE_ROUTE } from "../../services/endpoints";
import { IoIosAddCircle, IoMdClose } from "react-icons/io";

export default function Article1() {
  const commonDataService = new CommonDataService();
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const fileInputRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    description: "",
    image: "",
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
    setLoading(true); // Set loading to true
    commonDataService
      .fetchData(SERVICE_ROUTE.GET_ARTICLES)
      .then((res) => {
        setDataset(res?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request
      });
  };

  const Add_Article = () => {
    setLoading(true); // Set loading to true
    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPLOAD_ARTICLES, newArticle)
      .then((res) => {
        setDataset((prev) => [...prev, res?.data]);
        setModalOpen(false);
        setNewArticle({ title: "", description: "", image: "" });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request
      });
  };

  const Del_Call = (id) => {
    setLoading(true); // Set loading to true
    commonDataService
      .executeApiCall_2(`/articles/${id}`)
      .then(() => {
        setDataset((prev) => prev.filter(article => article._id !== id));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request
      });
  };

  useEffect(() => {
    Get_Products();
  }, []);

  return (
    <div>
      <header className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-semibold">Articles</h2>
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
            <h2 className="text-xl mb-4">Add New Article</h2>
            <input
              type="text"
              placeholder="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              className="border p-2 mb-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={newArticle.description}
              onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
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
                Add Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && <div className="text-center">Loading...</div>}

      <div className="p-3">
        <div>
          <tbody>
            {dataset?.map((article, index) => (
              <div key={article._id} className="bg-white shadow-sm rounded-xl p-3 my-2">
                <div className="flex justify-between items-center">
                  <div>{index + 1}</div>
                  <IoMdClose
                    className="cursor-pointer text-red-600"
                    onClick={() => Del_Call(article._id)}
                  />
                </div>
                <div>{"Article id: " + article?._id}</div>
                <div>{"Title: " + article?.title}</div>
                <img
                  style={{ height: 100, width: 100 }}
                  src={ article?.image}
                  alt="Base64 Example"
                />
                <div>{article?.description}</div>
              </div>
            ))}
          </tbody>
        </div>
      </div>
    </div>
  );
}
