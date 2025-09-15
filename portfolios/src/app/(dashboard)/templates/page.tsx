export default function TemplatesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Templates</h1>
      <p className="text-gray-600 mb-6">
        Browse and choose templates for your portfolio.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">Template 1</div>
        <div className="bg-white p-4 shadow rounded">Template 2</div>
        <div className="bg-white p-4 shadow rounded">Template 3</div>
      </div>
    </div>
  );
}
