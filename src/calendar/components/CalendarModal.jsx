

import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import './modal.css'
import "react-datepicker/dist/react-datepicker.css";
import { addHours } from 'date-fns';
import differenceInSeconds from 'date-fns/differenceInSeconds';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiOpenModal } from '../../hooks/useUiOpenModal';
import { useCalentarStore } from '../../hooks';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {
    
    const [formValid, setformValid] = useState(false);
   
    const {openModal, accionCloseModal}=useUiOpenModal();
    const{ eventSelect, startSavingNewEvent}= useCalentarStore();
   
    const [inputValue, setinputValue] = useState({
        title:'',
        notes:'',
        start: new Date(), 
        end: addHours(new Date(),2)
    });

    const {title, notes, start, end}=inputValue;

    const campo=useMemo(() => {
        if(!formValid) return '';
        
        return (title.length>0)
          ?'is-valid'
          :'is-invalid'
      }, 
      [formValid,title ]
       );

       useEffect(() => {
         if(eventSelect!==null){
            setinputValue({...eventSelect})
         }
       }, [eventSelect])
       

    const onInputChange=({target})=>{
      setinputValue({
        ...inputValue,
        [target.name]:target.value
      })

    }

    const changeDatePicker=(event, changing)=>{
        setinputValue(
          {
            ...inputValue,
            [changing]:event // el evento trae la fecha, la idea es colocarla en el valor actual

            // startDate: event || endDate: event
          }
        )
    }

   const handleSubmit=(event)=>{
      event.preventDefault();
      setformValid(true);
      const diference= differenceInSeconds(end, start);

      if(diference<=0 || isNaN(diference)){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en la fecha!',
        
        })
        return;
      }

      if(title.length<=0){ // el formulario es invalido
        return;
      }
      

      
   }

   const savingEvent=()=>{
   
    startSavingNewEvent(inputValue);
    accionCloseModal();
   }
  
   

  return (
    <Modal
        isOpen={openModal} // recibe true o false
        style={customStyles}
        onRequestClose={accionCloseModal} // recibe una funcion
        contentLabel="Example Modal"
    >
      <h1> Nuevo evento </h1>
      <hr />

      <form className="container" onSubmit={handleSubmit}>

      <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker 
            selected={start}
            onChange={(event)=>changeDatePicker(event,'start')}
            className="form-control"
            dateFormat="Pp"
            />
      </div>

      <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker 
              minDate={start}
              selected={end}
              onChange={(event)=>changeDatePicker(event,'end')}
              className="form-control"
              dateFormat="Pp"
              />
      </div>

      <hr />
      <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input 
               type="text" 
               className={`form-control ${campo}`} //campo tiene el valor de is-valid  o  is-invalid
               placeholder="Titulo del evento"
               rows="5"
               name="title"
               value={title}
               onChange={onInputChange}

          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
      </div>

      <div className="form-group mb-2">
          <textarea 
              type="text" 
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
      </div>

      <button
          type="submit"
          className="btn btn-outline-primary btn-block"
          onClick={savingEvent}

      >
          <i className="far fa-save"></i>
          <span> Guardar</span>
      </button>

      </form>
    </Modal>
  )
}
