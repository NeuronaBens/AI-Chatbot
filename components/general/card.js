export default function Card({ props, children }) {
  return (
    <div className="max-w-xs rounded-sm bg-[#DFDFDF] bg-opacity-25 shadow-md border">
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
