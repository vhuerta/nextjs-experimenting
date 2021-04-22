import mongoose from "mongoose";
import { UserSchema } from "./user";

export const modelAndName: [string, mongoose.Schema][] = [["User", UserSchema]];
