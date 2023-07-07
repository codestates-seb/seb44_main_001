import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import deleteArticle from '../api/deleteArticle';
import { PostData } from '../../../common/type';
import { BASE_URL } from '../../../common/util/constantValue';

export default function Article() {
  const queryClient = useQueryClient();

  const user = { memberId: 1 };

  const data = {
    postId: 1,
    title: '나는 제목',
    createdAt: '나는 날짜',
    updatedAt: '나는 수정 날짜',
    nickname: '나는 닉네임',
    prfileimgURL: '',
    content: '<p>나는 내용</p>',
    tags: ['나는', '태그'],
    likeCount: 0,
    commentCount: 0,
    memberId: 1,
  };

  const deleteItemMutation = useMutation<void, unknown, PostData>(
    () => deleteArticle(`${BASE_URL}/delete/${data.postId}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('filteredLists');
      },
    },
  );

  const handleDelete = () => {
    deleteItemMutation.mutate(data);
  };

  return (
    <Container>
      <TitleSection>
        <div>{data.title}</div>
        <div>
          {data.updatedAt ? `${data.updatedAt}(수정됨)` : data.createdAt}
        </div>
      </TitleSection>
      <AuthorSection>
        <Link to={`/user/${data.memberId}`}>
          {/* 미니 모달 뜨게끔 수정해야함 */}
          <img src={data.prfileimgURL} alt="user" />
          <div>{data.nickname}</div>
        </Link>
      </AuthorSection>
      <ContentSection>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </ContentSection>
      <TagSection>
        {data.tags.map((tag) => (
          <div key={tag}>{`#${tag}`}</div>
        ))}
      </TagSection>
      <InfoSection>
        {user.memberId === data.memberId && (
          <Link to={`/write/${data.postId}`}>
            <AiFillEdit />
          </Link>
        )}
        {user.memberId === data.memberId && (
          <AiFillDelete onClick={handleDelete} />
        )}
        <div>{data.likeCount}</div>
        <div>{data.commentCount}</div>
      </InfoSection>
    </Container>
  );
}

const Container = styled.article`
  border: 2px solid var(--color-black);
  border-radius: 10px;
  padding: 2rem;
  width: 50rem;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  margin: 2rem 0 2rem 0;
  color: var(--color-black);
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: end;
  border-bottom: 1px solid var(--color-black);
  padding-bottom: 1rem;

  > :first-child {
    font-size: var(--font-size-m);
  }

  > :nth-child(2) {
    font-size: var(--font-size-xs);
  }
`;

const AuthorSection = styled.section`
  display: flex;

  > a {
    display: flex;
    align-items: center;
    margin: 1rem 0 2rem 0;
    text-decoration: none;
    color: var(--color-black);

    & img {
      border-radius: 50%;
      height: 2rem;
      width: 2rem;
      margin-right: 1rem;
    }
  }
`;

const ContentSection = styled.section`
  margin-bottom: 2rem;
  min-height: 20rem;
`;

const TagSection = styled.section`
  display: flex;
  margin-bottom: 1rem;

  > div {
    margin-right: 1rem;
    border-radius: 5px;
    background: var(--color-gray);
    padding: 0.5rem;
  }
`;

const InfoSection = styled.section`
  display: flex;
  justify-content: end;
  align-items: center;

  & a {
    display: flex;
    align-items: center;
    color: var(--color-black);
  }

  > * {
    margin-left: 1rem;
  }
`;
