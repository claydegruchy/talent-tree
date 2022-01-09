import { Chart } from './components/Chart';
import { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState();
  return (
    <div className='App'>
      <header className='App-header'></header>
      <div>
        <input
          onKeyUp={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={'Search'}
        />
      </div>
      <div>
        <Chart search={search} />
      </div>
    </div>
  );
}

export default App;
