import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedValues: {},
  selectedTags: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setSelectedValues: (state, action) => {
      state.selectedValues = action.payload;
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
  },
});

export const { setSelectedValues, setSelectedTags } = librarySlice.actions;
export default librarySlice.reducer;
