import React, {createRef, useEffect, useRef, useState} from "react";

import { Text, View, Animated, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { PanGestureHandler , PinchGestureHandler, GestureHandlerRootView} from "react-native-gesture-handler";

import { getPages } from "../store/pageSlice";

const Pages=(prop)=>{
    const dispatch = useDispatch();
    const {pages} = useSelector((state)=>state.pages); 
    const {chapter_id} = useSelector((state)=>state.chapters)
    const [panGestureEnabled, setPanGestureEnabled] = useState(false);

    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const [index, setIndex] = useState(0);
    const [image, setImage] = useState([]);


  const pinchGestureRef = createRef();
  const panGestureRef = createRef();

  useEffect(()=>{
    dispatch(getPages(chapter_id));
    if(pages.length > 0) {
      setImage(pages[index].link)
    }

  },[index])


  const onPinchGestureEvent = Animated.event([{
    nativeEvent: { scale }
  }],
    { useNativeDriver: true });

  const onPanGestureEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY
    }
  }],
    { useNativeDriver: true });

  const handlePinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanGestureEnabled(true);
    }

    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true
        }).start();

        setPanGestureEnabled(false);
      }
    }
  };

    return (
        <View style={{flex:1}}>
            <GestureHandlerRootView style={{ flex: 1, width:'100%'}}>
                <PanGestureHandler 
                    onGestureEvent={onPanGestureEvent}
                    ref={panGestureRef}
                    enabled={panGestureEnabled}
                    simultaneousHandlers={[pinchGestureRef]}
                    failOffsetX={[-1000,1000]}
                    shouldCancelWhenOutside
                >
                    <Animated.View>
                        <PinchGestureHandler
                            ref={pinchGestureRef}
                            simultaneousHandlers={[panGestureRef]}
                            onGestureEvent={onPinchGestureEvent}
                            onHandlerStateChange={handlePinchStateChange}
                        >
                            <Animated.Image
                                source={{ uri:  image }}
                                style={{
                                width: '100%',
                                height: '100%',
                                transform: [{ scale }, { translateX }, { translateY }]
                                }}
                                resizeMode="contain"
                            />

                        </PinchGestureHandler>     
                    </Animated.View>
                </PanGestureHandler>
            </GestureHandlerRootView>
            <View style={{width:'100%', height:'10%', backgroundColor:'#242428', flexDirection:'row'}}>
                  <TouchableOpacity disabled={(index < 1) ? true: false} style={{height:'100%', width:'40%', justifyContent:'center', alignItems:'center'}}  onPress={()=>setIndex(index-1)} >
                      <Text style={{color:(index < 1) ? 'darkgrey': 'white'}}> Previous</Text>
                  </TouchableOpacity>
                  <View style={{height:'100%', width:'20%',  flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white'}}>{index + 1} / </Text>
                    <Text style={{color:'white'}}>{pages.length}</Text>
                  </View>
                  <TouchableOpacity disabled={(index+1 >= pages.length) ? true: false} style={{height:'100%', width:'40%', justifyContent:'center', alignItems:'center'}} onPress={()=>setIndex(index+1)} >
                      <Text style={{color:(index+1 >= pages.length) ? 'darkgrey': 'white'}}> Next </Text>
                  </TouchableOpacity>
            </View>
        </View>
    );
}

export default Pages;