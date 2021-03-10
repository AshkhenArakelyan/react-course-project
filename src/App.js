import React, { useContext, createContext } from 'react';
import AppRoutes from 'routes/AppRoutes';

const AppContext = createContext({
  user: null,
  setUser: () => {}
})
function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
        <AppRoutes />
    </div>
  );
}

export default App;