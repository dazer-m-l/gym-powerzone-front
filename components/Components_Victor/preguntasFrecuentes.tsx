import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import {
  FAQContainer,
  FAQContentWrapper,
  FAQTitle,
  FAQColumnsContainer,
  FAQColumn,
  FAQQuestion,
  QuestionText,
  ToggleIcon,
  FAQAnswer,
  QuestionContainer,
  QuestionHighlight
} from './styles/preguntasFrecuentes.styles';

const PreguntasFrecuentes = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [hoveredQuestion, setHoveredQuestion] = useState<number | null>(null);
  const { width } = useWindowDimensions();

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "¿Qué tipo de membresías ofrecen?",
      answer: "Nuestra membresía regular tiene un costo de $400 por mes. ¡Pero si eres nuevo, puedes obtener hasta 3 meses GRATIS! Esta membresía te da acceso completo a pesas, cardio, HIIT, la zona funcional y mucho más."
    },
    {
      question: "¿Hay descuentos para estudiantes o grupos?",
      answer: "Sí, ofrecemos descuentos especiales para estudiantes con credencial vigente y para grupos a partir de 5 personas. Por favor, contacta a nuestro equipo de ventas para más detalles sobre las tarifas grupales y los requisitos."
    },
    {
      question: "¿Cuál es el horario de atención?",
      answer: "Estamos abiertos de Lunes a Viernes de 6:00 AM a 10:00 PM, y los Sábados de 8:00 AM a 4:00 PM. Los Domingos, el gimnasio permanece cerrado."
    },
    {
      question: "¿Dónde se encuentran ubicados?",
      answer: "Nuestra sede principal está en el centro de la ciudad, en Av. Siempre Viva #123. También contamos con sucursales en las principales zonas de la ciudad. Puedes ver un mapa detallado en nuestra sección de Contacto."
    },
    {
      question: "¿Ofrecen entrenamiento personalizado?",
      answer: "Sí, en Gym-PowerZone ofrecemos programas especializados y atención personalizada con nuestros entrenadores certificados. Puedes agendar una sesión de prueba gratuita para conocer a tu futuro entrenador."
    },
    {
      question: "¿Hay clases grupales disponibles?",
      answer: "¡Absolutamente! Contamos con una amplia variedad de clases grupales como spinning, zumba, yoga, pilates y clases de alta intensidad. Puedes consultar el horario semanal de clases en nuestra página de clases."
    }
  ];

  const showSingleColumn = width < 768;

  return (
    <FAQContainer>
      <FAQContentWrapper>
        <FAQTitle>PREGUNTAS FRECUENTES</FAQTitle>

        <FAQColumnsContainer>
          <FAQColumn singleColumn={showSingleColumn}>
            {faqData.slice(0, showSingleColumn ? faqData.length : 3).map((item, index) => (
              <View key={`question-${index}`}>
                <FAQQuestion
                  onPress={() => toggleQuestion(index)}
                  onPressIn={() => setHoveredQuestion(index)}
                  onPressOut={() => setHoveredQuestion(null)}
                >
                  <QuestionContainer>
                    <QuestionHighlight hovered={hoveredQuestion === index} />
                    <QuestionText>{item.question}</QuestionText>
                  </QuestionContainer>
                  <ToggleIcon>{activeQuestion === index ? '−' : '+'}</ToggleIcon>
                </FAQQuestion>
                
                {activeQuestion === index && (
                  <FAQAnswer>{item.answer}</FAQAnswer>
                )}
              </View>
            ))}
          </FAQColumn>

          {!showSingleColumn && (
            <FAQColumn singleColumn={false}>
              {faqData.slice(3, 6).map((item, index) => (
                <View key={`question-${index + 3}`}>
                  <FAQQuestion
                    onPress={() => toggleQuestion(index + 3)}
                    onPressIn={() => setHoveredQuestion(index + 3)}
                    onPressOut={() => setHoveredQuestion(null)}
                  >
                    <QuestionContainer>
                      <QuestionHighlight hovered={hoveredQuestion === index + 3} />
                      <QuestionText>{item.question}</QuestionText>
                    </QuestionContainer>
                    <ToggleIcon>{activeQuestion === index + 3 ? '−' : '+'}</ToggleIcon>
                  </FAQQuestion>
                  
                  {activeQuestion === index + 3 && (
                    <FAQAnswer>{item.answer}</FAQAnswer>
                  )}
                </View>
              ))}
            </FAQColumn>
          )}
        </FAQColumnsContainer>
      </FAQContentWrapper>
    </FAQContainer>
  );
};

export default PreguntasFrecuentes;