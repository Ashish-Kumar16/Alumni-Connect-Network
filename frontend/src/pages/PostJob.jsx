import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import * as jobService from "../services/jobService";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
} from "../store/slices/userSlice";
import * as userService from "../services/userService";
import AppLayout from "../components/layout/AppLayout";
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

const JOB_TYPES = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
];

const PostJob = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    location: "",
    description: "",
    requirements: "",
    type: "",
    salary: "",
    contactEmail: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user.id) {
        dispatch(fetchProfileStart());
        try {
          const userProfile = await userService.fetchUserProfile(user.id);
          dispatch(fetchProfileSuccess(userProfile));
        } catch (error) {
          dispatch(fetchProfileFailure(error.message));
        }
      }
    };

    fetchProfile();
  }, [dispatch, user.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.position ||
      !formData.location ||
      !formData.description ||
      !formData.requirements ||
      !formData.type ||
      !formData.salary ||
      !formData.contactEmail
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);

      const jobData = {
        ...formData,
        postedBy: user.id || "",
        postedByName: profile?.firstName
          ? `${profile.firstName} ${profile.lastName}`
          : user.email || "",
        created: new Date().toISOString(),
      };

      await jobService.postJob(jobData);

      toast.success("Your job posting has been successfully published");
      navigate("/jobs");
    } catch (error) {
      toast.error(error.message || "Failed to post job");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <ToastContainer />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f6fa",
          py: 6,
        }}
      >
        <Card sx={{ width: "100%", maxWidth: 500, boxShadow: 3 }}>
          <CardHeader
            title={
              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
                color="primary"
              >
                Post a New Job
              </Typography>
            }
            subheader={
              <Typography align="center" color="text.secondary" variant="body2">
                Fill in the details below to post a new job opportunity for our
                alumni network.
              </Typography>
            }
            sx={{ py: 3 }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                id="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                disabled={submitting}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                id="position"
                label="Position"
                value={formData.position}
                onChange={handleChange}
                disabled={submitting}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                id="location"
                label="Location"
                value={formData.location}
                onChange={handleChange}
                disabled={submitting}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                id="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                disabled={submitting}
                required
                fullWidth
                multiline
                minRows={3}
                margin="normal"
              />
              <TextField
                id="requirements"
                label="Requirements"
                value={formData.requirements}
                onChange={handleChange}
                disabled={submitting}
                required
                fullWidth
                margin="normal"
                placeholder="Enter job requirements (comma-separated)"
              />
              <TextField
                id="type"
                label="Type"
                select
                value={formData.type}
                onChange={handleSelectChange}
                disabled={submitting}
                required
                fullWidth
                margin="normal"
              >
                {JOB_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="salary"
                label="Salary"
                value={formData.salary}
                onChange={handleChange}
                disabled={submitting}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                id="contactEmail"
                label="Contact Email"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                disabled={submitting}
                required
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={submitting}
                sx={{ mt: 3, fontWeight: 600, py: 1.5 }}
                startIcon={submitting ? <CircularProgress size={18} /> : null}
              >
                {submitting ? "Posting..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default PostJob;
