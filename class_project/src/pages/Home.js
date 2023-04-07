import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { factoryInstance } from "../ethereum";
import CampaignCard from "../components/CampaignCard";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const fetchCampaigns = async () => {
      const data = await factoryInstance.methods.getCampaigns().call();

      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  return (
    <Layout>
      <h1 className="w-[80%] mx-auto text-2xl mb-4 font-bold">
        Active Campaigns
      </h1>
      {campaigns && campaigns.length > 0 ? (
        campaigns?.map((campaign, index) => (
          <CampaignCard
            key={index}
            title={campaign[1]}
            deployedAddress={campaign[0]}
          />
        ))
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Home;
