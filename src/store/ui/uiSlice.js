import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  openModal: false,
}

export const uiSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    openDateModal: (state) => {
     state.openModal=true
    },
    closeDateModal: (state) => {
      state.openModal=false
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { openDateModal, closeDateModal } = uiSlice.actions

