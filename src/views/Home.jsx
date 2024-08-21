 import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch,StatusBar} from 'react-native';
import * as colors from '../assets/css/Colors';
import { regular, bold, restaurant, change_online_status, api_url, dashboard, online_lottie, offline_lottie } from '../config/Constants';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { Loader } from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
//    
import database from '@react-native-firebase/database';
import { connect } from 'react-redux'; 
import { addRestaurantOnlineStatus } from '../actions/RestaurantRegisterActions';

const Home = (props) => {
  const navigation = useNavigation();
  const [switch_value, setSwitchValue] = useState(true);
  const [online_value, setOnlineValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [dashboard_value, setDashboardValue] = useState(""); 

  console.log(props.restaurant_online_status,'status');

  useEffect(() => {
    console.log(global.id, 'global');

    const sync = () =>{
      navigation.navigate("OrderRequest");
    }

    const ref = database().ref(`/restaurants/${global.id}`);
    const onValueChange = ref.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log('snapshot', data);
      // if(snapshot?.val()?.is_opn === 1){
      //   setSwitchValue(true);
      // } else {
      //   setSwitchValue(false);
      // }
      if (snapshot?.val()?.o_stat === 1 && snapshot?.val()?.is_opn === 1) {
        sync();
      }
    });

    if (props.restaurant_online_status == 1) {
      console.log('trueeeeeeee');
      setSwitchValue(true);
    } else {
      console.log('falseeeee');
      setSwitchValue(false);
    }
    //sync();
    //sync();



   // const handleFocus = async () => {
    //  await 
   call_dashboard();
   //   await 
    online_status(props.restaurant_online_status);
  //  };

   // const unsubscribe = navigation.addListener('focus', handleFocus);
   //ref.off('value', onValueChange);
    //return () => {
    //ref.off('value', onValueChange);
     // unsubscribe();
   // };
  }, []);


  useFocusEffect(
    useCallback(() => {
      //call_dashboard();
      online_status(props.restaurant_online_status);
    }, [])
  );

  


  const toggleSwitch = async(value) => {
    if(value){
      await setSwitchValue(value);  
      await online_status(1);
      await saveData(1);
    }else{
      await setSwitchValue(value);  
      await online_status(0);
      await saveData(0);
    }  
  }

  const online_status = async (status) => {
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + change_online_status,
      data:{ id: global.id, is_open : status }
    })
    .then(async response => {
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
    });
  }

  const saveData = async(status) =>{
    try{
        await AsyncStorage.setItem('online_status', status.toString());
        await props.addRestaurantOnlineStatus(status);
      }catch (e) {
        console.log(error);
    }
  }

  const call_dashboard = async() =>{
    setLoading(true);
    await axios({
      method: 'post', 
      url: api_url + dashboard,
      data:{ restaurant_id:global.id }
    })
    .then(async response => {
      setLoading(false);
      setDashboardValue(response.data.result);
      console.log(response.data.result,'result')
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg}/>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Loader visible={loading} />
        <View style={styles.header}>
          <TouchableOpacity style={{ width:'100%',justifyContent:'center', alignItems:'center' }}>
            <Switch
              trackColor={{ false: "#767577", true: colors.theme_bg }}
              thumbColor={switch_value ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={switch_value}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey, padding:10, alignItems:'center', justifyContent:'center'}}>
          <View style={{ borderWidth:1, borderColor:colors.grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Pending</Text>  
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({dashboard_value?.pending})</Text> 
          </View>  
          <View style={{margin:5}}/>
          <View style={{ borderWidth:1, borderColor:colors.grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Picked Up</Text>  
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({dashboard_value?.picked_up})</Text> 
          </View> 
          <View style={{margin:5}}/>
          <View style={{ borderWidth:1, borderColor:colors.grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Completed</Text>  
            <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({dashboard_value?.completed})</Text> 
          </View> 
        </View>
        <View style={styles.imageView}>
          <Image style= {{ height: undefined,width: undefined,flex: 1,borderRadius:10 }} source={restaurant} />
        </View> 
        {props.restaurant_online_status == 1 ?
          <View> 
            <View style={{ margin:'15%' }}>
              <View style={{ height:150 }}>
                <LottieView style={{flex:1}}source={online_lottie} autoPlay loop />
              </View>
            </View>
            <Text style={{ alignSelf:'center', fontFamily:bold, fontSize:15, color:colors.green}}>Be ready orders will be received.</Text>
          </View>
          :
          <View>
            <View style={{ margin:'15%' }}>
              <View style={{ height:150 }}>
                <LottieView style={{flex:1}}source={offline_lottie} autoPlay loop />
              </View>
            </View>
            <Text style={{ alignSelf:'center', fontFamily:bold, fontSize:13, color:colors.theme_fg_two}}>Make online to receive more orders. </Text>
          </View>
        }
      </ScrollView>
    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.theme_bg_three,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'row',
    shadowColor: '#ccc',
    padding:10
  },
  imageView:{
    width:'100%',
    height:180,
    padding:10,

  },
   
});

function mapStateToProps(state){
  return{
    restaurant_online_status : state.restaurant_register.restaurant_online_status,

  };
}

const mapDispatchToProps = (dispatch) => ({
  addRestaurantOnlineStatus: (data) => dispatch(addRestaurantOnlineStatus(data)),

});

export default connect(mapStateToProps,mapDispatchToProps)(Home);

