import { createSelector } from "reselect";
import {
    CLOSE_ACCORDION,
    CLOSE_ALL_ACCORDIONS,
    OPEN_ACCORDION,
    OPEN_ALL_ACCORDIONS,
    PREPARE_ACCORDIONS_STATE
} from "./action_types";
import { AccordionsState, AppState } from "../utils/interfaces";

const initialState: AccordionsState = {};

const isAnyAccordionOpenedSelector = createSelector(
    (state: AppState) => state.accordions,
    accordions => Object.values(accordions).some(state => state)
);

function accordionsReducer (state = initialState, action: any): AccordionsState {
    switch (action.type) {
        case OPEN_ACCORDION:
            return {
                ...state,
                [action.payload]: true,
            };
        case CLOSE_ACCORDION:
            return {
                ...state,
                [action.payload]: false,
            };
        case OPEN_ALL_ACCORDIONS: {
            const newState: AccordionsState = {};
            Object.assign(newState, state);
            for (let key in newState) {
                newState[key] = true;
            }

            return newState;
        }
        case CLOSE_ALL_ACCORDIONS: {
            const newState: AccordionsState = {};
            Object.assign(newState, state);
            for (let key in newState) {
                newState[key] = false;
            }

            return newState;
        }
        case PREPARE_ACCORDIONS_STATE:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}

export { accordionsReducer, isAnyAccordionOpenedSelector };
