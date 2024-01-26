export default function Help() {
  return (
    <div className="h-screen">
      <span className="h-full"></span>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Q&A</h2>
        <dl>
          <div className="mb-4">
            <dt className="font-bold">Q: What is Lorem Ipsum?</dt>
            <dd className="ml-4">
              A: Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </dd>
          </div>
          <div className="mb-4">
            <dt className="font-bold">Q: Where does it come from?</dt>
            <dd className="ml-4">
              A: Contrary to popular belief, Lorem Ipsum is not simply random
              text.
            </dd>
          </div>
          <div className="mb-4">
            <dt className="font-bold">Q: Why do we use it?</dt>
            <dd className="ml-4">
              A: It is a long established fact that a reader will be distracted
              by the readable content of a page when looking at its layout.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
