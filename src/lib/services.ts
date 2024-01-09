import axios from 'axios';

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/api/form', 
    formData,
    {
      validateStatus: (status) => status === 200,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    }
  );

  return response.data;

}
