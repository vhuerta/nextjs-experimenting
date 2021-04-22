import { serialize } from "cookie";

export const withAuthentication = (getServerSideProps) => async (context) => {
  const { req, res } = context;
  const url = absoluteUrl(req, "localhost:3000");
  const response = await fetch(`${url}/api/secret`, {
    headers: { Cookie: serialize("jwt", req.cookies.jwt) },
  });

  if (res && response.status !== 200) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return getServerSideProps(context);
};

export function absoluteUrl(req, setLocalhost) {
  let protocol = "https:";
  let host = req ? req.headers["x-forwarded-host"] || req.headers["host"] : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return protocol + "//" + host;
}
