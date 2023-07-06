import { styled } from 'styled-components';
import { REGISTER, REGISTER_COMMENT } from '../../../common/util/constantValue';
import Button from '../../../common/components/Button';

export default function CommentInput() {
  return (
    <Container>
      <TitleSection>{REGISTER_COMMENT}</TitleSection>
      <InputSection>
        <textarea />
      </InputSection>
      <ButtonSection>
        <Button children={REGISTER} />
      </ButtonSection>
    </Container>
  );
}

const Container = styled.section`
  width: 50rem;
  display: flex;
  flex-direction: column;
  margin: 2rem 0 2rem 0;
  color: var(--color-black);
`;

const TitleSection = styled.section`
  margin-bottom: 1rem;
  font-family: 'BR-Bold';
`;

const InputSection = styled.section`
  margin-bottom: 1rem;

  > textarea {
    width: 100%;
    border: 2px solid var(--color-black);
    border-radius: 5px;
    padding: 0.5rem;
    min-height: 5rem;
    resize: none;
  }
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: end;
`;
