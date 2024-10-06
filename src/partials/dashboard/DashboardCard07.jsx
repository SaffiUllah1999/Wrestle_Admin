import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonDataService from "../../services/commondataservice";
import { SERVICE_ROUTE } from "../../services/endpoints";

function DashboardCard07() {
  const [users, setUsers] = useState([]); // State for users
  const [loading, setLoading] = useState(true); // State for loading
  const commonDataService = new CommonDataService()


  // const fetchData = async () => {
  //   try {
  //     const response = await axiosInstance.get("/getUsers");
  //     setUsers(response.data); // Set users from response data
  //     setLoading(false); // Stop loading
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //     setLoading(false); // Stop loading on error
  //   }
  // };

  const fetchData = async() => {
    await commonDataService
      .fetchData(SERVICE_ROUTE.GET_ALL_USERS)
      .then((res) => {
        console.log(res?.data)
        setUsers(res.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // const deleteUser = async (id) => {
  //   try {
  //     await axiosInstance.delete(`/deleteUser/${id}`); // Use axios instance
  //     setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Update state to remove deleted user
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  const deleteUser = async(id) => {
    await commonDataService
      .removeCall(SERVICE_ROUTE.DELETE_USER, id)
      .then((res) => {
        setUsers(res.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch users when the component mounts
  }, []);

  if (loading) return <div>Loading...</div>; // Optional loading state

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">All Users</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Score</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">{user.email}</div>
                  </td>
                  <td className="p-2 text-center">
                    <div className={user.Score > 0 ? "text-green-500" : "text-red-500"}>
                      {user.Score || 0}
                    </div>
                  </td>
                  <td className="p-2 text-center">
                    <div className="text-gray-800 dark:text-gray-100">{user.name || "N/A"}</div>
                  </td>
                  <td className="p-2 text-center">
                    <button onClick={() => deleteUser(user._id)} className="text-red-500">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
