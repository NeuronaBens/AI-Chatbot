import Image from "next/image";

const Logo = ({ size }) => {
  return (
    <div className={`h-${size} w-${size} mt-8`}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={size}
        height={size}
        className="fill-current text-blue-500"
      />
    </div>
  );
};

export default Logo;
