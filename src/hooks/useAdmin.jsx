import React from "react";
import useAuth from "./useAuth.jsx";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    isError,
    error
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      return res.data?.admin ?? null; // null = Not sure yet
    },
    enabled: !loading && !!user?.email,
  });

  if (isError) {
    toast.error(error?.message || "Admin check failed");
  }

  return [isAdmin, loading || isAdminLoading];
};


export default useAdmin;



