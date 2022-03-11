import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = "comments/loadComments";
const LOAD_ONE = "images/loadOne";
const ADD_COMMENTS = "comments/addComments";
const DELETE_COMMENTS = "comments/deleteComments";

const loadComments = (comments, imageId) => ({
    type: LOAD_COMMENTS,
    comments,
    imageId
});

const loadComment = comment => ({
    type: LOAD_ONE,
    comment
});

const addComments = newComment => ({
    type: ADD_COMMENTS,
    newComment
});

const deleteComments = (commentId, imageId) => ({
    type: DELETE_COMMENTS,
    commentId,
    imageId
});

export const getComments = imageId => async dispatch => {
    const response = await csrfFetch(`/api/images/${imageId}/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComments(comments, imageId));
        return comments;
    };
}

export const addComment = (data, imageId) => async dispatch => {
    const response = await csrfFetch(`/api/images/${imageId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(addComments(newComment));
        return newComment;
    };
};

export const updateComment = data => async dispatch => {
    const response = await csrfFetch(`/api/images/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch(loadComment(updatedComment));
        return updatedComment;
    };
};

export const deleteComment = (commentId, imageId) => async dispatch => {
    const response = await csrfFetch(`/api/images/${commentId}`, {
        method: "DELETE"
    });
    if (response.ok) {
        const deletedId = await response.json();
        dispatch(deleteComments(deletedId, imageId));
        return deletedId;
    };
};

const initialState = {
    entries: {},
    isLoading: true
};

const commentReducer = (state = initialState, action) => {
    let newState;
    let newEntries;
    switch (action.type) {
        case LOAD_COMMENTS:
            newState = { ...state };
            newEntries = {};
            action.images.forEach(comment => {
                newEntries[comment.id] = comment;
            });
            newState.entries = newEntries;
            return newState;
        case LOAD_ONE:
            newState = { ...state };
            newEntries = {};
            newEntries[action.comment?.id] = action.comment;
            newState.entries = newEntries;
            return newState;
        case ADD_COMMENTS:
            if (!state[action.newComment.id]) {
                const newState = {
                    ...state,
                    newComment: action.newComment
                };
                return newState;
            };
            return {
                ...state,
                [action.newComment.id]: {
                    ...state[action.newComment.id],
                    ...action.newComment
                }
            };
        case DELETE_COMMENTS:
            newState = { ...state };
            delete newState.entries[action.deleteComment];
            return newState;
        default:
            return state;
    };
};

export default commentReducer;