import Navbar from "@/components/general/navbar";
import NavbarContentAuthentication from "@/components/authentication/navbar-content";
import Footer from "@/components/general/footer";

export default function Home() {
  return (
    <div>
      <Navbar>
        <NavbarContentAuthentication></NavbarContentAuthentication>
      </Navbar>
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center m-4">
          Welcome to your AI chatbot for mental health!
        </h1>
        <h2 className="text-lg font-bold text-gray-800 mt-10">Introduction</h2>
        <p className="text-gray-800">
          Our chatbot is designed to help you manage anxiety and stress, and
          improve your overall mental health. As a student, we understand that
          you may face many challenges that can affect your well-being. Our
          chatbot offers a range of functionalities to help you manage these
          challenges.
        </p>
        <h2 className="text-lg font-bold text-gray-800 mt-10">
          Functionalities
        </h2>
        <ul className="list-disc ml-5 text-gray-800">
          <li>
            Techniques of relaxation and mindfulness exercises to reduce anxiety
            during stressful moments.
          </li>
          <li>
            Tips to maintain a healthy balance between work and personal life to
            manage academic commitments and personal well-being.
          </li>
          <li>
            Suggestions for self-care routines and activities to incorporate
            into your daily routine to improve your mental health.
          </li>
          <li>
            Techniques to manage social anxiety in academic and social
            environments to help you interact more comfortably with peers and
            professors.
          </li>
          <li>
            Breathing exercises to help you stay calm during situations that
            trigger anxiety.
          </li>
          <li>
            Suggestions to improve the quality of your sleep, as adequate sleep
            is essential for managing anxiety.
          </li>
          <li>
            General questions to identify the stress points that affect you the
            most, to help you improve your case more efficiently.
          </li>
        </ul>
        <h2 className="text-lg font-bold text-gray-800 mt-10">How It Works</h2>
        <p className="text-gray-800">
          Our chatbot is based on artificial intelligence and uses
          evidence-based exercises and resources to help you manage anxiety and
          stress. Our chatbot is designed to mimic conversations with a real
          person and can guide you through how you are feeling, help you
          challenge negative thoughts, suggest tools and resources, and engage
          you in evidence-based therapy techniques, including mood tracking and
          mindfulness.
        </p>
        <h2 className="text-lg font-bold text-gray-800 mt-10">Our Approach</h2>
        <p className="text-gray-800">
          Our chatbot is designed to be a helpful addition to professional
          support services and is not a replacement for in-person therapy. Our
          chatbot is suited to help with moderate symptoms and can be an
          excellent addition to professional support services. We believe that
          everyone deserves access to mental health support, and our chatbot is
          designed to provide support and advice to anyone who needs it.
        </p>
        <h2 className="text-lg font-bold text-gray-800 mt-10">References</h2>
        <p className="text-gray-800">
          Artificial Intelligence-Based Chatbot for Anxiety and Depression in
          University Students: Pilot Randomized Controlled Trial - JMIR
          Formative Research
        </p>
        <p className="text-gray-800">Wysa - Everyday Mental Health</p>
        <p className="text-gray-800">
          Fighting loneliness and anxiety: Can a chatbot provide additional
          support for your patients?
        </p>
        <p className="text-gray-800">
          Using AI chatbots to provide self-help depression interventions for
          university students: A randomized trial of effectiveness - PMC - NCBI
        </p>
      </div>
      <div className="m-4"></div>
      <Footer></Footer>
    </div>
  );
}
