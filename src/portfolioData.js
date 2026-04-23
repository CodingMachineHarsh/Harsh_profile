export const profile = {
  name: "Harsh Raj",
  role: "Software Engineer",
  tagline: "Building modern products with scalable engineering and thoughtful design.",
  location: "Bengaluru, India",
  email: "kumar.harshraj9@gmail.com",
  phone: "+91 9097463192",
  education:
    "Bachelor of Technology in Electronics and Communication Engineering - Birla Institute of Technology, Mesra, Ranchi (2021 - 2025)",
  about:
    "I am a Software Engineer with hands-on experience in data-driven automation, frontend systems, and production-grade reporting pipelines. I enjoy combining strong engineering practices with clean UI to create reliable and user-friendly products.",
  links: {
    github: "https://github.com/coderharsh09",
    linkedin: "https://www.linkedin.com/in/harsh-raj-620166224/",
    fasWebsite: "https://fasmesra.vercel.app/",
    bitZone: "https://github.com/coderharsh09/BIT-zone-app",
    pomodoro: "https://coderharsh09.github.io/Pomodoro_website/",
    amazonClone: "https://coderharsh09.github.io/Amazon_clone/",
  },
};

export const experience = [
  {
    company: "Reach Mobile",
    role: "Software Engineer 1",
    duration: "Feb 2025 - Present",
    location: "Bengaluru",
    sections: [
      {
        title: "MCO Project",
        techStack: ["Node.js", "TypeScript"],
        highlights: [
          "Engineered and deployed a monthly cost optimization algorithm (MCO) with business and marketing stakeholders, enabling the organization to save $100K+ per month and surpass $700K in total savings to date.",
          "Led the successful transition of data reporting teams by providing technical expertise and working closely with business stakeholders and revenue assurance teams to ensure accurate revenue recognition and optimized reporting workflows.",
          "Delivered accurate and timely reports through automated processes, enabling clients to streamline and accelerate their daily and monthly accounting closures.",
        ],
      },
      {
        title: "Reporting Framework",
        techStack: ["Python PySpark", "React.js", "Storybook", "Node.js", "AWS Lambda"],
        highlights: [
          "Designed and created a unified MVNO reporting framework to migrate reports from legacy AWS Lambda architecture to Databricks for scalable and maintainable processing.",
          "Built a custom reporting framework from the ground up using AWS Lambda and Node.js, enabling data pipelines and enhancing accuracy and accessibility of business reports.",
          "Deployed reporting solutions for multiple MVNO brands with zero client-side changes, while reducing code duplication and improving bug-fix turnaround.",
        ],
      },
    ],
  },
  {
    company: "Reach Mobile",
    role: "Software Engineer Intern",
    duration: "May 2024 - Jul 2024",
    location: "Bengaluru",
    techStack: ["React.js", "Storybook", "TypeScript"],
    highlights: [
      "Designed and implemented a custom UI design system using React, SCSS, Styled Components, and Storybook.",
      "Built and standardized 140+ reusable components to accelerate feature development and improve UI consistency.",
      "Independently maintained a production website with focus on accessibility and responsive design.",
    ],
  },
];

export const oldExperience = [
  {
    company: "IET, BIT Mesra",
    role: "Design Head",
    duration: "Sep 2022 - Apr 2024",
    location: "Ranchi",
    highlights: [
      "Collaborated with event teams to produce strong visual communication for technical and cultural events.",
      "Mentored junior designers and improved execution quality across club deliverables.",
      "Created event campaigns that increased participation and audience engagement.",
    ],
  },
  {
    company: "IEEE, BIT Mesra",
    role: "Mentor",
    duration: "Sep 2022 - Apr 2024",
    location: "Ranchi",
    highlights: ["Guided students in competitive programming and DSA problem-solving sessions."],
  },
  {
    company: "FAS, BIT Mesra",
    role: "Web Master",
    duration: "Jul 2023 - Jul 2024",
    location: "Ranchi",
    highlights: [
      "Rebuilt and managed the FAS club website and visual identity across web and social platforms.",
      "Maintained a user-focused interface and consistent branding for club digital presence.",
    ],
  },
];

export const projects = [
  {
    title: "AI Attendance System (Face Recognition)",
    stack: ["Python", "Flask", "CNN"],
    description:
      "Built an attendance solution using convolutional neural networks, reaching 95.56% accuracy in pilot runs.",
  },
  {
    title: "BIT ZONE - College Utility Mobile App",
    stack: ["Java", "XML", "Android Studio"],
    description:
      "Contributed to student utility app workflows for internships, academics, assignments, and grade tracking.",
    linkKey: "bitZone",
  },
  {
    title: "Frontend Projects Collection",
    stack: ["React.js", "HTML", "CSS", "JavaScript"],
    description:
      "Built and deployed frontend projects including Club Website, Pomodoro Website, and Amazon Clone.",
    links: [
      { label: "Club Website", url: "https://fasmesra.vercel.app/" },
      { label: "Pomodoro Website", url: "https://coderharsh09.github.io/Pomodoro_website/" },
      { label: "Amazon Clone", url: "https://coderharsh09.github.io/Amazon_clone/" },
    ],
  },
];

export const skills = {
  engineering: ["React.js", "Python PySpark", "Node.js"],
  languages: ["C++", "Python", "JavaScript", "TypeScript", "HTML5", "CSS"],
  tools: ["Git", "MySQL", "MongoDB", "DynamoDB", "AWS", "Databricks"],
};

export const achievements = [];
