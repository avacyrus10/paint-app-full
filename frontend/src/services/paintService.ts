export const paintService = {
  async savePainting(username: string, title: string, shapes: any[]) {
    const res = await fetch('http://localhost:3001/api/paintings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, title, shapes })
    });
    if (!res.ok) {
      throw new Error('Failed to save painting');
    }
    return await res.json();
  },

  async loadPainting(username: string) {
    const res = await fetch(`http://localhost:3001/api/paintings/${username}`);
    if (!res.ok) {
      throw new Error('Painting not found');
    }
    return await res.json();
  }
};

