import mongoose from "mongoose";

mongoose.set("useFindAndModify", false);

let conn: mongoose.Connection = null;

export async function getConnection() {
  if (conn == null) {
    conn = mongoose.createConnection(process.env.NEXT_SERVER_MONGO_URI || "mongodb://localhost:27017/test", {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await conn;
  }

  return conn;
}
