import { IonLoading } from "@ionic/react";
import React, { useContext } from "react";
import { LoadingContext } from "../../context/loading";

const Loading = () => {
  const { loadingCount } = useContext(LoadingContext);
  return (
    <>
      <IonLoading isOpen={loadingCount > 0} />
    </>
  );
};

export default Loading;
