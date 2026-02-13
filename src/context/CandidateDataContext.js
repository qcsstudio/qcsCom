"use client";
import { createContext, useState } from "react";

const CandidateIntialData = {
    showTest: false,
    setShowTest: () => { },
    CreateCandidateAPI: () => { },
    candidateData: {},
    setCandiDateData: () => { },
    UpdateCandidateAPI: () => { }
};

export const CandidateDataContext = createContext(CandidateIntialData);

export const CandidateDataContextProvider = ({ children }) => {

    const [showTest, setShowTest] = useState(CandidateIntialData.showTest);
    const [candidateData, setCandiDateData] = useState(CandidateIntialData.candidateData);

    const CreateCandidateAPI = async (data) => {
        try {
            const res = await fetch("/api/candidates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // ✅ Directly send data, no extra { data }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const responseData = await res.json();
            setShowTest(true);
            return responseData;
        } catch (error) {
            console.log("Error:", error);
            alert("You Given The Test Already!");
        }
    };

    const UpdateCandidateAPI = async (email, data) => {
        try {
            const res = await fetch("/api/candidates", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, ...data }) // Include email in the request body
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const responseData = await res.json();
            setShowTest(true);
            return responseData;
        } catch (error) {
            console.log("Error:", error);
            alert("You Given The Test Already!");
        }
    };



    return (
        <CandidateDataContext.Provider
            value={{
                showTest,
                setShowTest,
                CreateCandidateAPI,
                candidateData,
                setCandiDateData,
                UpdateCandidateAPI
            }}
        >
            {children}
        </CandidateDataContext.Provider>
    );
};
