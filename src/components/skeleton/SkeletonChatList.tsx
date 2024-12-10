import React, { FC } from 'react';
import SkeletonChat from './SkeletonChat';

const SkeletonChatList: FC = () => {
  const skeleton = [
    {
      email: 120,
      content: 200,
    },
    {
      email: 110,
      content: 120,
    },
    {
      email: 130,
      content: 250,
    },
    {
      email: 180,
      content: 350,
    },
    {
      email: 140,
      content: 150,
    },
    {
      email: 130,
      content: 320,
    },
    {
      email: 140,
      content: 100,
    },
    {
      email: 120,
      content: 220,
    },
  ];

  return (
    <>
    {
      skeleton.map((v: typeof skeleton[0], idx: number) => {
        return <SkeletonChat
          key={idx}
          email={v.email}
          content={v.content} />
      })
    }
    </>
  );
};

export default SkeletonChatList;