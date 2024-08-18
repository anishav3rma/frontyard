// src/components/PostList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './PostItem';

interface Post {
  id: string;
  userName: string;
  postTitle: string;
  postContent: string;
  tags: string[];
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const schoolName = localStorage.getItem('selectedSchool') || 'DefaultSchool';
      try {
        const response = await axios.get(`https://rwmyy3cukf.execute-api.us-east-2.amazonaws.com/dev/getPosts?schoolName=Duke`);
        const postsData = JSON.parse(response.data.body);
        console.log('API Response:', postsData);
        if (Array.isArray(postsData)) {
            setPosts(postsData);
          } else {
            console.error('Unexpected response format:', postsData);
          }
      } catch (error) {
        <p>ERROR</p>
        console.error('Error fetching posts:', error);
      } 
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postID: string) => {
    try {
      await axios.delete(`https://rwmyy3cukf.execute-api.us-east-2.amazonaws.com/dev/deletePost${postID}`);
      setPosts(posts.filter(post => post.id !== postID));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      {posts.length === 0 ? (
        <div>No posts yet, add your thoughts.</div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.postTitle}</h2>
              <p>{post.postContent}</p>
              <p>Tags: {post.tags.join(', ')}</p>
              <p>By: {post.userName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

//onDelete={() => handleDelete(post.id)}
export default PostList;

