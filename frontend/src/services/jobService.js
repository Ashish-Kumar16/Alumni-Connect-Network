import { v4 as uuid } from "uuid";
import { mockJobs, mockJobTypes, mockJobApplications } from "./mockData";

// Fetch all jobs
export const fetchJobs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockJobs]);
    }, 500);
  });
};

// Fetch jobs posted by a specific user
export const fetchMyJobs = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const jobs = mockJobs.filter((job) => job.postedBy === userId);
      resolve(jobs);
    }, 500);
  });
};

// Fetch a single job by ID
export const fetchJobById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = mockJobs.find((job) => job.id === id);
      resolve(job);
    }, 500);
  });
};

// Create a new job
export const createJob = async (jobData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newJob = {
        id: uuid(),
        ...jobData,
        applications: 0,
      };
      mockJobs.push(newJob);
      resolve(newJob);
    }, 500);
  });
};

// Fetch all job types
export const fetchJobTypes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockJobTypes]);
    }, 500);
  });
};

// Fetch all job applications
export const fetchJobApplications = async (jobId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applications = jobId
        ? mockJobApplications.filter((app) => app.jobId === jobId)
        : [...mockJobApplications];
      resolve(applications);
    }, 500);
  });
};

// Fetch job applications for a specific user
export const fetchMyJobApplications = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applications = mockJobApplications.filter(
        (app) => app.applicantId === userId,
      );
      resolve(applications);
    }, 500);
  });
};

// Post a new job
export const postJob = async (jobData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const requirementsArray =
        typeof jobData.requirements === "string"
          ? jobData.requirements.split(",").map((req) => req.trim())
          : jobData.requirements;

      const newJob = {
        id: uuid(),
        ...jobData,
        requirements: requirementsArray,
        postedDate: new Date().toISOString(),
        applications: 0,
      };
      mockJobs.push(newJob);
      resolve(newJob);
    }, 500);
  });
};

// Apply for a job
export const applyForJob = async (applicationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newApplication = {
        id: uuid(),
        ...applicationData,
        status: applicationData.status || "pending",
        created: new Date().toISOString(),
      };
      mockJobApplications.push(newApplication);

      // Increment the applications count for the job
      const job = mockJobs.find((job) => job.id === applicationData.jobId);
      if (job) {
        job.applications = (job.applications || 0) + 1;
      }

      resolve(newApplication);
    }, 500);
  });
};
