"use server";

import { signIn, signOut } from "@/auth/auth";
import Social from "./social.types";

export const signOutAction = async () => {
  await signOut();
};

export const signInAction = async (social: Social) => {
  await signIn(social);
};