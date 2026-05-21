import { AppProvider } from './context/AppProvider';
import AppShell from './layout/AppShell';

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
