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
import imagesClass from '../asserts/imagepath';
import { ScrollView } from 'react-native-gesture-handler';
const Rules = () => {
    const rulesData = [
        {
            id: '1',
            rule: 'All customers are to leave the pitch/ground once their time slot has been completed.',
        },
        {
            id: '2',
            rule: 'Possession or Consumption of alcoholic beverages, public intoxication is prohibited in the facility.',
        },
        {
            id: '3',
            rule: 'Organized activities, events, tournaments, etc. In the field must have a reservation and confirmed payment.',
        },
        {
            id: '4',
            rule: 'Individuals or organizations cannot conduct commercial operations at venue without prior consent.',
        },
        {
            id: '5',
            rule: 'Management reserves the right to inspect any bag for the prohibited items.',
        },
        { id: '6', rule: 'Boots with Metal studs are prohibited.' },
        {
            id: '7',
            rule: 'The Management reserves the right to evict any individual for any offensive, violent, abusive, discriminatory behavior of any kind shown towards any of the staff as well as other customers.',
        },
        { id: '8', rule: 'Smoking, chewing tobacco & chewing gum is prohibited.' },
        { id: '9', rule: 'Outside food and Beverages not permissible.' },
        {
            id: '10',
            rule: 'Children under the age of 10 years must be accompanied by a guardian (16 years or over) at all times.',
        },
        {
            id: '11',
            rule: 'Arrive on time to avoid inconvenience for the next booking.',
        },
    ];
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
        <SafeAreaView style={{ position: 'relative', marginBottom: hp(12) }}>
            <View style={{ position: 'relative' }}>
                <ScrollView>
                    <View>
                        <TopHeader name={'Rules'} />
                    </View>

                    <View>
                        <Text
                            style={{
                                color: '#000',
                                marginTop: hp(8),
                                fontSize: wp(6),
                                marginHorizontal: wp(5),
                            }}>
                            General Rules
                        </Text>
                    </View>
                    <View style={{ marginRight: wp(9) }}>
                        <FlatList
                            style={{ marginTop: hp(3) }}
                            data={rulesData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>
                    <View>
                        <Text
                            style={{
                                color: '#000',
                                fontSize: wp(6),
                                marginHorizontal: wp(5),
                                marginTop: hp(4),
                            }}>
                            Cancellation and refund policy
                        </Text>
                        <FlatList
                            style={{ marginTop: hp(3) }}
                            data={Refunds}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Rules;

const styles = StyleSheet.create({
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
