const StatisticsList = ({ image, title, desc }) => {
  return (
    <div className="post flex items-center gap-[16px]">
      <div className="wrapper-image">
        <img src={image} alt="" />
      </div>
      <div className="wrapper-text text-left">
        <p className="uppercase text-[18px] text-[#6E7191] dark:text-[#fff]">
          {title}
        </p>
        <p className="text-[28px] font-[700] dark:text-[#fff]">{desc}</p>
      </div>
    </div>
  );
};

export default StatisticsList;
