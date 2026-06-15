import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import busReducer from "./slices/busSlice";
import notificationReducer
  from "./slices/notificationSlice";

export const store =
  configureStore({
    reducer: {
      auth: authReducer,
      bus: busReducer,
      notification:
        notificationReducer,
    },
  });