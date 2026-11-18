import axios from "axios";
import { serverApi } from "../../lib/config";
import { Member } from "../../lib/types/member";

// STEP 5: Keep the top-user API request separate from the ActiveUsers UI.
class MemberService {
  private readonly path: string;

  constructor() {
    // Reuse the same backend base URL as ProductService.
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      // This public endpoint returns the members ranked by points.
      const url = this.path + "/member/top-users";
      // Axios wraps the JSON response; the array itself is in result.data.
      const result = await axios.get(url);
      console.log("getTopUsers:", result);

      // Return the member array to HomePage, which dispatches it into Redux.
      return result.data;
    } catch (err) {
      // Preserve and rethrow the error so HomePage can log the failed request.
      console.log("Error, getTopUsers:", err);
      throw err;
    }
  }
}

export default MemberService;
