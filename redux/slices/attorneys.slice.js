import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  userInput: '',
  select: [],
  containerReferID: null,
};

function scrollToRef(containerReferId) {
  const containerReferArg = document.getElementById(containerReferId);
  if (containerReferArg) {
    setTimeout(() => {
      const offsetTop = containerReferArg.offsetTop - 85;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }, 0);
  }
}

const attorneysSlice = createSlice({
  name: 'attorneys',
  initialState,
  reducers: {
    clearQuery(state, action) {
      const rQuery = current(state).select.filter(
        (a) => a.key !== action.payload,
      );
      if (action.payload === 'keyword') {
        state.userInput = '';
      }
      state.select = rQuery;
      scrollToRef(state.containerReferID);
    },
    handleChange(state, action) {
      const { value } = action.payload;

      if (value?.length === 0) {
        state.userInput = '';
        state.select = current(state).select.filter((a) => a.key !== 'keyword');
      } else {
        const input = value.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
        );
        const results = { selected: state.userInput, key: 'keyword' };
        const concatResults = state.select.concat(results);
        state.userInput = input;
        state.select = concatResults;
      }
      scrollToRef(state.containerReferID);
    },
    setReferenceId(state, action) {
      state.containerReferID = action.payload;
    },
    onSelect(state, action) {
      const results = {
        selected: action.payload.input,
        key: action.payload.target.name,
      };
      state.select = state.select
        .filter((a) => a.key !== results.key)
        .concat(results);
      scrollToRef(state.containerReferID);
    },
    onSelectLetter(state, action) {
      const results = {
        selected: action.payload.toUpperCase(),
        key: 'letterInLastName',
      };
      const concatResults = state.select
        .filter((el) => el.key !== 'letterInLastName')
        .concat(results);
      state.select = concatResults;
      scrollToRef(state.containerReferID);
    },
    clearAll(state) {
      state.userInput = '';
      state.select = [];
      scrollToRef(state.containerReferID);
    },
  },
  // extraReducers?: (builder) => void,
});

export const {
  clearQuery,
  handleChange,
  setReferenceId,
  onSelect,
  onSelectLetter,
  clearAll,
} = attorneysSlice.actions;
export default attorneysSlice.reducer;
