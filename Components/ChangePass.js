import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import imagesClass from '../asserts/imagepath';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChangePass = ({ name, onChangeText, headerText, eye, called, im }) => {
    const [secure, setSecure] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleTextChange = (text) => {
        setInputValue(text);
        onChangeText(text); // Call the prop function to update the parent state
    };

    return (
        <View style={{ marginVertical: hp(0.8), }}>
            {headerText === null ? null : <Text style={{ marginTop: 10, marginHorizontal: wp(5) }}>
                {headerText}h
            </Text>
            }
            <View style={styles.fillDetails}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                    <Image
                        source={im ? im : imagesClass.user}
                        style={styles.phnimage}
                        resizeMode="center"
                    />
                    <TextInput
                        secureTextEntry={secure}
                        keyboardType={called ? 'phone-pad' : null}
                        placeholder={name}
                        style={styles.inputFild}
                        onChangeText={handleTextChange} // Set the onChangeText prop
                        value={inputValue} // Set the value prop for controlled input
                    />
                </View>
                {eye ? <View>
                    <TouchableOpacity onPress={() => setSecure(!secure)} style={{ alignSelf: 'center' }}>
                        <Image
                            source={secure ? imagesClass.hide : imagesClass.view}
                            style={{ alignSelf: 'flex-end', height: 15, width: 20, justifyContent: 'center', tintColor: '#027850' }}
                            resizeMode="center"
                        />
                    </TouchableOpacity>
                </View> : null}

            </View>
        </View>
    );
};

export default ChangePass;

// define your styles
const styles = StyleSheet.create({
    phnimage: { width: wp(5), height: hp(5), tintColor: '#027850' },
    booktxt: { color: '#fff', alignSelf: 'center', textAlignVertical: 'center', flex: 1, fontSize: wp(4) },
    bookbtn: {
        backgroundColor: '#027850', height: hp(6), width: "90%", position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: hp(5), borderRadius: wp(2)

    },
    container: {
        flex: 1,

    },
    titelText: {
        width: wp(80),
        height: hp(9),
        color: '#027850',
        fontSize: wp(7),
        marginTop: hp(10),
        marginHorizontal: hp(4),
        fontWeight: 'bold',
    },
    fillDetails: {
        backgroundColor: '#fff',
        margin: wp(2),
        marginHorizontal: wp(5), padding: wp(3),
        borderRadius: wp(2),
        flexDirection: 'row',
        borderBottomColor: '#027850',
        borderBottomWidth: 2
        , justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputFild: {
        height: hp(5), color: 'black', paddingLeft: wp(4), flexWrap: 'wrap', flex: 1, fontSize: wp(4)
    },
});

//make this component available to the app
