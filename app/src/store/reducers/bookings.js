
export const initialState = {
  all_tables_of_size: [],
  all_bookings_of_size: [],
  all_scheduled_tables: [],
  tables: [],
  time: {}
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
    case 'ADD_TIME':
      return {
        ...state,
        time: action.payload
      }
    case 'PERFORM_SCHEDULE':
      console.log("haha perform schedule go brr");
      console.log(state.all_tables_of_size);
      console.log(state.all_bookings_of_size);
      console.log(state.time);

      const table_availability = [];

      let startTimeStamp = Date.parse(state.time.start);
      let endTimeStamp = Date.parse(state.time.end);

      //Reformatting timestamp

      startTimeStamp = parseInt(startTimeStamp.toString().substring(0, 10));
      endTimeStamp = parseInt(endTimeStamp.toString().substring(0, 10));

      state.all_tables_of_size.forEach(tableElement => {
        const table = { id: tableElement.id, available: false }
        state.all_bookings_of_size.forEach(bookingElement => {
          if (tableElement.id === bookingElement.tableref) {
            if (startTimeStamp > bookingElement.start.seconds && endTimeStamp >= bookingElement.end.seconds) {
              if (!table_availability.includes(table)) {
                table.available = true;
                table_availability.push(table);
              } else {
                console.log('Table already available');
              }
            }
          }
        });
      });
      console.log('available tables');
      console.log(table_availability)
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
    default:
      return state;
  }
}

const scheduler = () => {
  /*console.log("haha Scheduler go brr");
  
    

    //Maps table data with availability based on if it can take in someone
    const mappedTables = tablestore.map((element) => {
      return { ...element, available: (unavailableTables.includes(element.id) ? false : true) };
    });

    //Maps tables by size with availability worked out above and sets it as the
    //Tables to be displayed in the list
    setFetchedTables(mappedTables);
  */
};

export default bookingsReducer