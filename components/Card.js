import React from 'react';
import { View, Text, Image, Platform } from 'react-native';

import { cardStyles } from './carrusel.styles';

const Card = ({ item }) => {
  return (
    <View style={cardStyles.card}>
      <Image source={item.image} style={cardStyles.cardImage} />
      <View style={cardStyles.cardContent}>
        <Text style={cardStyles.cardTitle}>{item.name}</Text>
        <Text style={cardStyles.cardTrainer}>Entrenado por - {item.trainer}</Text> {/* Traducido */}
        <Text style={cardStyles.cardDescription}>{item.description}</Text> {/* Añadida la descripción */}
        <View style={cardStyles.priceBubble}>
          <Text style={cardStyles.priceText}>{item.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;