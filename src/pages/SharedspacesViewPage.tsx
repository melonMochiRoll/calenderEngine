import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import "react-toastify/dist/ReactToastify.css";
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import RenderModal from 'Components/common/RenderModal';
import SharedspaceHeader from 'Containers/SharedspaceHeader';
import useSharedspace from 'Hooks/useSharedspace';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { defaultToastOption, forbiddenErrorMessage, waitingMessage } from 'Lib/noticeConstants';

const SharedspacesViewPage: FC = () => {
  const { url = '' } = useParams();
  const navigate = useNavigate();

  const {
    data: spaceData,
    isLoading,
    errorResponse,
  } = useSharedspace(url);

  useEffect(() => {
    if (errorResponse?.statusCode === 403) {
      toast.error(forbiddenErrorMessage, {
        ...defaultToastOption,
        containerId: 'SharedspaceViewPage',
        onClose: () => navigate('/'),
      });
    }
  }, [errorResponse]);

  useEffect(() => {
    if (!isLoading && !spaceData) {
      toast.error(waitingMessage, {
        ...defaultToastOption,
        containerId: 'SharedspaceViewPage',
        onClose: () => navigate('/'),
      });
    }
  }, [isLoading, spaceData]);
  
  return (
    <Block>
      <SharedspaceHeader
        spaceData={spaceData}
        isLoading={isLoading} />
      <Main>
        <CalendarContainer />
        <TodoContainer />
        <RenderModal />
      </Main>
      <ToastContainer
        containerId={'SharedspaceViewPage'} />
    </Block>
  );
};

export default SharedspacesViewPage;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--black);
`;

const Main = styled.main`
  display: flex;
  height: 100%;
`;