
import * as ActionTypes from './ActionTypes';
import {dimages} from './images_json' ;


export const Images = (state = {
        isSearchModalOpen:false,
        isSelectedModalOpen:false,
        images: dimages,
    }, action) => {

    switch(action.type) {
        case ActionTypes.DELETE_IMAGE:
            if(action.isAll)
            return {...state,images:[]};
            else
            return {...state, images:state.images.filter((item) => 
                (item.name !== action.payload.split("|")[1] || item.id !== action.payload.split("|")[0]) )}

        case ActionTypes.ADD_IMAGE:
            return {...state, images: action.payload}
        
        case ActionTypes.CHANGE_SEARCH_MODAL:
            return {...state, isSearchModalOpen :!state.isSearchModalOpen}
        case ActionTypes.CHANGE_SELECTED_MODAL:
            return {...state, isSelectedModalOpen :!state.isSelectedModalOpen}

        default:
            return state;
    }
}