import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const IS_LARGE_SCREEN = width >= 768;

export const contactFormStyles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingVertical: IS_LARGE_SCREEN ? 60 : 40,
    alignItems: 'center',
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  contentWrapper: {
    flexDirection: IS_LARGE_SCREEN ? 'row' : 'column',
    width: '90%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
<<<<<<< HEAD
  contentWrapperLargeScreen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },

=======
>>>>>>> patricia
  formColumn: {
    flex: 1,
    padding: IS_LARGE_SCREEN ? 30 : 20,
    backgroundColor: '#fff',
    marginBottom: IS_LARGE_SCREEN ? 0 : 40,
    marginRight: IS_LARGE_SCREEN ? 40 : 0,
    maxWidth: IS_LARGE_SCREEN ? 500 : '100%',
  },
  formTitle: {
    fontSize: IS_LARGE_SCREEN ? 32 : width < 380 ? 22 : 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    lineHeight: IS_LARGE_SCREEN ? 40 : 30,
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: IS_LARGE_SCREEN ? 16 : 14,
    color: '#333',
    borderRadius: 6,
  },
  messageInput: {
    height: IS_LARGE_SCREEN ? 180 : 140,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#222',
    paddingVertical: IS_LARGE_SCREEN ? 18 : 14,
    paddingHorizontal: IS_LARGE_SCREEN ? 30 : 20,
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: IS_LARGE_SCREEN ? 18 : 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mapColumn: {
    flex: 1,
    padding: IS_LARGE_SCREEN ? 30 : 20,
    backgroundColor: '#fff',
    maxWidth: IS_LARGE_SCREEN ? '55%' : '100%',
  },
  mapTitle: {
    fontSize: IS_LARGE_SCREEN ? 32 : width < 380 ? 22 : 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    lineHeight: IS_LARGE_SCREEN ? 40 : 30,
    textAlign: 'left',
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: IS_LARGE_SCREEN ? 18 : 15,
    color: '#555',
    flexShrink: 1,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 30,
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
<<<<<<< HEAD
});

=======
  map: {
    width: '100%',
    height: IS_LARGE_SCREEN ? 300 : 200,
    overflow: 'hidden',
  },
});
>>>>>>> patricia
