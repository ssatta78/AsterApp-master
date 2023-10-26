import axios from "axios";
import Asyncstorage from "@react-native-async-storage/async-storage";
import config from "../config/config.json";
import { CURRENT_USER, TOKEN, EMPTY_TOKEN, ADD_QUERRY } from "./type";

const userApi = "AppLogin/GetUserLogin";
const tokenApi = "AppLogin/GetUserLoginByToken";
const sendNot = "http://194.233.80.159:75/api/AppLogin/NotificationToken";

export const loginRes = (d, spinnerRender, navigation) => async (dispatch) => {
  const token = await Asyncstorage.getItem("UserToken");

  if (token) {
    const tokenRes = await axios.post(config.baseUrl + tokenApi, {
      UserToken: token,
    });
    dispatch({
      type: CURRENT_USER,
      payload: tokenRes.data,
    });
  } else {
    const res = await axios.post(config.baseUrl + userApi, {
      UserName: d.userName,
      Password: d.password,
      Token: "abe9fad8-7852-43ed-9ab9-fcea44da49b8",
    });
    if (res.data.Error) {
      dispatch({
        type: CURRENT_USER,
        payload: res.data,
      });
    } else {
      const tokenRes = await axios.post(config.baseUrl + tokenApi, {
        UserToken: res.data.UserInfo.UserToken,
      });
      await Asyncstorage.setItem("UserToken", res.data.UserInfo.UserToken);
      dispatch({
        type: CURRENT_USER,
        payload: tokenRes.data,
      });
    }
    spinnerRender();
  }
};
export const getToken = () => async (dispatch) => {
  const token = await Asyncstorage.getItem("UserToken");
  dispatch({
    type: TOKEN,
    payload: token,
  });
};

export const logOut = () => async (dispatch) => {
  await Asyncstorage.removeItem("UserToken");
  await Asyncstorage.removeItem("pushToken");
  dispatch({
    type: EMPTY_TOKEN,
    payload: null,
  });
};

export const saveToken = (User_Id, token) => async (dispatch) => {
  const tokenRes = await axios.post(sendNot, {
    User_Id: User_Id,
    NotificationToken: token,
  });
  console.log("not", tokenRes.data);
};

export const submitLeave = (data) => async (dispatch) => {
  const token = await Asyncstorage.getItem("UserToken");
  console.log({ ...data, Image: undefined, Token: token });
  axios
    .post(config.baseUrl + "Leaves/ApplyLeave", { ...data, Token: token })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};

export const addQuerry = (data, cb) => async (dispatch) => {
  fetch(config.baseUrl + "StudentQueries/AskQuery", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      StudentId: data.studentID,
      QueryNo: data.queryNo,
      Query: data.query,
      CampusId: data.compusId,
      StudentFAQId: data.studentfaqID,
      AcademicYearId: data.year,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("resssss", responseJson);
      dispatch({
        type: ADD_QUERRY,
        payload: {
          ...responseJson.Data.Query,
          id: data.studentID,
          // Query: "THE QUICK BROWN",
          // Status: "Dismiss",
          // Date: "22-September-2021 01:05:PM"
        },
      });
      cb();
    })
    .catch((error) => {
      console.error(error);
    });
};
