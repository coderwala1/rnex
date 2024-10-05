import { IResponse } from "@/types/response.type";
import { ApiService } from "../api.service";
import { GetLoggedInUser, ICurrentUser, ILoginWithEmailDto } from "./user.dto";
import { ILoginWithEmailSchema } from "./user.schema";

export const UserService = {
  loginWithEmail: async (schema: ILoginWithEmailSchema, fcmToken?: string) => {
    const dto: ILoginWithEmailDto = {
      ...schema,
      fcmToken,
    };
    const result = await ApiService.post<IResponse<ICurrentUser>>(
      "/v1/auth/login-with-email",
      dto
    );
    return result.data;
  },
  getLoggedInUser: async () => {
    const result = await ApiService.get<IResponse<GetLoggedInUser>>("/v1/user");
    return result.data.response;
  },
  logoutUser: async () => {
    const result = await ApiService.post<IResponse<null>>("/v1/auth/logout");
    return result.data;
  },
};
