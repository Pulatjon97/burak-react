import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";

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

  public async getRestaurant(): Promise<Member> { 
    try {
      // Build the API URL for the restaurant profile shown on the product-detail page.
      const url = this.path + "/member/restaurant";
      // Request the restaurant record; Axios places the returned JSON in result.data.
      const result = await axios.get(url);
      // Log the response so the profile data can be inspected during development.
      console.log("getRestaurant:", result);
      // Return the restaurant object to t he component so it can dispatch it into Redux.
      return result.data;
    } catch (err) {
      // Print the failure in the browser console for diagnosis.
      console.log("Error, getRestaurant:", err);
      // Keep the promise rejected so the component can handle the failure too.
      throw err;
    }
  }

public async signup(input: MemberInput): Promise<Member> {
  try {
    const url = this.path + "/member/signup";
    const result = await axios.post(url, input, { withCredentials: true });
    console.log("signup:", result);

    const member: Member = result.data.member;
    console.log("member:", member); 
    localStorage.setItem("memberData", JSON.stringify(member));

    return member;
  } catch (err) {
    console.log("Error, signup:", err);
    throw err;
  }
}


public async login(input: LoginInput): Promise<Member> {
  try {
    const url = this.path + "/member/login";
    const result = await axios.post(url, input, { withCredentials: true });
    console.log("login:", result);

    const member: Member = result.data.member;
    console.log("member:", member); 
    localStorage.setItem("memberData", JSON.stringify(member));

    return member;
  } catch (err) {
    console.log("Error, login:", err);
    throw err;
  }
}

public async logout(): Promise<void> {
  try {
    const url = this.path + "/member/logout";
    const result = await axios.post(url, {}, { withCredentials: true });
    console.log("logout:", result);

    localStorage.removeItem("memberData");

    // return result.data.logout;
  } catch (err) {
    console.log("Error, logout:", err);
    throw err;
  }
}

} 
 
export default MemberService; 
