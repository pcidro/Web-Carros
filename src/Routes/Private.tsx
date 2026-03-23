import React from "react";
import type { PropsWithChildren, ReactNode } from "react";
import Auth from "../Contextos/AuthContext";
import { Navigate } from "react-router-dom";

const Private = ({ children }: PropsWithChildren) => {
  const { signed, loadingAuth } = Auth();
  if (loadingAuth) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Private;
