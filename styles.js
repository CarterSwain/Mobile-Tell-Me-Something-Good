// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fdfdfd',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Chewy_400Regular',
    textAlign: 'center',
    marginBottom: 30,
    color: '#111',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 28,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  centeredView: {
    marginVertical: 24,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#555',
  },
  errorText: {
    color: '#e11d48',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
  },
  tryAgainText: {
    color: '#2563eb',
    marginTop: 12,
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)', // more solid, less see-through
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 0.4,
    borderColor: 'rgba(0, 0, 0, 0.04)',
  },
  cardText: {
    fontSize: 17,
    lineHeight: 24,
    color: '#1e3a8a', // darker elegant blue
    fontFamily: 'Poppins_400Regular',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#475569', // a soft slate blue-gray
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
});
