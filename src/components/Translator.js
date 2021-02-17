import { useCallback, useEffect, useState } from "react";
import translate from "translate";

function Translator({ text }) {
  const [translated, setTranslated] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const translateWord = useCallback(async (word) => {
    try {
      setLoading(true);
      const text = await translate(word, { to: "es", engine: "libre" });
      setTranslated(text);
    } catch (err) {
      console.log(err);
      setError("Something went wrong ;( wait and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    translateWord(text);
  }, [text, translateWord]);

  if (error) {
    return <p className="text-red">{error}</p>;
  }

  if (loading) {
    return <p>Translating...</p>;
  }

  return <p className="underline">{translated}</p>;
}

export default Translator;
