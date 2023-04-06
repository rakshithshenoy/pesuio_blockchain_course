import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { campaignInstance, web3 } from "../ethereum";
import { useParams } from "react-router-dom";
import BasicCard from "../components/BasicCard";
import MetamaskButton from "../components/MetamaskButton";
import { useNavigate } from "react-router-dom";

const Campaign = () => {
  const [campaign, setCampaign] = useState({});
  const { address } = useParams();
  const [contribution, setContribution] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const contribute = async (value) => {
    try {
      console.log("Contribute");
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await campaignInstance(campaign.address)
        .methods.contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(contribution, "ether"),
        });
      setLoading(false);
      setError("");
      // Re-render the page
      window.location.reload();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getServerSideProps = async () => {
      const Campaign = campaignInstance(address);
      const campaignData = await Campaign.methods.getSummary().call();
      const campaign = {
        minContribute: web3.utils.fromWei(campaignData[0]),
        balance: web3.utils.fromWei(campaignData[1]),
        requestsCount: campaignData[2],
        approversCount: campaignData[3],
        manager: campaignData[4],
        address: address,
      };
      setCampaign(campaign);
    };
    getServerSideProps();
  }, [address]);

  return (
    <Layout>
      <div className="w-[60%] mx-auto">
        <div className="flex flex-wrap">
          <div className="w-[40%] m-4">
            <BasicCard heading={"Address of Manager"} body={campaign.manager} />
          </div>
          <div className="w-[40%] m-4">
            <BasicCard
              heading="Min Contribution"
              body={`${campaign.minContribute} ETH`}
            />
          </div>
          <div className="w-[40%] m-4">
            <BasicCard
              heading={"Balance of Campaign"}
              body={`${campaign.balance} ETH`}
            />
          </div>

          <div className="w-[40%] m-4">
            <BasicCard
              heading={"Number of Approvers"}
              body={campaign.approversCount}
            />
          </div>
          <div className="w-[40%] m-4">
            <div>
              <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Number of Requests
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden">
                  {campaign.requestsCount}
                </p>
                <button
                  type="button"
                  onClick={() => navigate(`/campaigns/${address}/requests`)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mb-1"
                >
                  View Requests
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
          </div>

          <div className="w-[40%] m-4">
            <div>
              <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow 0 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Contribute
                </h5>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden border-2 px-2"
                  ></input>
                  <p className="ml-2">ETH</p>
                </div>
                <div className="mt-2">
                  <MetamaskButton onSubmit={contribute} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Campaign;
