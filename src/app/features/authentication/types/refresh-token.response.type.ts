import { ApiResponse } from "../../../@core/types/api-response.type";
 
export interface RefreshTokenResponseData {
  accessToken: string;
}

export type RefreshTokenResponse = ApiResponse<RefreshTokenResponseData>;
