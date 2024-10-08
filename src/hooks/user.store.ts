// logged in user global state with zustand store
import { KeyConstant } from "@/constants/key.constant";
import { IUser } from "@/services/user/user.dto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { AsyncStorageUtil } from "../utils/async-storage.util";

interface IUserStore {
  loading: boolean;
  user?: IUser | null;

  // * actions
  setCurrentUser: (user: IUser) => void;
  logout: () => void;
}

export const useUserStore = createWithEqualityFn<IUserStore>()(
  persist(
    (set) => {
      return {
        loading: true,
        user: undefined,
        // * actions
        setCurrentUser: (user: IUser) => {
          set((old) => ({ ...old, user: user, loading: false }));
        },
        logout: () => {
          AsyncStorageUtil.removeData("tokens");
          set((old) => ({ ...old, user: undefined, loading: false }));
        },
      };
    },
    {
      name: KeyConstant.LOGGED_IN_USER,
      storage: createJSONStorage(() => AsyncStorage),
    }
  ),
  shallow
);
