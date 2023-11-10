import { useEffect, useState } from "react";
import axios from "axios";
import Switcher from "./component/Switcher";
import OurServicePost from "./component/OurServicePost";
import StatisticsList from "./component/StatisticsList";
import ButtonCall from "./component/ButtonCall";
import ListCover from "./component/ListCover";
import ArticlesPost from "./component/ArticlesPost";
import ModalAdd from "./component/ModalAdd";
import ModalEdit from "./component/ModalEdit";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import FilterStatus from "./component/FilterStatus";
// import FilterAllCity from "./component/FilterAllCity";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DoneIcon from "@mui/icons-material/Done";
import PhoneIcon from "@mui/icons-material/Phone";
import "./App.css";

import {
  Box,
  Typography,
  Stack,
  Link,
  Container,
  TextField,
  Button,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemText,
} from "@mui/material/";

// json-server --watch src/data/db.json --port 3000

function App() {
  // API
  const API = "http://localhost:3000/data";
  // useState for DATA
  const [data, setData] = useState([]);
  // useState for ModalAdd
  const [modalAdd, setModalAdd] = useState(false);
  // List useState for Input ModalAdd ================
  const [addImage, setAddImage] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const [addDesc, setAddDesc] = useState("");
  // useState for ModalEdit
  const [modalEdit, setModalEdit] = useState(false);
  // List useState for Input ModalEdit ================
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  // Put Id click to Input Edit
  const [idx, setIdx] = useState(null);
  // Функция GET
  async function getData() {
    try {
      let { data } = await axios.get(API);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }
  // Функция POST
  async function postData() {
    try {
      let { data } = await axios.post(API, {
        id: Date.now(),
        image: addImage,
        title: addTitle,
        desc: addDesc,
        isComplete: false,
      });
      getData();
      setAddImage("");
      setAddTitle("");
      setAddDesc("");
    } catch (error) {
      console.error(error);
    }
    setModalAdd(false);
  }
  // Функция DELETE
  async function deleteData(clickedId) {
    try {
      let { data } = await axios.delete(API + "/" + clickedId);
      getData();
    } catch (error) {}
  }
  // Функция checked
  async function checkedData(mainData, newData) {
    try {
      let response = await fetch(API + "/" + mainData, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      getData();
    } catch (error) {
      console.error(error);
    }
  }
  // ===========================EDIT=========
  // Функция Добавления в input Modal Edit
  function editPost(clickedItem) {
    setEditImage(clickedItem.image);
    setEditTitle(clickedItem.title);
    setEditDesc(clickedItem.desc);
    setModalEdit(true);
    setIdx(clickedItem.id);
  }
  // Функция сохранить
  function putSave() {
    const editedObj = {
      image: editImage,
      title: editTitle,
      desc: editDesc,
    };
    setModalEdit(false);
    putEdit(idx, editedObj);
  }
  // Функция Edit
  async function putEdit(idx, editedObj) {
    try {
      let { data } = await axios.put(API + "/" + idx, editedObj);
      getData();
    } catch (error) {
      console.error(error);
    }
  }
  // ==========================================

  // Функция Search - без axios
  let [getSearch, setGetSearch] = useState("");
  async function searchData() {
    try {
      let response = await fetch(API + "?q=" + getSearch);
      let data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <body className="dark:bg-[#000]">
        {/* Section 1 */}
        <div className="container">
          <header>
            <nav className="py-[34px] flex justify-between items-center">
              <nav className="left flex justify-between items-center gap-x-[40px]">
                <div className="logo w-[178px]">
                  <a href="">
                    <img
                      src="src/assets/logo-header.svg"
                      alt=""
                      className="w-[100%] inline dark:hidden"
                    />
                    <img
                      src="src/assets/logo-header-dark.svg"
                      alt=""
                      className="w-[100%] hidden dark:inline"
                    />
                  </a>
                </div>
                <ul className="menu hidden lg:flex justify-between items-center gap-[22px] dark:text-[#fff]">
                  <li className="dark:text-[#fff] text-[18px]">
                    <a href="">Home</a>
                  </li>
                  <li className="dark:text-[#fff] text-[18px]">
                    <a href="">About</a>
                  </li>
                  <li className="dark:text-[#fff] text-[18px]">
                    <a href="">Services</a>
                  </li>
                  <li className="dark:text-[#fff] text-[18px]">
                    <a href="">Pages</a>
                  </li>
                  <li className="dark:text-[#fff] text-[18px]">
                    <a href="">Contact</a>
                  </li>
                </ul>
              </nav>
              <div className="sign flex justify-between items-center gap-[40px]">
                <div className="card hidden lg:block">
                  <p className="dark:text-[#fff] text-[18px]">Cart (0)</p>
                </div>
                <div className="nav-button hidden lg:block">
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
                </div>
                <div className="burger-menu block lg:hidden">
                  <MenuIcon />
                </div>
                <Switcher />
              </div>
            </nav>
          </header>
          {/* Section 2 */}
          <div className="wrapper-quality flex flex-col mt-[50px] lg:mt-[0px] lg:flex-row justify-between items-center">
            <aside className="left lg:w-[50%]">
              <div className="wrapper-text text-center lg:text-left flex flex-col gap-[22px]">
                <p className="text-[28px] lg:text-[68px] font-[700] lg:leading-[73.98px] dark:text-[#fff]">
                  Quality cleaning for your home
                </p>
                <p className="text-[18px] lg:text-[21px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  Condimentum mauris sit cursus amet id non neque pharetra nulla
                  ornare sed facilisis senectus dapibus nibh ultrices eget
                  suscipit aliquet et nulla magna lacus penatibus.
                </p>
                <ButtonCall colorText2="#6E7191" />
              </div>
            </aside>
            <aside className="right mt-[50px] lg:mt-[0px]">
              <img src="src/assets/bg-fullscreen.svg" alt="" />
            </aside>
          </div>
          {/* Section 3 */}
          <div className="wrapper-our-service mt-[239px] pb-[80px] lg:pb-[240px] border-b-[1px] border-[#DCDDEB] dark:border-[#000]">
            <div className="wrapper-text text-center mx-auto lg:w-[44%] ">
              <h2 className="text-[48px] font-[700] dark:text-[#fff]">
                How our service works?
              </h2>
              <p className="text-[21px] text-[#6E7191] mt-[21px] dark:text-[#fff]">
                Sagittis nibh scelerisque vitae eget vulputate sem elementum sed
                neque nisi felis non ultrices massa id egestas quam velit
                pretium nu.
              </p>
            </div>
            <div className="wrapper-post mt-[64px] flex flex-col gap-y-[50px] lg:gap-y-[0px] lg:flex-row justify-between items-center flex-wrap">
              <OurServicePost
                image="src/assets/our-service-post-1.svg"
                title="1. Schedule online"
                desc="Sagittis nibh scelerisque vitae egetolment vulputate sem elementum sed n."
              />
              <OurServicePost
                image="src/assets/our-service-post-2.svg"
                title="2. Pay online easily"
                desc="Vitae ut accumsan blandit ullamcorperolm suscipit dui gravida amet at nunc."
              />
              <OurServicePost
                image="src/assets/our-service-post-3.svg"
                title="3. Get your house cleaned"
                desc="Nunc maecenas sollicitudin metus tellus mattis sed porttitor cursus eleifend."
              />
            </div>
            <div className="wrapper-button flex flex-col lg:flex-row justify-center gap-[28px] mt-[56px]">
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
              <Button
                className="dark:text-[#fff]"
                variant="outlined"
                sx={{ padding: "17px 24px", borderRadius: "14px" }}
              >
                Explore services
              </Button>
            </div>
          </div>
          {/* Section 4 */}
          <div className="wrapper-cleaning-service lg:py-[240px] border-b-[1px] border-[#DCDDEB] dark:border-[#000]">
            <div className="wrapper-text text-center mx-auto lg:w-[50%]">
              <h3 className="text-[48px] font-[700] dark:text-[#fff]">
                Our cleaning services have no comparison
              </h3>
              <p className="text-[21px] text-[#6E7191] mt-[21px] dark:text-[#fff]">
                Lobortis mattis odio leo eget mauris met aliquet semper molestie
                sollicitudin congue massa mauris lectus vitae cras viverra
                gravida sapien.
              </p>
            </div>
            <div className="wrapper-list flex flex-col lg:flex-row justify-between items-center flex-wrap mt-[32px] mx-auto w-[60%] gap-[40px]">
              <StatisticsList
                image="src/assets/cleaning-icons-1.svg"
                title="clients"
                desc="3,480+"
              />
              <StatisticsList
                image="src/assets/cleaning-icons-2.svg"
                title="Jobs done"
                desc="12,540+"
              />
              <StatisticsList
                image="src/assets/cleaning-icons-3.svg"
                title="Employees"
                desc="100+"
              />
            </div>
            <div className="wrapper-image flex justify-center mt-[40px] ">
              <img
                src="src/assets/cleaning-services-video.svg"
                alt=""
                className="cursor-pointer"
              />
            </div>
          </div>
          {/* Section 5 */}
          <div className="wrapper-professional-services py-[80px] lg:py-[240px]">
            <div className="wrapper-text flex gap-[20px] flex-col lg:flex-row justify-between items-center lg:gap-[50px]">
              <h4 className="text-[28px] mb-[25px] lg:mb-[0px] lg:text-[48px] lg:w-[40%] text-center lg:text-left font-[700] lg:leading-[57.98px]  dark:text-[#fff]">
                Take a look at our professional services
              </h4>
              <TextField
                onInput={() => searchData()}
                value={getSearch}
                onChange={(event) => setGetSearch(event.target.value)}
                label="search"
                className="w-[100%] lg:w-[58%]"
              />
              <Button
                onClick={() => setModalAdd(true)}
                className="dark:text-[#fff] dark:bg-[#1976d2] dark:hover:bg-[#1976d2e9] lg:w-[auto] w-[100%]"
                variant="contained"
                sx={{ padding: "17px 24px", borderRadius: "14px" }}
              >
                Add
              </Button>
            </div>
            <div className="wrapper-post flex flex-col  lg:flex-row justify-start items-center flex-wrap gap-[150px] lg:gap-[30px] mt-[125px] lg:mt-[48px]">
              {data.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="post flex flex-col justify-center items-center lg:w-[31%] p-[29px] shadow-[0px 2px 6px #14142B0A] border-[1px] border-[#EFF0F6] rounded-[16px] h-[494px] gap-[24px]"
                  >
                    <div className="wrapper-image">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="wrappe-text text-center flex flex-col justify-center items-center gap-[13px]">
                      <p
                        className={`text-[24px] font-[700] dark:text-[#fff] ${
                          item.isComplete ? "line-through text-[#25252550]" : ""
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-[21px] text-[#6E7191] dark:text-[#fff]">
                        {item.desc}
                      </p>
                    </div>
                    <div className="panel-control flex">
                      <Button onClick={() => editPost(item)}>
                        <EditIcon />
                      </Button>
                      <Button sx={{ minHeight: "1px", minWidth: "1px" }}>
                        <input
                          type="checkbox"
                          checked={item.isComplete}
                          onClick={() => {
                            item.isComplete = !item.isComplete;
                            checkedData(item.id, item);
                          }}
                          className="w-[22px] h-[22px] cursor-pointer"
                        />
                      </Button>
                      <Button onClick={() => deleteData(item.id)}>
                        <DeleteIcon />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Section 6 */}
          <div className="wrapper-follow  rounded-[24px] pr-[20px] pl-[20px] pb-[40px]  bg-[#211F54] flex flex-col lg:flex-row justify-between items-center gap-[72px] h-[676px] lg:pr-[100px]">
            <aside className="left lg:w-[50%] h-[676px] bg-[url(src/assets/follow.svg)] bg-contain bg-no-repeat"></aside>
            <aside className="right lg:w-[50%]">
              <div className="wrapper-text text-center lg:text-left flex flex-col gap-[16.5px]">
                <p className="text-[#fff] text-[16px] font-[700] uppercase">
                  Covid-19 sanitization
                </p>
                <p className="text-[#fff] font-[700] text-[28px] lg:text-[48px] lg:leading-[57.98px]">
                  We follow guidelines to keep you safe from the COVID-19 virus
                </p>
                <p className="text-[#fff] text-[21px] leading-[30.01px]">
                  Lobortis mattis odio leo eget mauris met aliquet semper
                  molestie sollicitudin congue massa mauris lectus.
                </p>
                <ButtonCall colorText="#fff" colorText2="#fff" />
              </div>
            </aside>
          </div>
          {/* Section 7 */}
          <div className="wrapper-cover mt-[80px] lg:mt-[200px] flex flex-col lg:flex-row justify-between items-center gap-[80px]">
            <aside className="left">
              <div className="wrapper-image">
                <img src="src/assets/cover.svg" alt="" />
              </div>
            </aside>
            <aside className="right lg:w-[50%]">
              <div className="wrapper-text flex text-center lg:text-left flex-col gap-[20px]">
                <p className="text-[48px] font-[700] leading-[57.98px] dark:text-[#fff]">
                  We cover all areas of your home or office
                </p>
                <p className="text-[18px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <ul className="wrapper-list flex justify-between items-center gap-y-[24px] flex-wrap lg:w-[70%]">
                  <ListCover title="Bathrooms" />
                  <ListCover title="Bedrooms" />
                  <ListCover title="Kitchens" />
                  <ListCover title="Offices" />
                  <ListCover title="Living Rooms" />
                  <ListCover title="Businesses" />
                  <ListCover title="Carpets" />
                  <ListCover title="Windows" />
                </ul>
              </div>
            </aside>
          </div>
          {/* Section 8 */}
          <div className="wrapper-makes-different flex flex-col lg:flex-row mt-[80px] lg:mt-[200px] justify-between items-center pb-[200px] border-b-[1px] border-[#DCDDEB] dark:border-[#000]">
            <aside className="left lg:w-[40%]">
              <div className="wrapper-text flex flex-col gap-[20px]">
                <h5 className="text-[48px] font-[700] leading-[57.98px] dark:text-[#fff]">
                  What makes us different?
                </h5>
                <p className="text-[18px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <p className="text-[12px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  Sed ut perspiciatis unde omnis iste natus error sit atem
                  accusantium doloremque laudantiu sed ut.
                </p>
                <div className="wrapper-list flex flex-col gap-[50px] lg:gap-[0px] lg:flex-row justify-between items-center lg:w-[80%] mb-[20px]">
                  <div className="list flex flex-col items-center lg:items-start gap-[3px]">
                    <p className="text-[54px] font-[700] dark:text-[#fff]">
                      10
                      <span className="text-[54px] text-[#0075FF] font-[400] dark:text-[#fff]">
                        +
                      </span>
                    </p>
                    <p className="dark:text-[#fff]">Years</p>
                  </div>
                  <div className="list flex flex-col gap-[3px] items-center lg:items-start">
                    <p className="text-[54px] font-[700] dark:text-[#fff]">
                      5k
                      <span className="text-[54px] text-[#0075FF] font-[400] dark:text-[#fff]">
                        +
                      </span>
                    </p>
                    <p className="dark:text-[#fff]">Clients</p>
                  </div>
                  <div className="list flex flex-col gap-[3px] items-center lg:items-start">
                    <p className="text-[54px] font-[700] dark:text-[#fff]">
                      20k
                      <span className="text-[54px] text-[#0075FF] font-[400] dark:text-[#fff]">
                        +
                      </span>
                    </p>
                    <p className="dark:text-[#fff]">Jobs done</p>
                  </div>
                </div>
                <Button
                  className="dark:bg-[#1976d2] dark:text-[#fff] lg:w-[40%] "
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
              </div>
            </aside>
            <aside className="right">
              <div className="wrapper-image">
                <img src="src/assets/makesDifferent.svg" alt="" />
              </div>
            </aside>
          </div>
          {/* Section 9 */}
          <div className="wrapper-articles lg:py-[240px]">
            <div className="wrapper-content flex flex-col lg:flex-row justify-between items-center">
              <div className="wrapper-text lg:w-[37%]">
                <h6 className="text-[48px] font-[700] leading-[57.98px] dark:text-[#fff]">
                  Articles & resources
                </h6>
                <p className="text-[21px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  Lobortis mattis odio leo eget mauris met aliquet semper
                  molestie sollicitudin congue massa mauris lectus.
                </p>
              </div>
              <div className="wrapper-button flex flex-col lg:flex-row justify-center gap-[28px] mt-[56px]">
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
                <Button
                  className="dark:text-[#fff]"
                  variant="outlined"
                  sx={{ padding: "17px 24px", borderRadius: "14px" }}
                >
                  Explore services
                </Button>
              </div>
            </div>
            <div className="wrapper-post gap-[50px] lg:gap-[0px] flex flex-col lg:flex-row justify-between items-center flex-wrap mt-[40px]">
              <ArticlesPost
                img="src/assets/articles-1.svg"
                title=" 8 best vacuum cleaners to clean any mess for your home in 2022"
                desc="Lorem ipsum dolor sit amet conse ctetur adip iscing elit justo quis
                odio sit sit ac port titor sit males."
                date="Jan 28, 2022"
              />
              <ArticlesPost
                img="src/assets/articles-2.svg"
                title="How to properly disinfect your phone and other electronics"
                desc="Lorem ipsum dolor sit amet conse ctetur adip iscing elit justo quis odio sit sit ac port titor sit males."
                date="Feb 1, 2022"
              />
            </div>
          </div>
        </div>
        {/* Section 10 */}
        <div className="wrapper-request bg-[#F7F9FC] dark:bg-[#000]">
          <div className="container">
            <div className="wrapper-content flex flex-col lg:flex-row justify-between items-center gap-[60px] py-[80px] lg:py-[240px]">
              <aside className="left lg:w-[50%]">
                <div className="wrapper-text flex flex-col gap-[15px] border-b-[1px] border-[#DCDDEB] pb-[51px]">
                  <p className="text-[48px] leading-[57.98px] font-[700] dark:text-[#fff]">
                    Request a free cleaning quote today
                  </p>
                  <p className="text-[21px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                    In dignissim euismod pretium amet enim a eu nam ut urna
                    accumsan pellentesque lacus duis pharetra eutortor.
                  </p>
                  <div className="call flex items-center gap-[16px]  ">
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
                        className={`uppercase text-[16px] text-[#6E7191] dark:text-[#fff]`}
                      >
                        Call us now
                      </p>
                      <p className={`text-[28px] font-[700] dark:text-[#fff]`}>
                        (414) 567 - 2109
                      </p>
                    </div>
                  </div>
                </div>
                <div className="wrapper-button flex flex-col items-center lg:items-start gap-[10px] mt-[55px]">
                  <p className="text-[28px] font-[700] dark:text-[#fff]">
                    Not convinced yet?
                  </p>
                  <p className="text-[21px] text-center lg:text-left leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                    Massa bibendum consectetur maurisid gravida purus, dolor dui
                    amet morbi non nunc urna purus diam.
                  </p>
                  <Button
                    variant="contained"
                    sx={{
                      padding: "26px 39px",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 10px #14142B0A",
                      border: "1px solid #EFF0F6",
                      color: "#211F54",
                      fontSize: "18px",
                      fontWeight: "700",
                      borderRadius: "14px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#0075FF",
                        color: "#fff",
                        border: "1px solid #0075FF",
                      },
                    }}
                  >
                    Browse our packages
                  </Button>
                </div>
              </aside>
              <aside className="right lg:w-[50%]">
                <form className="flex flex-col gap-[32px] py-[50px] lg:py-[80px] px-[10px] lg:px-[61px] border-[1px] border-[#EFF0F6] shadow-sm  bg-[#fff] rounded-[16px]">
                  <div className="wrapper-inputs flex justify-between items-center flex-wrap gap-[32px]">
                    <TextField
                      className="lg:w-[45%] w-[100%]"
                      label="Full name"
                      sx={{}}
                    />
                    <TextField
                      className="lg:w-[45%] w-[100%]"
                      label="Phone number"
                      sx={{}}
                    />
                    <TextField
                      className="lg:w-[45%] w-[100%]"
                      label="Address"
                      sx={{}}
                    />
                    <TextField
                      className="lg:w-[45%] w-[100%]"
                      label="Email"
                      sx={{}}
                    />
                    <TextField
                      className="lg:w-[45%] w-[100%]"
                      label="Requested service"
                      sx={{}}
                    />
                    <TextField
                      className="lg:w-[45%] w-[100%]"
                      label="Day of service"
                      sx={{}}
                    />
                    <TextField
                      label="Add a note"
                      multiline
                      rows={4}
                      sx={{
                        width: "100%",
                      }}
                    />
                  </div>
                </form>
              </aside>
            </div>
          </div>
        </div>
        {/* Section 11 */}
        <footer>
          <div className="container">
            <div className="footer-top flex flex-col lg:flex-row justify-between items-start gap-[40px] py-[40px] lg:py-[140px] border-b-[1px] border-[#DCDDEB]">
              <div className="post lg:w-[24%]  flex flex-col gap-[20px]">
                <p className="text-[28px] leading-[36.01px] font-[700] dark:text-[#fff]">
                  Quality cleaning for your home
                </p>
                <p className="text-[text-[18] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  Lorem ipsum dolor sit amet cteturdo adipiscing elit, sed do
                  eiusmo.
                </p>
                <div className="wrapper-link flex justify-between items-center gap-[16px]">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#EDF5FF",
                      minWidth: "40px",
                      height: "36px",
                      borderRadius: "8px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#EDF5FF",
                      minWidth: "40px",
                      height: "36px",
                      borderRadius: "8px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#EDF5FF",
                      minWidth: "40px",
                      height: "36px",
                      borderRadius: "8px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#EDF5FF",
                      minWidth: "40px",
                      height: "36px",

                      borderRadius: "8px",
                    }}
                  ></Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#EDF5FF",
                      minWidth: "40px",
                      height: "36px",
                      borderRadius: "8px",
                    }}
                  ></Button>
                </div>
              </div>
              <div className="post flex flex-col gap-[20px]">
                <p className="text-[20px] font-[700] dark:text-[#fff]">
                  Contact us
                </p>
                <p className="text-[18px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  1827 Nickel Road, Los Angeles, CA, 90017, United States
                </p>
                <p className="text-[18px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  (414) 567 - 2109
                </p>
                <p className="text-[18px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                  contact@cleaning.com
                </p>
              </div>
              <div className="post  flex flex-col gap-[20px]">
                <p className="text-[20px] font-[700] dark:text-[#fff]">Hours</p>
                <div className="wrapper-text">
                  <p className="text-[18px] font-[700] dark:text-[#fff]">
                    Monday to Friday
                  </p>
                  <p className="text-[18px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                    6:00 AM - 9:00 PM
                  </p>
                </div>
                <div className="wrapper-text">
                  <p className="text-[18px] font-[700] dark:text-[#fff]">
                    Saturday & Sunday
                  </p>
                  <p className="text-[18px] leading-[30.01px] text-[#6E7191] dark:text-[#fff]">
                    8:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
              <div className="post lg:w-[20%]  ">
                <p className="text-[20px] font-[700] dark:text-[#fff]">
                  Get a free estimate
                </p>
                <div className="wrapper-text flex flex-col items-start gap-[13px]">
                  <p className="dark:text-[#fff]">(414) 567 - 2109</p>
                  <p className="dark:text-[#fff]">
                    Lorem ipsum dolor sit amet ectetur adipiscing elit, sed do
                    eiusmod.
                  </p>
                  <Button
                    className="dark:bg-[#1976d2] dark:text-[#fff] "
                    variant="contained"
                    sx={{
                      borderRadius: "14px",
                      backgroundColor: "#0075FF",
                      padding: "26px 38px",
                      fontSize: "14px",
                    }}
                  >
                    Request a free quote
                  </Button>
                </div>
              </div>
            </div>
            <div className="footer-bottom flex flex-col lg:flex-row mt-[40px] lg:mt-[0px] justify-between items-center">
              <div className="logo w-[178px]">
                <a href="">
                  <img
                    src="src/assets/logo-header.svg"
                    alt=""
                    className="w-[100%] inline dark:hidden"
                  />
                  <img
                    src="src/assets/logo-header-dark.svg"
                    alt=""
                    className="w-[100%] hidden dark:inline"
                  />
                </a>
              </div>
              <div className="wrapper-text py-[30px] lg:py-[40px]">
                <p className="text-center lg:text-left leading-[30px] lg:leading-[auto] text-[18px] dark:text-[#fff]">
                  {" "}
                  Copyright © Cleaning X | Designed by{" "}
                  <a
                    href=""
                    className="text-[18px] text-[#0075FF] underline dark:text-[#64cbff]"
                  >
                    BRIX Templates
                  </a>{" "}
                  - Powered by
                  <a
                    href=""
                    className="text-[18px] text-[#0075FF] underline dark:text-[#64cbff]"
                  >
                    {" "}
                    Webflow
                  </a>{" "}
                  -{" "}
                  <a
                    href=""
                    className="text-[18px] text-[#0075FF] underline dark:text-[#64cbff]"
                  >
                    Licenses
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* Modal Add */}
      </body>
      <ModalAdd
        modal={modalAdd}
        set={setModalAdd}
        post={postData}
        setAddImage={setAddImage}
        setAddTitle={setAddTitle}
        setAddDesc={setAddDesc}
        addImage={addImage}
        addTitle={addTitle}
        addDesc={addDesc}
      />
      <ModalEdit
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        putEdit={putEdit}
        setEditImage={setEditImage}
        setEditTitle={setEditTitle}
        setEditDesc={setEditDesc}
        editImage={editImage}
        editTitle={editTitle}
        editDesc={editDesc}
        putSave={putSave}
      />
    </>
  );
}

export default App;
