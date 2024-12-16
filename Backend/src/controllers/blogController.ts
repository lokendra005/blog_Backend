import { Request, Response } from 'express';
import Blog from '../models/Blog';
import cloudinary from '../config/cloudinary';


export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description, authorName, readTime, mediumLink } = req.body;
    let imageUrl;

    if (req.file) {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const blog = new Blog({
      title,
      description,
      authorName,
      readTime,
      mediumLink,
      image: imageUrl
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error creating blog post' });
  }
};
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      message: 'Error fetching blog posts',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ 
      message: 'Error fetching blog post',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};