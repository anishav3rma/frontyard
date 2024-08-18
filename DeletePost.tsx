// src/components/DeletePostButton.tsx
import React from 'react';
import axios from 'axios';

interface DeletePostButtonProps {
  postID: string;
  onDelete: () => void;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postID, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Delete post?")) {
      try {
        await axios.delete(`https://rwmyy3cukf.execute-api.us-east-2.amazonaws.com/prod/deletePost${postID}`, { data: { postID } });
        onDelete(); 
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <button onClick={handleDelete}>Delete Post</button>
  );
};

export default DeletePostButton;
