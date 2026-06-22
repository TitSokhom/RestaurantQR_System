export default function TableFooter() {
  return (
    <footer className="border-t pt-6">
      <div className="flex gap-4">
        <span>🟢 Available</span>
        <span>🟠 Occupied</span>
        <span>⚪ Reserved</span>
      </div>
    </footer>
  );
}