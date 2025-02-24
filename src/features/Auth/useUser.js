import { useQuery } from "@tanstack/react-query";
import {getCurrentUser} from "../../services/apiAuth.js";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = !!user;

  return { isLoading, isAuthenticated, user };
}
