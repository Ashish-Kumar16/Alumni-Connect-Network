import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

// Material UI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack"; // <-- Fix: use named import


import { Home as HomeIcon } from "lucide-react";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import Mentors from "./pages/Mentors";
import MentorDetail from "./pages/MentorDetail";
import CreateOffer from "./pages/CreateOffer";
import MentorshipRequests from "./pages/MentorshipRequests";
import NotFound from "./pages/NotFound";

// Material UI theme 
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7E69AB",
    },
    secondary: {
      main: "#F5A623",
    },
    background: {
      default: "#f5f6fa",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:jobId" element={<JobDetail />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/mentors/:mentorId" element={<MentorDetail />} />
              <Route path="/create-offer" element={<CreateOffer />} />
              <Route path="/mentorship" element={<Mentors />} />
              <Route
                path="/mentorship-requests"
                element={<MentorshipRequests />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
