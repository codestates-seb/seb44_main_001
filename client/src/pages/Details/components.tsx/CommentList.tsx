import { styled } from 'styled-components';
import { COMMENT } from '../../../common/util/constantValue';

export default function CommentList() {
  const user = { memberId: 1 };
  const data = [
    {
      nickname: '나는 닉네임',
      createdAt: '나는 날짜',
      content: '나는 내용',
      memberId: 1,
    },
    {
      nickname: '나는 닉네임',
      createdAt: '나는 날짜',
      content: '나는 내용',
      memberId: 2,
    },
    {
      nickname: '나는 닉네임',
      createdAt: '나는 날짜',
      content: '나는 내용',
      memberId: 3,
    },
  ];

  return (
    <Container>
      <div>{COMMENT}</div>
      {data.map((data) => {
        return (
          <ListSection>
            <div>
              <div>
                {user.memberId === data.memberId
                  ? data.nickname
                  : `${data.nickname} (작성자)`}
              </div>
              <div>{data.createdAt}</div>
            </div>
            <div>{data.content}</div>
          </ListSection>
        );
      })}
    </Container>
  );
}

const Container = styled.section`
  color: var(--color-black);
  margin-bottom: 2rem;

  > :first-child {
    margin-bottom: 1rem;
  }
`;

const ListSection = styled.section`
  border: 2px solid var(--color-black);
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 0.5rem;
  background: var(--color-white);

  > :first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    > :nth-child(2) {
      font-size: var(--font-size-xs);
    }
  }

  > :nth-child(2) {
    margin-bottom: 1rem;
  }
`;
