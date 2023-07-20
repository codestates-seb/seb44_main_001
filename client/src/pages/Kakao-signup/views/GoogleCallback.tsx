import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleCallback() {
  const navigation = useNavigate();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const token = params.get('access_token');

    if (token) {
      localStorage.setItem('Authorization', token);
      navigation('/kakao-signup');
    } else {
      navigation('/err');
    }
  }, [navigation]);

  return <></>;
}
