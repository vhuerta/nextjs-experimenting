import Link from "next/link";
import { withAuthentication } from "utils/server_side_props";

function Secret2() {
  return (
    <div className="p-6">
      <h1>Secret2</h1>
      <br />
      <Link href="/">Go to index</Link>
      <br />
      <Link href="/secret">Go to secret</Link>
    </div>
  );
}

export const getServerSideProps = withAuthentication(({ req, res }) => {
  return { props: {} };
});

export default Secret2;
