import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  profile: {
    email: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
  };
  oauthId: string;
}

const ProfileSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String },
    given_name: { type: String },
    family_name: { type: String },
    picture: { type: String },
  },
  { strict: false }
);

const UserSchema = new Schema(
  {
    oauthId: { type: String, required: true, unique: true },
    profile: ProfileSchema,
  },
  { strict: false }
);

// Export the model and return your IUser interface
export { UserSchema };
