import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiStatus, Baby } from '../../types'

export interface BabiesState {
  babies: Baby[]
  apiStatus: { [action: string]: ApiStatus }
  apiError: { [action: string]: any }
}

const initialState: BabiesState = {
  babies: [],
  apiStatus: {},
  apiError: {},
}

type ListBabiesArgs = {
  list_id?: string
}

export const listBabies = createAsyncThunk(
  "babies/listBabies",
  async (args: ListBabiesArgs, { rejectWithValue }) => {
    const url = "api/v1/babies/index"
    try {
      const response = await axios.get<Baby[]>(url, { params: args })
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const createBaby = createAsyncThunk(
  "babies/createBaby",
  async (args: Baby, { rejectWithValue }) => {
    const url = "api/v1/babies/create"
    try {
      const response = await axios.post<Baby>(url, args)
      return response.data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const counterSlice = createSlice({
  name: 'babies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listBabies.pending, (state, action) => {
        state.apiStatus["listBabies"] = ApiStatus.PENDING
      })
      .addCase(listBabies.fulfilled, (state, action) => {
        state.babies = action.payload as Baby[]
        state.apiStatus["listBabies"] = ApiStatus.FULFILLED
      })
      .addCase(listBabies.rejected, (state, action) => {
        state.apiError["listBabies"] = action.payload
        state.apiStatus["listBabies"] = ApiStatus.REJECTED
      })

      .addCase(createBaby.pending, (state, action) => {
        state.apiStatus["createBaby"] = ApiStatus.PENDING
      })
      .addCase(createBaby.fulfilled, (state, action) => {
        state.babies = [action.payload as Baby, ...state.babies]
        state.apiStatus["createBaby"] = ApiStatus.FULFILLED
      })
      .addCase(createBaby.rejected, (state, action) => {
        state.apiError["createBaby"] = action.payload
        state.apiStatus["createBaby"] = ApiStatus.REJECTED
      })
  }
})

export default counterSlice.reducer