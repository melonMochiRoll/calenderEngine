import React, { FC } from 'react';
import styled from '@emotion/styled';
import RenderUserProfile from 'Components/auth/RenderUserProfile';
import SatelliteIcon from '@mui/icons-material/SatelliteAlt';
import { useNavigate } from 'react-router-dom';
import gravatar from 'gravatar';
import { ModalName, TSharedspaceMetaData } from 'Typings/types';
import SkeletonSharedspaceHeader from 'Components/skeleton/SkeletonSharedspaceHeader';
import { updateSharedspaceName } from 'Api/sharedspacesApi';
import useUser from 'Hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { GET_SHAREDSPACE_KEY } from 'Lib/queryKeys';
import EditableTitle from 'Components/common/EditableTitle';
import TextButton from 'Components/common/TextButton';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { openModal } from 'Features/modalSlice';

interface SharedspaceHeaderHeaderProps {
  spaceData: TSharedspaceMetaData,
  isLoading: boolean,
};

const SharedspaceHeader: FC<SharedspaceHeaderHeaderProps> = ({
  spaceData,
  isLoading,
}) => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  const { userData, isLogin } = useUser();
  const isOwner = isLogin && (userData?.email === spaceData?.Owner.email);

  if (isLoading || !spaceData) {
    return <SkeletonSharedspaceHeader />;
  }

  const onUpdateSharedspaceName = async (name: string) => {
    if (spaceData?.name === name) {
      return;
    }

    await updateSharedspaceName(name, spaceData?.url);
    await qc.refetchQueries([GET_SHAREDSPACE_KEY]);
  };
  
  return (
    <Block>
      <Left>
        <FlexBox>
          <SatelliteIcon
            onClick={() => navigate('/sharedspaces/subscribed')}
            fontSize='large'
            sx={{ color: 'var(--blue)', cursor: 'pointer', marginRight: '10px' }}/>
          {
            isOwner ?
            <EditableTitle
              initValue={spaceData?.name}
              submitEvent={onUpdateSharedspaceName}/>
              :
            <SpaceTitle>{spaceData?.name}</SpaceTitle>
          }
        </FlexBox>
        {spaceData?.Sharedspacemembers &&
          <FlexBox>
            {
              spaceData?.Sharedspacemembers.map((member: typeof spaceData.Sharedspacemembers[0], idx: number) => {
                if (idx < 5) {
                  return (
                    <ProfileImg key={member.User.email} src={gravatar.url(member.User.email, { s: '25px', d: 'retro' })}/>
                  );
                }
              })
            }
            {
              spaceData?.Sharedspacemembers.length - 5 > 0 ? 
                <RestUserImg>{`+${spaceData?.Sharedspacemembers.length - 5}`} </RestUserImg> :
                ''
            }
          </FlexBox>}
      </Left>
      <Right>
        {
          isOwner ?
          <TextButton
            type='button'
            onClick={() => dispatch(openModal(ModalName.SHAREDSPACEMANAGER))}>
              스페이스 관리
          </TextButton>
          :
          ''
        }
        <RenderUserProfile />
      </Right>
    </Block>
  );
};

export default SharedspaceHeader;

const Block = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5%;
  padding: 10px 5%;
  border-bottom: 1px solid var(--light-gray);
  background-color: var(--black);
`;

const Left = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SpaceTitle = styled.h1`
  font-size: 28px;
  color: var(--white);
  margin: 0;
`;

const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  cursor: pointer;
`;

const RestUserImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: var(--white);
  width: 35px;
  height: 35px;
  border-radius: 35px;
  background-color: var(--light-gray);
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  gap: 12px;
`;