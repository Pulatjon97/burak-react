import { Member } from "./member";
import { Product } from "./product";


/** REACT APPS STATE */   
export interface AppRootState {
    homePage: HomePageState;
    
}

/** HOME PAGE */
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUNCTS PAGE */


/** ORDERS PAGE */