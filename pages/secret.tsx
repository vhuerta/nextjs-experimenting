import Link from "next/link";
import { withAuthentication } from "utils/server_side_props";

function Secret() {
  return (
    <div className="p-6">
      <h1>Secret</h1>
      <br/>
      <Link href="/">Go to index</Link>
      <br/>
      <Link href="/secreto">Go to secreto</Link>
    </div>
  );
}

export const getServerSideProps = withAuthentication(({ req, res }) => {
  return { props: {} };
});

export default Secret;
