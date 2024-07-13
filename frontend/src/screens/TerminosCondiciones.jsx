import React from "react";
import { useNavigate } from "react-router-dom";

const TerminosCondiciones = () => {
  const navigate = useNavigate();
  return (
    <section>
      <div className="px-4 md:px-16 lg:px-32 xl:px-64 mt-28">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-light mb-3 text-indigo-600 hover:text-white hover:bg-blue-500 border-2 rounded-lg px-4"
        >
          Atras
        </button>
        <h1 className="flex justify-center mb-8 text-2xl font-semibold">
          Terminos y Condiciones
        </h1>
        <h2 className="text-lg mb-2">1. Introducción</h2>
        <p className="mb-2 text-justify">
          Estos Términos y Condiciones ("Términos", "Términos y Condiciones")
          regulan su relación con la applicacion web en la pagina
          wwww.virgiliocordon.com (el "Servicio") operado por Virtus Consulting
          S.A.
        </p>
        <p className="mb-3">
          Lea estos Términos y Condiciones detenidamente antes de usar nuestro
          servicio.
        </p>
        <h2 className="text-lg mb-2">2. Compras</h2>
        <p className="mb-3 text-justify">
          Si desea comprar cualquier producto disponible a través del Servicio
          ("Compra"), se le puede pedir que proporcione cierta información
          relevante para su Compra, incluyendo, sin limitación, su nombre,
          dirección de correo electrónico, pais, ciudad y detalles de pago.
        </p>
        <h2 className="text-lg mb-2">3. Contenido</h2>
        <p className="mb-3 text-justify">
          Todo el contenido disponible en nuestro sitio web, incluyendo texto,
          gráficos, logotipos, íconos de botones, imágenes, clips de audio,
          descargas digitales, compilaciones de datos y software, es propiedad
          de Virtus COnsulting S.A. o de sus proveedores de contenido y está
          protegido por las leyes de derechos de autor internacionales.
        </p>
        <h3 className="text-lg mb-2">4. Prohibiciones</h3>
        <p className="mb-3 text-justify">
          No debe usar el Servicio de ninguna manera que cause o pueda causar
          daños al Servicio o al acceso o disponibilidad del Servicio; o de
          cualquier manera que sea ilegal, fraudulenta o dañina.
        </p>
        <h3 className="text-lg mb-2">5. Limitación de Responsabilidad</h3>
        <p className="mb-3 text-justify">
          En ningún caso Virtus Consulting S.A., ni sus directores, empleados,
          socios, agentes, proveedores o afiliados, serán responsables por
          cualquier daño indirecto, incidental, especial, consecuente o
          punitivo, incluyendo, sin limitación, pérdida de beneficios, datos,
          uso, buena voluntad u otras pérdidas intangibles, resultantes de (i)
          su acceso o uso o incapacidad de acceder o usar el Servicio; (ii)
          cualquier conducta o contenido de cualquier tercero en el Servicio;
          (iii) cualquier contenido obtenido del Servicio; y (iv) acceso no
          autorizado, uso o alteración de sus transmisiones o contenido, ya sea
          que se base en garantía, contrato, agravio (incluida negligencia) o
          cualquier otra teoría legal, ya sea que se haya informado o no de la
          posibilidad de tales daños, e incluso si se ha demostrado que un
          remedio establecido en este documento ha fallado en su propósito
          esencial.
        </p>
        <h3 className="text-lg mb-2">6. Envios</h3>
        <p className="mb-3 text-justify">
          El cargo del envio viene incluido en la compra de los libros. Este
          envio sera realizado por Cargo Expreso y el tiempo de entrega sera de
          1 a 2 dias habiles para el sector metropolitano y de 1 a 3 dias
          habiles para los departamentos.
        </p>
        <h3 className="text-lg mb-2">6. Modificaciones</h3>
        <p className="text-justify">
          Nos reservamos el derecho, a nuestra sola discreción, de modificar o
          reemplazar estos Términos en cualquier momento. Si una revisión es
          material, intentaremos proporcionar un aviso con al menos 30 días de
          antelación antes de que entren en vigor los nuevos términos. Lo que
          constituye un cambio material será determinado a nuestra sola
          discreción.
        </p>
      </div>
      <div className="px-4 md:px-16 lg:px-32 xl:px-64 mt-12 mb-12">
        <h1 className="flex justify-center text-2xl font-semibold mb-3">
          Política de Privacidad
        </h1>
        <h2 className="text-lg mb-2">1. Informacion que Recopilamos</h2>
        <p className="mb-3 text-justify">
          Recopilamos varios tipos de información con el fin de proporcionar y
          mejorar nuestro Servicio para usted.
        </p>
        <h2 className="text-lg mb-2">2. Uso de Datos</h2>
        <p className="mb-3 text-justify">
          Virtus Consulting S.A. utiliza los datos recopilados para diversos
          fines:
        </p>
        <ul className="list-disc pl-5 mb-3 text-justify">
          <li>Para proporcionar y mantener nuestro Servicio</li>
          <li>Para notificarle sobre cambios en nuestro Servicio</li>
          <li>
            Para permitirle participar en funciones interactivas de nuestro
            Servicio cuando elija hacerlo
          </li>
          <li>Para proporcionar soporte al cliente</li>
          <li>
            Para recopilar análisis o información valiosa para que podamos
            mejorar nuestro Servicio
          </li>
          <li>Para monitorear el uso de nuestro Servicio</li>
          <li>Para detectar, prevenir y abordar problemas técnicos</li>
        </ul>
        <h2 className="text-lg mb-2">3. Transferencia de Datos</h2>
        <p className="mb-3 text-justify">
          Su información, incluidos los Datos Personales, puede transferirse a -
          y mantenerse en - computadoras ubicadas fuera de su estado, provincia,
          país u otra jurisdicción gubernamental donde las leyes de protección
          de datos pueden diferir de las de su jurisdicción.
        </p>
        <h2 className="text-lg mb-2">4. Seguridad de los Datos</h2>
        <p className="mb-3 text-justify">
          La seguridad de sus datos es importante para nosotros, pero recuerde
          que ningún método de transmisión por Internet, o método de
          almacenamiento electrónico es 100% seguro. Mientras nos esforzamos por
          utilizar medios comercialmente aceptables para proteger sus Datos
          Personales, no podemos garantizar su seguridad absoluta.
        </p>
        <h2 className="text-lg mb-2">
          5. Cambios en esta Política de Privacidad
        </h2>
        <p className="text-justify">
          Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le
          notificaremos cualquier cambio publicando la nueva Política de
          Privacidad en esta página. Se le aconseja revisar esta Política de
          Privacidad periódicamente para cualquier cambio. Los cambios a esta
          Política de Privacidad son efectivos cuando se publican en esta
          página.
        </p>
      </div>
    </section>
  );
};

export default TerminosCondiciones;
