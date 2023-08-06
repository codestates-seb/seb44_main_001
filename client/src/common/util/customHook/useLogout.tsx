import { useMutation } from 'react-query';
import { BASE_URL } from '../constantValue';
import { postData } from '../../apis';

export default function useLogout() {
  useMutation(() => postData(`${BASE_URL}/auth/logout`, null));

  return;
}