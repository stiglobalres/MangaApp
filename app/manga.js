import React, {useState, useEffect} from "react";

import { View, Text, Image, ScrollView, TouchableOpacity, VirtualizedList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";

//STORES
import { getChapters, updateChapterID } from "../store/chaptersSlice";

import main from "../styles/main";

const MangaInfo=(props)=>{

    const {selectedmanga, manga_id} = useSelector((state)=>state.latestmanga);
    const {chapter} = useSelector((state)=>state.chapters);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [created, setCreated] = useState();
    const [updated, setUpdated] = useState();
    const [tab, setTab] = useState(false);
   
    useEffect(()=>{
        dispatch(getChapters(manga_id));
        setCreated(parseDate(selectedmanga.create_at));
        setUpdated(parseDate(selectedmanga.update_at));

    },[])

    function parseDate(val) {
        let createdDate = new Date( parseInt(val));
        let result = createdDate.toLocaleString('en-US', {month: 'short'});
            result += ' '+ createdDate.getDate();
            result += ', '+ createdDate.getFullYear();
        return result.toString();
    }

    function selectChapter(id){
        
        dispatch(updateChapterID(id));
        props.navigation.navigate('Pages');
    }
    const renderauthor=(arr)=> {
        let result = arr.map((name, id)=>{
            return (<Text key={id} style={main.chapter}>{name}</Text>)
        })
        return result;
    }

    const renderGenres=(arr)=>{
        let result= arr.map((name, id)=>{
        return (                               
            <View key={id} style={main.genreBoxItem} >
                <Text style={{color:'white'}}>{name}</Text>
            </View>
        );
        });
        return result;
    }

    const renderDetails=()=>{
        if(tab) {
            return null;
        }
        return(
            <View style={{flex: 1, backgroundColor:'#373737',  padding:20 }}>
            <Text style={main.title} >{selectedmanga.title}</Text>

            <Text style={main.summary}>{selectedmanga.summary}</Text>

            <Text style={main.chapter}>Chapters: {selectedmanga.total_chapter}</Text>

            <View style={main.genresContainer}>
                <View style={main.genresBox}>
                    <Text style={main.genresBox_text}>Genres: </Text>
                </View>
                <View style={main.genresListBox}>
                    {renderGenres(selectedmanga.genres)}
                </View>
            </View>

            <View style={main.authorContainer}>
                <View style={main.authorBox}>
                    <Text style={main.chapter}>Author: </Text>
                </View>
                <View style={main.authorNameBox}>
                    {renderauthor(selectedmanga.authors) }
                </View>
            </View>

            <Text style={main.chapter}>Date Created: {created}</Text>
            <Text style={main.chapter}>Last Updated: {updated}</Text>
        </View>
        );
    }

    const renderChapters=()=>{
        if(!tab) {
            return null;
        }

        return (
            <View style={{flex: 1, backgroundColor:'#373737',  padding:20 }}>
                <View style={{backgroundColor:'#242428', padding:5}}>
               
                    <VirtualizedList
                        initialNumToRender={10}
                        renderItem={({item}) => 
                        <TouchableOpacity style={main.chapterItem} onPress={()=>selectChapter(item.id)}>
                            <View style={{width:'80%'}}>
                                <Text style={main.chapterItemTitle}>{item.title}</Text>
                                <Text style={{color:'white', fontSize:10}}>{parseDate(item.update_at)}</Text>
                            </View>
                            <View style={{width:'20%', justifyContent:'center', alignItems:'flex-end'}}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:18}}>  </Text>
                            </View>
                        </TouchableOpacity>
                        }
                        data={chapter}
                        keyExtractor={item => item.id}
                        getItemCount={(data)=>data.length}
                        getItem={(data, index)=>data[index]}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }

    return(
        <View style={{ flex:1}}>

            <View style={main.mainContainer} >
                <ScrollView style={{flex:1, backgroundColor:'#373737'}} >
                    <View style={main.mangaInfoBox} >
                        <Image height={200} width={320} resizeMode={'contain'} source={{ uri: selectedmanga.thumb }} />
                        <View style={{width:'100%', height:50, marginTop:20, flexDirection:'row'}}>
                            <TouchableOpacity style={[main.mangaTab,{backgroundColor:(!tab) ? '#373737':'#242428', borderTopRightRadius:10}]} onPress={()=>setTab(false)}>
                                <Text style={{fontSize:16, fontWeight:700, color:'white'}}>Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[main.mangaTab,{backgroundColor:(tab) ? '#373737':'#242428', borderTopLeftRadius:10}]} onPress={()=>setTab(true)}>
                                <Text style={{fontSize:16, fontWeight:700, color:'white'}}>Chapters</Text>
                            </TouchableOpacity>
                         </View>
                        {renderDetails()}
                        {renderChapters()}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
export default MangaInfo;