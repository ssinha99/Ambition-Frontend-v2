import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

// Define a type for the slice state
interface CounterState {
  value: string
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 'None'
}

export const profileSlice = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setUserEmail } = profileSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getUserEmail = (state: RootState) => state.value

export default profileSlice.reducer