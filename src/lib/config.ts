// STEP 3: Read the backend base URL from the React project's .env file.
// Services and image components add their endpoint or file path to this value.
export const serverApi: string = `${process.env.REACT_APP_API_URL}`;

// Shared user-facing error messages used by React components and services.
export const Messages = {
  error1: "Something went wrong!",
  error2: "Please login first!",
  error3: "Please fulfill all inputs!",
  error4: "Message is empty!",
  error5: "Only images with jpeg, jpg, png format allowed!",
};
