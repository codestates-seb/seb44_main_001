import styled from 'styled-components';

import friends from '../assets/logo/momofriends.svg';

interface SemiHeaderProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

export default function SemiHeader({
  title,
  content,
  children,
}: SemiHeaderProps) {
  return (
    <SemiContainer>
      <ContentWrapper style={{}}>
        <Title>{children ? children : title}</Title>
        <Content>{content}</Content>
      </ContentWrapper>
      <Picture src={friends} />
    </SemiContainer>
  );
}

const SemiContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  background-color: var(--color-pink-1);
  width: 100%;
  height: 200px;
  min-width: 700px;
  justify-content: space-around;
  @media screen and (max-width: 1023px) {
    justify-content: left;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  @media screen and (max-width: 1023px) {
    margin-left: calc((100vw - 50rem) / 2);
  }
`;

const Title = styled.h1`
  color: var(--color-black);
`;

const Content = styled.span`
  color: var(--color-black);
  font-size: medium;
  margin-top: 0.5rem;
`;

const Picture = styled.img`
  margin-bottom: 1rem;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;
