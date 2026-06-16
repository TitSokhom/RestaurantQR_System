interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MenuSearch = ({
  value,
  onChange,
}: Props) => {
  return (
    <input
      type="text"
      placeholder="Search food..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-2 w-80"
    />
  );
};

export default MenuSearch;