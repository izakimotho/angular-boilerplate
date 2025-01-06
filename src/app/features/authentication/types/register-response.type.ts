import { ApiResponse } from "../../../@core/types/api-response.type";
import { User } from "./user.type";

export interface RegisterResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type RegisterResponse = ApiResponse<RegisterResponseData>;
