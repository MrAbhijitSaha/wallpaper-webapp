import { authClient } from "@/lib/auth-client";
import { SignUpFormSchemaType } from "@/lib/types";

const userSignup = async ({
  firstName,
  lastName,
  email,
  password,
}: SignUpFormSchemaType) => {
  const { error } = await authClient.signUp.email({
    name: `${firstName + lastName}`,
    email,
    password,
  });

  if (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  } else {
    return {
      isSuccess: true,
      message: "Register Succesful",
    };
  }
};

export default userSignup;
