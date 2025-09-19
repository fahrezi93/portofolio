// Local storage utility for managing comment pin/hide status
// This is a fallback solution when database doesn't have pinned/hidden columns

interface CommentStatus {
  pinned: boolean;
  hidden: boolean;
}

interface CommentStatusMap {
  [commentId: string]: CommentStatus;
}

const STORAGE_KEY = 'portfolio_comment_status';

export class CommentStatusManager {
  private static getStatusMap(): CommentStatusMap {
    if (typeof window === 'undefined') return {};
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading comment status from localStorage:', error);
      return {};
    }
  }

  private static saveStatusMap(statusMap: CommentStatusMap): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
    } catch (error) {
      console.error('Error saving comment status to localStorage:', error);
    }
  }

  static getStatus(commentId: string): CommentStatus {
    const statusMap = this.getStatusMap();
    return statusMap[commentId] || { pinned: false, hidden: false };
  }

  static setPinned(commentId: string, pinned: boolean): void {
    const statusMap = this.getStatusMap();
    if (!statusMap[commentId]) {
      statusMap[commentId] = { pinned: false, hidden: false };
    }
    statusMap[commentId].pinned = pinned;
    this.saveStatusMap(statusMap);
    console.log(`✅ Comment ${commentId} ${pinned ? 'pinned' : 'unpinned'} locally`);
  }

  static setHidden(commentId: string, hidden: boolean): void {
    const statusMap = this.getStatusMap();
    if (!statusMap[commentId]) {
      statusMap[commentId] = { pinned: false, hidden: false };
    }
    statusMap[commentId].hidden = hidden;
    this.saveStatusMap(statusMap);
    console.log(`✅ Comment ${commentId} ${hidden ? 'hidden' : 'shown'} locally`);
  }

  static deleteStatus(commentId: string): void {
    const statusMap = this.getStatusMap();
    delete statusMap[commentId];
    this.saveStatusMap(statusMap);
    console.log(`✅ Comment ${commentId} status deleted locally`);
  }

  static getAllStatuses(): CommentStatusMap {
    return this.getStatusMap();
  }

  static clearAllStatuses(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ All comment statuses cleared');
  }
}
