import { EditMember } from '../../type';
import { instance } from '../utils/instance';

export const patchMyDataImg = async (url: string, data: EditMember) => {
  const formData = new FormData();
  if (data.file) {
    formData.append('image', data.file);
  }

  const jsonBlob = new Blob([JSON.stringify(data.memberPatchDto)], {
    type: 'application/json',
  });

  formData.append('memberPatchDto', jsonBlob);

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  const res = await instance.patch(url, formData, { headers });
  return res.data;
};
