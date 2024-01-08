import { useState } from 'react';

function SingleGetRequest() {
  const [getData, setGetData] = useState(null);

  const handleClick = async () => {
  const response = await fetch('/api/get', {
    headers: {
      'Content-Type': 'application/json'
    },
  });
    const data = await response.json();
    setGetData(data);
  }

  return (
    <div>
      <h2>Single Get Request</h2>
      <button onClick={handleClick} >Get Something</button>
      {getData && <pre>{JSON.stringify(getData, null, 2)}</pre>}
    </div>
  );
}

export default SingleGetRequest;