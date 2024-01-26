import Greeting from "@/components/general/greeting";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

export default function FAQs() {
  return (
    <div>
      <Greeting
        title={"Preguntas Frecuentes!"}
        text={"Acá podrás ver todas las dudas mas comunes sobre Calmbot."}
      ></Greeting>
      <Accordion allowToggle className="mr-10 space-y-8">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                ¿Como funciona Camlbot?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Calmbot es un chatbot que simula a una persona en una conversacion humana y para
            utilizarlo solo tienes que conversar con el. Conforme vayas conversando con el 
            Calmbot va aprendiendo sobre ti y tu situación y te va recomenando y ayudando 
            de la mejor manera que vea posible para que manejes de mejor manera tu ansiedad y estrés.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                ¿Qués preguntas le puedo hacer a Calmbot?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Le puedes hacer una gran variedad de preguntas, puedes preguntrarle sobre como mejorar
            tu situación actual en la universidad, como lidiar con el estrés y la ansiedad, como
            balancear mejor tu vida universitaria y personal, entre otros. Y además Calmbot te
            permite tener una conversación casual para poder tener a alguien quien contarle
            tu persona y todo esto también ayudará a Calmbot a en un futuro brindarte una atención
            aún mas especializada
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
              ¿Es este servicio confidencial? ¿Cómo se manejan mis datos?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Sí, la confidencialidad es una prioridad. Tus conversaciones son completamente 
          privadas y no compartimos tu información con terceros. Todos los datos se manejan 
          de acuerdo con las leyes de privacidad aplicables.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
              ¿Calmbot puede proporcionar consejos personalizados para mi situación?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Calmbot utiliza información proporcionada por ti para ofrecer consejos personalizados. 
          Sin embargo, ten en cuenta que no reemplaza la asesoría individualizada de un profesional.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
              ¿Calmbot reemplaza la asesoría profesional o médica?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          No, Calmbot no reemplaza la asesoría profesional o médica. Si experimentas problemas 
          graves, te recomendamos buscar la ayuda de profesionales capacitados.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
              ¿Calmbot ofrece actividades o ejercicios prácticos para reducir el estrés?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
          Sí, Calmbot proporciona una variedad de actividades y ejercicios prácticos diseñados para 
          ayudarte a reducir el estrés. Estos pueden incluir técnicas de respiración, ejercicios de relajación, 
          actividades de atención plena y sugerencias para incorporar pausas activas en tu rutina diaria. 
          Estamos aquí para brindarte herramientas prácticas que puedes utilizar para mejorar tu bienestar emocional.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
