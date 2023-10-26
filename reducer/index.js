import {combineReducers} from "redux";
import currentUser from "./currentUser"
import isToken from "./isToken";
import * as Notifications from 'expo-notifications';
export default combineReducers({
    currentUser,
    isToken
})

// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: true,
//     }),
//   });
