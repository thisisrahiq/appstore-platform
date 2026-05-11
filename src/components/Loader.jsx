export default function Loader({ fullPage = false }) {
  const inner = (
    <span className="loading loading-spinner loading-lg text-primary" aria-label="Loading" />
  );
  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-base-100">
        {inner}
      </div>
    );
  }
  return <div className="flex justify-center p-8">{inner}</div>;
}
