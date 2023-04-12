

import { useState } from 'react'
import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessages, localizer } from '../../helpers'
import { useCalentarStore,useUiOpenModal} from '../../hooks'
import { CalendarModal, CalendarBox, CreateEvent, DeleteEvent } from '../components'




export const CalendarPage = () => {

 const [lastView, setlastView] = useState(localStorage.getItem('lastView' || 'week'));
 const {accionOpenModal}=useUiOpenModal();
 const {events, setActiveEvent}=useCalentarStore();

 const eventStyle=(event,start, end , isSelected)=>{
    const style={
      backgroundColor:'#347CF7',
      borderRadius:'0px',
      opacity:0.8,
      color:'white',
    }

    return {
      style
    }
 }


 const onClickCalendar=(event)=>{
 
    setActiveEvent(event);
}
 const onDoubleClickCalendar=(event)=>{
    accionOpenModal(); // pone en true el modal
 }

 const onViewChangeCalendar=(event)=>{
  
  setlastView(localStorage.setItem('lastView',event)); // el evento es s'week', 'agenda' , 'day'
                                                      // el valor de lastview lo toma del localStorage
 }
  return (
    <>
 
    <Calendar
      culture='es'
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages={getMessages()}
      eventPropGetter={eventStyle}
      defaultView={lastView}
      components={{
        event: CalendarBox
      }}
     onDoubleClickEvent={onDoubleClickCalendar}
      onSelectEvent={onClickCalendar}
      onView={onViewChangeCalendar}
    />
    <CalendarModal/>
    <CreateEvent/>
    <DeleteEvent/>
    </>
  )
}





