import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../requests/axios";

export const getPages = createAsyncThunk('getPages', async(chapterid)=>{
    let url="/manga/image?id="+chapterid;
    const response = await getData(url);
    return response.data
})

export const pageSlice = createSlice({
    name:'page',
    initialState:{
        pages:[],
        loading:'idle',
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getPages.pending, (state, action) =>{  
            if(state.loading==='idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getPages.fulfilled, (state, action)=>{
            if(state.loading==='pending') {
                state.pages = action.payload;
                state.loading='idle';
            }
        });
        builder.addCase(getPages.rejected, (state, action)=> {
            if(state.loading==='pending') {
                state.loading='idle';
                state.error='error occured';
            }
        })
    }
})


export default pageSlice.reducer;