// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList ,StatusBar} from 'react-native';
// import Icon, { Icons } from '../components/Icons';
// import * as colors from '../assets/css/Colors';
// import { regular, bold, ellipsis, pending_order_list, api_url, empty_lottie, dashboard, img_url } from '../config/Constants';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { Loader } from '../components/Loader';
// import Moment from 'moment';
// import LottieView from 'lottie-react-native';

// const OngoingOrders = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [order_list, setOrderList] = useState([]);
//   const [count, setCount] = useState('');
//   const [pending_count, setPendingCount] = useState(0);
//   const [picked_up_count, setPickedUpCount] = useState(0);
//   const [completed_count, setCompletedCount] = useState(0);

//   const handleBackButtonClick= () => {
//     navigation.goBack()
//   } 
  
//   const order_details = (id) => {
//     navigation.navigate("OrderSummery", {id:id})
//   }

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', async () => {
//       await get_orders();
//     });
//     return unsubscribe;
//   },[]);

//   const get_orders = async() => {
//     setLoading(true);
//     await axios({
//       method: 'post', 
//       url: api_url + pending_order_list,
//       data:{ restaurant_id:global.id }
//     })
//     .then(async response => {
//       setLoading(false);
//       setOrderList(response.data.result.orders)   
//       setCount(response.data.result.orders.length)
//       setPendingCount(response.data.result.pending_orders)
//       setPickedUpCount(response.data.result.picked_orders)
//       setCompletedCount(response.data.result.completed_orders)
//     })
//     .catch(error => {
//       setLoading(false);
//       alert('Sorry something went wrong')
//     });
//   }

//   const order_accept = (id) =>{
//     navigation.navigate("OrderDetails", { id:id})
//   }

//   const renderItem = ({ item }) => (
//     <View style={{ padding:5}} >
//       <TouchableOpacity onPress={order_details.bind(this,item)} activeOpacity={1}  >
//       <View
//         style={{backgroundColor:colors.theme_fg_three,borderRadius:10,elevation:3}}>
//           <View style={{}}>
//             <View style={{ flexDirection:'row', padding:15,}}>
//               <View style={{ width:'100%', alignItems:'flex-start', justifyContent:'center'}}>
//                 {item.order_type == 0 ?
//                   <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:12 }}>Delivery Time - {Moment(item.order_date).format('hh:mm A')} <Text style={{ color:colors.theme_fg, fontFamily:bold, fontSize:14 }}>[ INSTANT ORDER ]</Text></Text>
//                   :
//                   <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:12 }}>{Moment(item.created_at).format('MMM DD, YYYY hh:mm A')} <Text style={{ color:colors.theme_fg, fontFamily:bold, fontSize:14 }}>[ FUTURE ORDER ]</Text></Text>
//                 }
//                 <View style={{ margin:4 }} />
//                 <Text style={{ color:colors.light_blue, fontFamily:bold, fontSize:8, letterSpacing:1 }}>{item.customer_name}'S ORDER NO - {item.id}</Text>
//               </View>
//             </View>
//             <View style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, borderTopWidth:0.5, borderColor:colors.grey, }}/>
//             {item.item_list.map((item) => {
//               return (
//                 <View style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, padding:15 }}>
//                   <View style={{ alignItems:'flex-start', width:'6%'}}>
//                     <Image style={{ height: 15, width: 15 }} source={{uri: img_url + item.icon}} />
//                   </View>
//                   <View style={{ alignItems:'flex-start', width:'50%'}}>
//                     <Text style={{ fontSize:12, color:colors.theme_fg_two, fontFamily:bold}}>{item.quantity} x {item.item_name}</Text>
//                   </View>
//                   <View style={{ alignItems:'flex-end', width:'44%'}}>
//                     <Text style={{ fontSize:12, color:colors.theme_fg_two, fontFamily:bold}}>{global.currency}{item.total}</Text>
//                   </View>
//                 </View> 
//               );
//             })}
//             <View style={{ flexDirection:'row', backgroundColor:colors.theme_bg_three, borderTopWidth:0.5, borderColor:colors.grey, padding:15 }}>
//               <Text style={{ fontSize:12, color:colors.grey, fontFamily:bold}}>Total bill: {global.currency}{item.total}</Text>
//             </View>     
//           </View> 
//           <TouchableOpacity onPress={order_details.bind(this,item)} style={styles.button}>
//             <Text style={{ color:colors.theme_fg_three, fontFamily:bold, fontSize:14}}>{item.status}</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={{ margin:10 }}/>
//       </TouchableOpacity>
//     </View>  
//     );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar backgroundColor={colors.theme_bg}/>
//       <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
//       <Loader visible={loading} />
//         <View style={{ margin:10}} />
//         <View style={{flexDirection:'row'}}>
//           <View style={{ width:'90%',justifyContent:'center', alignItems:'flex-start' }}>
//             <Text style={{ color:colors.green, fontFamily:bold, fontSize:14 }}>Outlet Online</Text>
//             <View style={{ margin:4}} />
//             <Text style={{ color:colors.theme_fg_two, fontFamily:bold, fontSize:20 }}>Accepting orders</Text>
//           </View>
//         </View>
//         <View style={{ margin:10 }}/>
//         <View style={{ flexDirection:'row',borderBottomWidth:1, borderColor:colors.light_grey, padding:10, alignItems:'center', justifyContent:'center'}}>
//           <View style={{ borderWidth:1, borderColor:colors.grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
//             <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Pending</Text>  
//             <View style={{ margin:2 }} />
//             <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({pending_count})</Text> 
//           </View>  
//           <View style={{margin:5}}/>
//           <View style={{ borderWidth:1, borderColor:colors.grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
//             <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Picked Up</Text>  
//             <View style={{ margin:2 }} />
//             <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({picked_up_count})</Text> 
//           </View> 
//           <View style={{margin:5}}/>
//           <View style={{ borderWidth:1, borderColor:colors.grey, padding:10,fontFamily:regular, borderRadius:10, width:'30%',padding:2, flexDirection:'column'}}>
//             <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>Completed</Text> 
//             <View style={{ margin:2 }} /> 
//             <Text style={{fontSize:14,color:colors.theme_fg_two, textAlign:'center'}}>({completed_count})</Text> 
//           </View> 
//         </View>
//         <View style={{ margin:10 }}/>
//         {count == 0 ?
//           <View style={{marginTop:'30%'}}>
//             <View style={{ height:250 }}>
//               <LottieView style={{flex:1}}source={empty_lottie} autoPlay loop />
//             </View>
//             <Text style={{ alignSelf:'center', fontFamily:bold, fontSize:14}}>Sorry no data found</Text>
//           </View>
//         :
//           <FlatList
//             data={order_list}
//             renderItem={renderItem}
//             keyExtractor={item => item.id}
//           />
//         }
//         <View style={{ margin:40 }}/>
//       </ScrollView>
//     </SafeAreaView>  
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   textFieldcontainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     marginTop: 5,
//     marginBottom: 5,
//     height: 45
//   },
//   textFieldIcon: {
//     padding:5
//   },
//   textField: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 10,
//     height: 45,
//     backgroundColor:colors.theme_bg_three
//   },
//   button: {
//     padding:15,
//     borderRadius: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:colors.theme_bg,
//     margin:10
//   },
// });

// export default OngoingOrders;
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { regular, bold, pending_order_list, api_url, empty_lottie, img_url } from '../config/Constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Loader } from '../components/Loader';
import Moment from 'moment';
import LottieView from 'lottie-react-native';

const OngoingOrders = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [pickedUpCount, setPickedUpCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  const orderDetails = (id) => {
    navigation.navigate('OrderSummery', { id });
  };

  useEffect(() => {
   // const unsubscribe = navigation.addListener('focus', async () => {
     // await 
      getOrders();
  //  });
  //  return unsubscribe;
  }, []);

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );



  const getOrders = async () => {
    console.log("hioiiii");
   setLoading(true);
    try {
      const response = await axios.post(`${api_url}${pending_order_list}`, { restaurant_id: global.id });
      setOrderList(response.data.result.orders);
      setPendingCount(response.data.result.pending_orders);
      setPickedUpCount(response.data.result.picked_orders);
      setCompletedCount(response.data.result.completed_orders);
    } catch (error) {
      setLoading(false);
      alert('Sorry something went wrong');
      console.log(error,"error");
    } finally {
      setLoading(false);
      console.log("huihtt")
    }
  };

  const renderItem = useCallback(({ item }) => (
    <View style={{ padding: 5 }}>
      <TouchableOpacity onPress={() => orderDetails(item.id)} activeOpacity={1}>
        <View style={{ backgroundColor: colors.theme_fg_three, borderRadius: 10, elevation: 3 }}>
          <View>
            <View style={{ flexDirection: 'row', padding: 15 }}>
              <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'center' }}>
                {item.order_type === 0 ? (
                  <Text style={{ color: colors.theme_fg_two, fontFamily: bold, fontSize: 12 }}>
                    Delivery Time - {Moment(item.order_date).format('hh:mm A')}
                    <Text style={{ color: colors.theme_fg, fontFamily: bold, fontSize: 14 }}> [ INSTANT ORDER ]</Text>
                  </Text>
                ) : (
                  <Text style={{ color: colors.theme_fg_two, fontFamily: bold, fontSize: 12 }}>
                    {Moment(item.created_at).format('MMM DD, YYYY hh:mm A')}
                    <Text style={{ color: colors.theme_fg, fontFamily: bold, fontSize: 14 }}> [ FUTURE ORDER ]</Text>
                  </Text>
                )}
                <View style={{ margin: 4 }} />
                <Text style={{ color: colors.light_blue, fontFamily: bold, fontSize: 8, letterSpacing: 1 }}>
                  {item.customer_name}'S ORDER NO - {item.id}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: colors.theme_bg_three, borderTopWidth: 0.5, borderColor: colors.grey }} />
            {item.item_list.map((subItem) => (
              <View key={subItem.item_id} style={{ flexDirection: 'row', backgroundColor: colors.theme_bg_three, padding: 15 }}>
                <View style={{ alignItems: 'flex-start', width: '6%' }}>
                  <Image style={{ height: 15, width: 15 }} source={{ uri: img_url + subItem.icon }} />
                </View>
                <View style={{ alignItems: 'flex-start', width: '50%' }}>
                  <Text style={{ fontSize: 12, color: colors.theme_fg_two, fontFamily: bold }}>
                    {subItem.quantity} x {subItem.item_name}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', width: '44%' }}>
                  <Text style={{ fontSize: 12, color: colors.theme_fg_two, fontFamily: bold }}>
                    {global.currency}{subItem.total}
                  </Text>
                </View>
              </View>
            ))}
            <View style={{ flexDirection: 'row', backgroundColor: colors.theme_bg_three, borderTopWidth: 0.5, borderColor: colors.grey, padding: 15 }}>
              <Text style={{ fontSize: 12, color: colors.grey, fontFamily: bold }}>
                Total bill: {global.currency}{item.total}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => orderDetails(item.id)} style={styles.button}>
            <Text style={{ color: colors.theme_fg_three, fontFamily: bold, fontSize: 14 }}>{item.status}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 10 }} />
      </TouchableOpacity>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg} />
      <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
        <Loader visible={loading} />
        <View style={{ margin: 10 }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '90%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ color: colors.green, fontFamily: bold, fontSize: 14 }}>Outlet Online</Text>
            <View style={{ margin: 4 }} />
            <Text style={{ color: colors.theme_fg_two, fontFamily: bold, fontSize: 20 }}>Accepting orders</Text>
          </View>
        </View>
        <View style={{ margin: 10 }} />
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.light_grey, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>Pending</Text>
            <View style={{ margin: 2 }} />
            <Text style={styles.statusText}>({pendingCount})</Text>
          </View>
          <View style={{ margin: 5 }} />
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>Picked Up</Text>
            <View style={{ margin: 2 }} />
            <Text style={styles.statusText}>({pickedUpCount})</Text>
          </View>
          <View style={{ margin: 5 }} />
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>Completed</Text>
            <View style={{ margin: 2 }} />
            <Text style={styles.statusText}>({completedCount})</Text>
          </View>
        </View>
        <View style={{ margin: 10 }} />
        {orderList.length === 0 ? (
          <View style={{ marginTop: '30%' }}>
            <View style={{ height: 250 }}>
              <LottieView style={{ flex: 1 }} source={empty_lottie} autoPlay loop />
            </View>
            <Text style={{ alignSelf: 'center', fontFamily: bold, fontSize: 14 }}>Sorry no data found</Text>
          </View>
        ) : (
          <FlatList
            data={orderList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
          />
        )}
        <View style={{ margin: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme_bg,
    margin: 10,
  },
  statusBox: {
    borderWidth: 1,
    borderColor: colors.grey,
    padding: 10,
    fontFamily: regular,
    borderRadius: 10,
    width: '30%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: colors.theme_fg_two,
    textAlign: 'center',
  },
});

export default OngoingOrders;

