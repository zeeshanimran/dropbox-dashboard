import axios from "..";
import { ISignUpForm, IUserAPI } from "../../interfacesTypes";

export const userLogin = async (data: IUserAPI) => {
  return await axios.post("/users/login", data);
};

export const signUpUser = async (data: ISignUpForm) => {
  return await axios.post("/users", data);
};
