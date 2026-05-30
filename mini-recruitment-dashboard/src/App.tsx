import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routes/AppRoutes';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <ToastContainer />
    </AppProvider>
  );
}

export default App;
