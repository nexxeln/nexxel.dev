import { Link } from "next-view-transitions";
import { getBlogPosts } from "~~/blog";
import { NewsletterForm } from "~~/app/blog/newsletter-form";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import IconSocial from "~~/components/iconSocial";
import { env } from "~~/env";
import { Turnstile } from "next-turnstile";

// function UpRightArrowIcon() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="h-5 w-5"
//     >
//       <path d="M7 7h10v10" />
//       <path d="M7 17 17 7" />
//     </svg>
//   );
// }

function WorkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a18.15 18.15 0 0 1-20 0" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

type ExperienceItem = {
  name: string;
  link: string;
  position: string;
  date: string;
  description: string;
  toolkit: string;

};

function ExperienceSection({
  title,
  items,
}: {
  title: string;
  items: ExperienceItem[];
}) {
  return (
    <section className="text-left">
      <h3 className="mb-8 text-xl font-medium">{title}</h3>

      {items.map((item, index) => (
        <div key={index} className="mb-8">
          <a
            href={item.link}
            target="_blank"
            className="font-medium underline decoration-neutral-400 decoration-[0.1em] underline-offset-2 dark:decoration-neutral-600"
          >
            {item.name}
          </a>

          {/* <div className="flex items-center gap-2 mt-3"> */}
          <p>{item.position}</p>
          <p className="flex text-neutral-700 dark:text-neutral-400 text-xs gap-2 mt-1">
            {item.date}
          </p>

          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            {item.description}
          </p>

          <p className="mt-3" style={{ color: '#6d6d6d' }}>{item.toolkit}</p>
        </div>
      ))}
    </section>
  );
}

export default function HomePage() {
  const studyItems = [
    {
      name: "SENA ↗",
      link: "https://www.sena.edu.co/es-co/Paginas/default.aspx",
      position: "Software Analysis and Development Technician",
      date: "Jul. 2022 - Mar. 2025",
      description: "Learning about software development life cycle, UML, data modeling, relational database (SQL) design and development, and software development in general.",
      toolkit: ""
    },
    {
      name: "Digital Process ↗",
      link: "https://www.digitalprocess.co/",
      position: "Software Developer Intern",
      date: "Sept. 2024 - Mar. 2025",
      description: "Built and maintained RESTful APIs with Node.js and JavaScript. Maintain NoSQL databases with MongoDB. Deployed applications using Docker and Nginx on Linux servers. Optimized existing applications and fixed bugs across environments. Provided technical support during integration and product delivery.",
      toolkit: "NodeJS, JavaScript, MongoDB, Git, Docker, Nginx, EJS, React, Linux"
    },
    {
      name: "Digital Process ↗",
      link: "https://www.digitalprocess.co/",
      position: "Software Developer (Backend)",
      date: "Mar. 2024 - Present",
      description: "Design RESTful APIs using Node.js with TypeScript/JavaScript. Document and automate API workflows with Postman. Implement and optimize MongoDB databases. Support integration using Docker and Podman.",
      toolkit: "NodeJS, TypeScript, JavaScript, MongoDB, Git, Docker, Podman, Postman"
    }

  ] satisfies ExperienceItem[];

  // ⤤ ↗ ⬏

  const projectItems = [
    {
      name: "Ferresys Saas ↗",
      link: "https://www.github.com/davidadarme/ferresys",
      position: "DBA and Deployment",
      date: "Oct. 2023 - Apr. 2024 (Sena graduation project)",
      description: "API RESTful designed to register, manage and track products, purchases, sales and customers.",
      toolkit: ""
      },
    {
      name: "Serverless Auth (NoSQL/SQL) ↗",
      link: "https://gitlab.com/davidadarme/serverless-auth",
      position: "Backend, DevOps", 
      date: "In progress",
      description: "Serverless authentication with choice of SQL or NoSQL databases, with automated AWS and Terraform infrastructure.",
      toolkit: "AWS (Lambda, RDS/DynamoDB, API Gateway, Cognito), Python, MongoDB, PostgreSQL, Terraform, Act, Jenkins."
    },
    {
      name: "envVault ↗",
      link: "",
      position: "DBA, Backend, DevOps",
      date: "In progress",
      description:"Cloud-based secrets and environment variables management platform. It allows you to store, manage, and retrieve sensitive information securely.",
      toolkit: "Hexagonal Architecture, Multi-tenant, Go, Redis, PostgreSQL,Terraform, K8S, Prometheus + Grafana, OAuth 2.0, AWS (Secrets Manager, RDS, EC2)"
    },
    {
      name: "all projects →",
      link: "https://github.com/linustorvaldss",
      position: "",
      date: "",
      description: "",
      toolkit: ""
    },
  ] satisfies ExperienceItem[];

  const posts = getBlogPosts()
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    )
    .slice(0, 4);

  return (
    <main className="text-left">
      <h1 className="mb-6 text-2xl font-medium tracking-tighter">
        David Adarme
      </h1>

      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
          <LocationIcon />
          <p>Colombia - Bucaramanga, Santander </p>
        </div>

        

        <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
          <WorkIcon />
          <p className="inline-flex">Software Developer</p>
        </div>
      </div>

      {/* <h3 className="mb-6 mt-1 text-xl font-medium">Connect with me</h3> */}
      <IconSocial />
      {/* <ul className="font-sm flex flex-col space-x-0 space-y-3 text-neutral-600 md:flex-row md:space-x-6 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/linustorvaldss"
          >
            <p className="mr-2 h-7">Github</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://gitlab.com/davidadarme"
          >
            <p className="mr-2 h-7">Gitlab</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/davidadarme/"
          >
            <p className="mr-2 h-7">Linkedin</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:developer@davidadarme.com"
          >
            <p className="mr-2 h-7">email</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://drive.google.com/file/d/1ebdSF6p3sn-CePOUq4VQ3fJKsJR9ASKU/view"
          >
            <p className="mr-2 h-7">cv</p>
            <UpRightArrowIcon />
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="http://davidadarme.guayahack.co/"
          >
            <p className="mr-2 h-7">guayahack.co</p>
            <UpRightArrowIcon />
          </a>
        </li>
      </ul> */}

      {/* ADD LATER */}
      {/* <script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></script>
      <div className="badge-base LI-profile-badge" data-locale="es_ES" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="davidadarme" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://co.linkedin.com/in/davidadarme?trk=profile-badge">David Adarme</a></div> */}
              

      <div className="mt-4 flex flex-col gap-6">
      <p className="prose prose-neutral max-w-3xl mb-10 dark:prose-invert">
        Passionate about software development, DevOps, cloud infrastructure, databases, software architecture, and automation. I am currently seeking hands-on experience to grow my skills and maturity as a backend developer. I am especially eager to learn more about microservices, frameworks, best practices, and building scalable systems. I have experience as Software Developer (Backend mostly) working on monolithic applications using Node.Js, Javascript, Typescript, Express with SQL and NoSQL databases in both the medical and financial domains. In the future, I aim to transition into a DevOps-focused role where I can contribute to building and maintaining reliable, automated, and efficient infrastructure.
      </p>
{/* 
        <div>
          <iframe
            src="https://open.spotify.com/embed/album/2H6i2CrWgXE1HookLu8Au0?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div> */}
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <ExperienceSection title="Experience" items={studyItems} />
        <ExperienceSection title="Projects" items={projectItems} />
        {/* <ExperienceSection title="experience" items={experienceItems} /> */}
      </div>

      <h3 className="mb-8 text-xl font-medium">Blog</h3>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="">
            <div className="flex w-full justify-between">
              <p className="font-medium underline decoration-neutral-400 decoration-[0.1em] underline-offset-2 dark:decoration-neutral-600">
                {post.metadata.title}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {new Date(post.metadata.date)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  // .toLowerCase()
                }
              </p>
            </div>
          </Link>
        ))}

        <Link
          href="/blog"
          className="decoration-neutral-4000 mt-4 font-medium underline decoration-[0.1em] underline-offset-2 dark:decoration-neutral-600"
        >
          All posts →
        </Link>
        <div className="space-y-6">
          <p className="font-medium">Subscribe to receive new posts.</p>
          <NewsletterForm />
          <SpeedInsights />
          <Analytics />
          
        </div>
      </div>
    </main>
  );
}

