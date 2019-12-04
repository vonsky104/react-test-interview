import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import {Album, AppState} from "../utils/interfaces";
import { closeAccordion, openAccordion } from "../store/actions";
import './AlbumComponent.css';

type AlbumProps = {
    id: string | undefined
    bandName: string | undefined
    album: Album | undefined
};

const dispatchOpenAccordionAction = ((dispatch: Dispatch<any>, id: string) => dispatch(openAccordion(id)));
const dispatchCloseAccordionAction = ((dispatch: Dispatch<any>, id: string) => dispatch(closeAccordion(id)));

const handleClick = (isAccordionOpen: boolean, dispatch: Dispatch<any>, id: string) => {
    isAccordionOpen ? dispatchCloseAccordionAction(dispatch, id) : dispatchOpenAccordionAction(dispatch, id)
};

const handleUlHeight = (ulElement: any, setUlElementHeight: any) => {
    if (!ulElement) {
        return 0;
    }

    setUlElementHeight(ulElement.clientHeight)
};

const AlbumComponent: React.FC<AlbumProps> = ({ album, bandName }) => {
    const [ulElementHeight, setUlElementHeight] = useState(0);
    const dispatch = useDispatch();
    const isAccordionOpen = useSelector((state: AppState) => state.accordions[album!.id]);

    return (
        <div className='accordion__wrapper'>
            <div className='accordion__header'>
                <p className='accordion__text'>{bandName} - {album!.name}</p>
                <button onClick={() => handleClick(isAccordionOpen, dispatch, album!.id)}>
                    <FontAwesomeIcon icon={isAccordionOpen ? faMinusCircle : faPlusCircle} />
                </button>
            </div>
            <div style={{ maxHeight: isAccordionOpen ?  ulElementHeight : 0}} className={classNames('accordion__content', { 'isOpen': isAccordionOpen })}>
                <ul ref={(ulElement: any) => handleUlHeight(ulElement, setUlElementHeight)}>
                    {album!.songs.map((song: any, index: number) => <li key={index}>{song}</li>)}
                </ul>
            </div>
        </div>
    )
};

export { AlbumComponent };
