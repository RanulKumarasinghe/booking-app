
export const initialState = {
  sized_tables: [],
  tables: [],
  table_bookings: [],
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
    case 'FETCH_TABLES_BY_SIZE': {
      return {
        ...state,
        sized_tables: action.payload,
      }
    }
    case 'FETCH_BOOKINGS_BY_TABLE': {
      return {
        ...state,
        table_bookings: action.payload,
      }
    }
    default:
      return state;
  }
}

export default bookingsReducer