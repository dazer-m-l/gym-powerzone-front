// src/components/ProductListScreen.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types'; 

interface ProductListProps {

  onProductsLoaded: (products: Product[]) => void;
  onLoading: (isLoading: boolean) => void;
  onError: (error: string | null) => void;
}

const API_URL = 'https://gym-powerzone-back-production.up.railway.app/api/productos';

const ProductListScreen: React.FC<ProductListProps> = ({ onProductsLoaded, onLoading, onError }) => {

  useEffect(() => {
    const fetchProducts = async () => {
      onLoading(true); 
      onError(null);  

      try {
        const response = await axios.get(API_URL);
        
        
        const formattedProducts = response.data.map((item: any) => ({
          id: item.id_producto,
          name: item.nombre_producto,
          description: item.descripcion,
          imageUrl: { uri: item.imagen_url },
          price: parseFloat(item.precio),
          rating: 0,
          reviews: 0,
        }));
        
        onProductsLoaded(formattedProducts); 
      } catch (err) {
        onError('No se pudieron cargar los productos. Inténtalo de nuevo.');
        console.error('Error al obtener productos:', err);
      } finally {
        onLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  
  return null;
};

export default ProductListScreen;