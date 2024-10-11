import React, { FC, useEffect } from 'react';
import styled from '@emotion/styled';
import CalendarContainer from 'Containers/CalendarContainer';
import TodoContainer from 'Containers/TodoContainer';
import RenderModal from 'Components/common/RenderModal';
import SharedspaceHeader from 'Containers/SharedspaceHeader';
import useSharedspace from 'Hooks/useSharedspace';
import { useNavigate, useParams } from 'react-router-dom';

// Header
// TODO: 스페이스 제목 더블 클릭시 제목 수정 기능 추가
// TODO: 스페이스에 대한 권한이 없을시 대응 추가

const SharedspacesViewPage: FC = () => {
  const { url = '' } = useParams();
  const navigate = useNavigate();

  const {
    data: spaceData,
    isLoading,
  } = useSharedspace(url);

  useEffect(() => {
    if (!isLoading && !spaceData) {
      navigate('/not-found');
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