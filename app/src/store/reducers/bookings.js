
export const initialState = {
  all_tables_of_size: [],
  all_bookings_of_size: [],
  all_scheduled_tables: [],
  // all_bookings_of_restaurant: [],
  unavailable_tables: [],
  users_bookings: [],
  tables: [],
  time: {},

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

      /*let w = () => {
        const timeSt = 0;
        const timeEn = 100;
        const timesStart = [8, 15, 18].sort((a, b) => a - b);
        const timesEnd = [10, 17, 19].sort((a, b) => a - b);
        for (let i = 0; i < timesStart.length; i++) {
          if (timesStart[i] == timeSt && timesEnd[i] == timesEnd) {
            console.log("They the same");
          }
          else if (timesStart[0] >= timeEn) {
            console.log("table available");
            i = timesStart.length;
          }
          else if ((timesEnd[i] <= timeSt && timesStart[i + 1] >= timeEn) || (timesEnd[i] <= timeSt && timesStart[i + 1] === undefined)) {
            console.log("table available");
            i = timesStart.length;
          }
          else {
            console.log(i + "NOPE");
          }
        }
      }

      let startTimeStamp = Date.parse(state.time.start);
      let endTimeStamp = Date.parse(state.time.end);

      state.all_tables_of_size.forEach(tableElement => {
        const table = { id: tableElement.id, available: false }

        let booking_start_times = [];
        let booking_end_times = [];

        state.all_bookings_of_size.forEach((element) => {
          if (tableElement.id === element.tableref && element.status == 'ok') {
            booking_start_times.push(element.start.toDate().getTime());
            booking_end_times.push(element.end.toDate().getTime());
          }
        });

        booking_start_times = booking_start_times.sort((a, b) => a - b);
        booking_end_times = booking_end_times.sort((a, b) => a - b);

        if (state.all_bookings_of_size.length < 1) {
          table.available = true;
        }
        for (let i = 0; i < booking_start_times.length; i++) {
          if (booking_start_times[i] === startTimeStamp && booking_end_times[i] === endTimeStamp) {
          } else if (booking_start_times[0] >= endTimeStamp) {
            table.available = true;
            i = booking_start_times.length;
          } else if ((booking_end_times[i] <= startTimeStamp && booking_start_times[i + 1] >= endTimeStamp) || (booking_end_times[i] <= startTimeStamp && booking_start_times[i + 1] === undefined)) {
            table.available = true;
            i = booking_start_times.length;
          } else {

          }
        }
      });*/
      return {
        ...state,
        all_scheduled_tables: table_availability,
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
    case 'FETCH_BOOKINGS_BY_USER': {
      const now = new Date();
      action.payload.forEach((element) => {
        if (now.getTime() > element.date.toDate().getTime() && element.status === 'Ok') {
          //dispatch(postBookingExpiration(element.docId));
          element.status = 'expired';
        } else {
        }
      });
      return {
        ...state,
        users_bookings: action.payload,
      }
    }
    case 'FETCH_BOOKINGS_BY_USER_FILTERED': {
      return {
        ...state,
        users_bookings: action.payload,
      }
    }
    case 'Clear_User_Bookings': {
      return {
        ...state,
        users_bookings: [],
      }
    } case 'CLEAR_TIME': {
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