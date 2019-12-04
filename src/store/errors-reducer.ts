import { RAISE_ERROR, REMOVE_ERRORS } from "./action_types";
import { createSelector } from "reselect";
import { AppState, ErrorState } from "../utils/interfaces";

const initialState: ErrorState = {
    message: '',
    isError: false,
};

const errorSelector = createSelector((state: AppState) => state.error, error => error);

function errorsReducer (state = initialState, action: any): ErrorState {
  switch(action.type) {
      case RAISE_ERROR:
          return {
              message: action.payload.message,
              isError: true
          };
      case REMOVE_ERRORS:
          return {
              ...initialState
          };
      default:
          return state;
  }
}

export { errorsReducer, errorSelector }