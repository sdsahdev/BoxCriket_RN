import React, { useEffect, useState } from 'react';
import TopHeader from '../Components/TopHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import imagesClass from '../asserts/imagepath';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage, hideMessage, FlashMessageManager } from "react-native-flash-message";
import { useIsFocused } from '@react-navigation/native'; // Import the hook

const Inbox = ({ navigation }) => {
    const [idata, setidata] = useState([])
    const isFocused = useIsFocused(); // Get the screen's focused state

    useEffect(() => {
        // Call the API when the component mounts
        console.log("+++++++");
        inboxapi();
    }, [isFocused]);
    inboxapi = async () => {
        const Token = await AsyncStorage.getItem('token');

        fetch('https://boxclub.in/Joker/Admin/index.php?what=showInboxUser', {
            method: 'POST', // Assuming you want to use POST method
            headers: {
                'Content-Type': 'application/json',
                token: Token
            },
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                console.log(data)
                if (data.success) {
                    setidata(data.bookings)
                } else {
                    showMessage({
                        message: data.message,
                        type: "Danger",
                        backgroundColor: "red", // background color
                        color: "#fff", // text color
                    });

                }
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error:', error);
            });
    }
    const rulesData = [
        { id: '0', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '1', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '2', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '3', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '4', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        { id: '5', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' },
        // for admin
        // { id: '5', message: 'book success', code: '111', date: '05-11-2023', time: '01-04 am', BoxName: 'King', amount: '400' , username:'kevin', phone:'1234567890'},

    ];

    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>code</Text>
                <Text style={styles.textLeft}>{item.code}</Text>
            </View>
            <View style={{ flexDirection: 'row', }}>

                <Text style={styles.textLeft}>Time</Text>
                <Text style={styles.textLeft}>{item.time}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>Date</Text>
                <Text style={styles.textLeft}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>BoxName</Text>
                <Text style={styles.textLeft}>{item.BoxName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>Amount</Text>
                <Text style={styles.textLeft}>{item.amount}</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>message</Text>
                <Text style={styles.textLeft}>{item.message}</Text>
            </View>
            {item.message === 'booked' ?
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => navigation.navigate('Cancel', {
                        ids: item.id
                    })} >
                    <Text style={styles.payment}>
                        Cancellation
                    </Text>
                </TouchableOpacity> : null}
        </View>
    );
    return (
        <SafeAreaView style={{ position: 'relative' }}>
            <View style={{ position: 'relative' }}>
                <ScrollView >

                    <View >
                        <TopHeader name={"Inbox"} />
                    </View>

                    <View style={{ marginRight: wp(9), width: '100%', marginBottom: hp(12) }}>
                        <FlatList
                            style={{ marginTop: hp(4), alignSelf: 'center', width: '95%', }}
                            data={idata}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>

                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

export default Inbox

const styles = StyleSheet.create({
    btn: { margin: wp(3), height: 40, flex: 1 },
    payment: { color: '#fff', backgroundColor: '#027850', flex: 1, textAlign: 'center', textAlignVertical: 'center', fontSize: wp(5), borderRadius: wp(2), },
    timeSlot: {
        marginVertical: wp(2),
        paddingHorizontal: wp(2),
        borderWidth: wp(0.5), justifyContent: 'center'
        , borderColor: '#027850',
        borderRadius: wp(2), paddingVertical: hp(1)
    }, textLeft: {
        alignSelf: 'flex-start', textAlignVertical: 'top', verticalAlign: 'top', justifyContent: 'flex-start', flex: 1, flexWrap: 'wrap', marginVertical: wp(0.5), fontWeight: 'bold', fontSize: wp(4)
    }
})