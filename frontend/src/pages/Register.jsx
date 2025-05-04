import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate, Link } from "react-router-dom";
import {
  registerStart,
  registerSuccess,
  registerFailure,
  loginSuccess,
} from "../store/slices/authSlice";
import * as authService from "../services/authService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
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

    if (!email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(registerStart());
      const user = await authService.register(email, password, role);
      dispatch(registerSuccess());
      dispatch(loginSuccess({ id: user.id, email: user.email, role }));
      toast.success("Registration Successful! Welcome to the platform!");
      navigate("/dashboard");
    } catch (error) {
      dispatch(registerFailure(error.message));
      toast.error(error.message || "Registration failed");
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
              Create an account
            </Typography>
          }
          subheader={
            <>
              <Typography align="center" color="text.secondary" variant="body2">
                Enter your email and password to register
              </Typography>
              <Typography
                align="center"
                color="success.main"
                variant="body2"
                fontWeight={500}
              >
                For testing, use any email and password
              </Typography>
            </>
          }
          sx={{ py: 3 }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
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
              margin="normal"
            />
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
              margin="normal"
            />
            <TextField
              id="role"
              label="Role"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
              required
              fullWidth
              margin="normal"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="alumni">Alumni</MenuItem>
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, fontWeight: 600, py: 1.5 }}
              startIcon={loading ? <CircularProgress size={18} /> : null}
            >
              {loading ? "Creating account..." : "Register"}
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
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#7E69AB",
                  fontWeight: 500,
                  textDecoration: "underline",
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
