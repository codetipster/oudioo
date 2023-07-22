import React from "react";
import Button from "../../components/Button";

interface HomeProps {
  authToken: string | null;
}

const Home: React.FC<HomeProps> = ({ authToken }) => {
  return (
    <div>
      <h3>Homepage of Oudioo</h3>
      <p>
        A detailed about of what the Oudioo platform is would readily appear
        here for users to read about.
      </p>

      {/* Ad slots */}
      <div
        id="superbanner"
        //style={{ width: "100%", height: "250px", backgroundColor: "#eee" }}
      ></div>
      <div
        id="sky"
        //style={{ width: "160px", height: "600px", backgroundColor: "#eee" }}
      ></div>
      <div
        id="billboard"
        //style={{ width: "970px", height: "250px", backgroundColor: "#eee" }}
      ></div>
      <div
        id="mrec"
        //style={{ width: "300px", height: "250px", backgroundColor: "#eee" }}
      ></div>
      <div
        id="mrec_btf"
        //style={{ width: "300px", height: "250px", backgroundColor: "#eee" }}
      ></div>
      <div
        id="mrec_btf_2"
        //style={{ width: "300px", height: "250px", backgroundColor: "#eee" }}
      ></div>
      <div
        id="mrec_btf_3"
        //style={{ width: "300px", height: "250px", backgroundColor: "#eee" }}
      ></div>
      <div
        id="inpage"
        //style={{ width: "300px", height: "600px", backgroundColor: "#eee" }}
      ></div>

      {/* Show auth token if available */}
      {authToken && <p>Current auth token: {authToken}</p>}
    </div>
  );
};

export default Home;
