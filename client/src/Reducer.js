export const initialState=null;

function reducer(state,action)
{
    if(action.type === "USER")
    {
        return action.payload;
    }
    if(action.type === "CLEAR")
    {
        return null;
    }
    if(action.type === "FORK")
    {
        // console.log("tri")
        return {
            ...state,
            forkedPost:action.payload
        }
    }
}

export {reducer};