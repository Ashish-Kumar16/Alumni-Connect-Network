import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  createOfferStart,
  createOfferSuccess,
  createOfferFailure,
} from "../store/slices/mentorshipSlice";
import * as mentorshipService from "../services/mentorshipService";
import AppLayout from "../components/layout/AppLayout";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateOffer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.mentorship);
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    newArea: "",
    areas: [],
    duration: "",
    availability: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddArea = () => {
    if (
      formData.newArea.trim() &&
      !formData.areas.includes(formData.newArea.trim())
    ) {
      setFormData({
        ...formData,
        areas: [...formData.areas, formData.newArea.trim()],
        newArea: "",
      });
    }
  };

  const handleRemoveArea = (area) => {
    setFormData({
      ...formData,
      areas: formData.areas.filter((a) => a !== area),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id || !profile) {
      toast.error("You must be logged in as an alumni to offer mentorship.");
      return;
    }

    if (
      !formData.title ||
      !formData.description ||
      formData.areas.length === 0 ||
      !formData.duration ||
      !formData.availability
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      dispatch(createOfferStart());

      const offerData = {
        mentorId: user.id,
        mentorName: `${profile.firstName} ${profile.lastName}`,
        mentorAvatar: profile.avatar || "",
        title: formData.title,
        description: formData.description,
        areas: formData.areas,
        duration: formData.duration,
        availability: formData.availability,
      };

      const result = await mentorshipService.createMentorshipOffer(offerData);

      dispatch(createOfferSuccess(result));

      toast.success("Your mentorship offer has been successfully created.");
      navigate("/mentorship");
    } catch (error) {
      dispatch(createOfferFailure(error.message));
      toast.error(error.message || "Creation failed.");
    }
  };

  return (
    <AppLayout>
      <ToastContainer />
      <Box sx={{ maxWidth: 700, mx: "auto", px: 2, py: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create Mentorship Offer
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Share your knowledge and experience with students
        </Typography>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              title="Mentorship Details"
              subheader="Provide information about the mentorship you're offering"
            />
            <CardContent>
              <Stack spacing={3}>
                <TextField
                  label="Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="E.g., Career Guidance in Software Engineering"
                  required
                  fullWidth
                />
                <TextField
                  label="Description *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about what you can offer as a mentor..."
                  required
                  multiline
                  minRows={4}
                  fullWidth
                />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Areas of Expertise *
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      value={formData.newArea}
                      onChange={(e) =>
                        setFormData({ ...formData, newArea: e.target.value })
                      }
                      placeholder="Add an area of expertise"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddArea();
                        }
                      }}
                      size="small"
                    />
                    <Button
                      variant="outlined"
                      type="button"
                      onClick={handleAddArea}
                    >
                      Add
                    </Button>
                  </Stack>
                  <Box sx={{ mt: 2 }}>
                    {formData.areas.length > 0 ? (
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {formData.areas.map((area, idx) => (
                          <Chip
                            key={idx}
                            label={area}
                            onDelete={() => handleRemoveArea(area)}
                            deleteIcon={<CloseIcon />}
                            color="primary"
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </Stack>
                    ) : (
                      <Typography color="text.secondary" variant="body2">
                        Add at least one area of expertise
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <Box flex={1}>
                    <TextField
                      label="Duration *"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      placeholder="E.g., 3 months, 6 sessions"
                      required
                      fullWidth
                    />
                    <Typography color="text.secondary" variant="caption">
                      How long will this mentorship relationship last?
                    </Typography>
                  </Box>
                  <Box flex={1}>
                    <TextField
                      label="Availability *"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="E.g., Weekly 1-hour sessions"
                      required
                      fullWidth
                    />
                    <Typography color="text.secondary" variant="caption">
                      How often can you meet with your mentee?
                    </Typography>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  sx={{ pt: 2 }}
                >
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={() => navigate("/mentorship")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={18} /> : null}
                  >
                    {loading ? "Creating..." : "Create Offer"}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </form>
      </Box>
    </AppLayout>
  );
};

export default CreateOffer;
