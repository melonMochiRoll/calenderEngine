import { useState } from "react";

type TUseMenuReturnType = {
  anchorEl: null | HTMLElement,
  open: boolean,
  onOpen: (e: any) => void,
  onClose: () => void,
};

const useMenu = (): TUseMenuReturnType => {
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    open,
    onOpen,
    onClose,
  };
};

export default useMenu;