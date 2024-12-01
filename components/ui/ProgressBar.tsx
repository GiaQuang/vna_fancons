export default function ProgressBar({ red, green, blue }) {
  return (
    <div className="w-full bg-gray-300 rounded-full h-6 flex overflow-hidden">
      <div
        className="bg-red-500 text-white text-center text-sm font-bold h-full flex items-center justify-center"
        style={{ width: `${red}%` }}
      >
        {red}%
      </div>
      <div
        className="bg-green-500 text-white text-center text-sm font-bold h-full flex items-center justify-center"
        style={{ width: `${green}%` }}
      >
        {green}%
      </div>
      <div
        className="bg-blue-500 text-white text-center text-sm font-bold h-full flex items-center justify-center"
        style={{ width: `${blue}%` }}
      >
        {blue}%
      </div>
    </div>
  );
}
