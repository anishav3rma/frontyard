// src/components/Post.tsx
import React from 'react';
import DeletePostButton from './DeletePost';
import './PostItem.css';

interface PostProps {
  id: string;
  userName: string;
  postTitle: string;
  postContent: string;
  tags: string[];
  onDelete: () => void;
}

const Post: React.FC<PostProps> = ({ id, userName, postTitle, postContent, tags, onDelete }) => {
  return (
    <div className="post">
      <h3 className="post-title">{postTitle}</h3>
      <p className="post-user">Posted by: {userName}</p>
      <div className="post-content">{postContent}</div>
      <div className="post-tags">
        {tags.map(tag => (
          <span key={tag} className="post-tag">{tag}</span>
        ))}
      </div>
      <DeletePostButton postID={id} onDelete={onDelete} />
    </div>
  );
};

export default Post;


