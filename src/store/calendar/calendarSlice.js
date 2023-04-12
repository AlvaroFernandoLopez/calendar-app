import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const eventTemp = {
  _id: new Date().getTime(),
  title:'Cumpleaños de Juan',
  start: new Date(),
  end: addHours(new Date(),2),
  user:{
    name:'Fernando',
    id:12345
  }

}


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState:{
    events:[
      eventTemp,
    ],
    eventSelect:null,
   

  },
  reducers: {
    loadEvent: (state,action) => {
      state.eventSelect=action.payload
    },

    addNewEvent:(state, action)=>{
      state.events.push(action.payload);
      state.eventSelect=null;
    },
    updateEvent:(state, action)=>{
      state.events= state.events.map((event)=>{
        if(event._id===action.payload._id){
          return action.payload;
        }
        return event;
      })
    },
    deleteEventArr:(state, action)=>{
      state.events= state.events.filter((events)=>{
        return (events._id !== action.payload._id);
      })
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { loadEvent, addNewEvent, updateEvent, deleteEventArr } = calendarSlice.actions

