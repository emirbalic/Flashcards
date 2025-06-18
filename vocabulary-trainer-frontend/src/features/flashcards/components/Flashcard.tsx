import React, { useState } from 'react';
import { Box, Card, Typography, Button } from '@mui/material';
import { Flashcard as FlashcardType } from '../../../types/Flashcard';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../../store/languageStore'; // Importing the Zustand hook

const cardStyles = {
  root: {
    position: 'relative',
    height: '300px', // Adjust height as needed
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Push content apart
    padding: '16px', // Add padding for spacing
  },
  cardContent: {
    flexGrow: 1, // Allow text to expand
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  text: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
  },
  visible: {
    opacity: 1,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8px', // Space from the card content
  },
};

interface FlashcardProps {
  flashcard: FlashcardType;
}

const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Get languages from Zustand store
  const { fromLanguage, toLanguage } = useLanguageStore();

  const handleCardClick = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const getLanguageContent = (language: string) => {
    // Return the content for the selected language
    if (language === 'german') {
      return flashcard.german; // Assuming german is available
    } else if (language === 'english') {
      return flashcard.english; // Assuming english is available
    } else if (language === 'french' && flashcard.french) {
      return flashcard.french; // Handle french language if available
    } else if (language === 'croatian' && flashcard.croatian) {
      return flashcard.croatian; // Handle croatian language if available
    }
  
    // Fallback: Return a message if no matching language is found
    return `Content not available in ${language}`;
  };
  

  return (
    <Card sx={cardStyles.root} onClick={handleCardClick}>
      <Box sx={cardStyles.cardContent}>
        {/* Display German */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            ...cardStyles.text,
            ...(isFlipped ? {} : cardStyles.visible), // Show German when not flipped
          }}
        >
          {/* {flashcard.german} */}
          {getLanguageContent(fromLanguage)}
        </Typography>

        {/* Display English */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            ...cardStyles.text,
            ...(isFlipped ? cardStyles.visible : {}), // Show English when flipped
          }}
        >
          {/* {flashcard.english} */}
          {getLanguageContent(toLanguage)}
        </Typography>
      </Box>

      {/* Separate Button (Prevents toggling text on click) */}
      <Box sx={cardStyles.buttonContainer}>
        <Link to={`/flashcards/${flashcard.id}`} onClick={(event) => event.stopPropagation()}>
          <Button variant="contained" color="primary">
            See details
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default Flashcard;
