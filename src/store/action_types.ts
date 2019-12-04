import {Band, FetchedSong} from "../utils/interfaces";

export const FETCH_BANDS = 'FETCH_BANDS';
export const RAISE_ERROR = 'RAISE_ERROR';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';
export const PREPARE_ACCORDIONS_STATE = 'PREPARE_ACCORDIONS_STATE';
export const OPEN_ACCORDION = 'OPEN_ACCORDION';
export const CLOSE_ACCORDION = 'CLOSE_ACCORDION';
export const OPEN_ALL_ACCORDIONS = 'OPEN_ALL_ACCORDIONS';
export const CLOSE_ALL_ACCORDIONS = 'CLOSE_ALL_ACCORDIONS';

interface FetchBandsAction {
    type: typeof FETCH_BANDS
    payload: FetchedSong[]
}

interface FetchBandsError {
    type: typeof RAISE_ERROR
}

export type SortedByBandType = Band | undefined

export type BandsActionTypes = FetchBandsAction | FetchBandsError
