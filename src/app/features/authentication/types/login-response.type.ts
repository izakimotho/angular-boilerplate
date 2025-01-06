import { ApiResponse } from "../../../@core/types/api-response.type";
import { User } from "./user.type";

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
