import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import FileUploadModal from "../features/flashcards/modals/FileUploadModal";
import LanguageSelectorModal from "../features/flashcards/modals/LanguageSelectorModal";
import { useLanguageStore } from "../store/languageStore";  // Import Zustand store

const Navbar = () => {
  const [openFileUploadModal, setOpenFileUploadModal] = useState(false);
  const [openLanguageModal, setOpenLanguageModal] = useState(false);

  // Get selected languages from Zustand store
  const { fromLanguage, toLanguage } = useLanguageStore();

  const handleFileUploadModalOpen = () => setOpenFileUploadModal(true);
  const handleFileUploadModalClose = () => setOpenFileUploadModal(false);

  const handleLanguageModalOpen = () => setOpenLanguageModal(true);
  const handleLanguageModalClose = () => setOpenLanguageModal(false);

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, left: 0, width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashcards App
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/flashcards">
              Flashcards
            </Button>
            <Button color="inherit" component="a" href="#">
              Login
            </Button>
            <Button color="inherit" component="a" href="/flashcards/create">
              New
            </Button>
            <Button color="inherit" onClick={handleFileUploadModalOpen}>
              Bulk Upload
            </Button>
          
            <Badge
              badgeContent={`${fromLanguage} → ${toLanguage}`}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              color="secondary"
              sx={{ marginLeft: 2, fontWeight: 'bold', fontSize: '1rem' }}
            >
                
            <Button color="inherit" onClick={handleLanguageModalOpen}>
              Language Selector
            </Button>
            </Badge>
          </Box>
        </Toolbar>
      </AppBar>

      {/* File Upload Modal */}
      <FileUploadModal open={openFileUploadModal} handleClose={handleFileUploadModalClose} />

      {/* Language Selector Modal */}
      <LanguageSelectorModal open={openLanguageModal} handleClose={handleLanguageModalClose} />
    </>
  );
};

export default Navbar;
