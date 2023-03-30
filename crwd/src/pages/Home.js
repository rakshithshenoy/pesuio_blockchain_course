import { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import Layout from "../components/Layout";
import { factoryInstance } from "../ethereum";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const getServerSideProps = async () => {
      console.log();
      const campaigns = await factoryInstance.methods.getCampaigns().call();

      setCampaigns(campaigns);
      return {
        props: {
          campaigns,
        },
      };
    };
    getServerSideProps();
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
}

// export const getServerSideProps = async () => {
//   const campaigns = await factoryInstance.methods.getCampaigns().call();
//   // console.log(campaigns[0].title);
//   return {
//     props: {
//       campaigns,
//     },
//   };
// };
