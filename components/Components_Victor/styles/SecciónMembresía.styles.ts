import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const isSmall = width < 600;

const styles = StyleSheet.create({
  membershipSection: {
    backgroundColor: 'transparent',
    paddingVertical: isSmall ? 24 : 40,
    paddingHorizontal: isSmall ? 16 : 32,
    borderRadius: 12,
    marginHorizontal: isSmall ? 12 : 24,
    marginVertical: isSmall ? 24 : 40,
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: isSmall ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: isSmall ? 30 : 20,
  },
  columnLeft: {
    flex: 1,
    paddingRight: isSmall ? 0 : 40,
    marginBottom: isSmall ? 24 : 0,
    width: '100%',
  },
  columnRight: {
    flex: 1,
    paddingLeft: isSmall ? 0 : 40,
    width: '100%',
  },
  divider: {
    width: isSmall ? '100%' : 1,
    height: isSmall ? 1 : '60%',
    backgroundColor: '#2a2a2a',
    alignSelf: 'center',
    marginVertical: isSmall ? 20 : 0,
  },

  membershipTitle: {
    color: '#fff',
    fontSize: isSmall ? 20 : 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: isSmall ? 'center' : 'left',
  },

  offerText: {
    color: '#d4d9d0',
    fontSize: isSmall ? 14 : 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: isSmall ? 'center' : 'left',
  },
  membershipDescription: {
    color: '#4a4e4f',
    fontSize: isSmall ? 13 : 16,
    lineHeight: isSmall ? 20 : 24,
    marginBottom: 20,
    textAlign: isSmall ? 'center' : 'left',
  },
  membershipPrice: {
    color: '#fff',
    fontSize: isSmall ? 16 : 18,
    marginBottom: 12,
    textAlign: isSmall ? 'center' : 'left',
  },
  membershipCta: {
    backgroundColor: '#f23a11',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  ctaText: {
    color: '#fff',
    fontSize: isSmall ? 16 : 18,
    fontWeight: 'bold',
  },
  scheduleTitle: {
    color: '#fff',
    fontSize: isSmall ? 22 : 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: isSmall ? 'center' : 'left',
  },
  scheduleItem: {
    color: '#4a4e4f',
    fontSize: isSmall ? 13 : 16,
    marginBottom: 8,
    textAlign: isSmall ? 'center' : 'left',
  },
  scheduleGroup: {
    marginBottom: 16,
    alignItems: isSmall ? 'center' : 'flex-start',
  },
  scheduleDay: {
    color: '#fff',
    fontSize: isSmall ? 15 : 18,
    fontWeight: 'bold',
    textAlign: isSmall ? 'center' : 'left',
  },
  scheduleTime: {
    color: '#4a4e4f',
    fontSize: isSmall ? 13 : 16,
    marginTop: 4,
    textAlign: isSmall ? 'center' : 'left',
  },
});

export default styles;
