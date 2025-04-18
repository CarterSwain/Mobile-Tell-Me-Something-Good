import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { registerForPushNotificationsAsync } from './useNotifications';

// Fetch headlines from your Flask API
const fetchHeadlines = async () => {
  try {
    const response = await fetch("http://192.168.0.103:5001/api/news"); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return [];
  }
};

export default function App() {
  const [headlines, setHeadlines] = useState([]);

  // 🔔 Subscribe handler
  const handleSubscribe = async () => {
    const token = await registerForPushNotificationsAsync();

    if (token) {
      alert("You're subscribed! 🎉");
      // Optionally send this token to your backend
    }
  };

  // Load data on mount
  useEffect(() => {
    const loadHeadlines = async () => {
      const data = await fetchHeadlines();
      setHeadlines(data);
    };

    loadHeadlines();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🌞 Tell Me Something Good</Text>

      <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
        <Text style={styles.buttonText}>🔔 Subscribe to Notifications</Text>
      </TouchableOpacity>

      <FlatList
        data={headlines}
        keyExtractor={(item, index) => item.headline + index}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.headline}>{item.headline}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  headline: {
    fontSize: 16,
    color: '#111827',
  },
});
