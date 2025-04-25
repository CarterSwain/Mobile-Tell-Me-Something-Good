// App.js
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ImageBackground,
} from 'react-native';
import SubscribeButton from './components/SubscribeButton';
import UnsubscribeButton from './components/UnsubscribeButton';
import * as Notifications from 'expo-notifications';
import * as WebBrowser from 'expo-web-browser';
import bgImage from './assets/tmsg_mobile_ui.png';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { Chewy_400Regular } from '@expo-google-fonts/chewy';
import styles from './styles';


const BASE_URL = process.env.EXPO_PUBLIC_API_URL;


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const fetchHeadlines = async () => {
  const response = await fetch(`${BASE_URL}/api/news`);
  if (!response.ok) throw new Error("Network error");
  const data = await response.json();
  return data;
};


export default function App() {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Chewy_400Regular,
  });

  useEffect(() => {
    loadHeadlines();
  }, []);

  const handleSubscribe = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Notification permission denied 😢');
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;

    alert("Subscribed!\nPositive news coming your way! 😊");
    console.log("Expo Push Token:", token);

    try {
      await fetch(`${BASE_URL}/register_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      console.log("✅ Token sent to backend");
    } catch (err) {
      console.error("❌ Failed to register token:", err);
    }
  };

  const loadHeadlines = async () => {
    try {
      setLoading(true);
      const data = await fetchHeadlines();
      setHeadlines(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching headlines:", err);
      setError("Couldn't load happy news 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={bgImage} style={styles.background}>
      <SafeAreaView style={styles.container}>
        {!fontsLoaded ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <Text style={styles.title}>Tell Me Something Good...</Text>

            <SubscribeButton onPress={handleSubscribe} disabled={loading} />

            {loading && (
              <View style={styles.centeredView}>
                <ActivityIndicator size="large" color="#2563eb" />
                <Text style={styles.loadingText}>Loading some sunshine…</Text>
              </View>
            )}

            {error && (
              <View style={styles.centeredView}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={loadHeadlines}>
                  <Text style={styles.tryAgainText}>🔄 Try Again</Text>
                </TouchableOpacity>
              </View>
            )}

            {!loading && !error && (
              <FlatList
                data={headlines}
                keyExtractor={(item, index) => item.headline + index}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.card} onPress={() => WebBrowser.openBrowserAsync(item.link)}
                  activeOpacity={0.85}>
                    <Text style={styles.cardText}>💌{item.headline}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <UnsubscribeButton />

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Made w/ love by Carter Swain (
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://www.carterswaindev.com')}
              >
                www.carterswaindev.com
              </Text>
              )
              </Text>
              </View>
              </>
        )}
        <StatusBar style="auto" />
      </SafeAreaView>
    </ImageBackground>
  );
}
