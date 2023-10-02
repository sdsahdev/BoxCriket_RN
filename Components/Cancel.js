import React, { useEffect, useState } from 'react';
import TopHeader from '../Components/TopHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import FlashMessage, {
    showMessage,
    hideMessage,
    FlashMessageManager,
} from 'react-native-flash-message';
import imagesClass from '../asserts/imagepath';
import { ScrollView } from 'react-native-gesture-handler';
import { Notificationutill } from '../src/Notificationutill';
const Cancel = ({ route }) => {
    const { ids } = route.params;

    const Refunds = [
        {
            id: '1',
            rule: 'Users can cancel their booking up to 48 hours before the scheduled booking time to be eligible for a refund.',
        },
        {
            id: '2',
            rule: 'If a user cancels their booking within 48 hours before the scheduled booking time, no refund will be provided.',
        },
        {
            id: '3',
            rule: 'If a user cancels their booking before 48 hours of the scheduled booking time, they will be eligible for a refund of 80% of the booking price.',
        },
        { id: '4', rule: 'Users must initiate the refund request through the app.' },
        {
            id: '5',
            rule: 'Upon successful refund request, the refund amount will be processed within some working days.',
        },
        {
            id: '6',
            rule: 'The refunded amount will be directly credited to the users bank account through the original payment method used for the booking.',
        },
        {
            id: '7',
            rule: 'No refund will be provided for cancellations made within 48 hours of the scheduled booking time.',
        },
        {
            id: '8',
            rule: 'No refund will be provided for no-shows or late arrivals. Users must arrive on time for their booking.',
        },
        {
            id: '9',
            rule: 'In case of any unforeseen circumstances or maintenance issues, the turf management reserves the right to cancel a booking.',
        },
        {
            id: '10',
            rule: 'Users will be provided with a full refund if the cancellation is initiated by the turf management.',
        },
        {
            id: '11',
            rule: 'In case of any dispute regarding refunds, users can contact our customer support team to resolve the issue.',
        },
    ];

    const sendNotification = (fcm, name) => {
        const titles = 'Booking cancel request';
        const messages = `${name} is cancel the slot Please check your cancel request in app`;
        const fcmTokens = ['cssa9EVJ8UBkuhxM4Nwebc: APA91bEmfHtJbbTpkOdKVlSxcECkoSQT5pdzcANa_nLyT0zp6NDpLJTt0vXkol9mkVUqvKMIlqIY8qJihY - fdSit7QRCCQLlepmopW2TdvOefDI7tzhYuFhjUlrN_WjYuRa5ixEWcM_m', 'clEsWk9yQf-cED6WNtApGT:APA91bFAIQQ-YrRyj8TXU0Uw0vtJN0Z-RPVsFObc4-alPkHeLOk0ghXck9hZJtKArNMY9rlsyPsX6nPPtNqbMP-bFCps1j9QGeGGQGesy8DEe7HyFOkzFyeRuM-Yal9EiE_rB3v_Qrse', "fMjuTtQ0iUKjhhoiVlXoix:APA91bGEjMxDxCj9NhJDbM1PSKu8_p2jMIEJlkBxOS6ApgZmlI2JVAG7Hlv7PUQmqSWQr00KxqdhlJxVFWgFJp5tEYTgv4tYF5fY0DbDzwHWcR9uxpTpvZ7oIwu2MFslFzqBpB9WpAyC"];
        Notificationutill(titles, messages, fcm);
    };
    const canapi = async (id) => {
        const user_name = await AsyncStorage.getItem('user_name');
        console.log(id)
        fetch('https://boxclub.in/Joker/Admin/index.php?what=makeACancelRequest', {
            method: 'POST', // Assuming you want to use POST method
            body: JSON.stringify({
                booking_id: id
                // give me regign later for the compony target the find the fault and again and again waring from managemaent still we working and also for just talking with someone at sometime. and we not work with with type of enviromt and still we compete our work to Team leader ask me. 
            })
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response data here
                if (data.success) {

                    sendNotification(data.fcms, user_name);
                    showMessage({
                        message: data.message,
                        type: "Success",
                        backgroundColor: "green", // background color
                        color: "#fff", // text color

                    });

                } else {
                    showMessage({
                        message: data.message ? data.message : "Request failed",
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
    const renderItem = ({ item }) => (
        <View style={styles.timeSlot}>
            <Image
                source={imagesClass.Arrow}
                resizeMode="contain"
                style={{ height: hp(1.5), alignSelf: 'center' }}
            />
            <Text style={styles.textLeft}>{item.rule}</Text>
        </View>
    );
    return (
        <View
            style={{ position: 'relative', marginBottom: hp(12), height: '100%' }}>
            <View style={{ position: 'relative' }}>
                <ScrollView>
                    <View style={{ width: '100%' }}>
                        <TopHeader name={'Cancellation and refund policy'} />
                    </View>

                    <View>
                        <FlatList
                            style={{ marginTop: hp(5) }}
                            data={Refunds}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />

                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => canapi(ids)}>
                            <Text style={styles.payment}>Apply For Cancel Your slot</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Cancel;

const styles = StyleSheet.create({
    btn: { margin: wp(3), height: 40, flex: 1, marginBottom: hp(5) },
    payment: {
        color: '#fff',
        backgroundColor: '#027850',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: wp(5),
        borderRadius: wp(2),
    },
    timeSlot: {
        flexDirection: 'row',
        marginVertical: wp(2),
        paddingHorizontal: wp(2),
    },
    textLeft: {
        alignSelf: 'flex-start',
        textAlignVertical: 'top',
        verticalAlign: 'top',
        justifyContent: 'flex-start',
        flex: 1,
        flexWrap: 'wrap',
    },
});
