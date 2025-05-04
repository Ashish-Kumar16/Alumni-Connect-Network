import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Button,
  Avatar,
  Chip,
  Grid,
  Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlumniDashboard({ requests, applications, myJobs, myOffers }) {
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
              title="Mentorship Requests"
              subheader="Student requests for your mentorship"
            />
            <CardContent>
              {requests && requests.length > 0 ? (
                <>
                  {requests.slice(0, 3).map((request) => (
                    <Box
                      key={request.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={request.studentAvatar} sx={{ mr: 2 }}>
                          {request.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1">
                            {request.studentName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {request.message.length > 50
                              ? `${request.message.substring(0, 50)}...`
                              : request.message}
                          </Typography>
                        </Box>
                      </Box>
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
                          request.status === "pending" ? "outlined" : "filled"
                        }
                      />
                    </Box>
                  ))}
                  {requests.length > 3 && (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate("/mentorship-requests")}
                    >
                      View all {requests.length} requests
                    </Button>
                  )}
                </>
              ) : (
                <Typography color="text.secondary">
                  No mentorship requests yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Job Applications"
              subheader="Students applied to your job postings"
            />
            <CardContent>
              {applications && applications.length > 0 ? (
                <>
                  {applications.slice(0, 3).map((application) => (
                    <Box
                      key={application.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          {application.applicantName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Applied for: {application.jobTitle}
                        </Typography>
                      </Box>
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
                  ))}
                  {applications.length > 3 && (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate("/applications")}
                    >
                      View all {applications.length} applications
                    </Button>
                  )}
                </>
              ) : (
                <Typography color="text.secondary">
                  No job applications received yet.
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
                    My Job Postings
                  </Typography>
                  {myJobs && myJobs.length > 0 ? (
                    <>
                      {myJobs.slice(0, 3).map((job) => (
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
                        </Box>
                      ))}
                      {myJobs.length > 3 && (
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => navigate("/my-jobs")}
                        >
                          View all {myJobs.length} job postings
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
                        You haven't posted any jobs yet.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleToast("Redirecting to post a job...");
                          navigate("/post-job");
                        }}
                      >
                        Post a Job
                      </Button>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    My Mentorship Offers
                  </Typography>
                  {myOffers && myOffers.length > 0 ? (
                    <>
                      {myOffers.slice(0, 3).map((offer) => (
                        <Box
                          key={offer.id}
                          sx={{
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            mb: 2,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {offer.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {offer.areas && offer.areas.join(", ")}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {offer.availability}
                          </Typography>
                        </Box>
                      ))}
                      {myOffers.length > 3 && (
                        <Button
                          variant="outlined"
                          fullWidth
                          onClick={() => navigate("/my-offers")}
                        >
                          View all {myOffers.length} mentorship offers
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
                        You haven't created any mentorship offers yet.
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleToast("Redirecting to create offer...");
                          navigate("/create-offer");
                        }}
                      >
                        Create Offer
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

export default AlumniDashboard;
