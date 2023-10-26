// import actions from "redux-form/lib/actions";
import { ADD_QUERRY, CURRENT_USER } from "../action/type";

const initialState = {};

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return action.payload;
    case ADD_QUERRY:
      console.log(action.payload.id, state.studentProfile[0].Student_ID);
      const seletProfile = [...state.studentProfile].filter(
        (item) => item.Student_ID == action.payload.id
      );
      seletProfile[0].Queries.push(action.payload);

      const updatedProfiles = [...state.studentProfile].filter(
        (item) => item.Student_ID != action.payload.id
      );
      return {
        ...state,
        studentProfile: [...updatedProfiles, ...seletProfile],
      };
    default:
      return state;
  }
}
