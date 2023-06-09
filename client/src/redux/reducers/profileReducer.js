import { DELETE_PROFILE, SET_PROFILE, SET_PROFILES, SET_PROFILE_USER } from "../types";

const intitialState = {
  profiles: [],
  profile: {},
  prof:{},
};
export default function (state = intitialState, action) {
  switch (action.type) {
    case SET_PROFILE_USER:
      return {
        ...state,
        
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
      case DELETE_PROFILE:
        return {
          ...state,
          profiles: state.profiles.filter(p =>p._id !== action.payload),
        };  

    default:
      return state;
  }
}
