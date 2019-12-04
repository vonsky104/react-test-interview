import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { Dispatch } from 'redux';
import { bandsSelector } from "./store/bands-reducer";
import { closeAllAccordions, fetchData, openAllAccordions } from "./store/actions";
import { BandComponent } from "./components/BandComponent";
import { Band } from "./utils/interfaces";
import { isAnyAccordionOpenedSelector } from "./store/accordions-reducer";
import './App.css';

const dispatchFetchDataAction = (dispatch: Dispatch<any>) => dispatch(fetchData());
const dispatchOpenAllAccordionsActions = (dispatch: Dispatch<any>) => dispatch(openAllAccordions());
const dispatchCloseAllAccordionsActions = (dispatch: Dispatch<any>) => dispatch(closeAllAccordions());

const handleClick = ((dispatch: Dispatch<any>, isAnyAccordionOpen: boolean) => {
    isAnyAccordionOpen ? dispatchCloseAllAccordionsActions(dispatch) : dispatchOpenAllAccordionsActions(dispatch)
});

const App: React.FC<any> = () => {
    const dispatch = useDispatch();
    const bandsFromState = useSelector(bandsSelector);
    const isAnyAccordionOpen = useSelector(isAnyAccordionOpenedSelector);

    useEffect(() => {
        dispatchFetchDataAction(dispatch);
    }, [dispatch]);

      return (
          <React.Fragment>
              <h3>
                  Albums
                  <button onClick={() => handleClick(dispatch, isAnyAccordionOpen)}>
                    <FontAwesomeIcon icon={isAnyAccordionOpen ? faMinusCircle : faPlusCircle} />
                  </button>
              </h3>
                <ul>
                  {bandsFromState.map((e: Band, index: number) => <BandComponent key={index} band={e} />)}
                </ul>
          </React.Fragment>
      );
};

export default App;
