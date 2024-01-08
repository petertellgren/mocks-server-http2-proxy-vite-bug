export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const result = await fetch('/api/form', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  });

  const data = await result.json();
  return data;
}
