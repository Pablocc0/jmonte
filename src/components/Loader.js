import React from "react";
import ReactLoading from "react-loading";
import { } from "./LoadList";

const Loader = () => (
  <>
    <ReactLoading type={"spin"} color={"#FFF"} height={'50%'} width={'50%'} align="center" />
  </>
);

export default Loader;