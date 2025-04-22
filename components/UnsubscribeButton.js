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
        Alert.alert("Unsubscribed", "You will no longer receive notifications.");
      } else {
        Alert.alert("Unsubscribe Failed", result.error || result.message);
      }
    } catch (err) {
      console.error("Unsubscribe error:", err);
      Alert.alert("Error", "Something went wrong while unsubscribing.");
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleUnsubscribe}>
      <Text style={styles.buttonText}>Unsubscribe</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonText: {
    color: '#374151',
    fontSize: 15,
    fontFamily: 'Poppins_400Regular',
  },
});

export default UnsubscribeButton;
