import { styled } from 'styled-components';

interface LinkWithTooltipProps {
  $image: string;
  backgroundImage?: string;
  key: string;
  href: string;
  target: string;
}

export default function Footer() {
  const githubUrl = 'https://github.com/';
  const feTeam = [
    {
      name: '김진솔',
      github: 'jinsoul75',
      image: 'https://avatars.githubusercontent.com/u/80370226?v=4',
    },
    {
      name: '박무생',
      github: 'Mooobi',
      image: 'https://avatars.githubusercontent.com/u/124570875?v=4',
    },
    {
      name: '송혜수',
      github: 'shyesoo',
      image: 'https://avatars.githubusercontent.com/u/101123722?v=4',
    },
  ];

  const beTeam = [
    {
      name: '김윤',
      github: 'Yooney1',
      image: 'https://avatars.githubusercontent.com/u/124560300?v=4',
    },
    {
      name: '최우형',
      github: 'rktdngud',
      image: 'https://avatars.githubusercontent.com/u/124556344?v=4',
    },
    {
      name: '조명인',
      github: 'myoungincho729',
      image: 'https://avatars.githubusercontent.com/u/104813146?v=4',
    },
  ];

  return (
    <Wapper>
      <Content>
        Copyright 2023. [ FE{' '}
        {feTeam.map((user) => (
          <LinkWithTooltip
            key={user.github}
            href={`${githubUrl}${user.github}`}
            target="_blank"
            $image={user.image}
          >
            {`${user.name} `}
          </LinkWithTooltip>
        ))}{' '}
        BE{' '}
        {beTeam.map((user) => (
          <LinkWithTooltip
            key={user.github}
            href={`${githubUrl}${user.github}`}
            target="_blank"
            $image={user.image}
          >
            {user.name}
          </LinkWithTooltip>
        ))}
        ]. All rights reserved.
      </Content>
    </Wapper>
  );
}

const Wapper = styled.footer`
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  bottom: 0;
  width: 100%;
  position: absolute;
  border-top: 1px solid var(--color-gray);
`;

const Content = styled.div`
  padding: 1rem;
  > a {
    color: var(--color-black);
  }
`;

const LinkWithTooltip = styled.a<LinkWithTooltipProps>`
  position: relative;
  display: inline-block;
  &:hover::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: block;
    width: 100px;
    height: 100px;
    background-image: ${({ $image }) => `url('${$image}')`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 4px;
  }
`;
