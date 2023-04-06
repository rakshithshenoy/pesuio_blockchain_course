import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { campaignInstance, web3 } from "../ethereum";

const Requests = () => {
  const { address } = useParams();
  const [requests, setRequests] = useState("");
  const [approversCount, setApproversCount] = useState(0);
  const [error, setError] = useState("");
  const [approveLoading, setApproveLoading] = useState(false);
  const [finalizeLoading, setFinalizeLoading] = useState(false);
  const [id, setId] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getServerSide = async () => {
      const reqCount = await campaignInstance(address)
        .methods.getRequestsCount()
        .call();
      let req = [];
      for (let i = 0; i < reqCount; i++) {
        const request = await campaignInstance(address)
          .methods.getRequest(i.toString())
          .call();
        // console.log(request);
        // remove Object Key
        const requestObj = { ...request, id: i };
        console.log(requestObj);
        req.push(requestObj);
      }
      console.log(req);
      const approversCount = await campaignInstance(address)
        .methods.approversCount()
        .call();
      // console.log(requests);
      setRequests(req);
      setApproversCount(approversCount);
    };

    getServerSide();
  }, [approveLoading, finalizeLoading]);

  const onApprove = async (id) => {
    setId(id);
    try {
      setApproveLoading(true);
      const accounts = await web3.eth.getAccounts();
      await campaignInstance(address).methods.approveRequest(id).send({
        from: accounts[0],
      });
      // Re-render the page
      // router.replace(router.asPath);
      window.location.reload();
      setApproveLoading(false);
    } catch (err) {
      setError(err.message);
      setApproveLoading(false);
    }
  };

  // Finalize a request
  const onFinalize = async (id) => {
    setId(id);
    try {
      setFinalizeLoading(true);
      const accounts = await web3.eth.getAccounts();
      await campaignInstance(address).methods.finalizeRequest(id).send({
        from: accounts[0],
      });

      setFinalizeLoading(false);
      window.location.reload();
    } catch (err) {
      setError(err.message);
      setFinalizeLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="w-[80%] mx-auto">Requests for this campaign - </h1>

        <div className="relative overflow-x-auto w-[80%] mx-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Recipient
                </th>
                <th scope="col" className="px-6 py-3">
                  Approval Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Approve
                </th>
                <th scope="col" className="px-6 py-3">
                  Finalize
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request) => {
                  console.log("MAP", request);
                  return (
                    <tr
                      key={request?.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {request.id + 1}
                      </th>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {request[0]}
                      </th>
                      <td className="px-6 py-4">
                        {" "}
                        {web3.utils.fromWei(request[1], "ether") + " ETH"}
                      </td>
                      <td className="px-6 py-4">{request[2]}</td>
                      <td className="px-6 py-4">
                        {request[4]} / {approversCount}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="text-green-600 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                          disabled={
                            request.approvalCount > 0 ||
                            (approveLoading && request.id === id)
                          }
                          onClick={() => onApprove(request.id)}
                        >
                          APPROVE
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => onFinalize(request.id)}
                          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                        >
                          FINALIZE
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <div className="w-[80%] mx-auto mt-12">
          <button
            type="button"
            onClick={() => {
              navigate(`/campaigns/${address}/requests/new`);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Request
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Requests;
