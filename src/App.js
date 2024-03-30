import './App.css';
import {Routes, Route} from 'react-router-dom';
import Test from './routes/test';

function App() {
  return (
    <Routes>
      <Route path="/api/learners/v1/take-quiz/" element={<Test />} />
    </Routes>
  );
}

export default App;
