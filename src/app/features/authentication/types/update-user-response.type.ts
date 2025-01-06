import { ApiResponse } from "../../../@core/types/api-response.type";
import { User } from "./user.type";

export interface UpdateUserResponseData {
  user: User;
}

export type UpdateUserResponse = ApiResponse<UpdateUserResponseData>;
