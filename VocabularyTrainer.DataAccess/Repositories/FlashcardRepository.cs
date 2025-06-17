// VocabularyTrainer.DataAccess/Repositories/FlashcardRepository.cs
using VocabularyTrainer.Data.Data;
using VocabularyTrainer.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VocabularyTrainer.DataAccess.Repositories
{
    public class FlashcardRepository
    {
        private readonly AppDbContext _context;

        public FlashcardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Flashcard>> GetAllAsync()
        {
            return await _context.Flashcards.ToListAsync();
        }

        public async Task<Flashcard> GetByIdAsync(int id)
        {
            return await _context.Flashcards.FindAsync(id);
        }

        public async Task AddAsync(Flashcard flashcard)
        {
            await _context.Flashcards.AddAsync(flashcard);
            await _context.SaveChangesAsync();
        }

        public async Task AddFlashcardsAsync(List<Flashcard> flashcards)
        {
            await _context.Flashcards.AddRangeAsync(flashcards);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(Flashcard flashcard)
        {
            _context.Flashcards.Update(flashcard);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var flashcard = await _context.Flashcards.FindAsync(id);
            if (flashcard != null)
            {
                _context.Flashcards.Remove(flashcard);
                await _context.SaveChangesAsync();
            }
        }
    }
}
