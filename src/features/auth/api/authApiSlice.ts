import { apiSlice } from "@/app/api/apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: credentials.username,
          password: credentials.password,
        }),
      }),
    }),
  }),
})

export const { useLoginMutation } = authApiSlice
