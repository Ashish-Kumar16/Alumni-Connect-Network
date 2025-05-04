import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  applyForJobStart,
  applyForJobSuccess,
  applyForJobFailure,
} from "../store/slices/jobSlice";
import * as jobService from "../services/jobService";
import AppLayout from "../components/layout/AppLayout";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { jobs, loading } = useAppSelector((state) => state.job);

  const [job, setJob] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  useEffect(() => {
    if (jobId && jobs.length > 0) {
      const foundJob = jobs.find((job) => job.id === jobId);
      if (foundJob) {
        setJob(foundJob);
      } else {
        const fetchJob = async () => {
          try {
            const jobData = await jobService.fetchJobById(jobId);
            setJob(jobData);
          } catch (error) {
            toast.error("Failed to load job details");
            navigate("/jobs");
          }
        };
        fetchJob();
      }
    }
  }, [jobId, jobs, navigate]);

  const handleApply = async (e) => {
    e.preventDefault();

    if (!user?.id || !job) {
      toast.error("You must be logged in to apply");
      return;
    }

    if (!coverLetter || !resume) {
      toast.error("Please provide both a cover letter and resume");
      return;
    }

    try {
      dispatch(applyForJobStart());

      const applicationData = {
        jobId: job.id,
        jobTitle: job.position,
        companyName: job.companyName,
        applicantId: user.id,
        applicantEmail: user.email,
        applicantName: user.email.split("@")[0],
        resume,
        coverLetter,
        status: "pending",
        created: new Date().toISOString(),
      };

      const result = await jobService.applyForJob(applicationData);
      dispatch(applyForJobSuccess(result));

      toast.success("Your job application has been submitted successfully");
      navigate("/my-applications");
    } catch (error) {
      dispatch(applyForJobFailure(error.message));
      toast.error(error.message || "Application failed");
    }
  };

  if (!job) {
    return (
      <AppLayout>
        <ToastContainer />
        <Box sx={{ px: 4, py: 8, textAlign: "center" }}>
          <Typography>Loading job details...</Typography>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ToastContainer />
      <Box sx={{ px: 2, py: 8 }}>
        <Box sx={{ maxWidth: 700, mx: "auto" }}>
          <Card>
            <CardHeader
              avatar={
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />
              }
              title={
                <Typography variant="h5" fontWeight="bold">
                  {job.position}
                </Typography>
              }
              subheader={
                <Typography color="text.secondary">
                  {job.companyName} • {job.location}
                </Typography>
              }
            />
            <CardContent>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Chip label={job.type} variant="outlined" />
                <Chip label={job.salary} color="secondary" />
              </Stack>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Description
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {job.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Requirements
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {job.requirements}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Contact
                </Typography>
                <Typography color="text.secondary">
                  {job.contactEmail}
                </Typography>
              </Box>

              <Box sx={{ pt: 2 }}>
                {!showApplyForm ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                    onClick={() => setShowApplyForm(true)}
                  >
                    Apply for this Position
                  </Button>
                ) : (
                  <Card sx={{ mt: 4 }}>
                    <CardHeader
                      title="Apply for this Position"
                      subheader="Please fill out the form to apply for this job"
                    />
                    <CardContent>
                      <form onSubmit={handleApply}>
                        <Stack spacing={3}>
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Resume URL *
                            </Typography>
                            <TextField
                              id="resume"
                              type="url"
                              placeholder="https://example.com/your-resume.pdf"
                              value={resume}
                              onChange={(e) => setResume(e.target.value)}
                              required
                              fullWidth
                              size="small"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Provide a link to your resume (PDF, Google Doc,
                              etc.)
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Cover Letter *
                            </Typography>
                            <TextField
                              id="coverLetter"
                              placeholder="Write your cover letter here..."
                              value={coverLetter}
                              onChange={(e) => setCoverLetter(e.target.value)}
                              required
                              fullWidth
                              multiline
                              minRows={6}
                              size="small"
                            />
                          </Box>
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                            pt={2}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                              disabled={loading}
                              startIcon={
                                loading ? <CircularProgress size={18} /> : null
                              }
                            >
                              {loading ? "Submitting..." : "Submit Application"}
                            </Button>
                            <Button
                              type="button"
                              variant="outlined"
                              fullWidth
                              onClick={() => setShowApplyForm(false)}
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </Stack>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </AppLayout>
  );
};

export default JobDetail;
