// src/features/flashcards/FlashcardPage.tsx
import React from 'react';
import {  CircularProgress, Alert, Box } from '@mui/material';
import Flashcard from './components/Flashcard.tsx';
import useFlashcards from './hooks/useFlashcards.ts';

const FlashcardPage: React.FC = () => {
  const { flashcards, loading, error } = useFlashcards();
  

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box
    paddingTop={10}
      display="flex"
      flexWrap="wrap"  // Allow cards to wrap on smaller screens
      justifyContent="center"  // Center the cards horizontally
      gap={3}  // Space between cards (3 * 8px = 24px)
    >
      {flashcards.map((flashcard) => (
        <Box
          key={flashcard.id}
          width={{ xs: '100%', sm: '48%', md: '30%', lg: '22%' }}  // Responsive sizing (full width on small screens, 48% on sm, etc.)
          mb={3}  // Margin at the bottom of each card
        >
          <Flashcard flashcard={flashcard} />
        </Box>
      ))}
    </Box>
  );
};

export default FlashcardPage;
