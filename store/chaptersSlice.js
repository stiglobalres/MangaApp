import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../requests/axios";

export const getChapters = createAsyncThunk('getChapters', async(mangaid)=>{
    let url="/manga/chapter?id="+mangaid;
    const response = await getData(url);
    return response.data
})

export const chaptersSlice = createSlice({
    name:'chapters',
    initialState:{
        chapter:[],
        loading:'idle',
        error:null,

        chapter_id:null
    },
    reducers:{
        updateChapterID(state, action) {
            state.chapter_id = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getChapters.pending, (state, action) =>{     
            if(state.loading==='idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getChapters.fulfilled, (state, action)=>{
            if(state.loading==='pending') {
                state.chapter = action.payload;
                state.loading='idle';
            }
        });
        builder.addCase(getChapters.rejected, (state, action)=> {

            if(state.loading==='pending') {
                state.loading='idle';
                state.error='error occured';
            }
        })
    }
})

export const { updateChapterID }  = chaptersSlice.actions;
export default chaptersSlice.reducer;