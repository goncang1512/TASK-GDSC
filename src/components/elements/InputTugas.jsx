export default function InputTugas({
  children,
  type,
  placeholder,
  onChange,
  value,
  htmlFor,
}) {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={htmlFor}>{children}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        id={htmlFor}
        className={`px-3 py-2 border outline-none rounded-lg w-full`}
        required
      />
    </div>
  );
}

export function AreaInput({
  children,
  type,
  placeholder,
  onChange,
  value,
  htmlFor,
}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={htmlFor}>{children}</label>
      <textarea
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        id={htmlFor}
        className={`px-3 py-2 border outline-none rounded-lg w-full`}
        required
      ></textarea>
    </div>
  );
}

export const SelectInput = ({ children, onChange, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{children}</label>
      <select
        className="w-full px-3 py-2 border outline-none"
        value={value}
        onChange={onChange}
        required
      >
        <option value="uncompleted">uncompleted</option>
        <option value="completed">completed</option>
        <option value="process">process</option>
      </select>
    </div>
  );
};
