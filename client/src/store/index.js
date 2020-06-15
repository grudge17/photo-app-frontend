import React from "react";
import useGlobalHook from "use-global-hook";
import * as actions from "../actions";

const dialogState = {
  open: false,
  itemId:""
};

const useGlobal = useGlobalHook(React, dialogState, actions);

export default useGlobal;
