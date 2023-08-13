import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TopHeader from '../Components/TopHeader';
import BackgroundSvg from '../asserts/svgs/BgImg';
import imagesClass from '../asserts/imagepath';
import Menu from '../Components/Menu';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({ navigation }) => {

    const hEdit = () => {
        console.log("edit");
        navigation.navigate("EditProfile");
    }
    const hcontact = () => {
        console.log("Contact");
        navigation.navigate("ContactUs");

    }
    const habout = () => {
        navigation.navigate("About");

        console.log("About");
    }
    const hlogout = () => {
        console.log("Logout");
        navigation.navigate("loginSceen");

    }
    const hpassword = () => {
        console.log("Edit Profile pressed!");
        navigation.navigate("PasswordScreen")
    };

    return (
        <View style={{ position: 'relative', backgroundColor: '#eeeeee', height: '100%' }}>
            <ScrollView style={{ marginBottom: hp(10) }}>
                <View >
                    <TopHeader name={"My Profile"} />
                </View>
                {/* <View style={{ alignItems: 'center', marginTop: hp(4) }}>
                    <Image source={imagesClass.Profile} resizeMode='contain' style={{ backgroundColor: '#000', alignSelf: 'center', height: hp(15), width: hp(15), borderRadius: hp(7.5), alignItems: 'center', justifyContent: 'center', }} />
                    <Text style={{ color: '#000', fontSize: wp(5) }}>
                        User name
                    </Text>
                    <Text style={{ color: '#000', fontSize: wp(5) }}>
                        123456789</Text>
                </View> */}
                <View style={{ marginTop: hp(10) }}>

                    {/* <Menu icon={imagesClass.pen} name={"Edit Profile"} onpress={() => hEdit()} /> */}
                    <Menu icon={imagesClass.password} name={"Change Password"} onpress={() => hpassword()} />
                    <Menu icon={imagesClass.call} name={"Contact Us"} onpress={() => hcontact()} />
                    <Menu icon={imagesClass.about} name={"About Us"} onpress={() => habout()} />
                    <Menu icon={imagesClass.logout} name={"Logout"} onpress={() => hlogout()} />
                </View>

            </ScrollView>


        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    headetxt: {
        color: '#000',
        fontSize: wp(7),
        marginTop: wp(10),
        marginLeft: wp(10),
    },
    container: { flex: 1, position: 'relative' },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
});
