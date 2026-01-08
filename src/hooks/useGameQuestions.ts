import { useEffect, useState } from "react";
import { gamesAPI } from "@/lib/api";

/**
 * Fetches game questions from backend with a local fallback.
 * Accepts readonly arrays from const assertions and returns mutable copies.
 */
export function useGameQuestions<T>(gameType: string, fallback: readonly T[]) {
  const [questions, setQuestions] = useState<T[]>(() => 
    fallback.map(q => ({ ...q })) as T[]
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const remote = await gamesAPI.getQuestions(gameType, { shuffle: true });
        if (mounted && Array.isArray(remote) && remote.length > 0) {
          setQuestions(remote as T[]);
        }
      } catch {
        // fallback stays
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchQuestions();
    return () => {
      mounted = false;
    };
  }, [gameType]);

  return { questions, loading };
}