import { CSSProperties } from 'react';

export const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  } as CSSProperties,
  
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px'
  } as CSSProperties,
  
  searchSection: {
    marginBottom: '20px'
  } as CSSProperties,
  
  cartSection: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff'
  } as CSSProperties,
  
  cartItem: {
    marginBottom: '20px'
  } as CSSProperties,
  
  itemTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333'
  } as CSSProperties,
  
  itemDescription: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px'
  } as CSSProperties,
  
  availability: {
    fontSize: '14px',
    color: '#28a745',
    marginBottom: '10px'
  } as CSSProperties,
  
  divider: {
    height: '1px',
    backgroundColor: '#e0e0e0',
    margin: '10px 0'
  } as CSSProperties,
  
  itemControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  } as CSSProperties,
  
  quantity: {
    fontWeight: 'bold'
  } as CSSProperties,
  
  actions: {
    display: 'flex',
    alignItems: 'center'
  } as CSSProperties,
  
  actionButton: {
    background: 'none',
    border: 'none',
    color: '#0066cc',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 5px'
  } as CSSProperties,
  
  itemPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333'
  } as CSSProperties,
  
  shippingInfo: {
    margin: '20px 0',
    fontSize: '14px',
    color: '#666'
  } as CSSProperties,
  
  shippingOption: {
    color: '#0066cc',
    fontWeight: 'bold'
  } as CSSProperties,
  
  summary: {
    textAlign: 'right',
    margin: '20px 0',
    fontSize: '16px'
  } as CSSProperties,
  
  checkoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff6b00',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  } as CSSProperties
};

export const hoverStyles = {
  actionButtonHover: {
    textDecoration: 'underline'
  } as CSSProperties,
  
  checkoutButtonHover: {
    backgroundColor: '#e05d00'
  } as CSSProperties
};