// Mock users for authentication
export const authUsers = [
  {
    id: "user1",
    email: "john.doe@alumni.edu",
    password: "password123",
    role: "alumni",
  },
  {
    id: "user2",
    email: "emily.chen@student.edu",
    password: "password123",
    role: "student",
  },
  {
    id: "user3",
    email: "michael.smith@alumni.edu",
    password: "password123",
    role: "alumni",
  },
];

// Mock user profiles
export const userProfiles = [
  {
    id: "user1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@alumni.edu",
    role: "alumni",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Software Engineer with 10 years of experience in building scalable web applications. Graduated in 2012 and have been working in the tech industry since then.",
    location: "San Francisco, CA",
    skills: ["JavaScript", "React", "Node.js", "AWS", "System Design"],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2008-09-01",
        endDate: "2012-06-01",
      },
    ],
    experience: [
      {
        company: "Tech Innovations Inc",
        position: "Senior Software Engineer",
        description:
          "Leading the frontend development team and implementing new features for our main product.",
        startDate: "2018-04-01",
        endDate: null,
        current: true,
      },
      {
        company: "WebSolutions Co",
        position: "Software Developer",
        description:
          "Worked on various client projects using React and Node.js.",
        startDate: "2012-07-01",
        endDate: "2018-03-01",
        current: false,
      },
    ],
    graduationYear: 2012,
    company: "Tech Innovations Inc",
    position: "Senior Software Engineer",
    mentorshipAvailable: true,
  },
  {
    id: "user2",
    firstName: "Emily",
    lastName: "Chen",
    email: "emily.chen@student.edu",
    role: "student",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Final year Computer Science student with a passion for machine learning and artificial intelligence.",
    location: "Boston, MA",
    skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
    education: [
      {
        institution: "Massachusetts Institute of Technology",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2020-09-01",
        endDate: "2024-06-01",
      },
    ],
    experience: [
      {
        company: "AI Research Lab",
        position: "Research Assistant",
        description:
          "Working on computer vision projects and implementing machine learning models.",
        startDate: "2022-06-01",
        endDate: null,
        current: true,
      },
    ],
    graduationYear: 2024,
    interests: ["Artificial Intelligence", "Computer Vision", "Startups"],
    mentorshipAvailable: false,
  },
  {
    id: "user3",
    firstName: "Michael",
    lastName: "Smith",
    email: "michael.smith@alumni.edu",
    role: "alumni",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Product Manager with background in software development. Passionate about building user-centered products.",
    location: "New York, NY",
    skills: ["Product Management", "Agile", "UX Design", "JavaScript", "Ruby"],
    education: [
      {
        institution: "Stanford University",
        degree: "Master of Business Administration",
        fieldOfStudy: "Business Administration",
        startDate: "2014-09-01",
        endDate: "2016-06-01",
      },
      {
        institution: "Stanford University",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        startDate: "2010-09-01",
        endDate: "2014-06-01",
      },
    ],
    experience: [
      {
        company: "Product Innovators",
        position: "Senior Product Manager",
        description:
          "Leading product development for enterprise SaaS platform.",
        startDate: "2019-01-01",
        endDate: null,
        current: true,
      },
      {
        company: "TechStart",
        position: "Product Manager",
        description:
          "Managed the development of mobile applications for various clients.",
        startDate: "2016-07-01",
        endDate: "2018-12-01",
        current: false,
      },
      {
        company: "CodeCrafters",
        position: "Software Developer",
        description:
          "Full-stack development using Ruby on Rails and JavaScript.",
        startDate: "2014-07-01",
        endDate: "2016-06-01",
        current: false,
      },
    ],
    graduationYear: 2016,
    company: "Product Innovators",
    position: "Senior Product Manager",
    mentorshipAvailable: true,
  },
];

// Mock mentorship offers
export const mockMentorshipOffers = [
  {
    id: "offer1",
    mentorId: "user1",
    mentorName: "John Doe",
    mentorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Career Guidance in Software Engineering",
    description:
      "I can help students navigate their career in software engineering, from interview preparation to career advancement strategies.",
    areas: ["Career Development", "Software Engineering", "Job Search"],
    duration: "3 months",
    availability: "Weekends, 2-3 hours per week",
    created: "2023-12-15",
  },
  {
    id: "offer2",
    mentorId: "user3",
    mentorName: "Michael Smith",
    mentorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    title: "Product Management Mentorship",
    description:
      "Learn how to transition from engineering to product management, and develop key skills needed to succeed in this role.",
    areas: ["Product Management", "Leadership", "Career Transition"],
    duration: "Flexible",
    availability: "Weekdays evenings, 1-2 hours per week",
    created: "2023-11-28",
  },
  {
    id: "offer3",
    mentorId: "user3",
    mentorName: "Michael Smith",
    mentorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    title: "Entrepreneurship and Startups",
    description:
      "Guidance for students interested in launching their own startup or joining early-stage companies. Will cover fundraising, MVP development, and go-to-market strategies.",
    areas: ["Entrepreneurship", "Startups", "Business Strategy"],
    duration: "6 months",
    availability: "Flexible schedule, by appointment",
    created: "2024-01-10",
  },
];

// Mock mentorship requests
export const mockMentorshipRequests = [
  {
    id: "request1",
    offerId: "offer1",
    studentId: "user2",
    studentName: "Emily Chen",
    studentAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    mentorId: "user1",
    mentorName: "John Doe",
    message:
      "I am very interested in your mentorship program as I will be graduating soon and would love guidance on starting my career in software engineering.",
    status: "pending",
    created: "2024-02-05",
  },
];

// Mock job postings
export const mockJobs = [
  {
    id: "job1",
    companyName: "Tech Innovations Inc",
    companyLogo: "https://placehold.co/200x200?text=TII",
    position: "Frontend Developer",
    location: "San Francisco, CA (Remote Possible)",
    description:
      "We are looking for a skilled Frontend Developer to join our team and help build our next-generation web application. The ideal candidate will have experience with React, TypeScript, and responsive design.",
    requirements: [
      "2+ years of React experience",
      "Strong TypeScript skills",
      "CSS/SASS proficiency",
      "Experience with REST APIs",
    ],
    type: "full-time",
    salary: "$90,000 - $120,000",
    contactEmail: "jobs@techinnovations.example",
    postedBy: "user1",
    postedByName: "John Doe",
    created: "2024-01-15",
    applications: 0,
  },
  {
    id: "job2",
    companyName: "Product Innovators",
    companyLogo: "https://placehold.co/200x200?text=PI",
    position: "Product Manager",
    location: "New York, NY",
    description:
      "Join our growing product team to help shape and deliver our enterprise SaaS platform. We're looking for a product manager with technical background who can bridge the gap between business needs and technical implementation.",
    requirements: [
      "3+ years of product management experience",
      "Technical background",
      "Experience with Agile methodologies",
      "Strong communication skills",
    ],
    type: "full-time",
    salary: "$110,000 - $140,000",
    contactEmail: "careers@productinnovators.example",
    postedBy: "user3",
    postedByName: "Michael Smith",
    created: "2024-01-20",
    applications: 0,
  },
  {
    id: "job3",
    companyName: "AI Research Lab",
    companyLogo: "https://placehold.co/200x200?text=AI",
    position: "Machine Learning Intern",
    location: "Boston, MA (On-site)",
    description:
      "Summer internship opportunity for students interested in machine learning and AI. You will work alongside researchers to implement and test models for computer vision applications.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong Python skills",
      "Knowledge of machine learning basics",
      "Experience with TensorFlow or PyTorch is a plus",
    ],
    type: "internship",
    salary: "$30/hour",
    contactEmail: "internships@airesearchlab.example",
    postedBy: "user2",
    postedByName: "Emily Chen",
    created: "2024-02-10",
    applications: 0,
  },
  {
    id: "job4",
    companyName: "Tech Innovations Inc",
    companyLogo: "https://placehold.co/200x200?text=TII",
    position: "Backend Engineer",
    location: "Remote",
    description:
      "We're expanding our engineering team and looking for an experienced Backend Developer to work on our cloud-based infrastructure and APIs. This is a remote-first position with flexible working hours.",
    requirements: [
      "4+ years of backend development experience",
      "Node.js and Express",
      "Experience with cloud services (AWS or Azure)",
      "Database design and optimization",
    ],
    type: "full-time",
    salary: "$100,000 - $130,000",
    contactEmail: "jobs@techinnovations.example",
    postedBy: "user1",
    postedByName: "John Doe",
    created: "2024-01-28",
    applications: 0,
  },
];

// Mock job types
export const mockJobTypes = [
  "full-time",
  "part-time",
  "contract",
  "internship",
];

// Mock job applications
export const mockJobApplications = [
  {
    id: "application1",
    jobId: "job3",
    jobTitle: "Machine Learning Intern",
    companyName: "AI Research Lab",
    applicantId: "user2",
    applicantName: "Emily Chen",
    applicantEmail: "emily.chen@student.edu",
    resume: "https://example.com/resumes/emily-chen.pdf",
    coverLetter:
      "I am writing to apply for the Machine Learning Intern position at AI Research Lab. As a final year Computer Science student with a focus on machine learning, I believe I would be a great fit for this role. I have experience with Python and have implemented several machine learning models using TensorFlow for my university projects.",
    status: "pending",
    created: "2024-02-12",
  },
  {
    id: "application2",
    jobId: "job1",
    jobTitle: "Frontend Developer",
    companyName: "Tech Innovations Inc",
    applicantId: "user2",
    applicantName: "Emily Chen",
    applicantEmail: "emily.chen@student.edu",
    resume: "https://example.com/resumes/emily-chen.pdf",
    coverLetter:
      "I am excited to apply for the Frontend Developer position at Tech Innovations Inc. While my background is primarily in machine learning, I have also developed strong frontend skills through various projects. I have worked with React and TypeScript to build responsive web applications and am eager to bring my technical abilities to your team.",
    status: "reviewed",
    created: "2024-01-18",
  },
];

// For backward compatibility
export const users = authUsers;
export const jobs = mockJobs;
export const applications = mockJobApplications;
