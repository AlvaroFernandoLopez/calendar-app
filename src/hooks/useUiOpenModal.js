import { useDispatch, useSelector } from "react-redux"
import { closeDateModal, openDateModal } from "../store";



export const useUiOpenModal = () => {

  const dispatch=useDispatch();
  const {openModal}= useSelector(state=> state.ui);

  const accionOpenModal=()=>{
    dispatch(openDateModal());
  }

  const accionCloseModal=()=>{
    dispatch(closeDateModal());
  }
  return {
    openModal,
    accionOpenModal,
    accionCloseModal,
  }
   
  
}
