import { useQuery } from '@tanstack/react-query';  // Import useQuery
import { getData } from '../../../api/apiHelpers';  // Assuming getData is already implemented
import { Flashcard } from '../../../types/Flashcard';

// This function fetches flashcards from the API
const fetchFlashcards = async (): Promise<Flashcard[]> => {
  return await getData<Flashcard[]>('/flashcards');
};

// Custom hook for fetching flashcards with useQuery
const useFlashcards = () => {
  // useQuery is now used to fetch the data and manage loading/error states
  const { data, isLoading, error } = useQuery<Flashcard[], Error>({
    queryKey: ['flashcards'], // The query key used to uniquely identify the data
    queryFn: fetchFlashcards, // The function to fetch the data
  });

  return {
    flashcards: data || [], // If no data, return an empty array
    loading: isLoading, // Loading state
    error: error instanceof Error ? error.message : null, // Error message if there's an error
  };
};

export default useFlashcards;
