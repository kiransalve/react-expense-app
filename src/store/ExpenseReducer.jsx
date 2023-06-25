import { createSlice } from "@reduxjs/toolkit";


const initialState = {
expense :{},
}

const expenseSlice = createSlice({
    name:"expense",
    initialState,
    reducers:{
        addExpense:(state, actions) => {
            state.expense = actions.payload
        }
    }
})


export const { addExpense} = expenseSlice.actions
export default expenseSlice.reducer
