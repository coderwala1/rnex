import { QUERY_KEYS, queryClient } from "@/config/query.config";
import { useUserStore } from "@/hooks/user.store";
import { IUser } from "@/services/user/user.dto";
import {
  ILoginWithEmailSchema,
  LoginWithEmailSchema,
} from "@/services/user/user.schema";
import { UserService } from "@/services/user/user.service";
import { ErrorUtil } from "@/utils/error.util";
import { RnUtils } from "@/utils/rn.util";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ALERT_TYPE } from "react-native-alert-notification";

export function useLoginController() {
  const { logout, setCurrentUser } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ILoginWithEmailSchema>({
    resolver: zodResolver(LoginWithEmailSchema),
  });

  const onSubmit = async (data: ILoginWithEmailSchema) => {
    try {
      const result = await UserService.loginWithEmail(data);

      await AsyncStorage.setItem("accessToken", result.response.accessToken);

      setCurrentUser({
        email: data.email,
        accessToken: result.response.accessToken,
      } as IUser);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CURRENT_USER],
      });

      RnUtils.toast("Login successful", result.message, ALERT_TYPE.SUCCESS);
      reset();
    } catch (error) {
      console.log(error);
      const errorObject = ErrorUtil.getErrorMessage(error as Error);
      const message = errorObject?.message;
      RnUtils.toast("Login failed", message, ALERT_TYPE.DANGER);
    }
  };

  const logoutUser = async () => {
    try {
      await UserService.logoutUser();
      await AsyncStorage.removeItem("accessToken");
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CURRENT_USER],
      });
      logout();
      queryClient.clear();
    } catch (error) {
      console.log(error);
      const errorObject = ErrorUtil.getErrorMessage(error as Error);
      const message = errorObject?.message;
      RnUtils.toast("Logout failed", message, ALERT_TYPE.DANGER);
    }
  };

  useEffect(() => {
    const autoLogin = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        // Get user data from server or cache
        const user = await UserService.getLoggedInUser();
        if (user) {
          setCurrentUser({
            email: user.email,
            accessToken,
          } as IUser);
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CURRENT_USER],
          });
        }
      }
    };

    autoLogin();
  }, []);

  return {
    control,
    isSubmitting,
    handleSubmit: handleSubmit(onSubmit),
    logoutUser,
  };
}
