import type { NextPage } from "next";
import { useState } from "react";
import { FormNewEvent } from "~/components/FormNewEvent";
import { ListEvents } from "~/components/ListEvents";

const Home: NextPage = () => {
  const [updateData, setUpdateData] = useState<boolean>(false);

  return (
    <>
      <ListEvents updateData={updateData} setUpdateData={setUpdateData} />
      <FormNewEvent setUpdateData={setUpdateData} />
    </>
  );
};

export default Home;
