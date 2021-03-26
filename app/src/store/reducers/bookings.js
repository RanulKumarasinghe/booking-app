
export const initialState = {
  all_tables_of_size: [],
  all_bookings_of_size: [],
  all_scheduled_tables: [],
  unavailable_tables: [],
  tables: [],
  time: {},
  docId: undefined,
  extend: undefined,
  users_bookings: [],
}

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UNAVAILABLE_TABLES': {
      return {
        ...state,
        unavailable_tables: action.payload
      }
    }
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
    case 'ADD_TIME':
      return {
        ...state,
        time: action.payload
      }
    case 'PERFORM_SCHEDULE':
      const table_availability = [];
      state.all_tables_of_size.forEach((table) => {
        if (state.unavailable_tables.includes(table.id)) {
          table_availability.push({ ...table, available: false })
        } else {
          table_availability.push({ ...table, available: true })
        }
      })
      return {
        ...state,
        all_scheduled_tables: table_availability,
      }
    case 'EXTEND_BOOKING': {
      return {
        ...state,
        extend: action.payload
      }
    }
    case 'POST_BOOKING': {
      return {
        ...state,
        docId: action.payload,
      }
    }

    case 'FETCH_TABLES_BY_SIZE': {
      return {
        ...state,
        all_tables_of_size: action.payload,
      }
    }
    case 'FETCH_BOOKINGS_BY_SIZE': {
      return {
        ...state,
        all_bookings_of_size: action.payload,
      }
    }

    case 'CLEAR_TIME': {
      return {
        ...state,
        time: undefined,
      }
    }
    case 'CLEAR_TABLES': {
      return {
        ...state,
        all_scheduled_tables: [],
      }
    }
    case 'REMOVE_TABLE': {
      const newTableArray = state.tables;
      newTableArray.splice(action.payload, 1);
      return {
        ...state,
        tables: [...newTableArray]
      }
    }
    default:
      return state;
  }
}
export default bookingsReducer