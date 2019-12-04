import { FETCH_BANDS } from "./action_types";
import { createSelector } from 'reselect';
import { AppState, BandsState } from "../utils/interfaces";

const initialState: BandsState = {
    bands: [],
};

const bandsSelector = createSelector((state: AppState) => state.data.bands, bands => bands);

function bandsReducer(state = initialState, action: any): BandsState {
    switch (action.type) {
        case FETCH_BANDS:
            return {
                bands: [...action.payload],
            };
        default:
            return state
    }
}

export { bandsReducer, bandsSelector };
