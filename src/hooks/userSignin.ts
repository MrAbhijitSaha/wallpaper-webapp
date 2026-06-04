import { authClient } from "@/lib/auth-client";
import { SignInFormSchemaType } from "@/lib/types";

const userSignin = async ({
  email,
  password,
  rememberMe,
}: SignInFormSchemaType) => {
  const { error } = await authClient.signIn.email({
    email,
    password,
    rememberMe,
  });
  if (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  } else {
    return {
      isSuccess: true,
      message: "Login Succesful",
    };
  }
};

export default userSignin;
