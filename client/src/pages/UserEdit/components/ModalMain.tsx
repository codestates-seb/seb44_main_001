import { styled } from 'styled-components';
import Button from '../../../common/components/Button';
import { deleteMember } from '../api/deleteMember';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../common/util/constantValue';

type HandleModalChangeFunction = () => void;

export default function ModalMain({handleModalChange}: { handleModalChange: HandleModalChangeFunction }) {
  const navigate = useNavigate();

  const memberId = localStorage.getItem('MemberId');

  const deleteMemberMutation = useMutation<void, unknown, void>(
    () => deleteMember(`${BASE_URL}/members/${memberId}`),
    {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleDeleteMember = () => {
    deleteMemberMutation.mutate();
  };

  return (
    <Wrapper>
      <div>정말 탈퇴하시겠습니까?</div>
      <ButtonWrapper>
        <Button children={'회원탈퇴'} onClick={handleDeleteMember} />
        <Button children={'취소'} onClick={handleModalChange} />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ButtonWrapper = styled.div`
  & :first-child {
    margin-right: 1rem;
  }
`;
