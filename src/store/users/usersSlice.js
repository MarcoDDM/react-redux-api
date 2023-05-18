import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=5');
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw Error('Failed to fetch users');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    isLoading: false,
    error: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        users: action.payload,
      }))
      .addCase(fetchUsers.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default usersSlice.reducer;
