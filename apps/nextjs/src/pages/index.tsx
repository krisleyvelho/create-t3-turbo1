import type { NextPage } from "next";
import { FormNewEvent } from "~/components/FormNewEvent";
import { LayoutBase } from "~/components/Layout";
import { ListEvents } from "~/components/ListEvents";

const Home: NextPage = () => {
  return (
    <LayoutBase title="Pagina inicial">
      <>
        <ListEvents />
        <FormNewEvent />
      </>
    </LayoutBase>
  );
};

export default Home;
