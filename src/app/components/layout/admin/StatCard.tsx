interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 text-center border-t-4 border-blue-600 transition-transform transform hover:scale-105 duration-200">
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
