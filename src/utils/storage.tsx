import { AsyncStorage } from 'react-native';

export const getCarts = async () => {
  try {
    const cartsString = (await AsyncStorage.getItem('carts')) || '[]';
    const carts = JSON.parse(cartsString);
    return carts;
  } catch (err) {
    throw err;
  }
};

export const addOrUpdateCart = async cart => {
  try {
    const current_carts = await getCarts();
    const idx = current_carts.findIndex(item => item.id === cart.id);

    if (idx !== -1) {
      const carts = [
        ...current_carts.slice(0, idx),
        { ...cart },
        ...current_carts.slice(idx + 1, current_carts.length),
      ];
      await AsyncStorage.setItem('carts', JSON.stringify(carts));
      return cart;
    } else {
      const carts = [...current_carts, { ...cart }];
      await AsyncStorage.setItem('carts', JSON.stringify(carts));
      return cart;
    }
  } catch (err) {
    throw err;
  }
};

export const removeCart = async id => {
  try {
    const carts = await getCarts();
    const newCarts = carts.filter(item => item.id !== id);
    await AsyncStorage.setItem('carts', JSON.stringify(newCarts));
    return id;
  } catch (err) {
    throw err;
  }
};

export const setCarts = async carts => {
  try {
    await AsyncStorage.setItem('carts', JSON.stringify(carts));
  } catch (err) {
    throw err;
  }
};
