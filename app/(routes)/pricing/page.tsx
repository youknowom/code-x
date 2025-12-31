import { PricingTable } from "@clerk/nextjs";
import React from "react";

function Pricing() {
  return (
    <div
      className="mt-28"
      style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}
    >
      <h2 className="text-3xl text-center">Pricing</h2>
      <h2 className="text-xl text-center">
        Join For Unlimeted access to all feature and courses
      </h2>
      <PricingTable />
    </div>
  );
}

export default Pricing;
