import React, { useEffect } from 'react';


function App() {
  const title = 'Drawing Game';
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div>
      <h1>hello! welcome to my drawing game</h1>
    </div>
  );
}

export default App;
