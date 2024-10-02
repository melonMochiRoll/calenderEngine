import { useState } from "react";

type TUseTooltipReturnType = {
  anchorEl: null | HTMLElement,
  open: boolean,
  onClick: (e: any) => void,
  onClose: () => void,
};

const useTooltip = (): TUseTooltipReturnType => {
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

export default useTooltip;