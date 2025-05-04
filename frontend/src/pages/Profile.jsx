import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
} from "../store/slices/userSlice";
import * as userService from "../services/userService";
import AppLayout from "../components/layout/AppLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { profile, loading, error } = useAppSelector((state) => state.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        dispatch(fetchProfileStart());
        try {
          const profileData = await userService.fetchProfile(user.id);
          dispatch(fetchProfileSuccess(profileData));
          setFirstName(profileData.firstName);
          setLastName(profileData.lastName);
          setEmail(profileData.email);
          setAvatar(profileData.avatar);
          setBio(profileData.bio);
          setLocation(profileData.location);
          setSkills(profileData.skills.join(", "));
        } catch (error) {
          dispatch(fetchProfileFailure(error.message));
          toast.error(error.message || "Failed to load profile");
        }
      }
    };

    fetchData();
  }, [dispatch, user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !bio || !location || !skills) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      dispatch(updateProfileStart());

      const education = profile?.education || [];
      const experience = profile?.experience || [];
      const mentorshipAvailable = profile?.mentorshipAvailable || false;

      const profileData = {
        id: user.id,
        firstName,
        lastName,
        email,
        avatar,
        bio,
        location,
        skills: skills.split(",").map((skill) => skill.trim()),
        role: user.role,
        education,
        experience,
        mentorshipAvailable,
      };

      await userService.updateProfile(profileData);
      dispatch(updateProfileSuccess(profileData));

      toast.success("Your profile has been updated successfully.");
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <AppLayout>
      <ToastContainer />
      <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 8 }}>
        <Card>
          <CardHeader
            title={
              <Typography variant="h5" fontWeight="bold">
                Your Profile
              </Typography>
            }
            subheader={
              <Typography color="text.secondary">
                Update your profile information
              </Typography>
            }
          />
          <CardContent>
            {loading ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading profile...</Typography>
              </Box>
            ) : error ? (
              <Typography color="error" align="center" sx={{ py: 4 }}>
                Error: {error}
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <Avatar
                      src={avatar}
                      sx={{
                        width: 64,
                        height: 64,
                        bgcolor: "primary.light",
                        color: "primary.main",
                        fontWeight: 700,
                        fontSize: 32,
                      }}
                    >
                      {firstName && lastName
                        ? `${firstName[0]}${lastName[0]}`
                        : user.email?.[0]?.toUpperCase() || "?"}
                    </Avatar>
                    <TextField
                      id="avatar"
                      label="Avatar URL"
                      type="url"
                      placeholder="Enter avatar URL"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      fullWidth
                    />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      id="firstName"
                      label="First Name"
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      fullWidth
                    />
                    <TextField
                      id="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      fullWidth
                    />
                  </Stack>
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    disabled
                  />
                  <TextField
                    id="bio"
                    label="Bio"
                    placeholder="Enter bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                    fullWidth
                    multiline
                    minRows={3}
                  />
                  <TextField
                    id="location"
                    label="Location"
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    fullWidth
                  />
                  <TextField
                    id="skills"
                    label="Skills"
                    type="text"
                    placeholder="Enter skills (comma-separated)"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ fontWeight: 600, py: 1.5 }}
                  >
                    Update Profile
                  </Button>
                </Stack>
              </form>
            )}
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default Profile;
