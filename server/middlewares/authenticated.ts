import flow from "lodash.flowright";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { cookies } from "server/middlewares/cookies";
import { mongo } from "server/middlewares/mongo";

const getJWTFromCookies = (req) => req.cookies?.jwt;

passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.NEXT_SERVER_SECRET_JWT,
      jwtFromRequest: getJWTFromCookies,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        const { User } = req.models;
        done(null, await User.findOne({ _id: payload.id }));
      } catch (err) {
        done(err);
      }
    }
  )
);

export const authenticated = flow(cookies, mongo, (handler) => (req, res) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) return res.status(401).json({ message: "Unauthorized" });
    return handler(req, res);
  })(req, res);
});
