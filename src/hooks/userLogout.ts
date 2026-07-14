import { authClient } from "@/lib/auth-client";

import { toast } from "sonner";

const LogoutHandler = async () => {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logout successful!");
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ?
        err.message
      : "An unexpected error occurred during logout";

    toast.error(errorMessage);

    console.error("Logout error:", err);
  }
};

export default LogoutHandler;
