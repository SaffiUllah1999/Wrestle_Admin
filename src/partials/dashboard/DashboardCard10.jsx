import React, { useEffect, useState } from "react";

import Image01 from "../../images/user-36-05.jpg";
import Image02 from "../../images/user-36-06.jpg";
import Image03 from "../../images/user-36-07.jpg";
import Image04 from "../../images/user-36-08.jpg";
import Image05 from "../../images/user-36-09.jpg";
import CommonDataService from "../../services/commondataservice";
import { SERVICE_ROUTE } from "../../services/endpoints";

export default function DashboardCard10() {
  const commonDataService = new CommonDataService();
  const [dataset, setDataset] = useState([]);

  const Get_Products = () => {
    commonDataService
      .fetchData(SERVICE_ROUTE.GET_ACTIVE_ORDER)
      .then((res) => {
        console.log("All " + JSON.stringify(res?.data));
        setDataset(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Del_Call = (id) => {
    commonDataService
      .executeApiCall_2(SERVICE_ROUTE.DELETE_USER, id)
      .then((res) => {
        console.log(res?.data);
        setDataset(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Update_Call = (c, status) => {
    let datatset = {
      orderId: c,
      newStatus: status,
    };
    commonDataService
      .executeApiCall(SERVICE_ROUTE.UPDATE_ORDER, datatset)
      .then((res) => {
        console.log(res?.data);
        Get_Products()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Get_Products();
  }, []);

  const customers = [
    {
      id: "0",
      image: Image01,
      name: "Alex Shatov",
      email: "alexshatov@gmail.com",
      location: "🇺🇸",
      spent: "$2,890.66",
    },
    {
      id: "1",
      image: Image02,
      name: "Philip Harbach",
      email: "philip.h@gmail.com",
      location: "🇩🇪",
      spent: "$2,767.04",
    },
    {
      id: "2",
      image: Image03,
      name: "Mirko Fisuk",
      email: "mirkofisuk@gmail.com",
      location: "🇫🇷",
      spent: "$2,996.00",
    },
    {
      id: "3",
      image: Image04,
      name: "Olga Semklo",
      email: "olga.s@cool.design",
      location: "🇮🇹",
      spent: "$1,220.66",
    },
    {
      id: "4",
      image: Image05,
      name: "Burak Long",
      email: "longburak@gmail.com",
      location: "🇬🇧",
      spent: "$1,890.66",
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Active Orders
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Product Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Product ID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Quantity</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Status</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Update Status</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {dataset?.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-800 dark:text-gray-100">
                          {customer?.name}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer?._id}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {customer?.email}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        {customer?.quantity}
                      </div>
                    </td>

                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">
                        {customer?.status}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div
                        className="flex justify-start items-center"
                        style={{ flexDirection: "row" }}
                      >
                        <div
                          className="text-left font-medium text-red-500"
                          style={{ marginRight: "10px" }}
                        >
                          <button
                            onClick={() => Update_Call(customer?._id, "delete")}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="text-left font-medium text-green-500">
                          <button
                            onClick={() =>
                              Update_Call(customer?._id, "complete")
                            }
                          >
                            Complete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
