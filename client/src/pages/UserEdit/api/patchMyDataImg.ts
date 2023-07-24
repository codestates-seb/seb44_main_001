import axios from 'axios';

import { EditMember } from '../../../common/type';

export const patchMyDataImg = async (url: string, data: EditMember) => {
  const token = localStorage.getItem('Authorization');

  const formData = new FormData();
  if (data.file) {
    formData.append('image', data.file);
  }

  const jsonBlob = new Blob([JSON.stringify(data.memberPatchDto)], {
    type: 'application/json',
  });

  formData.append('memberPatchDto', jsonBlob);

  const headers = {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  };

  const res = await axios.patch(url, formData, { headers });
  return res.data;
};
