"use client";
import { useContext, useEffect, useState } from "react";
import Bot from "./Bot";
import { botContext } from "@/context/Bot.context";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { chatflow } from "@/lib/chatBot.data";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { GrLinkNext } from "react-icons/gr";


const flowMap = Object.fromEntries(chatflow.map(step => [step.key, step]));

const ChatBotComponent = ({ children }) => {
    const initialState = [{ type: "bot", key: "nova_intro" }];
    const { botActivate, setBotActivate } = useContext(botContext);
    const [chatHistory, setChatHistory] = useState(initialState);
    const [isTyping, setIsTyping] = useState(false);
    const [pendingStep, setPendingStep] = useState(null);

    const [responseChatHistory, setResponseChatHistory] = useState([]);
    const [ResponseIsTyping, setResponseIsTyping] = useState(false);

    const [showMessage, setShowMessage] = useState(false);

    const [startBot, setStartBot] = useState(false);

    useEffect(() => {

        const botMessage = localStorage.setItem('botMessage', false);
        const botIntro = localStorage.getItem('botIntro');
        console.log("Bot Intro:", botIntro);

        if (botIntro) {
            setStartBot(true);
        }
    }, []);





    // Handle Select Option's
    const handleOptionClick = (option) => {
        setTimeout(() => {
            setResponseChatHistory(prev => [...prev, { type: "bot", key: option.next }])
        }, 250);
    };

    // Handle Response Select Option's
    const handleResponseOptionClick = (option) => {
        setResponseChatHistory(prev => [...prev, { type: "user", text: option.textDescription }]);
        setIsTyping(true);
        setTimeout(() => {
            setResponseChatHistory(prev => [...prev, { type: "bot", key: option.next }])
            setIsTyping(false);
        }, 700);
    };


    // Handle Select Info's
    const handleContinue = (nextKey) => {
        if (nextKey) {
            setIsTyping(true);
            setTimeout(() => {
                setResponseChatHistory(prev => [...prev, { type: "bot", key: nextKey }]);
                setIsTyping(false);
            }, 700);
        }
    };

    // Handle new option's clickable
    const isLatestBot = (currentIndex) => {
        for (let i = chatHistory.length - 1; i >= 0; i--) {
            if (chatHistory[i].type === "bot") return i === currentIndex;
        }
        return false;
    };

    // Handle new option's clickable
    const isLatestResponseBot = (currentIndex) => {
        for (let i = responseChatHistory.length - 1; i >= 0; i--) {
            if (responseChatHistory[i].type === "bot") return i === currentIndex;
        }
        return false;
    };

    // Handle Back Button
    const handleBackClick = () => {
        if (responseChatHistory.length > 0) {
            setResponseChatHistory([]);
        } else {
            const botMessage = localStorage.setItem('botMessage', true);
            setBotActivate(false);
            setTimeout(() => {
                setShowMessage(true);
            }, 3000);

            setTimeout(() => {
                setShowMessage(false);
            }, 8000);
        }
    }

    // handle bot start
    const handleStartBot = () => {
        const setStorage = localStorage.setItem('botIntro', true);
        console.log("Setting botIntro:", setStorage);
        setStartBot(true);
    }

    // handle popup close
    const handlePopUpClose = () => {
        const botMessage = localStorage.setItem('botMessage', true);
        setBotActivate(false);
        setTimeout(() => {
            setShowMessage(true);
        }, 3000);

        setTimeout(() => {
            setShowMessage(false);
        }, 8000);
    }



    // Handle Message render
    const renderMessage = (entry, index) => {
        console.log("entry:", entry);
        if (entry.type === "user") {
            return (
                <div key={index} className="w-[100%] p-[.5rem]  rounded mb-[.7rem] bg-[#F1813B]">
                    <p className="chatData text-[0.81rem] leading-tight">{entry.text}</p>
                </div>
            );
        }

        const step = flowMap[entry.key];
        console.log("steps:", step);

        if (!step) return null;


        return (
            <div key={index} className="botChatBox w-[100%] flex gap-[.7rem] items-start px-[1rem]">
                {/* <Image src={`/images/botImages/sparkle.svg`} alt={`bot_Image`} width={20} height={20} className="mt-[.5rem]" /> */}
                <div className="float-left userOption w-[100%] p-[.5rem]  rounded mb-[.7rem]">
                    <p className="chatData text-[0.81rem] leading-tight whitespace-pre-line text-justify">{step.message}</p>

                    {/* {responseChatHistory.length === 0 ? :} */}
                    {step.type === "question" && isLatestBot(index) && (



                        <div className="mt-2 flex flex-col gap-2 ">
                            {step.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleOptionClick(opt)}
                                    className="bg-white  mt-2 rounded-[1rem] text-sm hover:bg-gray-200 text-left w-full px-[0.8rem] py-[.8rem] cursor-pointer leading-tight"
                                >
                                    <span className="text-[0.87rem] text-[#000000] font-bold ">{opt?.textHeading}</span>
                                    {!!opt?.textHeading && <br />}
                                    <span className="text-[0.75rem]  text-[#1b1b1b]">{opt?.textDescription}</span>
                                </button>
                            ))}
                        </div>
                    )}


                    {step.type === "info" && (
                        <div className="mt-2">
                            {step.calendlyLink ? (
                                <a
                                    href={step.calendlyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#F1813B] text-white text-sm px-3 py-1 rounded hover:bg-[#F1813B] inline-block"
                                >
                                    Book a Mentor Call ➝
                                </a>
                            ) : step.next && (
                                <button
                                    onClick={() => handleContinue(step.next)}
                                    className="bg-[#F1813B] text-white text-sm px-3 py-1 rounded hover:bg-[#F1813B] cursor-pointer"
                                >
                                    Continue ➝
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    };

    // Handle Response Message render
    const renderResponseMessage = (entry, index) => {
        if (entry.type === "user") {
            return (
                <div className="outerContainer w-[100%] gap-[.7rem] px-[1rem]">

                    <div key={index} className="float-right  py-[1.125rem] px-[1.18rem] rounded-tl-[1.5rem] rounded-bl-[1.5rem] rounded-br-[1.5rem] mb-[.7rem] bg-[#F1813B] text-[#ffffff]">
                        <p className="chatData text-[0.81rem] leading-tight">{entry.text}</p>
                    </div>
                </div>
            );
        }

        const step = flowMap[entry.key];
        console.log("Step Data :", step);
        if (!step) return null;
        console.log("STEP OPTIONS:", step.options)

        return (
            <div key={index} className="botChatBox w-[100%] flex gap-[.7rem] items-start px-[1rem]">

                <div className="float-left userOption w-[100%]   rounded mb-[.7rem]">
                    <div className="messageContainer w-[77%] py-[1.125rem] px-[1.18rem] rounded-tl-[1.5rem]  rounded-tr-[1.5rem]  rounded-br-[1.5rem] mb-[.7rem] bg-[#e5e5e5] text-[#505050]">
                        <p className="chatData text-[0.81rem] leading-tight whitespace-pre-line text-justify">{step.message}</p>
                    </div>

                    {step.type === "question" && isLatestResponseBot(index) && (
                        <div className="mt-2 flex flex-col gap-2 ">
                            {step.options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleResponseOptionClick(opt)}
                                    className="bg-white  mt-2 rounded-[1rem] text-sm hover:bg-gray-200 text-left w-full px-[0.8rem] py-[.8rem] cursor-pointer leading-tight"
                                >
                                    <span className="text-[0.87rem] text-[#000000] font-bold ">{opt?.textHeading}</span>
                                    {!!opt?.textHeading && <br />}
                                    <span className="text-[0.75rem]  text-[#1b1b1b]">{opt?.textDescription}</span>
                                </button>
                            ))}
                        </div>
                    )}


                    {step.type === "info" && (
                        <div className="mt-2">
                            {step.calendlyLink ? (
                                <a
                                    href={step.calendlyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#F1813B] text-white text-sm px-3 py-1 rounded hover:bg-[#F1813B] inline-block"
                                >
                                    Book a Mentor Call ➝
                                </a>
                            ) : step.next && (
                                <button
                                    onClick={() => handleContinue(step.next)}
                                    className="bg-[#F1813B] text-white text-sm px-3 py-1 rounded hover:bg-[#f1753bd9] cursor-pointer"
                                >
                                    Continue ➝
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    };

    // Main Component
    return (
        <>
            <div className="childrenWrapper w-[100%]" onClick={handlePopUpClose}>

                {children}
            </div>
            <div className={`chatBot fixed bottom-[1rem] right-[1rem] transition-all duration-300 ease-in-out ${botActivate ? "chatBotChatingBox w-[23rem] h-[40rem] bg-white/60 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[45px] border border-white/65 rounded-[1.56rem] overflow-hidden" : "w-[9rem] h-[9rem] rounded-[50%]"} z-[100] flex justify-center items-center `}>

                {/* Intro Screen */}
                {botActivate && !startBot && (<div className="chatBox flex flex-col items-center w-[100%] h-[100%]  pb-[1.8rem] overflow-y-scroll no-scrollbar bg-[#fff] px-[1.75rem] pt-[4.9rem] ">

                    {/* Heading */}
                    <div className="headingContainer w-[70%]">
                        <p className="heading text-center text-[1.4rem] font-bold text-[#F1813B]">You AI Assistant</p>
                    </div>

                    {/* Description */}
                    <p className="description text-center w-[80%] text-[0.9rem] font-medium mt-[0.5rem] text-[#757575] leading-tight">Using this software,you can ask you questions and receive articles using artificial intelligence assistant</p>

                    {/* Image */}
                    <div className="imageContainer w-[90%] h-[60%] mt-[2rem]">
                        <Image src={"/images/botImages/introBot.svg"} alt={"bot_intro_image"} width={320} height={323} className="w-[100%] h-[100%]" />
                    </div>

                    {/* Button */}
                    <div className=" buttonContainer w-[100%] flex  items-center bg-[#F1813B] px-[1rem] rounded-[1.2rem] py-[0.9rem] mt-[2rem] cursor-pointer" style={{ boxShadow: "inset 0px -3px 8px -4px rgba(0, 0, 0, 1), inset 0px 3px 8px -4px rgba(255, 255, 255, 1)" }} onClick={handleStartBot}>
                        <button className="startButton float-none w-[100%] text-center font-bold text-[1.18rem] text-[#ffffff] cursor-pointer">Continue </button>
                        <GrLinkNext className="float-right text-[#ffffff]" />
                    </div>

                </div>)}

                {botActivate && startBot && (
                    <div className="chatBox flex flex-col items-center w-[100%] h-[100%]  pb-[1.8rem] overflow-y-scroll no-scrollbar">

                        {/* Top Bar */}
                        <div className="topbar sticky top-[0rem] w-[100%] h-[4rem] flex items-center  z-[30] bg-[#ffffff] pt-[1.8rem] pb-[1.8rem] rounded px-[.5rem]">
                            {/* Back Button */}
                            <div className="circles w-[1.8rem] h-[1.8rem]  flex justify-center items-center cursor-pointer" onClick={handleBackClick}>
                                <MdOutlineKeyboardBackspace className="text-[#292D32] text-[1.3rem]" />
                            </div>

                            {/* Logo */}
                            <div className="logoContainer ml-[1rem] flex items-center gap-[.5rem] w-[75%]">



                                {/* Right Container */}
                                <div className='rightContainer flex flex-col  justify-center'>

                                    {/* Upper Container */}
                                    <div className='upperContainer'>
                                        <p className="heading leading-5 text-[#383838] text-[1.25rem] font-bold">QCS Nova</p>
                                    </div>

                                    {/* Lower Container */}
                                    <div className='lowerContainer'>
                                        <p className="status leading-5 text-[#3ABF38]">•Online</p>
                                    </div>

                                </div>

                            </div>

                            {/* Back Button */}
                            {/* {responseChatHistory.length > 0 && <div className="backButtonContainer w-[1.5rem] h-[1.5rem]">
                                <Image src={"/images/botImages/back.svg"} width={24} height={24} alt={"back_button"} className="w-[100%] h-[100%] cursor-pointer" onClick={handleBack}/>
                            </div>} */}

                        </div>

                        {/* Chat Messages */}
                        <div className="chatContainer w-[100%] h-[100%] mt-[1.5rem]">
                            {responseChatHistory.length > 0
                                ? responseChatHistory.map((entry, index) => renderResponseMessage(entry, index))
                                : chatHistory.map((entry, index) => renderMessage(entry, index))
                            }

                            {isTyping && (
                                <div className="botChatBox w-[100%] flex gap-[.7rem] items-start">
                                    <Image src={`/images/botImages/sparkle.svg`} alt="bot" width={20} height={20} className="mt-[.5rem]" />
                                    <div className="float-left userOption w-[70%] p-[.5rem] bg-[#b49eee]/20 rounded mb-[.7rem]">
                                        <p className="chatData text-[0.81rem] leading-tight">Typing...</p>
                                    </div>
                                </div>
                            )}

                            <div className="emptySpace w-[100%] my-[2rem]"></div>
                        </div>
                    </div>
                )}

                {/* Bot Bubble Icon */}
                <div className={`botContainer flex justify-center items-center ${botActivate ? "w-[30%] h-[30%] hidden" : "w-[100%] h-[100%] rounded-[50%] block"}`}>

                    {/* Bot Message */}
                    {showMessage && <div className="alertBox absolute right-[3rem] top-[-1.7rem] w-[14.5rem]  px-[.5rem] py-[.5rem] bg-[#F1813B] rounded-[.5rem]  ">
                        <p className="alert text-[.8rem] z-[50] text-[#ffffff] font-medium">Tap me if you want to see me again!!</p>
                        <div className="corner w-[1rem] h-[1rem] bg-[#F1813B] absolute rotate-[45deg] right-[15%] z-[25]"></div>
                    </div>
                    }
                    {/* Chat Robot */}
                    <Bot />
                </div>
            </div>
        </>
    );
};

export default ChatBotComponent;
