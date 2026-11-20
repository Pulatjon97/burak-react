import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import type { CartItem } from "../../../lib/data/cart";

interface ProductsPageProps {
  onAdd: (input: Omit<CartItem, "quantity">) => void;
}

export default function ProductsPage({ onAdd }: ProductsPageProps) {
  const products = useRouteMatch();
  console.log("products:", products);

  return (
    <div className={"products-page"}>
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct onAdd={onAdd} />
        </Route>

        <Route path={`${products.path}`}>
          <Products onAdd={onAdd} />
        </Route>
      </Switch>
    </div>
  );
}
