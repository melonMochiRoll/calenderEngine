import { useState } from "react";

type TUseMenuReturnType = {
  anchorEl: null | HTMLElement,
  open: boolean,
  onClick: (e: any) => void,
  onClose: () => void,
};

const useMenu = (): TUseMenuReturnType => {
  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    open,
    onClick,
    onClose,
  };
};

export default useMenu;