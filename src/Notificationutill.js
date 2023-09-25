import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Notificationutill = async (titles, messages, fcmTokens) => {
    const headers = {
        Authorization: `key=${"AAAAGTHgzAU:APA91bFQxGlEPBbSgEkaKdML-5j-enPUdoobZYch1X7oV_8rv9bqBFAsWJnYaDwcZ_qxhsZVDjMvRnjX1IdAqL_mMSw4TVNQyz6eVAFoRhznQxJE0HrjAXipyY0wcF0fYy3Y_Yjq_Zng"}`,
        'Content-Type': 'application/json',
    };

    const notifications = {
        registration_ids: fcmTokens,
        notification: {
            title: titles,
            body: messages,
            icon: 'ic_notification_icon',
            smallIcon: "ic_launcher",
        },

        data: {},
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        body: JSON.stringify(notifications),
        headers: headers,

    })
        .then(response => response.json()).catch((error) => console.log(error))



};