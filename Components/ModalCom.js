import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native-animatable';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ModalCom = ({ visible, onClose, title, content, btn, btnonpress }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <View style={styles.modalv}>
                        <View
                            style={{
                                borderBottomColor: '#027850',
                                borderBottomWidth: 1,
                                marginBottom: hp(3),
                            }}>
                            <Text
                                style={{
                                    color: '#027850',
                                    textAlign: 'center',
                                    fontSize: wp(4),
                                    marginBottom: hp(1),
                                }}>
                                {title}
                            </Text>
                        </View>
                        <Text style={{ color: '#027850', textAlign: 'center' }}>
                            {content}
                        </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    ...styles.bookbtn,
                                    borderColor: '#027850',
                                    borderWidth: 1,
                                }}
                                onPress={() =>
                                    onClose()
                                }>
                                <Text style={{ ...styles.booktxt }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.bookbtn, backgroundColor: '#C3EDC0' }}
                                onPress={() => btnonpress()}>
                                <Text style={{ ...styles.booktxt }}>{btn}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ModalCom

const styles = StyleSheet.create({
    booktxt: {
        color: '#027850',
        fontSize: wp(3),

    },
    bookbtn: {
        position: 'relative',
        alignSelf: 'center',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(2),
        flex: 1,
        marginHorizontal: wp(2),
        marginTop: hp(2),
        paddingHorizontal: wp(2),
    },

    modalv: {
        borderRadius: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 5,
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        width: '80%',
        paddingVertical: hp(2.5),
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})