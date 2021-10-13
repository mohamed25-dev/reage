import axios from "axios";

const postsHooks = () => {
  const getPosts = async () => {
    try {
      const response = await axios();
      const data =  await response.data;

      if (!data.status) {
        return false;
      }

      return [null, data.posts];
    } catch (error) {
      return [error, null];
    }
  }

  const getPost = async (postId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`);
      const data =  await response.data;

      return [data.post, null];
    } catch (error) {
      return [null, error];
    }
  }

  const updatePost = async (postId, data) => {
    try {
      const result = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/update`, data);

      return [result, null];
    } catch (error) {
      return [null, error.response.data.errors];
    }
  }

  const deletePost = async (postId) => {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`);

      return [result, null];
    } catch (error) {
      console.log('error =>>', error.response.data.errors)
      return [null, error.response.data.errors];
    }
  }

  const likePost = async (postId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/like`);
      const data =  await response.data;

      return [data.post, null];
    } catch (error) {
      return [null, error];
    }
  }

  return {
    getPosts,
    getPost,
    updatePost,
    likePost,
    deletePost
  }
}

export default postsHooks;