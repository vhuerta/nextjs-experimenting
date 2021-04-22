import { firebase } from "config/firebase";
import Link from "next/link";

function About() {
  return (
    <div className="p-6">
      <h1>Index</h1>
      <button
        className="bg-blue-600 p-2 rounded text-white"
        onClick={async () => {
          const provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope("profile");
          provider.addScope("email");
          const result = await firebase.auth().signInWithPopup(provider);
          const credential = result.credential as firebase.auth.OAuthCredential;
          await fetch("api/login", {
            method: "POST",
            body: JSON.stringify({
              id_token: credential.idToken,
              profile: result.additionalUserInfo.profile,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
      >
        Iniciar sesión con google
      </button>

      <Link href="/secret">
        Secret page
      </Link>
    </div>
  );
}

export default About;
