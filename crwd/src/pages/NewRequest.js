import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { campaignInstance, web3 } from "../ethereum";

const NewRequest = () => {
  const [description, setDescription] = useState("");
  const [recepient, setRecepient] = useState("");
  const [amount, setAmount] = useState("");
  const { address } = useParams();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      console.log("SUBNITTING");
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await campaignInstance(address)
        .methods.createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recepient
        )
        .send({
          from: accounts[0],
        });
      setLoading(false);
      setError("");

      // Back to Requests page
      navigate(`/campaigns/${address}/requests`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="w-[60%] mx-auto text-3xl font-bold ">
          Create a new request
        </h1>
      </div>

      <form className="w-[60%] mx-auto mt-8">
        <div className="mb-6">
          <label
            for="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="recepient"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Recepient
          </label>
          <input
            type="text"
            id="recepient"
            value={recepient}
            onChange={(e) => setRecepient(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="0xAAA"
          />
        </div>
        <div className="mb-6">
          <label
            for="val"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Value in Ether
          </label>
          <input
            type="text"
            id="val"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="0.1 ETH"
          />
        </div>

        <button
          type="button"
          onClick={submit}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default NewRequest;
