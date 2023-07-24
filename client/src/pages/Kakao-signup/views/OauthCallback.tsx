import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validateOauth from '../api/validateOauth';
import { BASE_URL } from '../../../common/util/constantValue';

export default function OauthCallback() {
  const navigation = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    // const params = new URL(document.location.toString()).searchParams;
    const token = params.get('access_token');
    // const refreshToken = params.get('refreshToken');
    const memberId = params.get('member_id');

    if (token && memberId) {
      localStorage.setItem('Authorization', `Bearer ${token}`);
      localStorage.setItem('MemberId', memberId);

      fetch(`${BASE_URL}/members/${memberId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch member information');
          }
          return response.json();
        })
        .then((data) => {
          if (data.nickname === null) {
            navigation('/oauth-signup');
          } else {
            navigation('/lists');
          }
        })
        .catch((error) => {
          console.error('Error fetching member information:', error);
          navigation('/err');
        });
    } else {
      navigation('/err');
    }
  }, [navigation]);

  return <></>;
}
