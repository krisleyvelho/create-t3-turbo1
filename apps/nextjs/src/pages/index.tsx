import type { NextPage } from "next";
import { useState } from "react";
import { FormNewEvent } from "~/components/FormNewEvent";
import { LayoutBase } from "~/components/Layout";
import { ListEvents } from "~/components/ListEvents";

const Home: NextPage = () => {
  const [updateData, setUpdateData] = useState<boolean>(false);

  return (
    <LayoutBase title="Pagina inicial">
      <ListEvents updateData={updateData} setUpdateData={setUpdateData} />
      <FormNewEvent setUpdateData={setUpdateData} />
    </LayoutBase>
  );
};

export default Home;
