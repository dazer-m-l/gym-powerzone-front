import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const createStyles = (screenWidthParam = screenWidth) => {
  const totalDias = 6;
  const marginVertical = 6;

  const usableWidth = Math.max(screenWidthParam * 0.9, 300);
  const horaWidth = Math.max(usableWidth * 0.08, 40);
  const diaWidth = Math.max(((usableWidth - horaWidth) / totalDias) - 4, 40);
  const totalWidth = horaWidth + (diaWidth * totalDias) + (3 * totalDias);

  const horizontalPadding = Math.max((screenWidthParam - totalWidth) / 2, 10);

  const isPhone = screenWidthParam < 400;
  const isTablet = screenWidthParam >= 400 && screenWidthParam < 800;

  const baseCellHeight = isPhone ? 55 : isTablet ? 70 : 85;
  const headerHeight = isPhone ? 35 : isTablet ? 45 : 50;

  const paddingVertical = isPhone ? 30 : isTablet ? 60 : 100;
  const paddingHorizontal = isPhone ? 8 : isTablet ? 12 : 20;

  const fontSizes = {
    headerText: isPhone ? 10 : isTablet ? 12 : 14,
    timeText: isPhone ? 9 : isTablet ? 11 : 13,
    activityText: isPhone ? 9 : isTablet ? 11 : 13,
    timeRangeText: isPhone ? 8 : isTablet ? 10 : 11,
    title: isPhone ? 20 : isTablet ? 26 : 30,
    subtitle: isPhone ? 12 : isTablet ? 14 : 15,
    calendarIcon: isPhone ? 20 : isTablet ? 24 : 28,
  };

  return {
    horaWidth,
    diaWidth,
    totalWidth,
    ...StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingVertical,
        paddingHorizontal,
      },
      tableContainer: {
        marginHorizontal: horizontalPadding,
        marginVertical,
        backgroundColor: '#121212',
        minHeight: baseCellHeight * 4 + headerHeight + marginVertical * 2,
      },
      table: {
        width: totalWidth,
        alignSelf: 'center',
      },
      headerRow: {
        flexDirection: 'row',
        width: totalWidth,
      },
      headerCellTime: {
        backgroundColor: '#ff3c00',
        width: horaWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#181818',
        borderWidth: 1,
        height: headerHeight,
      },
      headerCell: {
        backgroundColor: '#ff3c00',
        width: diaWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#181818',
        borderWidth: 1,
        height: headerHeight,
        paddingHorizontal: 2,
      },
      headerText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: fontSizes.headerText,
        textAlign: 'center',
      },
      row: {
        flexDirection: 'row',
        width: totalWidth,
      },
      timeCell: {
        width: horaWidth,
        height: baseCellHeight,
        backgroundColor: '#ff3c00',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#181818',
        borderWidth: 1,
        padding: 2,
      },
      timeText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: fontSizes.timeText,
        textAlign: 'center',
      },
      cell: {
        width: diaWidth,
        height: baseCellHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
        borderColor: '#181818',
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 4,
      },
      activityText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: fontSizes.activityText,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 16,
        maxWidth: '100%',
        overflow: 'hidden',
      },
      timeRangeText: {
        color: '#aaaaaa',
        fontSize: fontSizes.timeRangeText,
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 14,
        marginTop: 4,
        maxWidth: '100%',
        overflow: 'hidden',
      },
      titleContainer: {
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#121212',
      },
      subtitle: {
        color: '#b4b3b3ff',
        fontSize: fontSizes.subtitle,
        marginBottom: 10,
        textTransform: 'uppercase',
      },
      title: {
        color: '#ffffff',
        fontSize: fontSizes.title,
        fontWeight: 'bold',
      },
      calendarIcon: {
        color: '#ffffff',
        fontSize: fontSizes.calendarIcon,
      },
    }),
  };
};

export default createStyles;
