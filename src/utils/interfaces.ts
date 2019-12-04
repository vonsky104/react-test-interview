export interface FetchedSong {
    band: string
    album: string
    song: string
}

export interface ErrorState {
    message: string,
    isError: boolean
}

export interface BandsState {
    bands: Band[]
}

export interface AppState {
    data: BandsState
    error: ErrorState
    accordions: AccordionsState
}

export interface AccordionsState {
    [key: string]: boolean
}

export interface Album {
    id: string
    name: string
    songs: Array<string | undefined>
}

export interface Band {
    name: string
    albums: Array<Album | undefined>
}