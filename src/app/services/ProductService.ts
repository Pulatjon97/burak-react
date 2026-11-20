import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";
import { Member } from "../../lib/types/member";

// STEP 5: Keep product API requests in one service instead of inside UI cards.
class ProductService {
  private readonly path: string;
  constructor() {
    // Start all product endpoint URLs from the shared backend base address.
    this.path = serverApi;
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      // Build the list endpoint with pagination and sort order from HomePage.
      let url = `${this.path}/product/all/?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      // Add an optional category filter, such as DISH for Popular Dishes.
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;
      // Add optional search text when another caller requests it.
      if (input.search) url += `&search=${input.search}`;

      // Send the GET request; Axios places the backend JSON body in result.data.
      const result = await axios.get(url);
      console.log("getProducts:", result);

      // Backend responds with a raw Product[] array, which the UI maps into cards.
      return result.data;
    } catch (err) {
      // Log the network/API failure and let HomePage's catch handler see it too.
      console.log("Error, getProduct: ", err);
      throw err;
    }
  }

  public async getProduct(productId: string): Promise<Product> {
    try {
      // Add the selected product ID to the API route so a refresh can reload details from the database.
      const url = `${this.path}/product/${productId}`;
      // Include the browser session cookie so the backend can associate this view with a signed-in member.
      const result = await axios.get(url, { withCredentials: true });
      // Log the full response while developing; Axios stores the JSON response body in result.data.
      console.log("getProduct:", result);
      // Return the product body to the component, which saves it in Redux.
      return result.data;
    } catch (err) {
      // Log the network or server error before passing it back to the component's catch handler.
      console.log("Error, getProduct: ", err);
      // Re-throw so the caller can decide how to display or handle the failure.
      throw err;
    }
  }

  public async getRestaurant(productId: string): Promise<Member> {
    try {
      // This endpoint returns the restaurant profile shown beside a product's details.
      const url = `${this.path}/product/restaurant`;
      // Send the request with the browser session cookie, matching the detail request behavior.
      const result = await axios.get(url, { withCredentials: true });
      // Keep the response visible in the developer console during development.
      console.log("getRestaurant:", result);
      // Return the restaurant JSON body to the caller.
      return result.data;
    } catch (err) {
      // Record the failed profile request so it can be diagnosed.
      console.log("Error, getProduct: ", err);
      // Let the component handle the rejected request as well.
      throw err;
    }
  }
}

export default ProductService;
