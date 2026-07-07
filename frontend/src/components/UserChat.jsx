import userImg from '../assets/images/user.jpg'

const UserChat = ({msg}) => {
  return (
    <div className="flex items-center justify-end gap-[1.1rem] h-auto overflow-x-scroll">
      <div className="px-[0.5em] py-[0.2em] md:px-[1.1rem] md:py-[0.8vh] text-sm md:text-[1.1rem] lg:rounded-br-none md:rounded-br-none rounded-[1em] md:rounded-[2.5em] rounded-br-none bg-linear-to-r from-blue-600 to-violet-600">
        {msg}
      </div>
      <div className="w-[2em] h-[2em] md:w-[3em] md:h-[3em] rounded-full overflow-hidden shrink-0">
        <img className="object-cover" src={userImg} alt="" />
      </div>
    </div>
  );
};

export default UserChat;
