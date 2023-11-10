import { Button } from "@mui/material/";

const ArticlesPost = ({ title, desc, date, img }) => {
  return (
    <div
      className={`post lg:w-[49%] h-[596px] lg:px-[30px] flex flex-col justify-end bg-[url(${img})] bg-contain bg-no-repeat`}
    >
      <div className="content flex flex-col gap-[17px] p-[50px] bg-[#fff] border-[1px] border-[#EFF0F6] rounded-[24px]">
        <p className="text-[24px] font-[700] leading-[34.01px]">{title}</p>
        <p className="text-[21px] leading-[30.01px] text-[#6E7191]">{desc}</p>
        <div className="wrapper-text flex justify-between items-center">
          <p className="text-[18px] font-[700]">{date}</p>
          <Button variant="contained">Check it</Button>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPost;
