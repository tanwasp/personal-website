/* eslint-disable react/no-unescaped-entities */
import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Tanish",
  lastName: "Pradhan Wong Ah Sui",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/profile_pic.png",
  email: "tanishwas@gmail.com",
  location: "San Francisco, California", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <></>,
};

const social = [
  // as
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/tanwasp",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/tanish-pradhan-wong-ah-sui",
  },
  // {
  //   name: "Threads",
  //   icon: "threads",
  //   link: "https://www.threads.com/@once_ui",
  // },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Tanish Pradhan Wong Ah Sui</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">LunchBox</strong>
      </>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm currently interning at Uber and studying Computer Science and Physics
      at Vassar College.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hey! I'm a rising senior at Vassar College, double majoring in Computer
        Science and Physics with a double minor in Economics and Applied
        Mathematics.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Uber",
        timeframe: "June 2025 - Present",
        role: "Software Engineering Intern",
        achievements: [
          <>
            Building an MCP (Model Context Protocol) server powering semantic
            and contextual trace analysis for Jaeger, enabling LLM-driven
            debugging over 10 billion+ of daily spans with sub-200 ms query
            latency.
          </>,
          <>
            Developing an upstream service failure detection system covering
            99.9% of service endpoints.
          </>,
          <>
            Engineered a real-time span leak mitigation system, reducing trace
            noise by 40% in observability pipelines.
          </>,
        ],
        images: [],
      },
      {
        company: "LunchBox",
        timeframe: "Sep 2024 - Present",
        role: "Founder",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple
            platforms, improving design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line,
            contributing to a 15% increase in overall company revenue.
          </>,
        ],
        images: [],
      },
      {
        company: "Google Research & Brown University",
        timeframe: "January 2025 - May 2025",
        role: "Research Assistant",
        achievements: [
          <>
            Trained and fine-tuned the Stable Diffusion v1.5 generative model to
            synthesize novel 3D object representations, training on over 51,000
            geometry images derived from the ShapeNet dataset with a T4 GPU.
          </>,
          <>
            Developed scalable pipelines to convert diverse 3D mesh .obj files
            with 10,000+ vertices each into high-quality geometry images for
            deep learning, including automated UV mapping generation and
            optimization.
          </>,
        ],
        images: [],
      },
      {
        company: "Uber",
        timeframe: "June 2024 - August 2024",
        role: "Software Engineering Intern",
        achievements: [
          <>
            Engineered and integrated an end-to-end distributed tracing
            synthetic traffic generation and querying system in Golang, with
            real-time monitoring and validation for over 200 K Jaeger-agent
            instances.
          </>,
          <>
            Developed a CLI tool for request payload capture, and status checks,
            improving developer productivity and interaction with the jaeger
            tracing system by 70%.
          </>,
          <>
            Automated the staging agent validation process using Kubernetes and
            CI/CD pipelines and implemented a monitoring dashboard, providing
            metrics for Jaeger-agent health and performance.
          </>,
        ],
        images: [],
      },
      {
        company: "American Energy Society",
        timeframe: "May 2023 - August 2023",
        role: "Software Engineering Intern",
        achievements: [
          <>
            Implemented a robust data modeling pipeline, streamlining the
            formatting and integration of diverse datasets.
          </>,
          <>
            Designed and built unsupervised machine learning models, such as
            clustering algorithms, to enhance data visualization, leading to a
            15% increase in user retention.
          </>,
          <>
            Developed interactive and intuitive energy maps interfaces using
            JavaScript and React.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Vassar College",
        description: (
          <>
            Bachelor of Arts - Double Major in Computer Science and Physics
            <br />
            GPA: 3.97/4.00
          </>
        ),
      },
      {
        name: "UWC Mahindra College",
        description: (
          <>
            International Baccalaureate Diploma
            <br />
            HL - Mathematics AA, Physics, Economics
            <br />
            SL - English, Spanish ab, Chemistry
          </>
        ),
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
