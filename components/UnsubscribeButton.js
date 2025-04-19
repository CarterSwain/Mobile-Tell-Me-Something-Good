// components/UnsubscribeButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const UnsubscribeButton = () => {
  const handleUnsubscribe = async () => {
    try {
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const token = tokenData.data;

      const response = await fetch("http://192.168.0.103:5001/unregister_token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("✅ Unsubscribed", "You will no longer receive notifications.");
      } else {
        Alert.alert("⚠️ Unsubscribe Failed", result.error || result.message);
      }
    } catch (err) {
      console.error("Unsubscribe error:", err);
      Alert.alert("❌ Error", "Something went wrong while unsubscribing.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleUnsubscribe}>
      <Text style={styles.buttonText}>🚫 Unsubscribe from Notifications</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#dc2626',
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
});

export default UnsubscribeButton;
