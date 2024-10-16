
import { SideBar } from '../Components/SideBar';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
const localizer = momentLocalizer(moment)
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Events.css'
function Events(){
    const events = [
        {
          title: 'Meeting with Bob',
          start: new Date(2024, 9, 20, 10, 0),
          end: new Date(2024, 9, 20, 11, 0),
        },
        {
          title: 'Lunch with Alice',
          start: new Date(2024, 9, 21, 12, 0),
          end: new Date(2024, 9, 21, 13, 0),
        },
        // Add more events as needed
      ];
    return(

        <div className="Events">
            <div className="container-fluid d-flex justify-content-center">
            <h1 className="text-primary pt-4 display-1 handwritten-title">Events</h1>
        </div>
            <SideBar></SideBar>
            <div>
            <div className="calendar-container"  >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            
          />
        </div>
  </div>


        </div>
    );

}

export default Events;