
export default function reducer(state, action) {
    if(action.type === "postsLoaded"){
        return [
            action.payload
        ]
    }
}