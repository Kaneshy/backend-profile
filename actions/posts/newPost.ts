'use server'

interface PostInfo {
    option: string;
    title: string;
    description: string;
    image: string | null; // Update to accept null
  }

export const handlenewPost = async (info: PostInfo) => {
    try {
      // Handle the post submission (e.g., API call)
      console.log('Submitting post:', info);
      // Perform the async operation, such as a POST request
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

