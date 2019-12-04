import React from 'react';
import {AlbumComponent} from "./AlbumComponent";
import {Album, Band} from "../utils/interfaces";
import './BandComponent.css';

type BandComponentProps = {
    band: Band | undefined
}

const BandComponent: React.FC<BandComponentProps> = ({ band }) => {
    if (band === undefined) {
        return null;
    }

    const { name, albums } = band;
    return (
        <div className='band__wrapper'>
            {albums.map((album: Album | undefined) => (
                <li key={album!.id}>
                    <AlbumComponent id={album!.id} bandName={name} album={album}/>
                </li>
            ))}
        </div>
    );
};

export { BandComponent };
