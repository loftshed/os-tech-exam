import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(undefined);
  const [boxIsChecked, setBoxIsChecked] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://reqres.in/api/users', { method: 'GET' });
        const { data } = await response.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    function compare(a, b) {
      if (a.last_name < b.last_name) {
        return -1;
      }
      if (a.last_name > b.last_name) {
        return 1;
      }
      return 0;
    }
    const sortedData = data?.sort(compare);
    setData(null);
    console.log(sortedData);
  }, [boxIsChecked]);

  if (!data) return null;

  return (
    <div className="App">
      <input
        id="checkbox"
        type="checkbox"
        onChange={(ev) => {
          setBoxIsChecked(ev.target.checked);
        }}
      />

      {data.map((el) => {
        const { id, email, first_name, last_name, avatar } = el;
        return (
          <div key={id}>
            <img src={avatar} alt="avatar" />
            <span>
              {first_name} {last_name} ({email})
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
