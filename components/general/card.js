export default function Card({ props, children }) {
  return (
    <div className="max-w-xs rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg w-full object-cover"
        src={props.image}
        alt=""
      />
      <div className="p-2">
        <h5 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">
          {props.title}
        </h5>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">
          {props.description}
        </p>
        {children}
      </div>
    </div>
  );
}
