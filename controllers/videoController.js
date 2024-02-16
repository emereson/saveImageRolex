import path from 'path';
import fs from 'fs';

export const saveVideo= (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No file uploaded',
      });
    }



    const videoPath = `videos/${req.file.filename}`;

    res.status(200).json({
      status: 'success',
      message: 'videos saved on videos server',
      videoPath: videoPath,
    });
  } catch (error) {
    console.error('Error saving videos:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error on videos server',
      error: error.message,
    });
  }
};

export const deleteVideo = (req, res) => {
  const { id } = req.params;
  const videoPath = `./videos/${id}`;


  if (fs.existsSync(videoPath)) {
    try {
      fs.unlinkSync(videoPath);
      console.log('videos deleted successfully');
      res.status(200).json({
        status: 'success',
        message: 'videos deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting videos:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error while deleting videos',
        error: error.message,
      });
    }
  } else {
    console.log('videos not found');
    res.status(404).json({
      status: 'error',
      message: 'videos not found',
    });
  }
};
