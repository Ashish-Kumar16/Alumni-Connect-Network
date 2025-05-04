import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  createRequestStart,
  createRequestSuccess,
  createRequestFailure,
} from "../store/slices/mentorshipSlice";
import * as mentorshipService from "../services/mentorshipService";
import AppLayout from "../components/layout/AppLayout";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MentorDetail = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { offers, loading } = useAppSelector((state) => state.mentorship);

  const [message, setMessage] = useState("");
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    if (mentorId && offers.length > 0) {
      const foundOffer = offers.find((offer) => offer.id === mentorId);
      if (foundOffer) {
        setOffer(foundOffer);
      } else {
        toast.error("Mentorship offer not found.");
        navigate("/mentors");
      }
    }
  }, [mentorId, offers, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id || !offer) {
      toast.error("You must be logged in as a student to request mentorship.");
      return;
    }

    if (!message) {
      toast.error("Please provide a message to the mentor.");
      return;
    }

    try {
      dispatch(createRequestStart());

      const requestData = {
        offerId: offer.id,
        studentId: user.id,
        studentName: user.email.split("@")[0],
        studentAvatar: "",
        mentorId: offer.mentorId,
        mentorName: offer.mentorName,
        message: message,
      };

      const result = await mentorshipService.createMentorshipRequest(
        requestData,
      );

      dispatch(createRequestSuccess(result));

      toast.success("Your mentorship request has been successfully sent.");
      navigate("/mentorship");
    } catch (error) {
      dispatch(createRequestFailure(error.message));
      toast.error(error.message || "Request failed.");
    }
  };

  if (!offer) {
    return (
      <AppLayout>
        <ToastContainer />
        <Box sx={{ px: 4, py: 8, textAlign: "center" }}>
          <Typography>Loading mentorship offer...</Typography>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ToastContainer />
      <Box sx={{ maxWidth: 700, mx: "auto", px: 2, py: 8 }}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h5" fontWeight="bold">
                {offer.title}
              </Typography>
            }
            subheader={
              <Typography color="text.secondary">
                Connect with {offer.mentorName} and receive guidance in:{" "}
                {offer.areas.join(", ")}
              </Typography>
            }
          />
          <CardContent>
            <Stack spacing={4}>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Avatar
                  src={offer.mentorAvatar}
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "primary.light",
                    color: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  {offer.mentorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {offer.mentorName}
                  </Typography>
                  <Typography color="text.secondary">
                    Availability: {offer.availability}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Description
                </Typography>
                <Typography color="text.secondary">
                  {offer.description}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Mentorship Areas
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {offer.areas.map((area, idx) => (
                    <Chip
                      key={idx}
                      label={area}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Duration
                </Typography>
                <Typography color="text.secondary">{offer.duration}</Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  id="message"
                  label="Message *"
                  placeholder="Write a message to introduce yourself and explain what you're hoping to gain from this mentorship..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  multiline
                  minRows={4}
                  fullWidth
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2, fontWeight: 600 }}
                  startIcon={loading ? <CircularProgress size={18} /> : null}
                >
                  {loading ? "Sending Request..." : "Request Mentorship"}
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default MentorDetail;
