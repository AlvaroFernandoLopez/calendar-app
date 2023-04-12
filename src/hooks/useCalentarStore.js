import { useDispatch, useSelector } from "react-redux"

import { loadEvent, addNewEvent, updateEvent, deleteEventArr} from "../store";


export const useCalentarStore = () => {
    const {events,eventSelect}=useSelector(state=> state.calendar);
    const dispatch=  useDispatch();

    const setActiveEvent=(calendarEvent)=>{
      dispatch(loadEvent(calendarEvent)); 
    }

    const startSavingNewEvent=(calendarEvent)=>{ // calendarEvent viene del valor que tiene el input value

      if(calendarEvent._id){
        //actualizando
        dispatch(updateEvent(calendarEvent));
      }else{
        //creando nota
        dispatch(addNewEvent({
          _id:new Date().getTime(), ...calendarEvent, 
        }));
      }
      
    }

    const startDeletingEvent=(calendarEvent)=>{
      dispatch(deleteEventArr(calendarEvent));
    }
  return {
    events,
    eventSelect,
    setActiveEvent,
    startSavingNewEvent,
    startDeletingEvent,
  }

}