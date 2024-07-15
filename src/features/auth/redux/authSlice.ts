import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"

const initialState: AuthPayload = {
  user: null,
  access_token: null,
  refresh_token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      const { user, access_token, refresh_token } = action.payload
      state.user = user
      state.access_token = access_token
      state.refresh_token = refresh_token
    },
    logOut: (state) => {
      state.user = null
      state.access_token = null
      state.refresh_token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState): string | null =>
  state.auth.user
export const selectAccessToken = (state: RootState): string | null =>
  state.auth.access_token
export const selectRefreshToken = (state: RootState): string | null =>
  state.auth.refresh_token
