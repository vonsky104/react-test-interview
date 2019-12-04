import {
    FETCH_BANDS,
    RAISE_ERROR,
    SortedByBandType,
    REMOVE_ERRORS,
    PREPARE_ACCORDIONS_STATE,
    OPEN_ACCORDION, CLOSE_ACCORDION, OPEN_ALL_ACCORDIONS, CLOSE_ALL_ACCORDIONS
} from './action_types';
import { Dispatch } from "redux";
import { axios } from "../config/axios-control";
import { generateIdFromBandAndAlbum } from "../utils/helpers";
import { Album, Band, FetchedSong } from "../utils/interfaces";

export function fetchData() {
    return (dispatch: Dispatch<any>) => {
        axios
            .get('data.json')
            .then(response => {
                const songs = response.data;

                const sortedByBand = songs.reduce((acc: Array<SortedByBandType>, fetchedSong: FetchedSong) => {
                    const band = fetchedSong.band;
                    const album = fetchedSong.album;
                    const song = fetchedSong.song;
                    const existingBandIndex = acc.indexOf(acc.find((e: Band | undefined) => e!.name === band));
                    const albumId = generateIdFromBandAndAlbum(band, album);

                    if (existingBandIndex < 0) {
                        const bandToPush = {
                            name: band,
                            albums: [{
                                id: albumId,
                                name: album,
                                songs: [song]
                            }]
                        };

                        acc.push(bandToPush);
                        return acc;
                    }

                    const existingBand = acc[existingBandIndex];
                    const existingAlbums = existingBand!.albums;
                    const existingAlbumIndex = existingAlbums.indexOf(existingAlbums.find((e: Album | undefined) => e!.name === album));

                    if (existingAlbumIndex < 0) {
                        const objectToInsert = {
                            id: albumId,
                            name: album,
                            songs: [song]
                        };

                        acc[existingBandIndex]!.albums.push(objectToInsert);
                        return acc;
                    }

                    const existingAlbum = existingAlbums[existingAlbumIndex];

                    existingBand!.albums[existingAlbumIndex] = {
                        id: existingAlbum!.id,
                        name: existingAlbum!.name,
                        songs: [...existingAlbum!.songs, song]
                    };

                    return acc;
                }, []);

                dispatch({ type: REMOVE_ERRORS });
                dispatch({
                    type: FETCH_BANDS,
                    payload: sortedByBand,
                });
                dispatch({
                    type: PREPARE_ACCORDIONS_STATE,
                    payload: prepareAccordionsState(sortedByBand)
                });
            })
            .catch(e => {
                console.log(e);
                dispatch({
                    type: RAISE_ERROR,
                    payload: {
                        message: e,
                    }
                });
            });
    }
}

export function openAccordion(id: string) {
    return (dispatch: Dispatch<any>) => dispatch({ type: OPEN_ACCORDION, payload: id });
}

export function closeAccordion(id: string) {
    return (dispatch: Dispatch<any>) => dispatch({ type: CLOSE_ACCORDION, payload: id });
}

export function openAllAccordions() {
    return (dispatch: Dispatch<any>) => dispatch({ type: OPEN_ALL_ACCORDIONS });
}

export function closeAllAccordions() {
    return (dispatch: Dispatch<any>) => dispatch({ type: CLOSE_ALL_ACCORDIONS });
}

function prepareAccordionsState(bands: Band[]) {
    return bands.reduce((acc: object, band: Band) => {
        const { albums } = band;
        if (!albums) {
            return acc;
        }

        albums.forEach((album: Album | undefined) => {
            acc = {
                ...acc,
                [album!.id]: false,
            }
        });

        return acc;
    }, {});
}