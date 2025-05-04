import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      {/* Hero Section */}
      <Box
        component="header"
        sx={{ position: "relative", overflow: "hidden", bgcolor: "#fff" }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: 2,
            py: { xs: 6, md: 10 },
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1, zIndex: 1 }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              color="primary"
              gutterBottom
              sx={{ fontSize: { xs: 36, sm: 48, md: 64 } }}
            >
              Alumni Connect
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                color: "secondary.main",
                fontSize: { xs: 28, sm: 36, md: 48 },
              }}
            >
              Bridge to Your Future
            </Typography>
            <Typography
              sx={{
                mt: 3,
                color: "text.secondary",
                fontSize: { xs: 16, md: 20 },
                maxWidth: 600,
              }}
            >
              Connect with alumni for mentorship, career advice, and job
              opportunities. Build meaningful professional relationships that
              help you succeed.
            </Typography>
            <Box sx={{ mt: 5, display: "flex", gap: 2 }}>
              {isAuthenticated ? (
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowRight size={20} />}
                  sx={{ fontWeight: 600, px: 4, borderRadius: 2 }}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ fontWeight: 600, px: 4, borderRadius: 2 }}
                  >
                    Sign in
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ fontWeight: 600, px: 4, borderRadius: 2 }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ flex: 1, display: { xs: "none", lg: "block" }, pl: 6 }}>
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Alumni networking"
              style={{
                width: "100%",
                borderRadius: 24,
                boxShadow: "0 8px 32px rgba(106,130,251,0.12)",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box component="section" sx={{ py: 10, bgcolor: "#fff" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Features
            </Typography>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
              Connect, Learn, and Grow
            </Typography>
            <Typography
              sx={{
                mt: 3,
                maxWidth: 600,
                mx: "auto",
                color: "text.secondary",
                fontSize: 18,
              }}
            >
              Our platform offers powerful tools to help alumni and students
              build valuable connections.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              gap: 6,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
              <Box
                sx={{
                  bgcolor: "secondary.light",
                  color: "primary.main",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  fontSize: 28,
                  mt: 0.5,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Mentorship Program
                </Typography>
                <Typography sx={{ color: "text.secondary", mt: 1 }}>
                  Connect with experienced alumni who can provide guidance and
                  support for your career journey.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
              <Box
                sx={{
                  bgcolor: "secondary.light",
                  color: "primary.main",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  fontSize: 28,
                  mt: 0.5,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Job Board
                </Typography>
                <Typography sx={{ color: "text.secondary", mt: 1 }}>
                  Browse and apply for job opportunities posted by alumni from
                  your institution.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
              <Box
                sx={{
                  bgcolor: "secondary.light",
                  color: "primary.main",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2,
                  fontSize: 28,
                  mt: 0.5,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Networking
                </Typography>
                <Typography sx={{ color: "text.secondary", mt: 1 }}>
                  Build your professional network with alumni and peers who
                  share your academic background.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box component="section" sx={{ bgcolor: "primary.main", py: 8 }}>
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" color="#fff">
              Ready to get started?
            </Typography>
            <Typography variant="h5" color="secondary.main" fontWeight={500}>
              Join our community today.
            </Typography>
          </Box>
          <Box sx={{ mt: { xs: 4, md: 0 }, display: "flex", gap: 2 }}>
            <Button
              onClick={() => navigate("/register")}
              variant="contained"
              color="secondary"
              sx={{
                bgcolor: "#fff",
                color: "primary.main",
                fontWeight: 600,
                px: 4,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              Get started
            </Button>
            <Button
              onClick={() => navigate("/login")}
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                fontWeight: 600,
                px: 4,
                borderRadius: 2,
              }}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: "#fff", py: 6 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
          <Typography align="center" color="text.secondary">
            &copy; {new Date().getFullYear()} Alumni Connect Network. All rights
            reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
