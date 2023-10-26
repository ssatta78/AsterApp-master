// import actions from "redux-form/lib/actions";
import {TOKEN,EMPTY_TOKEN} from "../action/type"
const inialState=null;

export default function isToken(state=inialState,action){
    switch(action.type){
        case TOKEN:
            return action.payload
        case  EMPTY_TOKEN:
            return action.payload
        default:
            return state
    }

}
