export default function Card({ props, children }) {
  return (
    <div className="max-w-xs rounded-lg shadow-md border border-gray-200">
      <img
        className="rounded-t-lg w-full object-cover"
        src={props.image}
        alt=""
      />
      <div className="p-2">
        <h5 className="text-lg font-bold mb-1">{props.title}</h5>
        <p className="text-sm mb-2">{props.description}</p>
        {children}
      </div>
    </div>
  );
}
