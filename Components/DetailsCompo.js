import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import imagesClass from '../asserts/imagepath'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Back from '../asserts/svgs/Back';
import Icon from '../asserts/svgs/Back';
import { Svg, G, Rect, Path, Defs, Filter, FeFlood, FeGaussianBlur, FeComposite, FeBlend, Stop, LinearGradient } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimeComp from './TimeComp';
import Titels from './Titels';
import Facilities from './Facilities';

const DetailsCompo = () => {
    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.imageContainer}>
                <Image
                    source={imagesClass.GroudDetails}
                    style={styles.image}
                    resizeMode="cover"
                />
                <View style={styles.imagesOverlay}>
                    <Image
                        source={imagesClass.backbig}
                        style={styles.image1}
                        resizeMode="cover"
                    />
                    <Image
                        source={imagesClass.share}
                        style={styles.image2}
                        resizeMode="cover"
                    />
                </View>
            </View>
            <Titels text1={"Sports academy"} text2={"$600/hr"} />



            <TimeComp img={imagesClass.clock} text={"Open: 24 hours"} />
            <TimeComp img={imagesClass.bluerike} text={"2 Slot available"} />

            <Titels text1={"Location"} />
            <View style={styles.locationview}>

                <Text style={styles.addrestxt}> surat , gujrat</Text>
                <Image
                    source={imagesClass.location
                    }
                    style={styles.mapimage}
                    resizeMode="cover"
                />
            </View>
            <Titels text1={"Facilities provided"} />
            <SafeAreaView style={styles.facilityView}>
                <SafeAreaView>
                    <Facilities img={imagesClass.parking} text3={"Parking"} />
                    <Facilities img={imagesClass.bat} text3={"bat"} />


                </SafeAreaView>
                <SafeAreaView>
                    <Facilities img={imagesClass.Locaker} text3={"Locaker"} />
                    <Facilities img={imagesClass.waiting} text3={"Waiting Room"} />

                </SafeAreaView>
                <SafeAreaView>
                    <Facilities img={imagesClass.water} text3={"Water"} />
                    <Facilities img={imagesClass.bat} text3={"bat"} />

                </SafeAreaView>
            </SafeAreaView>
            <View style={styles.bookbtn}>
                <Text style={styles.booktxt}>
                    Book Now
                </Text>
            </View>
        </SafeAreaView >


    );
};

const styles = StyleSheet.create({
    booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
    bookbtn: { backgroundColor: '#027850', height: hp(6), width: "90%", alignSelf: 'center', borderRadius: wp(2), marginTop: wp(5) },
    facilityView: { flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: wp(2) },
    addrestxt: { marginLeft: wp(5), marginVertical: wp(1) },
    locationview: {
        height: hp(18.5), width: "90%", backgroundColor: '#fff', alignSelf: 'center', justifyContent: 'center', borderRadius: wp(4), paddingBottom: 8
    },
    mapimage: {
        width: "90%", height: hp(15), alignSelf: 'center', justifyContent: 'center', borderRadius: wp(4),
    },
    container: {
        width: '100%',
        // backgroundColor: '#fff'
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
    },
    image: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imagesOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(4)
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
