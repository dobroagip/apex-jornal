import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Upload, Send, AlertCircle, CheckCircle } from 'lucide-react';

const ArticleForm: React.FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Magazine');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setStatus({ type: 'error', message: 'You must be logged in to post articles.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      let imageUrl = '';
      
      // 1. Upload Image to Backend
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'x-xsrf-token': document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
          },
          body: formData
        });
        
        const uploadData = await uploadRes.json();
        if (uploadData.error) throw new Error(uploadData.error);
        imageUrl = uploadData.url;
      }

      // 2. Sanitize Content on Backend
      const sanitizeRes = await fetch('/api/articles/sanitize', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-xsrf-token': document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1] || ''
        },
        body: JSON.stringify({ content })
      });
      const { sanitizedContent } = await sanitizeRes.json();

      // 3. Save to Firestore
      await addDoc(collection(db, 'articles'), {
        title,
        subtitle,
        content: { intro: sanitizedContent, sections: [] },
        image: imageUrl,
        category,
        author: auth.currentUser.displayName || 'Anonymous',
        authorId: auth.currentUser.uid,
        published: false, // Default to draft for moderation
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setStatus({ type: 'success', message: 'Article submitted for moderation!' });
      setTitle('');
      setSubtitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error instanceof Error ? error.message : 'Failed to submit article' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 glass-card rounded-3xl my-20">
      <h2 className="text-3xl font-black uppercase italic mb-8 border-l-4 border-racing-red pl-6">
        Create New Article
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-racing-red outline-none transition-colors"
              placeholder="The Soul of Speed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-racing-red outline-none transition-colors"
            >
              <option value="Magazine">Magazine</option>
              <option value="Racing">Racing</option>
              <option value="Garage">Garage</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Subtitle / Excerpt</label>
          <input 
            type="text" 
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-racing-red outline-none transition-colors"
            placeholder="A deep dive into the engineering marvels..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Content (HTML allowed)</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-racing-red outline-none transition-colors resize-none"
            placeholder="Write your story here..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Cover Image</label>
          <div className="relative group">
            <input 
              type="file" 
              onChange={handleImageChange}
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center group-hover:border-racing-red transition-colors">
              <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-racing-red" />
              <p className="text-sm text-gray-400">
                {image ? image.name : 'Click or drag to upload image'}
              </p>
            </div>
          </div>
        </div>

        {status && (
          <div className={`flex items-center gap-3 p-4 rounded-xl ${status.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="text-sm font-bold">{status.message}</span>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="btn-racing btn-racing-primary w-full flex items-center justify-center gap-4 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          <span>{loading ? 'Submitting...' : 'Submit Article'}</span>
          <div className="btn-racing-fill" />
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
