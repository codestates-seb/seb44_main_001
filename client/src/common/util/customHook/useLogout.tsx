import { useMutation } from 'react-query';
import { BASE_URL } from '../constantValue';
import { postLogout } from './api/postLogout';

export default function useLogout() {

    useMutation(['getLocation'], () => postLogout(`${BASE_URL}/auth/logout`));

  return;
}
