const initialState = {}

export const userReducer = (state=initialState, action) =>{
    switch(action.type){
        case "LOGIN" : 
        return {
            payload: action.payload
        }
        default :
        return state
    }
}