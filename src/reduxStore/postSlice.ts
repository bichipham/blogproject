import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  return res.json()
})

type PostState = {
  list: any[]
  loading: boolean
}

const initialState: PostState = {
  list: [],
  loading: false,
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.list = action.payload
        state.loading = false
      })
  },
})

export default postSlice.reducer
