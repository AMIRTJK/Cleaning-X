import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Button } from "@mui/material/";

const ModalAdd = ({
  modal,
  set,
  post,
  setAddImage,
  setAddTitle,
  setAddDesc,
  addImage,
  addTitle,
  addDesc,
}) => {
  return (
    <div
      className={`${
        modal === true ? "block" : "hidden"
      } modal-add fixed w-[100%] h-[100vh] bg-[#00000020] top-0 left-0 z-10`}
    >
      <div className="modal-content h-[500px] w-[100%] lg:w-[50%] absolute bg-[#fff] translate-x-[-50% -50%] lg:left-[25%] top-[25%] rounded-[20px]">
        <div className="wrapper-text p-[40px] flex flex-col items-center gap-[40px]">
          <div className="wrapper-close flex items-center justify-between w-[100%]">
            <p className="text-center flex mx-auto text-[30px] uppercase font-[600]">
              Add Post
            </p>
            <Button onClick={() => set(false)}>
              <CloseIcon />
            </Button>
          </div>
          <TextField
            onChange={(event) => setAddImage(event.target.value)}
            value={addImage}
            label="image"
            className="w-[100%]"
          />
          <TextField
            onChange={(event) => setAddTitle(event.target.value)}
            value={addTitle}
            label="title"
            className="w-[100%]"
          />
          <TextField
            onChange={(event) => setAddDesc(event.target.value)}
            value={addDesc}
            label="desc"
            className="w-[100%]"
          />
          <Button onClick={() => post()} variant="contained">
            Добавить пост
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
