import React from 'react';
import { styles } from './styles/carrito.styles';

const Carrito = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Gym-PowerZone</h1>
      
      <div style={styles.searchSection}>
        <h2>Buscar</h2>
      </div>
      
      <div style={styles.cartSection}>
        <h3>Carrito</h3>
        
        <div style={styles.cartItem}>
          <h4 style={styles.itemTitle}>Botella para Proteina con mezclador</h4>
          <p style={styles.itemDescription}>
            Copa de cocteína de proteínas sin BPA y sin ftalatos, 100% material de grado alimenticio
          </p>
          <p style={styles.availability}>Disponible</p>
          
          <div style={styles.divider}></div>
          
          <div style={styles.itemControls}>
            <div style={styles.quantity}>1 +</div>
            <div style={styles.actions}>
              <button style={styles.actionButton}>Eliminar</button>
              <span> | </span>
              <button style={styles.actionButton}>Guardar para más tarde</button>
            </div>
          </div>
          
          <div style={styles.divider}></div>
          
          <p style={styles.itemPrice}>$1,456</p>
        </div>
        
        <div style={styles.shippingInfo}>
          <p>Una parte de tu primer pedido califica para envío</p>
          <p style={styles.shippingOption}>GRATIS Seleccixón esta opción al finalizar tu campo Detalles</p>
        </div>
        
        <div style={styles.summary}>
          <p>Subtotal (1 productor): <strong>$1,456</strong></p>
        </div>
        
        <button style={styles.checkoutButton}>Proceder al pago</button>
      </div>
    </div>
  );
};

export default Carrito;