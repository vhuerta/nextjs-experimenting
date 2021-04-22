import flow from "lodash.flowright";
import passport from "passport";
import GoogleTokenStrategy from "passport-google-id-token";
import { cookies } from "server/middlewares/cookies";
import { mongo } from "server/middlewares/mongo";

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.NEXT_SERVER_GOOGLE_CLIENT_ID,
      passReqToCallback: true,
    },
    async function (req, _, oauthId, done) {
      try {
        const { User } = req.models;
        const user = await User.findOneAndUpdate(
          { oauthId },
          { oauthId, profile: req.body.profile },
          { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

export const authenticateGoogle = flow(cookies, mongo, (handler) => (req, res) => {
  passport.authenticate("google-id-token", function (err, user) {
    if (!user || err) return res.status(401).json({ message: "sign in failed" });
    req.user = user;
    handler(req, res);
  })(req, res);
});
