
export const initialState = {
  reservations: [],
  tables: [],
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TABLES':
      return {
        ...state,
        tables: action.payload
      }
    case 'ADD_TABLE':
    return {
        ...state,
        tables: [...state.tables, action.payload]
      }
    case 'FETCH_AVAILABLE_TABLES': {
      return {
        ...state,
        reservations: action.payload,
      }
    }
    default:
      return state;
  }
}

export default bookingsReducer