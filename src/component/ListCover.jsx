const ListCover = ({ title }) => {
  return (
    <li className="flex items-center gap-[8px] w-[43%] lg:w-[50%]">
      <div className="accept bg-[#EDF5FF] h-[26px] w-[26px] rounded-[13px] flex justify-center items-center">
        <img src="src/assets/check.svg" alt="" />
      </div>
      <p className="text-[18px] font-[700] dark:text-[#fff]">{title}</p>
    </li>
  );
};

export default ListCover;
