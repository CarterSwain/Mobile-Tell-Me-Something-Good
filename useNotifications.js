// useNotifications.js
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async () => {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Permission for push notifications was denied 😢');
    return null;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);  // ✅ Logs to terminal

  return token;
};
