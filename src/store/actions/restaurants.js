export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export const filterRestaurant = (name) => {
  return { type: TOGGLE_FILTER, restaurantName: name}
}