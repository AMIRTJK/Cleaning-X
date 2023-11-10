const OurServicePost = ({ image, title, desc }) => {
  return (
    <div className="post lg:w-[30%] flex flex-col justify-center items-center gap-[39px]">
      <div className="wrapper-image">
        <img src={image} alt="" />
      </div>
      <div className="wrapper-text text-center flex flex-col gap-[16px]">
        <p className="text-[28px] font-[700] dark:text-[#fff]">{title}</p>
        <p className="text-[21px] text-[#6E7191] dark:text-[#fff]">{desc}</p>
      </div>
    </div>
  );
};

export default OurServicePost;
