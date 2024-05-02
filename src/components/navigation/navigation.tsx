/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { ChatItem } from "../chatItem/chatItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AIContext } from "../../contexts/ai-context";
import styles from "../button/button.module.css";
import Drawer from "../drawer/drawer";

export const Navigation = () => {
  const [chatTitle, setChatTitle] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const { chatId } = useParams() as any;
  const { newConvo, conversations } = useContext(AIContext);
  const navigate = useNavigate();

  useEffect(() => {
    chatTitle;
    chatOpen;
    setChatOpen;
    if (chatId && conversations[chatId]) {
      setChatTitle(conversations[chatId].title);
    } else {
      setChatTitle("");
    }
  }, [chatId, conversations]);

  const newChatHandler = () => {
    const id = conversations.length;
    newConvo();
    navigate(`/chat/${id}`);
  };

  const SettingsButton = () => {
    return (
      <div className="rounded-full flex justify-start items-center gap-2 border-[#EFEFEF] hover:bg-gray-200 cursor-pointer transition-all duration-300 border-[1px] px-2 py-2">
        <div className="rounded-full flex justify-center items-center bg-[#EFEFEF] p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6  block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p className="font-bold">Configuración</p>
      </div>
    );
  };

  const ProfileButton = () => {
    return (
      <div className="rounded-full flex justify-start items-center gap-2 border-[#EFEFEF] border-[1px] px-2 py-2">
        <div className="p-2">
          <img src="/profile.png" className="w-8 h-8" />
        </div>
        <p className="font-bold">Alfredo Barrientos</p>
      </div>
    );
  };

  const TopMenu = () => {
    const [openLeft, setOpenLeft] = useState(false);

    return (
      <div className="flex justify-between items-center px-5 py-3.5 border-b border-gray-200">
        <div onClick={() => setOpenLeft(!openLeft)}>
          <img src="/menu.png" className="cursor-pointer" />
          <Drawer open={openLeft} side="left" setOpen={setOpenLeft} />
        </div>
        <div></div>
      </div>
    );
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="w-[348px] flex flex-col overflow-x-hidden shrink-0 bg-white h-full">
          <div className="h-full w-[348px]">
            <div className="flex-1 w-full h-full relative">
              <nav className="flex h-full min-h-0 flex-col pb-3.5">
                <div className="sticky left-0 right-0 top-0 z-20 pt-3.5 ">
                  <div className="mb-5 px-5">
                    <img src={"/logo.png"} />
                  </div>
                  <div className="flex justify-center items-center gap-2 mb-5 px-5">
                    <button
                      onClick={newChatHandler}
                      className={`${styles["btn"]} bg-[#5661F6] hover:bg-[#4C53D7] flex gap-2 justify-center items-center rounded-full text-white h-12 flex-1`}
                    >
                      <img src="/add.png" />
                      <p className="font-medium">Nuevo chat</p>
                    </button>
                    <button className="rounded-full bg-black w-12 h-12 flex justify-center items-center">
                      <img src={"/search.png"} />
                    </button>
                  </div>
                  <div className="px-5 my-0 flex justify-between border-t border-b border-gray-200/50 py-4">
                    <p className="text-[#6A6969] font-bold text-[14px]">
                      Tus conversaciones
                    </p>
                    <p className="text-[#5661F6] font-bold text-[14px]">
                      Limpiar todo
                    </p>
                  </div>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto h-full">
                  <div className="px-5">
                    {conversations.map((convo, index) => (
                      <Link key={index} to={`/chat/${index}`}>
                        <ChatItem
                          convo={convo}
                          isActive={chatId === index.toString()}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className=" px-5 pb-5">
                  <div className="flex flex-col gap-3">
                    <SettingsButton />
                    <ProfileButton />
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <TopMenu />
      </div>
    </>
  );
};
