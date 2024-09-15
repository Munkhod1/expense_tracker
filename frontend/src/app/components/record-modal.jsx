"use client";
import axios from "axios";

import { useState } from "react";
import { toast } from "react-toastify";

export const RecordModal = ({ isOpen, close }) => {
  return (
    <dialog open={isOpen} className="modal">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="modal-box max-w-[800px]">
          {/* Хаах товч */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={close}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Add Record</h3>
          {/* талбарыг хоёр хэсэгт хуваах тохиргоо */}
          <div className="divider">-</div>
          <div className="flex gap-12">
            <RightSide />
            <LeftSide />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export const RightSide = () => {
  const [activeTab, setActiveTab] = useState("INC");
  const [recordFormData, setrecordFormData] = useState({
    name: "",
    amount: 0,
    cid: "",
    uid: "9f755169-830e-466d-a81c-a4956e82b9c4",
    description: "",
  });

  const handleChangeForm = (e) => {
    setrecordFormData({ ...recordFormData, [e.target.name]: e.target.value });
  };
  const addRecordData = async () => {
    const newData = {
      ...recordFormData,
      transation_type: activeTab,
    };
    console.log("DD", newData);

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(`${apiUrl}/record`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        toast.success("record amjilttai nemegdlee");
      }
    } catch (error) {
      toast.error("record nemeh uyed aldaa garlaa");
    }
  };
  // Энэ хэсэгт нэмэх товч дарах үед гарч ирэх хэсгийг хийсэн.
  return (
    <div className="w-2/5">
      {/* add record darah uyed garch irne */}
      <div className="flex space-x-1 bg-gray-200 rounded-full mb-3">
        <button
          className={`px-11 py-2 rounded-full transition-colors duration-300 ${
            activeTab === "EXP"
              ? "bg-blue-500 text-white"
              : "bg-transparent text-black"
          }`}
          onClick={() => setActiveTab("EXP")}
        >
          Expense
        </button>
        <button
          className={`px-11 py-2 rounded-full transition-colors duration-300 ${
            activeTab === "INC"
              ? "bg-green-500 text-white"
              : "bg-transparent text-black"
          }`}
          onClick={() => setActiveTab("INC")}
        >
          Income
        </button>
      </div>
      {/* amount bichih heseg */}
      <div className="flex flex-col gap-4 w-full">
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input input-bordered"
          onChange={handleChangeForm}
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          className="input input-bordered"
          onChange={handleChangeForm}
        />
        {/*category songoh  heseg */}
        <div className="flex flex-col">
          <label>Category</label>
          <select
            className="select select-bordered"
            name="cid"
            onChange={handleChangeForm}
          >
            <option disabled selected>
              Choose
            </option>
            <option value="Bills">Bills</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Insurance">Insurance</option>
            <option value="Clothing">Clothing</option>
          </select>
        </div>
        {/* Hugatsaa */}
        <div className="flex gap-3">
          <div className="flex flex-col">
            <label>Date</label>
            <input type="date" className="input input-bordered" />
          </div>
          <div className="flex flex-col">
            <label>Time</label>
            <input type="time" className="input input-bordered" />
          </div>
        </div>
      </div>
      <div className="mt-3">
        {/* add record */}
        <button
          className={`btn ${
            activeTab === "EXP" ? "bg-blue-500" : "bg-green-500"
          } text-white w-full`}
          onClick={addRecordData}
        >
          Add Record
        </button>
      </div>
    </div>
  );
};
// нэмэлт мэдээлэл бичих хэсэг
export const LeftSide = () => {
  return (
    <div className="flex flex-col w-3/5 gap-3">
      <label>Note</label>
      <textarea
        name="note"
        id="note"
        className="h-[280px] textarea textarea-bordered"
        placeholder="Write here"
      ></textarea>
    </div>
  );
};
