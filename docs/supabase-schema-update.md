# Supabase Database Schema Update

## Issue
The admin panel requires `pinned` and `hidden` columns in the `comments` table, but these columns don't exist in the current database schema.

## Current Solution
The application now uses a **local storage fallback** system that works without database schema changes. Pin/Hide status is stored in browser localStorage and synchronized across the application.

## Optional: Database Schema Update

If you want to store pin/hide status in the database permanently, you can run these SQL commands in your Supabase SQL Editor:

### Add Columns to Comments Table

```sql
-- Add pinned column (default false)
ALTER TABLE comments 
ADD COLUMN pinned BOOLEAN DEFAULT FALSE;

-- Add hidden column (default false)  
ALTER TABLE comments 
ADD COLUMN hidden BOOLEAN DEFAULT FALSE;

-- Add indexes for better performance
CREATE INDEX idx_comments_pinned ON comments(pinned);
CREATE INDEX idx_comments_hidden ON comments(hidden);

-- Update existing comments to have default values
UPDATE comments 
SET pinned = FALSE, hidden = FALSE 
WHERE pinned IS NULL OR hidden IS NULL;
```

### Verify Schema Update

```sql
-- Check if columns were added successfully
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'comments' 
AND column_name IN ('pinned', 'hidden');
```

## How the Fallback System Works

### Without Database Columns (Current)
- Pin/Hide status stored in browser localStorage
- Status persists across browser sessions
- Each browser maintains its own admin settings
- No database migration required

### With Database Columns (After Schema Update)
- Pin/Hide status stored in database
- Status shared across all admin sessions
- Permanent storage across devices
- Requires database migration

## Migration Path

1. **Current State**: Local storage fallback (working now)
2. **Optional**: Run SQL commands above to add database columns
3. **Future**: Application will automatically use database columns if they exist

## Testing

After schema update, test these scenarios:

1. Pin a comment - should update database
2. Hide a comment - should update database  
3. Delete a comment - should remove from database
4. Refresh page - pin/hide status should persist
5. Check from different browser - status should be consistent

## Rollback

If you need to remove the columns:

```sql
ALTER TABLE comments DROP COLUMN IF EXISTS pinned;
ALTER TABLE comments DROP COLUMN IF EXISTS hidden;
```

The application will automatically fall back to localStorage.
