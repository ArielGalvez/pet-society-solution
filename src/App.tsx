import { NextUIProvider } from "@nextui-org/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import { NoFound } from "./pages/NoFound";
import Dashboard from "./pages/Dashboard";
import { PetEdit } from './pages/PetEdit';
import { PetCreate } from './pages/PetCreate';

function App() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <NextUIProvider
      navigate={navigate}
      className={`data-theme-${theme} flex h-[100%]`}
    >
        <Routes>
          <Route>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:id" element={<PetEdit />} />
            <Route path="/new" element={<PetCreate />} />
            <Route path="*" element={<NoFound />} />
          </Route>
        </Routes>
    </NextUIProvider>
  );
}

export default App;
