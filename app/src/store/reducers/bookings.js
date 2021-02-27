
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
      console.log(state.all_bookings_of_size);

      const table_availability = [];

      let startTimeStamp = Date.parse(state.time.start);
      let endTimeStamp = Date.parse(state.time.end);

      //Reformatting timestamp

      startTimeStamp = parseInt(startTimeStamp.toString().substring(0, 10));
      endTimeStamp = parseInt(endTimeStamp.toString().substring(0, 10));

      state.all_tables_of_size.forEach(tableElement => {
        const table = { id: tableElement.id, available: false }
        let booking_start_times = [];
        let booking_end_times = [];
        state.all_bookings_of_size.forEach((element) => {
          if (tableElement.id === element.tableref) {
            booking_start_times.push(element.start.seconds);
            booking_end_times.push(element.end.seconds);
          }
        });

        booking_start_times = booking_start_times.sort();
        booking_end_times = booking_end_times.sort();

        //Check if there are any bookings, if there arent then table is available regardless
        if (booking_start_times.length < 1 && booking_end_times < 1) {
          table.available = true;
        }
        //Check if lowest booking time is still larger than booking purposed, if so then check if purposed booking end is still lower or equal
        //If so then table is available
        else if(booking_start_times[0] > startTimeStamp && booking_start_times[0] >= endTimeStamp){
          table.available = true;
        }else {
          //Go through every booking to find index where the potential booking would slot in
          for (let i = 0; i < booking_start_times.length; i++) {
            //If purposed booking is the same as a booking already present then its already taken
            if (booking_start_times[i] === startTimeStamp && booking_end_times[i] === endTimeStamp) {
            } 
            //finds index of where the booking slots in by comparing potential bookings starting time to starting and ending slots of bookings
            else if (booking_start_times[i] <= startTimeStamp && startTimeStamp <= booking_end_times[i]) {
              //If program gets here it means that there is a free slot in the schedule
              //If there is nothing below this means its free real estate and the booking is valid
              if (booking_start_times[i + 1] === undefined) {
                table.available = true;
              } 
              //The program now checks the booking "below" to see if potential bookings end time is within the start time of a booking on the database
              else if (endTimeStamp <= booking_start_times[i + 1]) {
                table.available = true;
              }
            }
          }
        }
        table_availability.push(table);
      });
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
export default bookingsReducer