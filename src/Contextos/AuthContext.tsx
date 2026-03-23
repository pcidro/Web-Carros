import {
  createContext,
  useState,
  useEffect,
  type PropsWithChildren,
  useContext,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Services/firebase";

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
};

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

const AuthContext = createContext<AuthContextData | null>(null);

export const Auth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve estar dentro do AuthProvider");
  return context;
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });

        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
