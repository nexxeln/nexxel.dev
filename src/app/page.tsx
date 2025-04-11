import { Link } from "next-view-transitions";
import { getBlogPosts } from "~~/blog";
import { NewsletterForm } from "~~/app/blog/newsletter-form";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import IconSocial from "../components/iconSocial";

function UpRightArrowIcon() {
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
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

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

          <p className="mt-3">{item.position}</p>

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
      position: "Estudiante de análisis y desarrollo de software (ADSO) (Julio 2022 - Marzo 2025)",
      description: "Aprendizaje sobre ciclo de vida del desarrollo de software (SDLC), Lenguaje Unificado de Modelado (UML), modelado, diseño y desarrollo de bases de datos relacionales con SQL y desarrollo de software en general.",
      toolkit: ""
    },
    {
      name: "Digital Process ↗",
      link: "https://www.digitalprocess.co/",
      position: "Practicante en Desarrollo de Software (Septiembre 2024 - Marzo 2025)",
      description: "Diseño, implementación y soporte de software monolítico, incluyendo desarrollo de nuevas funcionalidades, corrección de errores (bugfixing) y despliegue en infraestructura de producción.",
      toolkit: "HTML, CSS, NodeJS, Javascript, NoSQL (MongoDB), Git, Github Actions, Linux (Ubuntu), Nginx, etc."
    }

  ] satisfies ExperienceItem[];

  // ⤤ ↗ ⬏

  const projectItems = [
    {
      name: "Ferresys Saas ↗",
      link: "https://www.github.com/davidadarme/ferresys",
      position: "DBA, Frontend y Backend",
      description: "API RESTful diseñada para registrar y rastrear productos, gestionar compras y ventas, y manejar clientes.",
      toolkit: ""
      },
    {
      name: "Serverless Auth (NoSQL/SQL) ↗",
      link: "https://gitlab.com/davidadarme/serverless-auth",
      position: "Backend, DevOps", 
      description: "Autenticación serverless que permite elegir entre bases de datos SQL o NoSQL, con infraestructura automatizada en AWS y Terraform",
      toolkit: "AWS (Lambda, RDS/DynamoDB, API Gateway, Cognito), Javascript, MongoDB, PostgreSQL, Terraform, Github Actions."
    },
    {
      name: "envVault ↗",
      link: "",
      position: "DBA, Backend, DevOps",
      description:"Gestionar secretos y variables de entorno en la nube, proporcionando un acceso seguro y escalable a través de una API",
      toolkit: "Arquitectura Hexagonal, Javascript, NodeJS, GraphQL, Podman, Redis, Terraform, Kubernetes, Prometheus + Grafana"
    },
    {
      name: "all projects →",
      link: "https://github.com/linustorvaldss",
      position: "",
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
          <p className="inline-flex">Desarrollador de Software</p>
        </div>
      </div>

      <h3 className="mb-6 mt-12 text-xl font-medium">Conéctate conmigo</h3>
      <ul className="font-sm flex flex-col space-x-0 space-y-3 text-neutral-600 md:flex-row md:space-x-6 md:space-y-0 dark:text-neutral-300">
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
            href="mailto:timdavidarm@pm.me"
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
            href="https://drive.google.com/file/d/1n-KCN-yyDwK-fpbVosCsi61S3EVS5216/view?usp=sharing"
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
      </ul>

      <div className="mt-12 flex flex-col gap-6">
      <p className="prose prose-neutral max-w-3xl mb-10 dark:prose-invert">
        Soy un aspirante a Software Engineer (SWE) y DevOps con un enfoque en el desarrollo back-end, infraestructura y automatización de procesos. Tengo un fuerte interés en la tecnologia, especialmente en áreas como arquitectura de bases de datos relacionales y no relacionales (DBA), arquitectura-desarrollo de sistemas back-end y DevOps. Actualmente, estoy en un proceso de aprendizaje autodidacta para fortalecer mis conocimientos en IT y avanzar hacia una carrera en ingeniería de software.
      
      
        En mi tiempo libre, así como hobbies creativos me gusta coleccionar y armar Legos y Hot Wheels. También me apasionan las motos-autos deportivos, los gatos (Mi sueño algún día es montar una fundación para gatitos y animales), la música y el cine.
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
        <ExperienceSection title="Estudios" items={studyItems} />
        <ExperienceSection title="Proyectos" items={projectItems} />
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
          <p className="font-medium">Suscríbete para recibir nuevos posts.</p>
          <NewsletterForm />
          <SpeedInsights />
          <Analytics />
          <IconSocial />
        </div>
      </div>
    </main>
  );
}

