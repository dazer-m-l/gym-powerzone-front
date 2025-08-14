// hooks/useCarrito.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'https://gym-powerzone-back-production.up.railway.app/api/items-carrito'

export const useCarrito = () => {
  const [carrito, setCarrito] = useState(null);
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Obtener token del usuario logueado
  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('token');
    } catch (error) {
      console.error('Error obteniendo token:', error);
      return null;
    }
  };

  // Obtener usuario logueado
  const getUsuarioLogueado = async () => {
    try {
      const token = await getToken();
      if (!token) return null;

      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return null;
    }
  };

  // Obtener o crear carrito del usuario
  const obtenerCarritoUsuario = async () => {
    try {
      const usuario = await getUsuarioLogueado();
      if (!usuario) return;

      setLoading(true);

      // Buscar carrito existente del usuario
      const response = await fetch(`${API_BASE_URL}/api/carritos`);
      const carritos = await response.json();
      
      let carritoUsuario = carritos.find(c => c.id_usuario === usuario.id_usuario);

      // Si no existe, crear uno nuevo
      if (!carritoUsuario) {
        const createResponse = await fetch(`${API_BASE_URL}/api/carritos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_usuario: usuario.id_usuario
          })
        });
        carritoUsuario = await createResponse.json();
      }

      setCarrito(carritoUsuario);
      await cargarItemsCarrito(carritoUsuario.id_carrito);
      
    } catch (error) {
      console.error('Error obteniendo carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar items del carrito con información de productos
  const cargarItemsCarrito = async (idCarrito) => {
    try {
      // Obtener items del carrito
      const itemsResponse = await fetch(`${API_BASE_URL}/api/items-carrito/carrito/${idCarrito}`);
      const items = await itemsResponse.json();

      // Obtener información completa de productos
      const productosResponse = await fetch(`${API_BASE_URL}/api/productos`);
      const productos = await productosResponse.json();

      // Combinar información
      const itemsCompletos = items.map(item => {
        const producto = productos.find(p => p.id_producto === item.id_producto);
        return {
          ...item,
          producto: producto || {}
        };
      });

      setItemsCarrito(itemsCompletos);
      calcularTotal(itemsCompletos);
    } catch (error) {
      console.error('Error cargando items del carrito:', error);
    }
  };

  // Calcular total del carrito
  const calcularTotal = (items) => {
    const totalCalculado = items.reduce((sum, item) => {
      return sum + (parseFloat(item.precio_unitario) * item.cantidad);
    }, 0);
    setTotal(totalCalculado);
  };

  // Agregar producto al carrito
  const agregarProducto = async (producto, cantidad = 1) => {
    try {
      if (!carrito) {
        await obtenerCarritoUsuario();
        return;
      }

      setLoading(true);

      // Verificar si el producto ya está en el carrito
      const itemExistente = itemsCarrito.find(item => item.id_producto === producto.id_producto);

      if (itemExistente) {
        // Actualizar cantidad
        await actualizarCantidad(itemExistente.id_item_carrito, itemExistente.cantidad + cantidad);
      } else {
        // Agregar nuevo item
        const response = await fetch(`${API_BASE_URL}/api/items-carrito`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_carrito: carrito.id_carrito,
            id_producto: producto.id_producto,
            cantidad: cantidad,
            precio_unitario: producto.precio
          })
        });

        if (response.ok) {
          await cargarItemsCarrito(carrito.id_carrito);
        }
      }
    } catch (error) {
      console.error('Error agregando producto:', error);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar cantidad de un item
  const actualizarCantidad = async (idItem, nuevaCantidad) => {
    try {
      setLoading(true);

      if (nuevaCantidad <= 0) {
        await eliminarItem(idItem);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/items-carrito/${idItem}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cantidad: nuevaCantidad
        })
      });

      if (response.ok) {
        await cargarItemsCarrito(carrito.id_carrito);
      }
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar item del carrito
  const eliminarItem = async (idItem) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/items-carrito/${idItem}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await cargarItemsCarrito(carrito.id_carrito);
      }
    } catch (error) {
      console.error('Error eliminando item:', error);
    } finally {
      setLoading(false);
    }
  };

  // Vaciar carrito completo
  const vaciarCarrito = async () => {
    try {
      if (!carrito) return;

      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/items-carrito/carrito/${carrito.id_carrito}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setItemsCarrito([]);
        setTotal(0);
      }
    } catch (error) {
      console.error('Error vaciando carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  // Procesar pedido
  const procesarPedido = async (direccionEnvio, metodoPago = 'efectivo') => {
    try {
      if (!carrito || itemsCarrito.length === 0) {
        throw new Error('El carrito está vacío');
      }

      const usuario = await getUsuarioLogueado();
      setLoading(true);

      // Crear pedido
      const pedidoResponse = await fetch(`${API_BASE_URL}/api/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: usuario.id_usuario,
          total_pedido: total,
          estado_pedido: 'Pendiente',
          direccion_envio: direccionEnvio,
          metodo_pago: metodoPago
        })
      });

      const pedido = await pedidoResponse.json();

      // Crear items del pedido
      for (const item of itemsCarrito) {
        await fetch(`${API_BASE_URL}/api/items-pedido`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_pedido: pedido.id_pedido,
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario
          })
        });
      }

      // Vaciar carrito después de procesar el pedido
      await vaciarCarrito();

      return pedido;
    } catch (error) {
      console.error('Error procesando pedido:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Inicializar carrito al montar el hook
  useEffect(() => {
    obtenerCarritoUsuario();
  }, []);

  return {
    carrito,
    itemsCarrito,
    total,
    loading,
    agregarProducto,
    actualizarCantidad,
    eliminarItem,
    vaciarCarrito,
    procesarPedido,
    refrescarCarrito: obtenerCarritoUsuario
  };
};