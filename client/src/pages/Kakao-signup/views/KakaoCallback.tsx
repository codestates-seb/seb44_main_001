import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KakaoCallback() {
  const navigation = useNavigate();

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    // const params = new URL(document.location.toString()).searchParams;
    const token = params.get('access_token');
    // const refreshToken = params.get('refreshToken');
    const memberId = params.get('member_id');

    if (token && memberId) {
      localStorage.setItem('Authorization', token);
      localStorage.setItem('memberId', memberId);

      navigation('/kakao-signup');
    } else {
      console.log('오예스 실패! err!');
      navigation('/err');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
