// src/components/PostForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface PostFormProps {
  onPostCreated: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({
    userName: '',
    postTitle: '',
    postContent: '',
    tags: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({ ...prevState, tags: e.target.value.split(',') }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://rwmyy3cukf.execute-api.us-east-2.amazonaws.com/dev/createPost', formData);
      onPostCreated();
      setFormData({
        userName: '',
        postTitle: '',
        postContent: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input name="userName" value={formData.userName} onChange={handleChange} placeholder="Username" />
      </div>
      <div>
        <label>Title</label>
        <input name="postTitle" value={formData.postTitle} onChange={handleChange} placeholder="Post Title" />
      </div>
      <div>
        <label>Content</label>
        <textarea name="postContent" value={formData.postContent} onChange={handleChange} placeholder="Post Content" />
      </div>
      <div>
        <label>Tags (comma separated)</label>
        <input name="tags" value={formData.tags.join(',')} onChange={handleTagsChange} placeholder="Tags" />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;