import './App.css'
import Finance from "./pages/Finance.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "react-hot-toast";
import AppLayout from "./ui/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }

  }
});

function App() {

  return (<QueryClientProvider client={queryClient}>
    <GlobalStyles />
      <BrowserRouter>
        <Routes>
            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
          <Route path="finance" element={<Finance />} />
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="/" element={<Finance />} />
            </Route>
            <Route path="login" element={<Login />} />
        </Routes>

      </BrowserRouter>

        <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}}
                 toastOptions={{
                   success: {
                     duration: 3000
                   },
                   error: {
                     duration: 5000
                   },
                   style: {
                     fontSize: '16px',
                     maxWidth: '500px',
                     padding: '16px 24px',
                     backgroundColor: "var(--color-grey-0)",
                     color: "var(--color-grey-700)"
                   }
                 }}/>

      </QueryClientProvider>
  )
}

export default App
