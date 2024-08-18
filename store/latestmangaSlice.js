import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../requests/axios';

export const getLatestManga = createAsyncThunk('getLatestManga', async (page=1) => {
    let url = '/manga/latest?page='+page+'&nsfw=true&type=all';
    console.log(url);
    const response = await getData(url)
    return response.data
  })

  export const searchManga = createAsyncThunk('searchManga', async(search='') => {
    let url ='manga/search?text='+search+'&nsfw=true&type=all';
    const response = await getData(url)
    return response.data
  })


  export const latestmangaSlice =createSlice({
    name:'latestmanga',
    initialState:{
        latestmanga:[],
        loading:'idle',
        error:null,
        manga_id:'',
        selectedmanga: {}
    },
    reducers:{
        
        refreshLatestMangaCounter(state, action) {
            state.latestmangaCounter = action.payload;
        },
        updateMangaID(state, action) {
            state.manga_id = action.payload
        },
        updateManga(state, action) {
            state.selectedmanga = action.payload;
        }
    },
    
    extraReducers:(builder)=>{
        builder.addCase(getLatestManga.pending, (state, action) =>{     
            if(state.loading==='idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getLatestManga.fulfilled, (state, action)=>{
            if(state.loading==='pending') {
                let tmpData = [...state.latestmanga , ...action.payload];
                state.latestmanga = tmpData;
                state.loading='idle';
            }
        });
        builder.addCase(getLatestManga.rejected, (state, action)=> {
            if(state.loading==='pending') {
                state.loading='idle';
                state.error='error occured';
            }
        })


        builder.addCase(searchManga.pending, (state, action) =>{     
            if(state.loading==='idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(searchManga.fulfilled, (state, action)=>{
            if(state.loading==='pending') {
                let tmpData = [...state.latestmanga , ...action.payload];
                state.latestmanga = tmpData;
                state.loading='idle';
            }
        });
        builder.addCase(searchManga.rejected, (state, action)=> {
            if(state.loading==='pending') {
                state.loading='idle';
                state.error='error occured';
            }
        })
    }

  });


export const { refreshLatestMangaCounter, updateMangaID, updateManga } = latestmangaSlice.actions;

export default latestmangaSlice.reducer

