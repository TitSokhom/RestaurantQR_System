interface Props {
  onCreateTable?: () => void;
}

export default function CreateTableCard({
  onCreateTable,
}: Props) {
  return (
    <button
      onClick={onCreateTable}
      className="border-2 border-dashed rounded-2xl min-h-[280px]"
    >
      <div className="text-4xl">+</div>
      <p>Create New Table</p>
    </button>
  );
}