import { Link } from "react-router-dom";
import { cursos } from "../cursos";
import "../styles/cursos.css";

const Servicios = () => {
  return (
    <>
      <section className="online px-8 md:px-64 mb-32 mt-32">
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold">CONOCE NUESTROS</h3>
          <h1 className="text-2xl font-semibold mb-10">
            PROGRAMAS Y SERVICIOS
          </h1>
          <div className="content grid grid-cols-1 md:grid-cols-2 gap-8">
            {cursos.map((val, index) => (
              <a
                href={`#${val.anchor}`}
                className="box shadow-md rounded-lg bg-[#f2f2f2] px-6 py-8"
                key={val.id || index}
              >
                <div className="img">
                  <img src={val.cover} alt={val.courseName} />
                </div>
                <h2 className="font-semibold">{val.courseName}</h2>
                <div className="mt-6">
                  <span className="px-4 py-2 mt-2 bg-[#f8f8f8] rounded-xl font-medium text-lg hover:text-[#0511f2]">
                    {val.course}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section
        id="desarrollo-talento-humano"
        className="service-section px-8 md:px-64"
      >
        <div className="border border-solid rounded-lg shadow-md p-8 bg-[#f2f2f2]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Programa de Desarrollo del Talento Humano
          </h2>
          <p className="text-justify font-medium text-lg mb-2">
            El propósito del Coaching en Gestión del Talento de VIRTUS
            INSTITUTE™, es lograr que las empresas maximicen su potencial
            partiendo de las personas, porque es el capital humano el que le
            agrega valor a las tecnologías, equipo, certificaciones, sistemas o
            procesos.
          </p>
          <p className="text-justify font-medium text-lg mb-2">
            Nuestro enfoque permite mostrarle al individuo el potencial que
            tiene para tomar el timón de su vida, sin importar las
            circunstancias que le rodean, reconociendo que tiene el poder,
            creatividad y libertad de tomar decisiones para crecer y mejorar su
            bienestar y desarrollo profesional.
          </p>
          <p className="text-justify font-medium text-lg mb-2">
            Nuestra metodología no se basa en un programa motivacional, ya que
            esto únicamente desarrolla estímulos externos y temporales. Nuestro
            enfoque ofrece cambios permanentes en la persona a través de
            modificaciones de pensamiento consciente y subconsciente.
          </p>
          <p className="text-justify font-medium text-lg mb-3">
            Con el Coaching en Gestión del Talento de VIRTUS INSTITUTE™, las
            empresas pueden multiplicar sus resultados al impulsar en su capital
            humano:
          </p>
          <ul className="text-left font-medium text-lg mb-3 list-disc px-6">
            <li>Autoconocimiento personal</li>
            <li>Desarrollo de sus talentos</li>
            <li>Romper con paradigmas que se han formado en su vida</li>
            <li>
              Descubrir que tienen el poder, libertad y control de sus vidas
            </li>
            <li>Permitir que se planteen propósitos claros en sus vidas</li>
            <li>Desarrollar trabajo en equipo y armonía</li>
            <li>Desarrollar mentes abiertas y flexibles</li>
            <li>
              Desarrollar sentido de compromiso y responsabilidad sobre sus
              acciones
            </li>
            <li>
              Entender que poseen la capacidad natural de soñar, crear y lograr
            </li>
            <li>
              Generar la pasión por una vida plena y exitosa, tanto a nivel
              personal como profesional
            </li>
          </ul>
          <p className="text-justify font-medium text-lg">
            Nuestros programas unen teorías modernas de psicología cognoscitiva,
            gerencia, ciencia y teorías de aprendizaje, llevando a sus
            organizaciones a niveles de excelencia sin importar si son
            comunidades, organizaciones lucrativas, políticas o civiles, entre
            otros.
          </p>
          <a href="#top" className="block text-center mt-4 text-xl font-medium">
            ↑ Volver al inicio
          </a>
        </div>
      </section>
      <section
        id="desarrollo-gerencial"
        className="service-section px-8 md:px-64 mt-16"
      >
        <div className="border border-solid rounded-lg shadow-md p-8 bg-[#f2f2f2]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Programas de Desarrollo Gerencial
          </h2>
          <p className="text-justify font-medium text-lg mb-3">
            Hemos desarrollado talleres y seminarios basados en las escuelas más
            prestigiosas del mundo para ofrecerle experiencias en donde
            combinamos la teoría gerencial con la práctica. Entre los temas que
            ofrecemos están:
          </p>
          <ul className="text-left font-medium text-lg mb-3 list-disc px-6">
            <li>Coaching personal y ejecutivo</li>
            <li>Desarrollo de habilidades de liderazgo</li>
            <li>Desarrollo de equipos de alto rendimiento</li>
            <li>Desarrollo de procesos de habilidades suaves</li>
            <li>
              Desarrollo de habilidades de negociación, persuasión y mediación
            </li>
            <li>
              Desarrollo de habilidades para gerencia de proyectos y
              productividad
            </li>
            <li>Desarrollo de habilidades para presentaciones efectivas</li>
          </ul>
          <a href="#top" className="block text-center mt-4 text-xl font-medium">
            ↑ Volver al inicio
          </a>
        </div>
      </section>
      <section
        id="desarrollo-organizacional"
        className="service-section px-8 md:px-64 mt-16"
      >
        <div className="border border-solid rounded-lg shadow-md p-8 bg-[#f2f2f2]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Programa de Desarrollo Organizacional
          </h2>
          <p className="text-justify font-medium text-lg mb-3">
            Acompañado del desarrollo del talento humano, se diseñan sistemas
            organizacionales que vayan acorde a la misión de la organización, ya
            que creemos firmemente que cada empresa tiene características que
            las hacen únicas. En el programa de VIRTUS INSTITUTE™, se incluyen
            aspectos como:
          </p>
          <ul className="text-left font-medium text-lg mb-3 list-disc px-6">
            <li>Desarrollo de estrategia corporativa, funcional y táctica</li>
            <li>Comunicación interna y externa</li>
            <li>Gestión del cambio</li>
            <li>
              Desarrollo de estrategias comerciales e investigación de mercados
            </li>
            <li>Desarrollo de modelos organizacionales</li>
            <li>Desarrollo de Indicadores de gestión</li>
            <li>Procesos de sucesión</li>
            <li>
              Desarrollo de planes de Relaciones Públicas y manejo de crisis
            </li>
          </ul>
          <a href="#top" className="block text-center mt-4 text-xl font-medium">
            ↑ Volver al inicio
          </a>
        </div>
      </section>
      <section
        id="coaching-personal"
        className="service-section px-8 md:px-64 mt-16 mb-16"
      >
        <div className="border border-solid rounded-lg shadow-md p-8 bg-[#f2f2f2]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Servicios de Coaching Personal
          </h2>
          <p className="text-justify font-medium text-lg mb-3">
            Sin importar si Usted necesita aumentar su compromiso para alcanzar
            lo que desea en la vida, desea mejorar su relación de pareja o está
            en búsqueda de un propósito, Usted obtendrá las herramientas para
            alcanzarlo a través de sus sesiones individuales. El Dr. Cordón ha
            estudiado con los mejores Coachees del mundo y su metodología ha
            demostrado ser exitosa en cientos de personas, ya que obtienen
            resultados tangibles en las áreas que desean.
          </p>
          <a href="#top" className="block text-center mt-4 text-xl font-medium">
            ↑ Volver al inicio
          </a>
        </div>
      </section>
      <section className="mb-16 px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            ¿Desea más información sobre nuestros programas y servicios?
          </h2>
          <p className="text-lg font-medium">
            Contáctenos para brindarle mayor información y cotización:
          </p>
          <a
            href="mailto:info@virtusinstitue.com"
            className="block text-xl font-medium mt-4"
          >
            info@virtusinstitue.com
          </a>
        </div>
      </section>
      <div className="mt-2 px-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-10">
        <button className="bg-third hover:bg-[#0511f2] py-2 px-4 rounded-md text-white text-xl">
          <Link to="/">Regresar</Link>
        </button>
      </div>
    </>
  );
};

export default Servicios;
