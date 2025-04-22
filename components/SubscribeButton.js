import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubscribeButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      <Text style={styles.buttonText}>🔔 Subscribe</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(96, 165, 250, 0.85)', // soft light blue
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 24,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default SubscribeButton;
