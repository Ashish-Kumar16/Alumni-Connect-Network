import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Avatar,
  Chip,
  Grid,
  Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentDashboard({ jobs, offers, myApplications, myRequests }) {
  const navigate = useNavigate();

  const handleToast = (msg) => {
    toast(msg, { position: "top-right", autoClose: 2000 });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Job Opportunities"
              subheader="Recent job postings from alumni"
            />
            <CardContent>
              {jobs && jobs.length > 0 ? (
                <>
                  {jobs.slice(0, 3).map((job) => (
                    <Box
                      key={job.id}
                      sx={{
                        border: "1px solid #eee",
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle1">
                          {job.position}
                        </Typography>
                        <Chip label={job.type} variant="outlined" />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {job.companyName} • {job.location}
                      </Typography>
                      <Button
                        variant="text"
                        sx={{ px: 0, height: "auto", color: "primary.main" }}
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        View Details
                      </Button>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/jobs")}
                  >
                    View all {jobs.length} job postings
                  </Button>
                </>
              ) : (
                <Typography color="text.secondary">
                  No job postings available at the moment.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Available Mentors"
              subheader="Alumni offering mentorship"
            />
            <CardContent>
              {offers && offers.length > 0 ? (
                <>
                  {offers.slice(0, 3).map((offer) => (
                    <Box
                      key={offer.id}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                    >
                      <Avatar src={offer.mentorAvatar} sx={{ mr: 2 }}>
                        {offer.mentorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">
                          {offer.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {offer.mentorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {offer.areas && offer.areas.join(", ")}
                        </Typography>
                        <Button
                          variant="text"
                          sx={{ px: 0, height: "auto", color: "primary.main" }}
                          onClick={() => navigate(`/mentors/${offer.id}`)}
                        >
                          Learn More
                        </Button>
                      </Box>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate("/mentors")}
                  >
                    View all {offers.length} mentorship offers
                  </Button>
                </>
              ) : (
                <Typography color="text.secondary">
                  No mentorship offers available at the moment.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="My Activities" />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    My Job Applications
                  </Typography>
                  {myApplications && myApplications.length > 0 ? (
                    <>
                      {myApplications.slice(0, 3).map((application) => (
                        <Box
                          key={application.id}
                          sx={{
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle1">
                              {application.jobTitle}
                            </Typography>
                            <Chip
                              label={
                                application.status.charAt(0).toUpperCase() +
                                application.status.slice(1)
                              }
                              color={
                                application.status === "accepted"
                                  ? "success"
                                  : application.status === "rejected"
                                  ? "error"
                                  : "default"
                              }
                              variant={
                                application.status === "pending"
                                  ? "outlined"
                                  : "filled"
                              }
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {application.companyName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Applied on:{" "}
                            {new Date(application.created).toLocaleDateString()}
                          </Typography>
                        </Box>
                      ))}
                      {myApplications.length > 3 && (
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={() => navigate("/my-applications")}
                        >
                          View all {myApplications.length} applications
                        </Button>
                      )}
                    </>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 3,
                        bgcolor: "#f5f5f5",
                        borderRadius: 2,
                      }}
                    >
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        You haven't applied to any jobs yet.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleToast("Redirecting to jobs...");
                          navigate("/jobs");
                        }}
                      >
                        Browse Jobs
                      </Button>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    My Mentorship Requests
                  </Typography>
                  {myRequests && myRequests.length > 0 ? (
                    <>
                      {myRequests.slice(0, 3).map((request) => (
                        <Box
                          key={request.id}
                          sx={{
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="subtitle1">
                              {request.mentorName}
                            </Typography>
                            <Chip
                              label={
                                request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)
                              }
                              color={
                                request.status === "accepted"
                                  ? "success"
                                  : request.status === "rejected"
                                  ? "error"
                                  : "default"
                              }
                              variant={
                                request.status === "pending"
                                  ? "outlined"
                                  : "filled"
                              }
                            />
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                          >
                            {request.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Requested on:{" "}
                            {new Date(request.created).toLocaleDateString()}
                          </Typography>
                        </Box>
                      ))}
                      {myRequests.length > 3 && (
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={() => navigate("/my-requests")}
                        >
                          View all {myRequests.length} requests
                        </Button>
                      )}
                    </>
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 3,
                        bgcolor: "#f5f5f5",
                        borderRadius: 2,
                      }}
                    >
                      <Typography color="text.secondary" sx={{ mb: 2 }}>
                        You haven't requested any mentorships yet.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleToast("Redirecting to mentors...");
                          navigate("/mentors");
                        }}
                      >
                        Find a Mentor
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StudentDashboard;
