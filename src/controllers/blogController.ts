// backend/src/controllers/blogController.ts
import { Request, Response } from 'express';
import Blog from '../models/Blog';

export const createBlog = async (req: Request, res: Response) => {
  try {
    console.log('Received blog data:', req.body);
    console.log('Received file:', req.file);  // Log file info

    const { title, description, authorName, readTime, mediumLink } = req.body;
    
    if (!title || !description || !authorName || !readTime || !mediumLink) {
      return res.status(400).json({ 
        message: 'All fields are required',
        received: req.body 
      });
    }

    const blog = new Blog({
      title,
      description,
      authorName,
      readTime,
      mediumLink,
      image: req.file ? `/uploads/${req.file.filename}` : undefined  // Save image path if file exists
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
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