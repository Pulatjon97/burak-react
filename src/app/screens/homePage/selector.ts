import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import HomePage from ".";

const selectHomePage = (state: AppRootState) => state.homePage;

// STEP 9: Select the stored popular products for PopularDishes.tsx.
export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularDishes,
);

// Select the stored newest products for NewDishes.tsx.
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes,
);

// Select the stored ranked members for ActiveUsers.tsx.
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
