import { combineReducers, Reducer } from 'redux';
import { bandsReducer } from './bands-reducer';
import { errorsReducer } from "./errors-reducer";
import { accordionsReducer } from "./accordions-reducer";
import { AppState } from "../utils/interfaces";

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
    data: bandsReducer,
    error: errorsReducer,
    accordions: accordionsReducer
});
