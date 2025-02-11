import '../css/SWOT.css';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import * as io from "socket.io-client";
import { default as React, useState, useEffect } from "react";
//import socket from "./Socket";
  
// interface SwotAnalysisResult {
//     swotAnalysis: string
// } 

const SWOT: React.FC = () => {
    //const [swotAnalysisResult, setSwotAnalysisResult] = useState<SwotAnalysisResult | null>(null);
    const [strengths, setStrengths] = useState("");
    const [weaknesses, setWeaknesses] = useState("");
    const [opportunities, setOpportunities] = useState("");
    const [threats, setThreats] = useState("");

    const socket = io.connect("http://localhost:8081");

    useEffect(() => {

    console.log('inSwotComponent');

    socket.on("swotAnalysisResult", (data) => {
        //setSwotAnalysisResult(data);
        console.log('inSwotComponentEvent');
        console.log('swotFrontend', JSON.stringify(data, null, 2));
    
        let swot="";
        swot=data;

       // Assuming the entire SWOT content is in `data` as a single string
    const sections: string[] = swot
    .split(/(Strengths:|Weaknesses:|Opportunities:|Threats:)/) // Split by each section title
    .map((str: string) => str.trim())
    .filter((str) => str !== ""); // Remove any empty strings

    // Map section titles to their content
    const parsedData = {
        Strengths: sections[sections.indexOf("Strengths:") + 1] || "",
        Weaknesses: sections[sections.indexOf("Weaknesses:") + 1] || "",
        Opportunities: sections[sections.indexOf("Opportunities:") + 1] || "",
        Threats: sections[sections.indexOf("Threats:") + 1] || ""
    };

    // Set each section in state
    setStrengths(parsedData.Strengths);
    setWeaknesses(parsedData.Weaknesses);
    setOpportunities(parsedData.Opportunities);
    setThreats(parsedData.Threats);

    });

    return () => {
      socket.off("swotAnalysisResult"); // Clean up the event listener
      socket.disconnect(); // Disconnect socket when component unmounts
  };
}, []);


    // const navigate = useNavigate();
    // const handleNavigateToVoicetest = () => {
    //     navigate('/voicetest');
    //   };


  return (
    <div className="swot">
        <div className="sw">
                                <label>Strength</label>
                                <textarea readOnly value={strengths}></textarea>
                                <label>Weaknesses</label>
                                <textarea readOnly value={weaknesses}></textarea>
                            </div>
                            <div className="ot">
                                <label>Opportuinities</label>
                                <textarea readOnly value={opportunities}></textarea>
                                <label>Threats</label>
                                <textarea readOnly value={threats}></textarea>
                            </div>
    </div>
  )
}

export default SWOT;