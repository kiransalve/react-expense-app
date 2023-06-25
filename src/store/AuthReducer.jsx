import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idToken:localStorage.getItem("idToken") || null,
    user:localStorage.getItem("user") || null,
    emailverified:false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state, action) =>{
            state.user = action.payload;
            state.idToken = action.payload.idToken
            localStorage.setItem("idToken",state.idToken)
            localStorage.setItem("user",JSON.stringify(state.user))
        },
        logout:(state)=>{
            state.user = null
            state.idToken=null
            localStorage.removeItem("idToken")
            localStorage.removeItem("user")
        },
        isVerified : (state, action) => {
            state.emailverified = action.payload
        }
    }
})

export const { login, logout, isVerified } = authSlice.actions
export default authSlice.reducer
