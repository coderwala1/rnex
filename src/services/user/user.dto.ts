import { ILoginWithEmailSchema } from "./user.schema";

export interface IUser {
  email: string;
  accessToken: string;
  expiresIn?: number;
  idToken?: string;
  issuedAt: number;
  refreshToken?: string;
}

export type ILoginWithEmailDto = ILoginWithEmailSchema & {
  fcmToken?: string;
};

export interface ICurrentUser {
  id: string;
  isSuperAdmin: boolean;
  timeZone: string;
  userType: "owner" | "parent" | "manager";
  company?: {
    id: string;
    planSlug: string;
    subscriptionExpireAt: string;
  };
  accessToken: string;
}

export interface GetLoggedInUser {
  email: string;
}
