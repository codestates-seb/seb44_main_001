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
      {/* <div style={{ height: '400px' }}></div> */}
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title>{children ? children : title}</Title>
          <Content>{content}</Content>
        </div>
      </div>
      <Picture src={friends} style={{ width: '500px' }} />
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
`;

const Title = styled.h1`
  color: var(--color-black);
  white-space: nowrap;
  padding-bottom: 20px;
  padding-left: calc((100vw - 50rem) / 2);
`;

const Content = styled.span`
  color: var(--color-black);
  font-size: medium;
  white-space: nowrap;
  padding-left: 100px;
  padding-bottom: 40px;
  padding-left: calc((100vw - 50rem) / 2);
`;

const Picture = styled.img`
  position: relative;
  padding-right: 50px;
  padding-bottom: 20px;
`;
