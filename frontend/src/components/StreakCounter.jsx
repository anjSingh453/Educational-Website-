const StreakCounter = ({ streak }) => (
  <div className="bg-yellow-400 p-4 rounded-xl shadow-md flex items-center justify-center gap-4 max-w-xs mx-auto">
    <span className="text-3xl">🔥</span>
    <div className="text-white font-bold text-xl">
      {streak} day{streak > 1 ? 's' : ''} learning streak!
    </div>
  </div>
);

export default StreakCounter;
