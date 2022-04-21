
export default function reducer(state = {
    data: [], dataToPrint: []
}, action) {
    if (action.type === "postsLoaded") {
        return {
            data: action.payload.data,
        }
    } else if (action.type === "postsToPrint") {
        return {
            ...state,
            dataToPrint: action.payload.dataToPrint
        }
    } else if (action.type === "postDelete") {
        console.log('before -> ', state.dataToPrint);
        return {
            ...state,
           dataToPrint: state.dataToPrint.filter(post => post.id !== action.payload.id)
        }


    }
    else { return state }
}