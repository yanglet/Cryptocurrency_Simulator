export const initialState = {};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST, 
} 

const dummyPost = {};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                // 앞에다 dummyPost를 추가해야지 게시글이 위로 올라감. 
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true, 
            }; 
        default:
            return state;
    }
}
export default reducer; 