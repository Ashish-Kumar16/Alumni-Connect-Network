import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate, Link } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../store/slices/authSlice";
import * as authService from "../services/authService";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(loginStart());
      const user = await authService.login(email, password);
      dispatch(
        loginSuccess({ id: user.id, email: user.email, role: user.role }),
      );
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f6fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <ToastContainer />
      <Card sx={{ width: "100%", maxWidth: 400, boxShadow: 3 }}>
        <CardHeader
          title={
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              color="primary"
            >
              Welcome Back
            </Typography>
          }
          subheader={
            <>
              <Typography align="center" color="secondary" variant="body2">
                Enter any email and password to sign in
              </Typography>
              <Typography
                align="center"
                color="text.secondary"
                variant="body2"
                fontWeight={500}
              >
                This is a demo app with fake authentication
              </Typography>
            </>
          }
          sx={{
            bgcolor: "primary.main",
            color: "#fff",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            py: 3,
          }}
        />
        <CardContent sx={{ pt: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <TextField
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 600, mt: 1 }}
              startIcon={loading ? <CircularProgress size={18} /> : null}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            {error && (
              <Typography
                color="error"
                align="center"
                variant="body2"
                sx={{ mt: 2 }}
              >
                {error}
              </Typography>
            )}
          </form>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#7E69AB",
                  fontWeight: 500,
                  textDecoration: "underline",
                }}
              >
                Create one
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
