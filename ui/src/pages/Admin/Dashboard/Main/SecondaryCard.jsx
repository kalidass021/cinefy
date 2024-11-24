const SecondaryCard = ({ pill, content, info, gradient }) => {
  return (
    <div
      className={`w-[15rem] h-[12rem] relative mt-10 bg-gradient-to-b
  ${gradient} rounded-lg shadow-lg ml-5`}
    >
      {/* pill */}
      <div
        className={`absolute -top-4 left-[5rem] border bg-gradient-to-b
    ${gradient} rounded-full p-2 text-sm text-gray-800 font-semibold`}
      >
        {pill}
      </div>
      {/* content */}
      <div className='flex items-center justify-center h-full'>
        <h2 className='text-5xl font-bold text-white'>{content}</h2>
      </div>
      {/* info */}
      <div className='absolute bottom-4 left-12 text-sm text-white'>{info}</div>
    </div>
  );
};

export default SecondaryCard;
