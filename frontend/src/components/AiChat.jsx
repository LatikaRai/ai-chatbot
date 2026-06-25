import aiImg from '../assets/images/ai.jpg'
import ReactMarkdown from 'react-markdown'

const AiChat = ({msg}) => {
  return (
    <div className="flex items-end justify-start gap-[1.1rem] h-auto max-w-[85%] md:max-w-[70%]">
      <div className="w-[2em] h-[2em] md:w-[3em] md:h-[3em] shrink-0 rounded-full overflow-hidden">
        <img
          className="object-cover"
          src={aiImg}
          alt=""
        />
      </div>
      <div className="px-[0.5em] py-[0.2em] md:px-[1em] md:py-[0.9vh] text-sm md:text-[1.1rem] rounded-[1em] md:rounded-[2.5em] lg:rounded-bl-none md:rounded-bl-none text-gray-800 bg-linear-to-l from-gray-200 to-gray-400">
        <ReactMarkdown>
          {msg}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AiChat;
