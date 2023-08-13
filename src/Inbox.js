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

const Inbox = ({ navigation }) => {
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

                <Text style={styles.textLeft}>code</Text>
                <Text style={styles.textLeft}>{item.code}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

                <Text style={styles.textLeft}>message</Text>
                <Text style={styles.textLeft}>{item.message}</Text>
            </View>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate('Cancel')}
            >
                <Text style={styles.payment}>
                    cancelation
                </Text>
            </TouchableOpacity>
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
                            data={rulesData}
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
        borderRadius: wp(2)
    }, textLeft: {
        alignSelf: 'flex-start', textAlignVertical: 'top', verticalAlign: 'top', justifyContent: 'flex-start', flex: 1, flexWrap: 'wrap', marginVertical: wp(0.5), fontWeight: 'bold', fontSize: wp(4)

    }
})