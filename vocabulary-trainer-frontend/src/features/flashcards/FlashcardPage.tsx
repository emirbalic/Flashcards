// src/features/flashcards/FlashcardPage.tsx
import React, {useState} from 'react';
import {Alert, Box, CircularProgress, TextField, Pagination} from '@mui/material';
import Flashcard from './components/Flashcard.tsx';
import useFlashcards from './hooks/useFlashcards.ts';

const FlashcardPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const {flashcards, loading, error} = useFlashcards({
        search,
        page,
    });

    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box
            paddingTop={11}
            px={2}
            sx={{minHeight: "100vh"}}
        >

            {/*{loading && <CircularProgress size={24}/>}*/}
            <Box sx={{height: 32}}>
                {loading && <CircularProgress size={24}/>}
            </Box>

            <TextField
                label="Search flashcards"
                variant="outlined"
                fullWidth
                margin="normal"
                value={search}
                // onChange={(e) => setSearch(e.target.value)}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="flex-start"
                gap={3}
            >
                {flashcards.map((flashcard) => (
                    <Box
                        key={flashcard.id}
                        sx={{
                            flex: '1 0 300px',
                            maxWidth: '300px',
                        }}
                        mb={3}
                    >
                        <Flashcard flashcard={flashcard}/>
                    </Box>
                ))}
            </Box>
            <Pagination
                count={10} // temporary
                page={page}
                onChange={(_, value) => setPage(value)}
            />
        </Box>
    );
};

export default FlashcardPage;
