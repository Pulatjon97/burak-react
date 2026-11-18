import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

// STEP 8: Start with empty lists; HomePage fills them after API responses arrive.
const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  // The slice name becomes part of Redux action names, e.g. homePage/setNewDishes.
  name: "homePage",
  initialState,
  reducers: {
    // Store the most-viewed dish array returned by the backend.
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    // Store the newest-products array returned by the backend.
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },  
    // Store the top-users array returned by the backend.
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions;

// Register this reducer under the homePage key in store.ts.
  const HomePageReducer = homePageSlice.reducer;
  export default HomePageReducer;
