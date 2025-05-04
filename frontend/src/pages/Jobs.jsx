import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
} from "../store/slices/jobSlice";
import * as jobService from "../services/jobService";
import AppLayout from "../components/layout/AppLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";

const JOB_TYPES = [
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

const Jobs = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { jobs, loading, error } = useAppSelector((state) => state.job);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchJobsStart());
      try {
        const jobsData = await jobService.fetchJobs();
        dispatch(fetchJobsSuccess(jobsData));
      } catch (error) {
        dispatch(fetchJobsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredJobs = jobs.filter((job) => {
    const searchMatch =
      job.position.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase());
    const typeMatch = filterType === "all" || job.type === filterType;
    return searchMatch && typeMatch;
  });

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 6 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight="bold">
            Job Postings
          </Typography>
          <Typography color="text.secondary">
            Explore opportunities from our alumni network
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
            mb: 6,
            alignItems: "center",
          }}
        >
          <TextField
            type="text"
            label="Search by job title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            select
            label="Filter by Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          >
            {JOB_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading jobs...</Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6" fontWeight="bold">
                        {job.position}
                      </Typography>
                    }
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {job.companyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.location}
                    </Typography>
                    <Box sx={{ mt: 1, mb: 2 }}>
                      <Chip
                        label={job.type}
                        color="secondary"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {job.salary && (
                        <Chip label={job.salary} color="primary" size="small" />
                      )}
                    </Box>
                    <Button
                      variant="text"
                      onClick={() => navigate(`/jobs/${job.id}`)}
                      sx={{ px: 0, color: "primary.main", fontWeight: 600 }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box sx={{ textAlign: "center", py: 8, gridColumn: "1/-1" }}>
                <Typography>No jobs found matching your criteria.</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </AppLayout>
  );
};

export default Jobs;
