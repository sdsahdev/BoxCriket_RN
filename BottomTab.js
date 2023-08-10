import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import * as Animatable from 'react-native-animatable';
import imagesClass from './asserts/imagepath';
import BoxList from './src/BoxList';
import DateTime from './src/DateTime';
import loginSceen from './src/loginScreen';
import Details from './src/Details';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TimeComp from './Components/TimeComp';
import Rules from './src/Rules';
import Inbox from './src/Inbox';
import ProfileScreen from './src/ProfileScreen';
import About from './src/About';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabButton = ({ item, onPress, accessibilityState }) => {
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
            textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        } else {
            viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
            textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        }
    }, [focused]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, { flex: focused ? 0.85 : 0.50 }]}
        >
            <View>
                <Animatable.View
                    ref={viewRef}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]}
                >

                </Animatable.View>
                <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>

                    <Image source={item.type} style={{
                        width: wp(6),
                        height: hp(4),
                        marginHorizontal: wp(2),
                        tintColor: focused ? "#fff" : "#027850",
                        justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
                    }} resizeMode="contain" />


                    <Animatable.View ref={textViewRef}>
                        {focused && (
                            <Text style={{ color: '#fff', paddingHorizontal: 8 }}>{item.label}</Text>
                        )}
                    </Animatable.View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const BottomTab = () => {
    const TabArr = [
        {
            route: 'Home',
            label: 'Home',
            type: imagesClass.home, // Replace with actual image paths
            icon: 'home',
            component: BoxList,
            color: '#027850',
            alphaClr: '#C3EDC0',
        },
        {
            route: 'Rules',
            label: 'Rules',
            type: imagesClass.document, // Replace with actual image paths
            icon: 'search',
            component: Rules,
            color: '#027850',
            alphaClr: '#C3EDC0',
        },
        {
            route: 'Inbox',
            label: 'Inbox',
            type: imagesClass.history, // Replace with actual image paths
            icon: 'user-circle-o',
            component: Inbox,
            color: '#027850',
            alphaClr: '#C3EDC0',
        },
        {
            route: 'Profile',
            label: 'Profile',
            type: imagesClass.user, // Replace with actual image paths
            icon: 'user-circle-o',
            component: ProfileScreen,
            color: '#027850',
            alphaClr: '#C3EDC0',
        },
    ];

    return (


        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                // tabBarStyle: {
                //     // position: 'absolute',
                //     // bottom: wp(7),
                //     // right: wp(4),
                //     // left: wp(4),
                //     // borderRadius: wp(3),
                //     // backgroundColor: 'blue',
                //     // alignSelf: 'center',
                //     // alignItems: 'center',
                //     // // flex: 1,
                //     // justifyContent: 'center',
                //     // // paddingVertical: hp(2)
                // },

                // tabBarStyle: {
                //     // backgroundColor: 'blue',
                //     height: Platform.OS === 'ios' ? 70 : 70,
                //     paddingVertical: hp(2),
                //     paddingBottom: Platform.OS === 'ios' ? 15 : 15,
                //     bottom: wp(7),
                //     right: wp(4),
                //     left: wp(4),
                //     borderRadius: wp(3),
                //     position: 'absolute'
                // },
            }}
        >

            {TabArr.map((item, index) => (
                <Tab.Screen

                    key={index}
                    name={item.route}
                    component={item.component}
                    options={{
                        tabBarStyle: {
                            position: 'absolute',
                            bottom: wp(7),
                            right: wp(4),
                            left: wp(4),
                            borderRadius: wp(3),
                            // backgroundColor: 'yellow',
                            alignSelf: 'center',
                            alignItems: 'center',
                            // flex: 1,
                            justifyContent: 'center',
                            height: hp(7),
                            paddingBottom: hp(0.1),

                            width: "90%",

                        },
                        tabBarShowLabel: false,
                        tabBarButton: (props) => <TabButton {...props} item={item} />,
                    }}
                />
            ))}
        </Tab.Navigator>

    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

        // backgroundColor: '#000',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: wp(1.5),
        borderRadius: wp(3),
    },
    imageStyle: {
        width: wp(4),
        height: hp(6),
        marginRight: 8,

    },
});

export default BottomTab;