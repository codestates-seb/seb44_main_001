import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      localStorage.setItem('memberId', memberId);

      navigation('/oauth-signup');
    } else {
      navigation('/err');
    }
  }, [navigation]);

  return <></>;
}
