export default function HomePage() {

  return (
<main className="text-left">

  {/* <img
    alt="Memories"
    className="w-full h-auto rounded-lg shadow-lg"
    src="https://antiamoebic.com/assets/img/2018-1-3-blade-runner/memories1.jpg"
  /> */}

  {/* <br></br> */}

  <img
    alt="Memories"
    className="w-full h-auto rounded-lg shadow-lg"
    src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Alexandre_Cabanel_-_Fallen_Angel.jpg"
  />

  <div className="mt-4 flex flex-col gap-6">
  
    <p className="prose prose-neutral max-w-3xl dark:prose-invert">
      i consider myself a person who likes to learn new things but also feel sometimes lost. i am passionate about software development, DevOps, cloud infrastructure, databases, software architecture, and automation. i'd like to explore and learn more about some topics focused in backend, infra, devops and database. 
    </p>

  <p className="prose prose-neutral max-w-3xl dark:prose-invert">
      out of the software box, i like build legos, collect hot wheels, listen music and watch movies and play with my cats (i'd like to fund an animals foundation someday). as a extreme sport i like cars and motorcycles especiall a bmw sr1000rr and a ducati panigale v4s. i like arms and guns, but i don't have any. i like to learn new languages, especially english, german and swedish
      
  </p>

  <h3 className="prose prose-neutral text-xl max-w-3xl dark:prose-invert">
     things i like:
  </h3>
      
  <p className="prose prose-neutral max-w-3xl dark:prose-invert">
    favorite artists: avicii, lil peep, juice wrld, daft punk, cigarretes after sex, hans zimmers, ludwig göransson, swedish house mafia, blessd
  </p>

  <p className="prose prose-neutral max-w-3xl dark:prose-invert">
    favorite places to live someday: medellin, edinburgh, stockholm, berlin, amsterdam, zurich, prague, bruges
  </p>

  
  <p className="prose prose-neutral max-w-3xl mb-5 dark:prose-invert">
    movie i enjoy to watch: blade runner 2049, tron, fight club, joker, tenet, john wick, star wars, seven,  watchmen, No Country for older men, There Will Be Blood, drive
  </p>

  {/* <p className="prose prose-neutral max-w-3xl dark:prose-invert">
      industrias de intereses: 
      fintech
      Banca
      Software factory
      PropTech
      Fintech
      AgriTech
      ClimateTech / GreenTech
      Computación en la Nube
      Consultoría Tecnológica
      Crypto
      CyberTech
      Desarrollo de Software
      E-commerce
      EdTech
      FoodTech
      GovTech
      HealthTech
      InsurTech
      IT y Servicios de Consultoría
      LegalTech
      MarTech
      RetailTech
      SEO & SEM
      SupplyTech
      AgTech
  </p> */}

  </div>

  {/* <div className="mt-4 flex flex-col gap-6"> */}
  <div>
    <p className="prose prose-neutral max-w-3xl dark:prose-invert">my favorite album is avicii's true</p>
    <iframe
      src="https://open.spotify.com/embed/album/2H6i2CrWgXE1HookLu8Au0?utm_source=generator&theme=0"
      width="100%"
      height="152"
      frameBorder="0"
      allowFullScreen={true}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </div>

</main>
  );
}

