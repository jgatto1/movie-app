
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;


export default function Input(props: InputProps) {
  const { className, ...rest } = props;
  return (
    <input
      className={`w-full p-2 border rounded-md bg-input border-none text-white ${className}`}
      {...rest}
    />
  );
}
