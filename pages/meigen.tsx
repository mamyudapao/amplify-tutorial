import { GetServerSideProps } from "next";

interface IMeigen {
  meigen: string;
  auther: string;
}

const isMeigen = (arg: any): arg is IMeigen => {
  if (typeof arg.meigen !== "string") {
    return false;
  }
  if (typeof arg.auther !== "string") {
    return false;
  }

  return true;
};

const Meigen = ({ data }: { data: IMeigen }) => {
  return (
    <>
      著者: {data.auther}
      <br />
      名言: {data.meigen}
    </>
  );
};

// サーバーサイドで処理させる為に`getServerSideProps`を使用する
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://meigen.doodlenote.net/api/json.php`);
  const data = (await res.json())[0];

  if (!isMeigen(data)) {
    return { props: { meigen: "failed", auther: "failed" } };
  }

  return { props: { data } };
};

export default Meigen;
