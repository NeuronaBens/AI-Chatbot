export default function Contact() {
  return (
    <div className="w-full md:w-screen-md mx-auto p-12">
      <div className="p-6 border border-gray-300 sm:rounded-md">
        <section className="mb-6">
          <h2 className="text-lg font-medium mb-2">
            Ask us anything about Calmbot
          </h2>
          <p className="text-gray-700">
            If you have any questions or feedback about Calmbot, we'd love to
            hear from you. Fill out the form below and we'll get back to you as
            soon as possible.
          </p>
        </section>
        <form method="POST" action="https://example.com">
          <label className="block mb-6">
            <span className="text-gray-700">Your name</span>
            <input
              type="text"
              name="name"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Joe Bloggs"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Email address</span>
            <input
              name="email"
              type="email"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="joe.bloggs@example.com"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Message</span>
            <textarea
              name="message"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="4"
              placeholder="Enter your message here"
            ></textarea>
          </label>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
