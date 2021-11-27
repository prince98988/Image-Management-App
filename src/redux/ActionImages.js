import * as ActionTypes from './ActionTypes';
export const deleteImage = (Image,isAll) => ({
    type: ActionTypes.DELETE_IMAGE,
    payload: Image,
    isAll:isAll,
});

export const addImage = (image) =>({
    type : ActionTypes.ADD_IMAGE,
    payload :image,
});

export const changeSearchModal = () => ({
    type: ActionTypes.CHANGE_SEARCH_MODAL,
});

export const changeSModal = () => ({
    type: ActionTypes.CHANGE_SELECTED_MODAL,
});
