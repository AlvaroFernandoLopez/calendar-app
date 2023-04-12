import { useCalentarStore } from "../../hooks"



export const DeleteEvent = () => {

  const {startDeletingEvent, eventSelect}= useCalentarStore();
  const deleteEventArr=()=>{
    console.log(eventSelect)
      startDeletingEvent(eventSelect);
      
  }
  return (
    <>
        <button onClick={deleteEventArr}>Borrar Evento</button>
    </>
  )
}
