"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import Spinner from "../Spinner";
const LinkedinOptimization = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const pathname = usePathname()
    const [formSubmitted, setFormSubmitted] = useState(token);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [isVerified, setIsVerified] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            setFormSubmitted(true);

            setFormSubmitted(false);
            setLoading(true)

            try {
                const res = await fetch("/api/send-mail", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: formData.email,
                        name: formData.name,
                        path: pathname
                    }),
                });
                const data = await res.json();
                console.log("API Response:", data);
                const success = data?.success
                const isVerified = data?.isVerified
                if (success == true) {
                    setLoading(false)
                    setIsVerified(true);

                }
                if (isVerified == true) {
                    setIsVerified(false);
                    window.location.href = data.url;

                }
            } catch (error) {
                console.error("Error calling API:", error);
            }
        } else {
            alert("Please fill both fields!");
        }
    };

    // if (loading) {
    //     return (
    //         <h1>loading......</h1>
    //     )
    // }



    return (
        <div style={{ height: "100vh", position: "relative" }}>
            {/* PDF Background */}
            <iframe
                src="/resources/LinkedIn Optimization — QuantumCrafters Studio.pdf"
                width="100%"
                height="100%"
                style={{
                    border: "none",
                    filter: formSubmitted ? "none" : "blur(15px)",
                    pointerEvents: formSubmitted ? "auto" : "none",
                }}
            />

            {/* Popup Form */}
            {!formSubmitted && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 bg-opacity-50"
                    style={{ zIndex: 10 }}
                >
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Access PDF
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="p-2 border rounded-lg"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-2 border rounded-lg"
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex justify-center"
                            >
                                {loading ? <Spinner /> : "Submit & View PDF"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {isVerified && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/20 bg-opacity-50"
                    style={{ zIndex: 10 }}
                >
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80  grid justify-center items-center">
                        <i class="checkmark text-[#9ABC66] text-[100px] m-auto">✓</i>
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            Please check your email inbox to verify your account.
                        </h2>

                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkedinOptimization;
