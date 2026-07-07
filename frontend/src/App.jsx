import { useEffect, useState } from "react";
import aiImg from "./assets/images/ai.jpg";
import UserChat from "./components/UserChat";
import AiChat from "./components/AiChat";
import userImg from "./assets/images/user.jpg";
import { io } from "socket.io-client";
import { TypeAnimation } from "react-type-animation";

const App = () => {
  const [chatMsg, setChatMsg] = useState("");
  const [socket, setSocket] = useState(null);
  const [newMsg, setNewMsg] = useState();
  const [messages, setMessages] = useState([]);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  const SendHandler = (e) => {
    e.preventDefault();
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        parts: chatMsg,
      },
    ]);
    socket.emit("ai-message", chatMsg);

    setChatMsg("");
  };

  useEffect(() => {
    let socketInstance = io(import.meta.env.VITE_API_URL);
    socketInstance.on("connect", () => {
      console.log("frontend connected:", socketInstance.id);
    });
    socketInstance.on("ai-message-response", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: data.response,
        },
      ]);
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.off("ai-message-response");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="h-screen w-full bg-[#0C0C0C]">
      {/* top */}
      <header className="w-full h-[8vh] md:h-[10vh] flex items-center gap-[1.2rem] px-[2.8vw] md:px-[1vw] bg-[#080808] border border-b-white/60">
        <img
          className="w-[2.3em] h-[2.3em] md:w-16 md:h-16 rounded-full object-center object-cover"
          src={aiImg}
          alt=""
        />
        <div className='flex flex-col leading-3 text-white font-["ArboriaBook"]'>
          <h1 className="text-sm md:text-lg font-semibold">Xoni</h1>
          <div className="flex items-center gap-[0.9em] text-xs">
            <h3 className="md:text-[0.9rem]">AI Assistant</h3>
            <div className="w-[0.4em] h-[0.4em] rounded-full bg-green-500"></div>
            <h3 className="text-green-500">Online</h3>
          </div>
        </div>
        <div></div>
      </header>

      {/* mid */}
      {messages.length === 0 ? (
        <section className='h-[84vh] md:h-[77vh] font-mono text-gray-300 text-sm md:text-[1.2em] w-full flex flex-col gap-[0.5em] items-center justify-center'>
          <img
            className="w-[10em] h-[10em] rounded-full mb-[1em] object-cover drop-shadow-lg drop-shadow-blue-500/80"
            src={aiImg}
            alt=""
          />
          <TypeAnimation
            sequence={["Hi, I'm Xoni.", 500, () => setShowSecond(true)]}
            speed={50}
            cursor={false}
          />
          {showSecond && (
            <TypeAnimation
              sequence={[
                "I'm your AI assistant.",
                500,
                () => setShowThird(true),
              ]}
              speed={50}
              cursor={false}
            />
          )}
          {showThird && (
            <TypeAnimation
              sequence={["How can I help you today?", 500]}
              speed={50}
            />
          )}
        </section>
      ) : (
        <section className='h-[84vh] md:h-[77vh] w-full overflow-auto px-[1vw] py-[2vh] font-["ArboriaBook"]'>
          {messages.map((msg, idx) => {
            return (
              <div key={idx} className="text-white w-full mb-[0.5em]">
                {msg.role === "user" ? (
                  <UserChat msg={msg.parts} />
                ) : (
                  <AiChat msg={msg.parts} />
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* bottom */}
      <section className='w-full h-[8vh] md:h-[13vh] flex items-center gap-[1em] md:gap-[1.2vw] px-[2.8vw] md:px-[1vw] font-["ArboriaBook"]'>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              SendHandler(e);
            }
          }}
          onChange={(e) => setChatMsg(e.target.value)}
          value={chatMsg}
          className="h-[5vh] md:h-[6vh] w-[88vw] md:w-[90vw] text-sm md:text-[1.1rem] bg-[#F5F5F5] flex-1 rounded-full px-[1.2em] md:p-[1vw] outline-0"
          placeholder="Ask me anything..."
          type="text"
        />
        <button
          onClick={(e) => {
            SendHandler(e);
          }}
          className="w-[2.1em] h-[2.1em] md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#673bf6]"
        >
          <i className="ri-send-plane-fill text-sm md:text-[1.5rem] rotate-45 text-white "></i>
        </button>
      </section>
    </div>
  );
};

export default App;
