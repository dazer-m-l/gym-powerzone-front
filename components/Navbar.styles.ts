import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  logoContainer: {},
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  desktopMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  menuTextPressed: {
    color: '#F13a11',
  },
  menuTextHover: {
    color: '#FF0000',
  },
  socialIcons: {
    flexDirection: 'row',
    marginLeft: 30,
    gap: 20,
  },
  socialIcon: {},
  xIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  xText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuButton: {
    padding: 10,
  },
  mobileMenu: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    overflow: 'hidden',
    zIndex: 999,
  },
  menuContent: {
    padding: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  mobileMenuItem: {
    paddingVertical: 12,
    width: '100%',
  },
  mobileMenuText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  mobileMenuTextPressed: {
    color: '#F13a11',
  },
  mobileSocialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 15,
    width: '100%',
    paddingHorizontal: 20,
  },
});