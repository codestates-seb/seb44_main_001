import { styled } from 'styled-components';

export default function Article() {
  const data = {
    title: '나는 제목',
    createdAt: '나는 날짜',
    nickname: '나는 닉네임',
    prfileimgURL: '',
    content: '<p>나는 내용</p>',
    tags: ['나는', '태그'],
    likeCount: 0,
    commentCount: 0,
  };
  return (
    <Container>
      <TitleSection>
        <div>{data.title}</div>
        <div>{data.createdAt}</div>
      </TitleSection>
      <AuthorSection>
        <img src={data.prfileimgURL} alt="user" />
        <div>{data.nickname}</div>
      </AuthorSection>
      <ContentSection>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </ContentSection>
      <TagSection>
        {data.tags.map((tag) => (
          <div>{`#${tag}`}</div>
        ))}
      </TagSection>
      <InfoSection>
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
  align-items: center;
  margin: 1rem 0 2rem 0;

  & img {
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
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
`;
