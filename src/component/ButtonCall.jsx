import { Button, Avatar } from "@mui/material/";

const ButtonCall = ({ colorText, colorText2 }) => {
  return (
    <div className="wrapper-button flex flex-col lg:flex-row items-center gap-[28px]">
      <Button
        className="dark:bg-[#1976d2] dark:text-[#fff]"
        variant="contained"
        sx={{
          borderRadius: "14px",
          backgroundColor: "#0075FF",
          padding: "17px 24px",
          fontSize: "16px",
        }}
      >
        Get a free quote
      </Button>
      <div className="call flex flex-col lg:flex-row items-center gap-[16px]">
        <a href="tel:+4145672109">
          <Button
            sx={{
              minHeight: "1px",
              minWidth: "1px",
              borderRadius: "50px",
            }}
          >
            <Avatar
              className="dark:bg-[#fff]"
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #DCDDEB",
                height: "71px",
                width: "71px",
              }}
            >
              <img src="src/assets/phone.svg" alt="" />
            </Avatar>
          </Button>
        </a>
        <div className="text">
          <p
            className={`uppercase text-[16px] text-[${colorText2}] dark:text-[#fff]`}
          >
            Call us now
          </p>
          <p
            className={`text-[${colorText}] text-[28px] font-[700] dark:text-[#fff]`}
          >
            (414) 567 - 2109
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonCall;
