import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React from 'react'
import imagesClass from '../asserts/imagepath'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeComp from './TimeComp';
import Titels from './Titels';
import Facilities from './Facilities';
import { useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const DetailsCompo = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    const openMaps = () => {

        const latitude = 21.21382748197297; // Replace with the destination latitude
        const longitude = 72.90829969505918; // Replace with the destination longitude
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        Linking.openURL(url)
            .catch(error => console.error('Error opening Google Maps', error));
    }
    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.imageContainer}>
                    <Image
                        source={imagesClass.GroudDetails}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.imagesOverlay}>
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <FastImage
                                source={imagesClass.backbig}
                                style={styles.image1}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
​
                        <Image
                            source={imagesClass.share}
                            style={styles.image2}
                            resizeMode="cover"
                        />
                    </TouchableOpacity> */}
                    </View>
                </View>
                <Titels text1={item.name} text2={`${parseInt(item.morning_price) + " ₹"}`} />



                <TimeComp img={imagesClass.clock} text={"Open: 24 hours"} />
                {/* <TimeComp img={imagesClass.bluerike} text={"2 Slot available"} /> */}

                <Titels text1={"Location"} />
                <Text style={styles.addrestxt}>Anthem compound, NR. Harekrishna village Restaurant, simada kenal road</Text>
                <View style={styles.locationview}>
                    <TouchableOpacity onPress={openMaps}>

                        <FastImage
                            source={imagesClass.location}
                            style={styles.mapimage}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: hp(1) }}>

                    <Titels text1={"Facilities provided"} />
                </View>
                <View style={styles.facilityView}>

                    <View>
                        <Facilities img={imagesClass.waiting} text3={"Waiting Area"} />
                        <Facilities img={imagesClass.bat} text3={"bat"} />

                    </View>
                    <View>
                        <Facilities img={imagesClass.water} text3={"Water"} />
                        <Facilities img={imagesClass.parking} text3={"Parking"} />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: hp(2) }}>

                    <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate("TornamentBook", { item: item })}>
                        <Text style={styles.booktxt}>
                            Tournament Booking
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bookbtn} onPress={() => navigation.navigate("DateTime", { item: item })}>
                        <Text style={styles.booktxt}>
                            Slot Booking
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>


    );
};

const styles = StyleSheet.create({

    booktxt: {
        color: '#fff',
        fontSize: wp(4),
    },
    bookbtn: {
        backgroundColor: '#027850',
        position: 'relative',
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2)
        , flex: 1,
        marginHorizontal: wp(2), marginTop: hp(2)
    },


    facilityView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: wp(2),
        marginTop: hp(2),
    },
    addrestxt: { marginLeft: wp(5), marginBottom: hp(1) },
    locationview: {
        width: "90%", backgroundColor: '#fff', alignSelf: 'center', justifyContent: 'center', borderRadius: wp(4), height: hp(18)
    },
    mapimage: {
        width: "90%", height: hp(15), alignSelf: 'center', justifyContent: 'center', borderRadius: wp(4)
    },
    container: {
        width: '100%',
        flex: 1
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: hp(30),
    },
    image: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    imagesOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(4),
        marginLeft: wp(2)
    },
    image1: {
        width: 40,
        height: 40,
        margin: 8,

    },
    image2: {
        width: 40,
        height: 40,
        margin: 8,
    },
    clocks: {
        width: wp(5),
        height: wp(5),
    },

    detailsText: {
        fontSize: 16,
        color: '#fff',
        height: wp(6),
        position: 'relative',
        marginLeft: wp(4),
        backgroundColor: '#000'
    },
    detailsText2: {
        fontSize: 16,
        color: '#fff',
        height: wp(6),
        position: 'relative',
        marginLeft: wp(4),
        right: 0,
        width: "100%",
        backgroundColor: '#000'
    },
});

export default DetailsCompo;