import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
} from "../store/slices/userSlice";
import {
  fetchOffersSuccess,
  fetchRequestsSuccess,
  fetchMyRequestsSuccess,
} from "../store/slices/mentorshipSlice";
import {
  fetchJobsSuccess,
  fetchMyJobsSuccess,
  fetchApplicationsSuccess,
  fetchMyApplicationsSuccess,
} from "../store/slices/jobSlice";
import * as userService from "../services/userService";
import * as mentorshipService from "../services/mentorshipService";
import * as jobService from "../services/jobService";
import AppLayout from "../components/layout/AppLayout";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import AlumniDashboard from "../components/dashboard/AlumniDashboard";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { profile, loading } = useAppSelector((state) => state.user);
  const { jobs, myJobs, applications, myApplications } = useAppSelector(
    (state) => state.job,
  );
  const { offers, myOffers, requests, myRequests } = useAppSelector(
    (state) => state.mentorship,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (user.id) {
        try {
          // Fetch user profile
          dispatch(fetchProfileStart());
          const userProfile = await userService.fetchUserProfile(user.id);
          dispatch(fetchProfileSuccess(userProfile));

          toast.success(
            `Welcome ${
              user.role === "alumni" ? "Alumni" : "Student"
            }! You've successfully logged in as ${user.email}`,
          );

          // Fetch data based on role
          if (user.role === "alumni") {
            const myOffersData =
              await mentorshipService.fetchMyMentorshipOffers(user.id);
            dispatch(fetchOffersSuccess(myOffersData));

            const requestsData =
              await mentorshipService.fetchMentorshipRequests(user.id);
            dispatch(fetchRequestsSuccess(requestsData));

            const myJobsData = await jobService.fetchMyJobs(user.id);
            dispatch(fetchMyJobsSuccess(myJobsData));

            const applicationsData = await jobService.fetchJobApplications(
              user.id,
            );
            dispatch(fetchApplicationsSuccess(applicationsData));
          } else {
            const offersData = await mentorshipService.fetchMentorshipOffers();
            dispatch(fetchOffersSuccess(offersData));

            const myRequestsData =
              await mentorshipService.fetchMyMentorshipRequests(user.id);
            dispatch(fetchMyRequestsSuccess(myRequestsData));

            const jobsData = await jobService.fetchJobs();
            dispatch(fetchJobsSuccess(jobsData));

            const myApplicationsData = await jobService.fetchMyJobApplications(
              user.id,
            );
            dispatch(fetchMyApplicationsSuccess(myApplicationsData));
          }
        } catch (error) {
          dispatch(fetchProfileFailure(error.message));
          toast.error(error.message || "Error loading dashboard");
        }
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [dispatch, user.id, user.role]);

  const getInitials = () => {
    if (profile) {
      return `${profile.firstName[0]}${profile.lastName[0]}`;
    }
    return user.email ? user.email[0].toUpperCase() : "?";
  };

  const getWelcomeHeading = () => {
    if (profile && profile.firstName) {
      return `Welcome, ${profile.firstName}!`;
    }
    if (user.role === "alumni") {
      return "Welcome, Alumni!";
    } else {
      return "Welcome, Student!";
    }
  };

  return (
    <AppLayout>
      <ToastContainer />
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", p: 8 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading dashboard...</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                mb: 6,
                background: "linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)",
                borderRadius: 3,
                p: 4,
                boxShadow: 3,
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ md: "center" }}
                justifyContent="space-between"
                spacing={3}
              >
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Avatar
                    src={profile?.avatar}
                    sx={{
                      width: 64,
                      height: 64,
                      border: "4px solid #fff",
                      bgcolor: "#f5f5f5",
                      fontSize: 28,
                      color: "#6a82fb",
                    }}
                  >
                    {getInitials()}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color="#fff">
                      {getWelcomeHeading()}
                    </Typography>
                    <Typography color="#f3e9f7" fontWeight={500}>
                      {user.role === "alumni"
                        ? "Alumni Dashboard"
                        : "Student Dashboard"}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2}>
                  {user.role === "alumni" ? (
                    <>
                      <Button
                        variant="outlined"
                        sx={{
                          bgcolor: "#fff",
                          color: "#6a82fb",
                          borderColor: "#fff",
                          "&:hover": {
                            bgcolor: "#f3e9f7",
                            borderColor: "#fff",
                          },
                        }}
                        onClick={() => navigate("/create-offer")}
                      >
                        Create Mentorship Offer
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#fff",
                          color: "#6a82fb",
                          "&:hover": { bgcolor: "#f3e9f7" },
                        }}
                        onClick={() => navigate("/post-job")}
                      >
                        Post a Job
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#fff",
                        color: "#6a82fb",
                        "&:hover": { bgcolor: "#f3e9f7" },
                      }}
                      onClick={() => navigate("/mentors")}
                    >
                      Find a Mentor
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>

            {user.role === "alumni" ? (
              <AlumniDashboard
                requests={requests}
                applications={applications}
                myJobs={myJobs}
                myOffers={myOffers}
              />
            ) : (
              <StudentDashboard
                jobs={jobs}
                offers={offers}
                myApplications={myApplications}
                myRequests={myRequests}
              />
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
};

export default Dashboard;
