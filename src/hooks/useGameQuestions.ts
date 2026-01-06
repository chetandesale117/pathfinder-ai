import { useEffect, useState } from "react";
import { gamesAPI } from "@/lib/api";

/**
 * Fetch game questions from API with fallback to local mock data.
 */
export function useGameQuestions<T>(gameType: string, fallback: T[]) {
  const [questions, setQuestions] = useState<T[]>(fallback);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const qs = await gamesAPI.getQuestions(gameType, { shuffle: true });
        if (isMounted && qs?.length) {
          setQuestions(qs as T[]);
        }
      } catch {
        if (isMounted) {
          setQuestions(fallback);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();
    return () => {
      isMounted = false;
    };
  }, [gameType, fallback]);

  return { questions, isLoading };
}

