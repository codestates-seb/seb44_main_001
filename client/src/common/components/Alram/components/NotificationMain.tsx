import { useQuery } from 'react-query';
import NotificationMsg from './NotificationMsg';
import { getNotification } from '../api/getNotificaion';
import { BASE_URL } from '../../../util/constantValue';

export default function NotificationMain() {
  const { data } = useQuery('notificationData', () =>
    getNotification(`${BASE_URL}/notifications/${memberId}`),
    {
        refetchInterval: 5000,
        refetchIntervalInBackground: true,
      },
  );
  return (
    <main>
      이것은 모달
      <NotificationMsg />
    </main>
  );
}
