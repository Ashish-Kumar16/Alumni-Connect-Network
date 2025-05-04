import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  fetchOffersStart,
  fetchOffersSuccess,
  fetchOffersFailure,
} from "../store/slices/mentorshipSlice";
import * as mentorshipService from "../services/mentorshipService";
import AppLayout from "../components/layout/AppLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

const Mentors = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { offers, loading } = useAppSelector((state) => state.mentorship);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchOffersStart());
      try {
        const offersData = await mentorshipService.fetchMentorshipOffers();
        dispatch(fetchOffersSuccess(offersData));
      } catch (error) {
        dispatch(fetchOffersFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  const filteredMentors = offers.filter(
    (offer) =>
      offer.mentorName.toLowerCase().includes(search.toLowerCase()) ||
      offer.title.toLowerCase().includes(search.toLowerCase()) ||
      offer.areas.some((area) =>
        area.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  return (
    <AppLayout>
      <Box sx={{ maxWidth: 900, mx: "auto", px: 2, py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight="bold">
            Find a Mentor
          </Typography>
          <Typography color="text.secondary">
            Connect with experienced alumni for guidance and support
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            type="text"
            label="Search mentors, titles, or areas of expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
          />
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }}>Loading mentors...</Typography>
          </Box>
        ) : filteredMentors.length > 0 ? (
          <Stack spacing={4}>
            {filteredMentors.map((offer) => (
              <Card key={offer.id}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={offer.mentorAvatar}
                      sx={{
                        bgcolor: "primary.light",
                        color: "primary.main",
                        fontWeight: 700,
                        width: 56,
                        height: 56,
                        mr: 2,
                      }}
                    >
                      {offer.mentorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                  }
                  title={
                    <Typography variant="h6" fontWeight="bold">
                      {offer.title}
                    </Typography>
                  }
                  subheader={
                    <Typography color="text.secondary">
                      {offer.mentorName}
                    </Typography>
                  }
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {offer.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Areas of Expertise
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                    >
                      {offer.areas.map((area, idx) => (
                        <Chip
                          key={idx}
                          label={area}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Availability
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.availability}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Duration
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {offer.duration}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2, fontWeight: 600 }}
                    onClick={() => navigate(`/mentors/${offer.id}`)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Card>
            <CardContent sx={{ p: 8, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                No mentors found matching your search
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Try adjusting your search criteria to find a mentor who fits
                your needs.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </AppLayout>
  );
};

export default Mentors;
