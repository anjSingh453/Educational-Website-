const quotes = [
  "Education is the passport to the future.",
  "Practice makes perfect!",
  "The beautiful thing about learning is nobody can take it away from you.",
  "Push yourself, because no one else is going to do it for you.",
];

const MotivationalQuote = () => {
  const [quote, setQuote] = React.useState("");

  React.useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="italic text-center text-purple-600 font-semibold text-lg my-6">
      "{quote}"
    </div>
  );
};

export default MotivationalQuote;
