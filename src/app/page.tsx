"use client";

import Image from "next/image";
import iconArrow from "../../public/images/icon-arrow.svg";
import ResultsTitle from "@/components/ResultsTitle";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  const [ipAddress, setIpAddress] = useState("");
  const [locationData, setLocationData] = useState({});

  const fetchIpData = async (ip = "") => {
    const apiKey = "at_aPdeSkrIP145Eab6bKLTKUVt7lgKj"; // Replace with your IPify API key
    const url = ip
      ? `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`
      : `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      setLocationData(data);
    } catch (error) {
      console.error("Error fetching IP data:", error);
    }
  };

  const handleIpSearch = () => {
    fetchIpData(ipAddress);
  };

  useEffect(() => {
    fetchIpData(); //current user ip address on mount
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="w-full relative z-50 p-10 bg_pattern">
        <div>
          <h2 className="text-center my-3 text-3xl text-white font-bold">
            IP Address Tracker
          </h2>
          <div className="flex w-full justify-center ">
            <input
              onChange={(e) => setIpAddress(e.target.value)}
              value={ipAddress}
              className=" rounded-l-xl md:w-[40%] w-[80%] bg-white flex  justify-center items-center flex-col white px-8 outline-none border-0 py-3 "
            />
            <button
              onClick={handleIpSearch}
              className="bg-black py-3 px-4 rounded-r-xl text-white"
            >
              {" "}
              <Image src={iconArrow} alt="icon arrrow" />{" "}
            </button>
          </div>
        </div>
      </div>

      {/* RESULT CARD */}

      {locationData && (
        <div className="flex justify-center md:mt-0 mt-40 border relative z-50 shadow-xl items-center">
          <div className="absolute">
            <div className="p-10 border-[yellow] bg-white  z-50 shadow-xl flex flex-wrap justify-center items-center gap-3 md:gap-8 md:divide-x-2">
              <div className="md:px-4">
                <ResultsTitle
                  title={"IP Address"}
                  titleResult={locationData.ip}
                />
              </div>
              <div className="md:px-4">
                <ResultsTitle
                  title={"Location"}
                  titleResult={`${locationData?.location?.city || ""}, ${
                    locationData?.location?.region || ""
                  }`}
                />
              </div>
              <div className="md:px-4">
                <ResultsTitle
                  title={"Timezone"}
                  titleResult={`UTC ${locationData?.location?.timezone || ""}`}
                />
              </div>
              <div className="md:px-4">
                <ResultsTitle title={"ISP"} titleResult={locationData.isp} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAP */}
      <div className="relative z-[2] w-full h-[700px]">
        <Map location={locationData?.location} />
      </div>


    </div>
  );
}
