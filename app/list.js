import React, {useState, useEffect} from 'react';

import { View, Text, TouchableOpacity,  FlatList, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {  useDispatch, useSelector } from 'react-redux';

//STORES
import { getLatestManga, updateMangaID, updateManga, searchManga } from '../store/latestmangaSlice';

//STYLES
import main from './../styles/main';


const List=(props)=> {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {latestmanga, loading} = useSelector((state)=>state.latestmanga);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        console.log(loading);
        if(loading=='idle') {
            dispatch(getLatestManga(page));
        }
    },[page]);


    function selectManga(item) {
        dispatch(updateMangaID(item.id));
        dispatch(updateManga(item))
        props.navigation.navigate('MangaInfo');
    }

    const onSearch=()=> {
        if(search.length==0) {
            dispatch(getLatestManga(page));
        }
        else {
            setPage(1);
            dispatch(searchManga(search));
        }
        
    }

    function getData() {
        if(loading=='idle') {
            setPage(page+1);
        }
    }

 const rendermanga=({item})=>{
    return(
        <TouchableOpacity style={main.renderMangaStyles} onPress={()=>selectManga(item)}  >
            <View style={main.renderMangaView}>
                <Image
                      resizeMode={'cover'}
                      source={{ uri: item.thumb }}
                      style={{ width: '100%', height: '100%', borderRadius: 15 }} />
            </View>
            <Text style={{color:'white'}} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );
}

const flatlist=()=>{
    if(latestmanga.length==0 && page==1 && loading=='idle') {
        return (
            <View style={{flex:1, alignItems:'center', alignContent:'center'}}>
                <Text style={{color:'white', fontWeight:'700'}}>No manga found</Text>
            </View>
        );
    }  
    return(
        <FlatList
        data={latestmanga}
        renderItem={rendermanga}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        onEndReached={()=>getData()}
        onEndReachedThreshold={0.001}
        contentContainerStyle={{ marginLeft:20, marginRight:20,  paddingBottom:100}}
        />
    );
}
    return(
        <View style={{ flex:1}}>
            <View style={main.header}>
                <View style={main.headerBox} >
                    <Text style={main.headerBoxTitle}>Manga</Text>
                   <TextInput
                   placeholder='Search Manga'
                   onChangeText={(text)=>setSearch(text)}
                   onEndEditing={onSearch}
                   style={{
                        width:'75%', 
                        height:35, 
                        backgroundColor:'white', 
                        borderRadius:15,
                        paddingLeft:15
                    }} 
                   />
                </View>
            </View>

            <View style={main.mainContainer} >
                <View style={main.mainContainerBox} >
                    <Text style={main.mainContainerBoxTitle}>Latest Anime</Text>
                </View>
                {flatlist()}
            </View>
        </View>
    );
}

export default List;