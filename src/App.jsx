import { Chart } from './components/Chart';
import { useState } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState();
  const [layoutSelection, setLayoutSelection] = useState('cose-bilkent');

  var layoutOptions = [
    'cose-bilkent',
    'cola',
    'cise',
    'fcose',
    'euler',
    'klay',
  ];

  document.title = 'Talent Tree';

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
          <select onChange={(e) => setLayoutSelection(e.target.value)}>
            {layoutOptions.map((o) => (
              <option value={o}>Layout: {o}</option>
            ))}
          </select>
      </div>
      <div>
        <Chart search={search} layoutSelection={layoutSelection} />
      </div>
      <div>Created by Clay D</div>
    </div>
  );
}

export default App;
