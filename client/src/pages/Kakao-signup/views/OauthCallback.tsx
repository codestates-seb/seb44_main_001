import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../common/util/constantValue';
import { useDispatch } from 'react-redux';
import { setMyData } from '../../Login/store/MyUserData';

export default function OauthCallback() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;

    const token = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const memberId = params.get('member_id');

    if (token && memberId) {
      localStorage.setItem('Authorization', `Bearer ${token}`);
      localStorage.setItem('RefreshToken', `Bearer ${refreshToken}`);

      const storedAccessToken = localStorage.getItem('Authorization');
      const storedRefreshToken = localStorage.getItem('RefreshToken');

      fetch(`${BASE_URL}/members/userInfo`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
          Refresh: `Bearer ${storedRefreshToken}`,
        },
      })
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
            dispatch(setMyData(data));
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return <></>;
}
