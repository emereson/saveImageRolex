import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { uploadImage, deleteImage } from './controllers/imageController.js';
import { deleteVideo, saveVideo } from './controllers/videoController.js';
import { uploadVideo } from './utils/video.multer.js';
import { upload } from './utils/image.multer.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const port = process.env.PORT || 3111;


app.post('/upload', upload.single('sectionImg'), uploadImage);
app.delete('/delete-image/:id', deleteImage);
app.post('/saveVideos', uploadVideo.single('video'), saveVideo);
app.delete('/delete-video/:id', deleteVideo);

app.use('/uploads', express.static('./uploads'));
app.use('/videos', express.static('./videos'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} ❤`);
});
