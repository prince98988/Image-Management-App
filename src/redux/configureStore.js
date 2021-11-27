import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';

import {Images} from './images';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Images:Images,
            ...createForms({
                
            })
        }),
       
        applyMiddleware(thunk, logger)
    );

    return store;
}