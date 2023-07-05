import styled from 'styled-components';

import friends from '../assets/logo/momofriends.svg'

interface SemiHeaderProps {
  title: string;
}

export default function SemiHeader({title}: SemiHeaderProps) {
  return (
    <SemiContainer>
      <div style={{height:"400px"}}></div>
      <SemiContainer>
        <Title>
          {title}
        </Title>
        <Picture src={friends} style={{width:"500px"}}/>
      </SemiContainer>
    </SemiContainer>
  )
}

const SemiContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  background-color: var(--color-pink-1);
  width: 100%;
  height: 300px;
  min-width: 700px;
`

const Title = styled.h2`
  color: var(--color-black);
  white-space: nowrap;
  padding-left: 100px;
  padding-bottom: 50px;
`

const Picture = styled.img`
  position: relative;
  padding-right: 50px;
  padding-bottom: 20px;
`