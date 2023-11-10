import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Button } from "@mui/material/";

const ModalEdit = ({
  modalEdit,
  setModalEdit,
  putEdit,
  setEditImage,
  setEditTitle,
  setEditDesc,
  editImage,
  editTitle,
  editDesc,
  putSave,
}) => {
  return (
    <div
      className={`${
        modalEdit === true ? "block" : "hidden"
      } modal-add fixed w-[100%] h-[100vh] bg-[#00000020] top-0 left-0 z-10`}
    >
      <div className="modal-content h-[500px] w-[100%] lg:w-[50%] absolute bg-[#fff] translate-x-[-50% -50%] lg:left-[25%] top-[25%] rounded-[20px]">
        <div className="wrapper-text p-[40px] flex flex-col items-center gap-[40px]">
          <div className="wrapper-close flex items-center justify-between w-[100%]">
            <p className="text-center flex mx-auto text-[30px] uppercase font-[600]">
              Add Post
            </p>
            <Button onClick={() => setModalEdit(false)}>
              <CloseIcon />
            </Button>
          </div>
          <TextField
            onChange={(event) => setEditImage(event.target.value)}
            value={editImage}
            label="image"
            className="w-[100%]"
          />
          <TextField
            onChange={(event) => setEditTitle(event.target.value)}
            value={editTitle}
            label="title"
            className="w-[100%]"
          />
          <TextField
            onChange={(event) => setEditDesc(event.target.value)}
            value={editDesc}
            label="desc"
            className="w-[100%]"
          />
          <Button onClick={() => putSave()} variant="contained">
            Добавить пост
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
