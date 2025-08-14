import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';

export const FAQContainer = styled(View)`
  padding: 20px 0;  /* Reducido el padding horizontal a 0 */
  background-color: #121212;
  width: 100%;
  align-items: center;
`;

export const FAQContentWrapper = styled(View)`
  width: calc(100% - 40px); /* Reduce el ancho en 40px (20px cada lado) */
  max-width: 1200px;
  padding: 0 10px; /* Añadido padding interno para mejor espaciado */
`;

export const FAQTitle = styled(Text)`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #FFFFFF;
  font-weight: bold;
  text-transform: uppercase;
  width: 100%;
`;

export const FAQColumnsContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

export const FAQColumn = styled(View)<{ singleColumn: boolean }>`
  width: ${props => props.singleColumn ? '100%' : '48%'};
  margin-bottom: 15px;
`;

export const QuestionContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const QuestionHighlight = styled(View)<{ hovered: boolean }>`
  width: 4px;
  height: 24px;
  background-color: ${props => props.hovered ? '#ff5722' : 'transparent'  };
  margin-right: 10px;
  border-radius: 2px;
  transition: background-color 0.2s ease; /* Agregada transición suave */
`;

export const FAQQuestion = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;  /* Aumentado padding vertical para mejor tacto */
  margin-bottom: 10px;
  width: 100%;
`;

export const QuestionText = styled(Text)`
  font-size: 16px;
  color: #E0E0E0;
  flex: 1;
  font-weight: bold;
  padding-right: 10px; /* Espacio entre texto e ícono */
`;

export const ToggleIcon = styled(Text)`
  font-size: 20px;
  color: #ff5722;
  font-weight: bold;
  min-width: 20px; /* Aseguramos espacio consistente */
  text-align: center;
`;

export const FAQAnswer = styled(Text)`
  font-size: 14px;
  color: #B0B0B0;
  margin-top: 8px;
  padding: 12px;
  background-color: #2A2A2A;
  border-radius: 6px;
  line-height: 22px;
  margin-bottom: 15px;
  width: 100%;
`;