import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../users/models/User.js';
import ProjectCard from '../projectCards/models/Card.js';
import JobPosting from '../jobs/models/JobPosting.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: join(__dirname, '..', '.env') });

// Use your actual database name with capital P
// CHANGE THIS to test seeding without affecting your main database
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/PortfolYou_Test';

// Sample data
const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('Abc123!@#$', 10);

  const users = [
    // Admin user
    // {
    //   name: { first: 'Admin', middle: '', last: 'User' },
    //   email: 'admin@portfolyou.com',
    //   phone: '0501234567',
    //   password: hashedPassword,
    //   userType: 'admin',
    //   isAdmin: true,
    //   image: { 
    //     url: 'https://i.pravatar.cc/300?img=1', 
    //     alt: 'admin profile' 
    //   },
    //   profession: 'System Administrator',
    //   bio: 'Platform administrator managing PortfolYou.',
    //   location: { city: 'Tel Aviv', country: 'Israel' },
    // },

    // Regular developers
    {
      name: { first: 'Sarah', middle: '', last: 'Cohen' },
      email: 'sarah.cohen@example.com',
      phone: '0502345678',
      password: hashedPassword,
      userType: 'regular',
      profession: 'Full Stack Developer',
      bio: 'Passionate about React and Node.js. Building modern web applications.',
      location: { city: 'Tel Aviv', country: 'Israel' },
      image: { 
        url: 'https://i.pravatar.cc/300?img=5', 
        alt: 'sarah profile' 
      },
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      experience: 3,
      availability: true,
    },
    {
      name: { first: 'David', middle: '', last: 'Levi' },
      email: 'david.levi@example.com',
      phone: '0503456789',
      password: hashedPassword,
      userType: 'regular',
      profession: 'Frontend Developer',
      bio: 'UI/UX enthusiast specializing in React and modern CSS.',
      location: { city: 'Haifa', country: 'Israel' },
      image: { 
        url: 'https://i.pravatar.cc/300?img=12', 
        alt: 'david profile' 
      },
      skills: ['React', 'CSS', 'JavaScript', 'Figma'],
      experience: 2,
      availability: true,
    },
    {
      name: { first: 'Maya', middle: '', last: 'Goldstein' },
      email: 'maya.gold@example.com',
      phone: '0504567890',
      password: hashedPassword,
      userType: 'regular',
      profession: 'Backend Developer',
      bio: 'Python and Node.js expert. Love building scalable APIs.',
      location: { city: 'Jerusalem', country: 'Israel' },
      image: { 
        url: 'https://i.pravatar.cc/300?img=9', 
        alt: 'maya profile' 
      },
      skills: ['Python', 'Node.js', 'PostgreSQL', 'Docker'],
      experience: 4,
      availability: false,
    },
    {
      name: { first: 'Yoni', middle: '', last: 'Peretz' },
      email: 'yoni.p@example.com',
      phone: '0505678901',
      password: hashedPassword,
      userType: 'regular',
      profession: 'Mobile Developer',
      bio: 'React Native developer creating cross-platform mobile apps.',
      location: { city: 'Beer Sheva', country: 'Israel' },
      image: { 
        url: 'https://i.pravatar.cc/300?img=13', 
        alt: 'yoni profile' 
      },
      skills: ['React Native', 'JavaScript', 'iOS', 'Android'],
      experience: 3,
      availability: true,
    },

    // Recruiters
    {
      name: { first: 'Rachel', middle: '', last: 'Katz' },
      email: 'rachel@techcorp.com',
      phone: '0506789012',
      password: hashedPassword,
      userType: 'recruiter',
      image: { 
        url: 'https://i.pravatar.cc/300?img=10', 
        alt: 'rachel profile' 
      },
      recruiterInfo: {
        companyName: 'TechCorp Israel',
        companyDescription: 'Leading technology company specializing in cloud solutions and enterprise software.',
        companyLogo: 'https://via.placeholder.com/150?text=TechCorp',
        industry: 'Technology',
        companySize: '201-500',
        companyWebsite: 'https://techcorp-example.com',
        jobTitle: 'Senior Tech Recruiter',
        yearsExperience: 5,
        specializations: ['Software Engineering', 'Cloud Computing', 'DevOps'],
        linkedInProfile: 'https://linkedin.com/in/rachel-katz',
      },
    },
    {
      name: { first: 'Michael', middle: '', last: 'Rosenberg' },
      email: 'michael@startupventures.com',
      phone: '0507890123',
      password: hashedPassword,
      userType: 'recruiter',
      image: { 
        url: 'https://i.pravatar.cc/300?img=11', 
        alt: 'michael profile' 
      },
      recruiterInfo: {
        companyName: 'Startup Ventures',
        companyDescription: 'Fast-growing startup building innovative fintech solutions.',
        companyLogo: 'https://via.placeholder.com/150?text=Startup',
        industry: 'Fintech',
        companySize: '11-50',
        companyWebsite: 'https://startupventures-example.com',
        jobTitle: 'Head of Talent Acquisition',
        yearsExperience: 7,
        specializations: ['Full Stack Development', 'Product Engineering'],
        linkedInProfile: 'https://linkedin.com/in/michael-rosenberg',
      },
    },
  ];

  return await User.insertMany(users);
};

const seedProjectCards = async (users) => {
  const developers = users.filter(u => u.userType === 'regular');

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React frontend and Node.js backend. Features include user authentication, product catalog, shopping cart, and payment integration.',
      image: {
        url: 'https://picsum.photos/seed/ecommerce/800/600',
        alt: 'e-commerce platform screenshot',
      },
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Full Stack',
      liveUrl: 'https://example-ecommerce.com',
      githubUrl: 'https://github.com/example/ecommerce',
      user_id: developers[0]._id,
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates. Built with React and Firebase.',
      image: {
        url: 'https://picsum.photos/seed/taskapp/800/600',
        alt: 'task management app screenshot',
      },
      technologies: ['React', 'Firebase', 'Material-UI'],
      category: 'Frontend',
      liveUrl: 'https://example-tasks.com',
      githubUrl: 'https://github.com/example/tasks',
      user_id: developers[1]._id,
      featured: false,
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with data visualization and location-based forecasts.',
      image: {
        url: 'https://picsum.photos/seed/weather/800/600',
        alt: 'weather dashboard screenshot',
      },
      technologies: ['React', 'Chart.js', 'OpenWeather API'],
      category: 'Frontend',
      liveUrl: 'https://example-weather.com',
      githubUrl: 'https://github.com/example/weather',
      user_id: developers[1]._id,
      featured: true,
    },
    {
      title: 'RESTful API Service',
      description: 'Scalable REST API built with Express and PostgreSQL. Includes authentication, rate limiting, and comprehensive documentation.',
      image: {
        url: 'https://picsum.photos/seed/api/800/600',
        alt: 'api documentation screenshot',
      },
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'Swagger'],
      category: 'Backend',
      liveUrl: 'https://api-example.com/docs',
      githubUrl: 'https://github.com/example/api',
      user_id: developers[2]._id,
      featured: false,
    },
    {
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform mobile app for tracking workouts and nutrition. Built with React Native.',
      image: {
        url: 'https://picsum.photos/seed/fitness/800/600',
        alt: 'fitness tracker app screenshot',
      },
      technologies: ['React Native', 'Redux', 'SQLite'],
      category: 'Mobile',
      liveUrl: '',
      githubUrl: 'https://github.com/example/fitness-tracker',
      user_id: developers[3]._id,
      featured: true,
    },
    {
      title: 'Social Media Clone',
      description: 'Instagram-like social media platform with image uploads, likes, comments, and user profiles.',
      image: {
        url: 'https://picsum.photos/seed/social/800/600',
        alt: 'social media app screenshot',
      },
      technologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
      category: 'Full Stack',
      liveUrl: 'https://example-social.com',
      githubUrl: 'https://github.com/example/social',
      user_id: developers[0]._id,
      featured: false,
    },
  ];

  return await ProjectCard.insertMany(projects);
};

const seedJobPostings = async (users) => {
  const recruiters = users.filter(u => u.userType === 'recruiter');

  const jobs = [
    {
      title: 'Senior Full Stack Developer',
      description: 'We are seeking an experienced Full Stack Developer to join our growing team. You will work on cutting-edge cloud solutions and enterprise applications.',
      requirements: [
        '5+ years experience with React and Node.js',
        'Strong understanding of REST APIs and microservices',
        'Experience with cloud platforms (AWS/Azure)',
        'Excellent problem-solving skills',
      ],
      responsibilities: [
        'Design and develop scalable web applications',
        'Collaborate with cross-functional teams',
        'Mentor junior developers',
        'Participate in code reviews and architecture decisions',
      ],
      techStack: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      experienceLevel: 'Senior',
      location: 'Tel Aviv',
      locationType: 'Hybrid',
      salaryRange: {
        min: 25000,
        max: 35000,
        currency: 'ILS',
      },
      employmentType: 'Full-time',
      postedBy: recruiters[0]._id,
      companyName: recruiters[0].recruiterInfo.companyName,
      applicationUrl: 'https://techcorp-example.com/careers/senior-fullstack',
      isActive: true,
      views: 45,
    },
    {
      title: 'Frontend Developer',
      description: 'Join our fintech startup and help build the next generation of financial tools. Looking for a creative frontend developer passionate about user experience.',
      requirements: [
        '3+ years experience with React',
        'Strong CSS and responsive design skills',
        'Experience with state management (Redux/Context)',
        'Portfolio of previous work',
      ],
      responsibilities: [
        'Build beautiful and intuitive user interfaces',
        'Implement responsive designs',
        'Optimize application performance',
        'Work closely with design team',
      ],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
      experienceLevel: 'Mid',
      location: 'Tel Aviv',
      locationType: 'Remote',
      salaryRange: {
        min: 18000,
        max: 25000,
        currency: 'ILS',
      },
      employmentType: 'Full-time',
      postedBy: recruiters[1]._id,
      companyName: recruiters[1].recruiterInfo.companyName,
      applicationUrl: 'https://startupventures-example.com/apply/frontend',
      isActive: true,
      views: 32,
    },
    {
      title: 'DevOps Engineer',
      description: 'Looking for a DevOps engineer to help scale our infrastructure and improve our deployment processes.',
      requirements: [
        '4+ years DevOps experience',
        'Strong knowledge of AWS or Azure',
        'Experience with CI/CD pipelines',
        'Infrastructure as Code (Terraform/CloudFormation)',
      ],
      responsibilities: [
        'Maintain and improve cloud infrastructure',
        'Automate deployment processes',
        'Monitor system performance',
        'Ensure security best practices',
      ],
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      experienceLevel: 'Senior',
      location: 'Haifa',
      locationType: 'On-site',
      salaryRange: {
        min: 28000,
        max: 38000,
        currency: 'ILS',
      },
      employmentType: 'Full-time',
      postedBy: recruiters[0]._id,
      companyName: recruiters[0].recruiterInfo.companyName,
      applicationUrl: 'https://techcorp-example.com/careers/devops',
      isActive: true,
      views: 28,
    },
    {
      title: 'Junior React Developer',
      description: 'Great opportunity for a junior developer to grow their skills in a supportive startup environment.',
      requirements: [
        '1+ year experience with React',
        'Basic understanding of JavaScript and ES6+',
        'Eager to learn and grow',
        'Good communication skills',
      ],
      responsibilities: [
        'Develop new features under mentorship',
        'Fix bugs and improve code quality',
        'Participate in daily standups',
        'Learn best practices from senior developers',
      ],
      techStack: ['React', 'JavaScript', 'CSS', 'Git'],
      experienceLevel: 'Junior',
      location: 'Tel Aviv',
      locationType: 'Hybrid',
      salaryRange: {
        min: 12000,
        max: 16000,
        currency: 'ILS',
      },
      employmentType: 'Full-time',
      postedBy: recruiters[1]._id,
      companyName: recruiters[1].recruiterInfo.companyName,
      applicationUrl: 'https://startupventures-example.com/apply/junior-react',
      isActive: true,
      views: 67,
    },
  ];

  return await JobPosting.insertMany(jobs);
};

const seedFollowers = async (users) => {
  const developers = users.filter(u => u.userType === 'regular');
  const recruiters = users.filter(u => u.userType === 'recruiter');

  // Sarah follows David and Maya
  await User.findByIdAndUpdate(developers[0]._id, {
    $push: { following: { $each: [developers[1]._id, developers[2]._id] } }
  });
  await User.findByIdAndUpdate(developers[1]._id, {
    $push: { followers: developers[0]._id }
  });
  await User.findByIdAndUpdate(developers[2]._id, {
    $push: { followers: developers[0]._id }
  });

  // David follows Sarah
  await User.findByIdAndUpdate(developers[1]._id, {
    $push: { following: developers[0]._id }
  });
  await User.findByIdAndUpdate(developers[0]._id, {
    $push: { followers: developers[1]._id }
  });

  // Recruiters follow multiple developers
  await User.findByIdAndUpdate(recruiters[0]._id, {
    $push: { following: { $each: [developers[0]._id, developers[1]._id, developers[2]._id] } }
  });
  for (let i = 0; i < 3; i++) {
    await User.findByIdAndUpdate(developers[i]._id, {
      $push: { followers: recruiters[0]._id }
    });
  }

  console.log('✅ Follow relationships created');
};

// Main seed function
const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('📦 Connected to MongoDB');

    // ============================================
    // SAFETY CHECK: Prevent accidental data loss
    // ============================================
    const userCount = await User.countDocuments();
    const projectCount = await ProjectCard.countDocuments();
    const jobCount = await JobPosting.countDocuments();
    
    if (userCount > 0 || projectCount > 0 || jobCount > 0) {
      console.log('\n⚠️  ⚠️  ⚠️  WARNING: Database already has data! ⚠️  ⚠️  ⚠️\n');
      console.log(`Found:`);
      console.log(`  - ${userCount} users`);
      console.log(`  - ${projectCount} project cards`);
      console.log(`  - ${jobCount} job postings`);
      console.log('\n🛡️  Your data is SAFE - script stopped to prevent deletion.\n');
      console.log('To delete all data and reseed:');
      console.log('  1. Open seedData.js');
      console.log('  2. Comment out the safety check (lines 432-450)');
      console.log('  3. Run npm run seed again\n');
      
      await mongoose.connection.close();
      process.exit(0);
    }
    // ============================================

    console.log('✅ Database is empty. Safe to create fresh data...\n');

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await ProjectCard.deleteMany({});
    await JobPosting.deleteMany({});

    console.log('👥 Creating users...');
    const users = await seedUsers();
    console.log(`✅ Created ${users.length} users`);

    console.log('🎨 Creating project cards...');
    const projects = await seedProjectCards(users);
    console.log(`✅ Created ${projects.length} project cards`);

    console.log('💼 Creating job postings...');
    const jobs = await seedJobPostings(users);
    console.log(`✅ Created ${jobs.length} job postings`);

    console.log('🔗 Creating follow relationships...');
    await seedFollowers(users);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:     admin@portfolyou.com');
    console.log('Developer: sarah.cohen@example.com');
    console.log('Developer: david.levi@example.com');
    console.log('Recruiter: rachel@techcorp.com');
    console.log('\n🔑 All passwords: Abc123!@#$');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();