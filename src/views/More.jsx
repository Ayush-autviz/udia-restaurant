import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Modal, StatusBar } from 'react-native';
import Icon, { Icons } from '../components/Icons';
import * as colors from '../assets/css/Colors';
import { regular, bold, profile_img, change_online_status, api_url, img_url } from '../config/Constants';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Loader } from '../components/Loader';
import { connect } from 'react-redux';
import { reset, addRestaurantOnlineStatus } from '../actions/RestaurantRegisterActions';
import Dialog from "react-native-dialog";

const More = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dialog_visible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  }

  const closeDialog = () => {
    setDialogVisible(false);
  }

  const handleCancel = () => {
    setDialogVisible(false)
  }
  
  const next = async (name) => {
    if (name == 'Order History') {
      await navigation.navigate("MyOrders")
    } else if (name == 'Help Center') {
      await navigation.navigate("FaqCategories")
    } else if (name == 'Customer Complaint') {
      await navigation.navigate("Complaint")
    } else if (name == 'Wallet') {
      await navigation.navigate("Wallet")
    } else if (name == 'Withdrawal') {
      await navigation.navigate("Withdrawal")
    } else if (name == 'Privacy Policies') {
      await navigation.navigate("PrivacyPolicies")
    } else if (name == 'About Us') {
      await navigation.navigate("AboutUs")
    } else if (name == 'Logout') {
      await showDialog();
    } else if (name == 'Help') {
      await showSnackbar('Not Active')
    }
  }

  const online_status = async () => {
    
    setLoading(true);
    await axios({
      method: 'post',
      url: api_url + change_online_status,
      data: { id: global.id, is_open: 0 }
    })
      .then(async response => {
        setLoading(false);
        await props.addRestaurantOnlineStatus(0);
        await AsyncStorage.clear();
        await props.reset();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );
      })
      .catch(error => {
        console.log(error)
        setLoading(false);
      });
  }



  const handleLogout = async () => {
    setDialogVisible(false);
    online_status();
  };


  const DATA = [

    {
      title: 'Order History',
      icon: 'cart-outline'
    },

    {
      title: 'Wallet',
      icon: 'wallet-outline'
    },
    {
      title: 'Withdrawal',
      icon: 'cash'
    },
    {
      title: 'Help Center',
      icon: 'help-outline'
    },
    {
      title: 'Privacy Policies',
      icon: 'alert-circle-outline'
    },
    {
      title: 'Customer Complaint',
      icon: 'people-outline'
    },
    {
      title: 'About Us',
      icon: 'information-outline'
    },
    {
      title: 'Logout',
      icon: 'log-out-outline'
    },

  ];

  const profile = () => {
    navigation.navigate("Profile")
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1} onPress={next.bind(this, item.title)}>
      <Loader visible={loading} />
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: colors.light_grey, paddingTop: 15, paddingBottom: 15 }}>
        <View style={{ width: '10%', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Icon type={Icons.Ionicons} name={item.icon} color={colors.grey} style={{ fontSize: 20 }} />
        </View>
        <View style={{ width: '85%', justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={{ fontFamily: regular, fontSize: 16, color: colors.theme_fg_two }}>{item.title}</Text>
        </View>
        <View style={{ width: '5%', justifyContent: 'center', alignItems: 'flex-end' }}>
          <Icon type={Icons.Ionicons} name="chevron-forward-outline" color={colors.grey} style={{ fontSize: 15 }} />
        </View>
      </View>

      <Dialog.Container visible={dialog_visible}>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>
            Do you want to logout?
          </Dialog.Description>
          <Dialog.Button label="Yes" onPress={handleLogout} />
          <Dialog.Button label="No" onPress={handleCancel} />
      </Dialog.Container>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.theme_bg} />
      <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
        <Loader visible={loading} />
        <View style={styles.header}>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ color: colors.theme_fg_two, fontFamily: bold, fontSize: 20 }}>Settings</Text>
          </View>
        </View>
        <View style={{ margin: 10 }} />
        <TouchableOpacity activeOpacity={1} onPress={profile}>
          <View
            style={{elevation:3,margin:2,backgroundColor:colors.theme_fg_three,padding:5,borderRadius:10}}>
            <View style={{ flexDirection: 'row', paddingTop: 15, paddingBottom: 15 }}>
              <View style={{ width: '20%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: img_url + props.restaurant_profile_picture }} />
              </View>
              <View style={{ width: '75%', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Text style={{ fontFamily: bold, fontSize: 18, color: colors.theme_fg_two }}>{props.restaurant_name}</Text>
                <View style={{ margin: 2 }} />
                <Text style={{ fontFamily: regular, fontSize: 12, color: colors.grey }}>Edit Profile</Text>
              </View>
              <View style={{ width: '5%', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Icon type={Icons.Ionicons} name="chevron-forward-outline" color={colors.grey} style={{ fontSize: 15 }} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ margin: 10 }} />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.theme_bg_three,

  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#ccc',
  },
});

function mapStateToProps(state) {
  return {
    restaurant_profile_picture: state.restaurant_register.restaurant_profile_picture,
    restaurant_name: state.restaurant_register.restaurant_name,

  };
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset()),
  addRestaurantOnlineStatus: (data) => dispatch(addRestaurantOnlineStatus(data)),

});


export default connect(mapStateToProps, mapDispatchToProps)(More);
