import { addHours } from "date-fns";
import { useCalentarStore, useUiOpenModal } from "../../hooks";


export const CreateEvent = () => {

const {accionOpenModal}=useUiOpenModal();
const {setActiveEvent}=useCalentarStore();

const handleNewEvent=()=>{
   accionOpenModal();
   setActiveEvent(
    {
       title:'',
       start: new Date(),
       end: addHours(new Date(),2),
       user:{
        name:'Fernando',
        id:12345
      }
    }
   )
}


  return (
    <>
        <button onClick={handleNewEvent}>Add Event</button>

    </>
  )
}
