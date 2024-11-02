import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import { TODO_MAX_SIZE } from 'Lib/calendarConstants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { checkContent } from 'Lib/noticeConstants';
import { createTodo } from 'Api/todosApi';
import { useQueryClient } from '@tanstack/react-query';
import { GET_TODOS_LIST_KEY } from 'Lib/queryKeys';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'Hooks/reduxHooks';
import useUser from 'Hooks/useUser';

interface TodoInputProps {};

const TodoInput: FC<TodoInputProps> = ({}) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(customParseFormat);
  dayjs.extend(isSameOrBefore);
  const timeZone = dayjs.tz.guess();

  const qc = useQueryClient();
  const { url = '' } = useParams();
  const { userData } = useUser();
  const { todoTime } = useAppSelector(state => state.todoTime);

  const initialTime = { hour: '', minute: '00' };
  const [ startTime, setStartTime ] = useState(initialTime);
  const [ endTime, setEndTime ] = useState(initialTime);
  const [ description, setDescription ] = useState('');
  const [ error, setError ] = useState(false);

  const onChangeStartTime = (e: any) => {
    if (e.target.value.length > 2) return;

    if (e.target.name === 'hour') {
      setStartTime((prev) => {
        return { ...prev, hour: Number(e.target.value) > 23 ? '23' : `${e.target.value}` };
      });
    }

    if (e.target.name === 'minute') {
      setStartTime((prev) => {
        return { ...prev, minute: Number(e.target.value) > 59 ? '59' : `${e.target.value}` };
      });
    }
  };

  const onChangeEndTime = (e: any) => {
    if (e.target.value.length > 2) return;

    if (e.target.name === 'hour') {
      setEndTime((prev) => {
        return { ...prev, hour: Number(e.target.value) > 23 ? '23' : `${e.target.value}` };
      });
    }

    if (e.target.name === 'minute') {
      setEndTime((prev) => {
        return { ...prev, minute: Number(e.target.value) > 59 ? '59' : `${e.target.value}` };
      });
    }
  };

  const onChangeDescriptionWithMaxSize = (e: any) => {
    if (getByteSize(e.target.value) > TODO_MAX_SIZE) {
      return;
    }

    setDescription(e.target.value);
  };

  const onSubmit = (
    description: string,
    todoTime: string,
    start: typeof startTime,
    end: typeof endTime,
    UserId: number,
    url: string,
  ) => {
    setError(false);

    if (!userData || !url) {
      return setError(true);
    }

    const trimmedStartTime = Object.values(start).map((value) => value.trim());
    const trimmedEndTime = Object.values(end).map((value) => value.trim());
    const trimmedDescription = description.trim();

    if (
      trimmedStartTime.includes('') ||
      trimmedEndTime.includes('') ||
      !trimmedDescription
    ) {
      return setError(true);
    }

    const startTimeFormat = `${trimmedStartTime[0].padStart(2, '0')}:${trimmedStartTime[1].padEnd(2, '0')}:00`;
    const endTimeFormat = `${trimmedEndTime[0].padStart(2, '0')}:${trimmedEndTime[1].padEnd(2, '0')}:00`;
    const dayjs_startTime = dayjs(startTimeFormat, 'HH:mm:ss').tz(timeZone);
    const dayjs_endTime = dayjs(endTimeFormat === '00:00:00' ? '24:00:00' : endTimeFormat, 'HH:mm:ss').tz(timeZone);

    if (
      !dayjs_startTime.isValid() ||
      !dayjs_endTime.isValid() ||
      !dayjs(dayjs_startTime).isSameOrBefore(dayjs_endTime)
    ) {
      return setError(true);
    }

    createTodo(
      description,
      todoTime,
      startTimeFormat,
      endTimeFormat,
      UserId,
      url,
    )
    .then(async () => {
      setStartTime(initialTime);
      setEndTime(initialTime);
      setDescription('');
      await qc.refetchQueries([GET_TODOS_LIST_KEY]);
    })
    .catch(() => {
      setError(true);
    });
  };

  return (
    <Block>
      <Top>
        <TimeBox>
          <TimeInput
            value={startTime.hour}
            onChange={onChangeStartTime}
            name='hour'
            type='text'
            maxLength={2}
            placeholder='00' />
          <span>:</span>
          <TimeInput
            value={startTime.minute}
            onChange={onChangeStartTime}
            id='1'
            name='minute'
            type='text'
            maxLength={2}
            placeholder='00' />
        </TimeBox>
        <span>~</span>
        <TimeBox>
          <TimeInput
            value={endTime.hour}
            onChange={onChangeEndTime}
            name='hour'
            type='text'
            maxLength={2}
            placeholder='00' />
          <span>:</span>
          <TimeInput
            value={endTime.minute}
            onChange={onChangeEndTime}
            name='minute'
            type='text'
            maxLength={2}
            placeholder='00' />
        </TimeBox>
      </Top>
      <Bottom>
        <DescriptionInput
          value={description}
          onChange={onChangeDescriptionWithMaxSize}
          name='description'
          type='text'
          placeholder='새 할일' />
        <Button
          onClick={() => onSubmit(
            description,
            todoTime,
            startTime,
            endTime,
            userData?.id,
            url)
          }>
          추가
        </Button>
      </Bottom>
      {error && <ErrorSpan>{checkContent}</ErrorSpan>}
    </Block>
  );
};

export default TodoInput;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
  gap: 8px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  color: var(--white);

  svg {
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border: 1px solid var(--light-gray);
  border-radius: 15px;
  background-color: var(--light-gray);

  svg {
    cursor: pointer;
  }
`;

const TimeBox = styled.div`
  width: 100px;
  display: flex;
  align-items: center;

  span {
    font-size: 22px;
    font-weight: 600;
    padding-bottom: 4px;
  }
`;

const TimeInput = styled.input`
  width: 50%;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  color: var(--white);
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0);
  border: none;

  &::placeholder {
    font-weight: 600;
    color: var(--light-gray);
  }

  &:focus {
    outline: none;
  }
`;

const DescriptionInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 20px;
  font-weight: 500;
  color: var(--white);
  background-color: var(--light-gray);
  border: none;
  border-radius: 15px;

  &::placeholder {
    font-weight: 600;
    color: #dedee3;
  }

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 100%;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background-color: var(--purple);
  cursor: pointer;
  border: 2px solid var(--purple);
  border-radius: 15px;
  transition: all 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const ErrorSpan = styled.span`
  font-size: 16px;
  color: var(--red);
`;

const getByteSize = (str: string) => {
  const encoder = new TextEncoder();

  return encoder.encode(str).length;
};