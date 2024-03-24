import { createSlice } from "@reduxjs/toolkit";

const initialState={
    url:{},
    genres:{},
    heartMovies:[],
    watchListMovies:[]
}


export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers:{
        getApiConfiguration:(state, action)=>{
            // console.log(action.payload)
           state.url = action.payload
        },
        getGenres:(state, action)=>{
            // console.log("genres",action.payload)
            state.genres = action.payload
        },
        LIKE:(state,action)=>{
        //    console.log(action.payload) //4433
           state.heartMovies = [...state.heartMovies, action.payload]
        },
        WATCH:(state,action)=>{
        //    console.log(action.payload) //5566
           state.watchListMovies = [...state.watchListMovies, action.payload]
        },
        UNLIKE: (state, action) => {
            const ID = action.payload;
            const index = state.heartMovies.findIndex(ind => ind === ID);
            if (index !== -1) {
                const updatedHeartMovies = [...state.heartMovies]; 
                updatedHeartMovies.splice(index, 1); 
                return {
                    ...state,
                    heartMovies: updatedHeartMovies 
                };
            }
            return state;
        },
        UNWATCH: (state, action) => {
            const ID = action.payload;
            console.log(ID); 
            const index = state.watchListMovies.findIndex(ind => ind === ID);
            if (index !== -1) {
                const updatedWatchMovies = [...state.watchListMovies]; 
                updatedWatchMovies.splice(index, 1); 
                return {
                    ...state,
                    watchListMovies: updatedWatchMovies 
                };
            }
            return state;
        }
        
    }
})

export const homeActions = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
export const homeSelector = (state)=> state.homeReducer;