import { Bounce, ToastOptions } from "react-toastify";

export const privateTooltip = '비공개 스페이스는 멤버로 초대받은 사람만 접근할 수 있습니다.';

export const emptyspaces = '스페이스가 없습니다.';

export const checkContent = '내용을 확인해주세요.';

export const forbiddenErrorMessage = '접근 권한이 없습니다.';

export const waitingMessage = '잠시후에 다시 시도해주세요.';

export const overlappingErrorMessage = '겹치는 시간대가 존재합니다.';

export const defaultToastOption: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  closeOnClick: true,
  draggable: true,
  pauseOnHover: false,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
}; 