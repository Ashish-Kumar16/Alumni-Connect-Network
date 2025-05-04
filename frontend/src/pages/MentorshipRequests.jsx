import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  fetchRequestsStart,
  fetchRequestsSuccess,
  fetchRequestsFailure,
  updateRequestStatusStart,
  updateRequestStatusSuccess,
  updateRequestStatusFailure,
} from "../store/slices/mentorshipSlice";
import * as mentorshipService from "../services/mentorshipService";
import AppLayout from "../components/layout/AppLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MentorshipRequests = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { requests, loading } = useAppSelector((state) => state.mentorship);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        dispatch(fetchRequestsStart());
        try {
          const requestsData = await mentorshipService.fetchMentorshipRequests(
            user.id,
          );
          dispatch(fetchRequestsSuccess(requestsData));
        } catch (error) {
          dispatch(fetchRequestsFailure(error.message));
        }
      }
    };

    fetchData();
  }, [dispatch, user?.id]);

  const handleUpdateStatus = async (requestId, status) => {
    if (status !== "accepted" && status !== "rejected") {
      toast.error("Status must be 'accepted' or 'rejected'");
      return;
    }

    try {
      dispatch(updateRequestStatusStart());
      await mentorshipService.updateMentorshipRequestStatus(requestId, status);
      dispatch(updateRequestStatusSuccess({ id: requestId, status }));

      toast.success(`Request ${status}`);
    } catch (error) {
      dispatch(updateRequestStatusFailure(error.message));
      toast.error(error.message || "Update failed");
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <AppLayout>
      <ToastContainer />
      <Box sx={{ maxWidth: 700, mx: "auto", px: 2, py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight="bold">
            Mentorship Requests
          </Typography>
          <Typography color="text.secondary">
            Review and manage mentorship requests from students
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading requests...</Typography>
          </Box>
        ) : requests.length > 0 ? (
          <Stack spacing={4}>
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader
                  title={
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        Request from {request.studentName}
                      </Typography>
                      <Chip
                        label={
                          request.status.charAt(0).toUpperCase() +
                          request.status.slice(1)
                        }
                        color={getBadgeColor(request.status)}
                        variant={
                          request.status === "pending" ? "outlined" : "filled"
                        }
                        size="small"
                      />
                    </Stack>
                  }
                  subheader={
                    <Typography color="text.secondary" variant="body2">
                      Received on{" "}
                      {new Date(request.created).toLocaleDateString()}
                    </Typography>
                  }
                />
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Message
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ whiteSpace: "pre-line" }}
                    >
                      {request.message}
                    </Typography>
                  </Box>
                  {request.status === "pending" && (
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      sx={{ mt: 2 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() =>
                          handleUpdateStatus(request.id, "accepted")
                        }
                        sx={{ fontWeight: 600 }}
                      >
                        Accept Request
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() =>
                          handleUpdateStatus(request.id, "rejected")
                        }
                        sx={{ fontWeight: 600 }}
                      >
                        Decline Request
                      </Button>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Card>
            <CardContent sx={{ p: 8, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                No mentorship requests found
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                When students request mentorship from you, the requests will
                appear here.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </AppLayout>
  );
};

export default MentorshipRequests;
