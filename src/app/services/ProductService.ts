import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

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
}

export default ProductService;
