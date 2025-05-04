import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchMyApplicationsSuccess } from "../store/slices/jobSlice";
import * as jobService from "../services/jobService";
import AppLayout from "../components/layout/AppLayout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const MyApplications = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { myApplications, loading } = useAppSelector((state) => state.job);

  useEffect(() => {
    const fetchData = async () => {
      if (user.id) {
        try {
          const applications = await jobService.fetchMyJobApplications(user.id);
          dispatch(fetchMyApplicationsSuccess(applications));
        } catch (error) {
          // Optionally show a toast here
          // toast.error('Failed to fetch applications');
        }
      }
    };
    fetchData();
  }, [dispatch, user.id]);

  const getChipColor = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "interviewing":
        return "warning";
      case "reviewed":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 800, mx: "auto", px: 2, py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight="bold">
            My Applications
          </Typography>
          <Typography color="text.secondary">
            Track the status of your job applications
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography>Loading applications...</Typography>
          </Box>
        ) : myApplications.length > 0 ? (
          <Stack spacing={4}>
            {myApplications.map((application) => (
              <Card key={application.id}>
                <CardHeader
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { md: "center" },
                        gap: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {application.jobTitle}
                      </Typography>
                      <Chip
                        label={
                          application.status.charAt(0).toUpperCase() +
                          application.status.slice(1)
                        }
                        color={getChipColor(application.status)}
                        variant={
                          application.status === "reviewed" ||
                          application.status === "interviewing"
                            ? "outlined"
                            : "filled"
                        }
                        size="small"
                      />
                    </Box>
                  }
                  subheader={
                    <Typography color="text.secondary" variant="body2">
                      {application.companyName} • Applied on{" "}
                      {new Date(application.created).toLocaleDateString()}
                    </Typography>
                  }
                />
                <CardContent>
                  <Stack spacing={3}>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Resume
                      </Typography>
                      <Button
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        endIcon={<OpenInNewIcon />}
                        sx={{ textTransform: "none" }}
                      >
                        View Resume
                      </Button>
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Cover Letter
                      </Typography>
                      <Typography
                        color="text.secondary"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {application.coverLetter}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Card>
            <CardContent sx={{ p: 8, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                You haven't applied to any jobs yet
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                When you apply for jobs, your applications will appear here.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href="/jobs"
                sx={{ fontWeight: 600 }}
              >
                Browse Jobs
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </AppLayout>
  );
};

export default MyApplications;
