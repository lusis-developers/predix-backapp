import { Response } from 'express';
import { Storage } from '@google-cloud/storage';
import { format } from 'url';

import handleHttpError from '../utils/handleErrors';
import { ImageFile } from '../types/File';

const storage = new Storage({
  projectId: 'predix-396714',
  credentials: {
    client_email: 'predix@predix-396714.iam.gserviceaccount.com',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9vZ0WY9qu21DB\nzjFC6Un9M1WU7hdCw0RTk6mdfJuCHNkSWjEbYaUOlfD6WjYsANIDzcCMAUfDRKjK\nyw0LDx/Ka6OP5N2UvLys9ci8MWds6hWyjgNJ6wTAPQ6GCijVrVFzPnXJh+mTZuRI\n8aHzWTlRE1332XqC0HcVsuxbWCTGII1ta47mNupyV3L2fNtpYs3eA/uWt+3jja/2\n3NNtXnzb2JgBZRz8k8HkLxGyyWdeFq8+Mv8o4VLzpSj8g0oGOfO7PYMrGlD8+taW\n4HadnJkM49tIy/Uc7eY2mGpavNqKDUJuzYq4LC3p9CD2fPmxgSuzlC/s94v1Td4t\npg/vfNbdAgMBAAECggEAA92zL7Dv1GmU5v4D3vB7Q3TM+kXc+iKZvSI1wzG2HBvp\nCF4Ha3QSiuOJ5MVQc+u9sQ97gYlyeYtn7QnfcCmUuj514glbF8a+CWrQoOpYyHf/\nN9jQ6av84ssxBTt7wtl53raXwSLLIue7ywixW2X8AaeQCJbJJOqJIqC3VCfNnVkk\nvsE0bTs2HAbgBpfwU2LCFFzyneGirzDlZg6WpPRWPqJngs7mSxRi3NDT+peNsMiS\nrjEIiw+49S5m/OSpiMGGWFw+7adX98AtsZimN4xS4BM2gYxIehj62sWcBnOlUAvc\nswHyvWhI//FEjiOu/owMpddTnI/u1otxgMJdmYPPeQKBgQD2qWXmaXAIiE9El6fP\n/4/iCaluJYzERTqnfB61LhlFj9pa9q+go3ezdbSd/ahBrtD5fp3J64CxdEtTjvRf\nVXbGR/oVq2QqhmVBOs0BJLnqMGPIEt1Orix9NgE8fg9uGOX1lcCYVvMAvmwagV36\nHXdGLEckMFtZ1JkT9E7uFVYJEwKBgQDE7IwDh/cxTSZ2LDoXr0WKOYI9qJbL54LZ\nIq9p3pZFrkf0ubpCU7071CUt6Feqy9nQkcEpNSWUamKeu7dZnJ8NZHO/cXkArYOK\nigVvjiA0maO//Uon9Q7vYFuYcUD1o6sOLtBJSP+2ZHuIS+vJFnVo77mo9lbId28g\nEoMHi+sOTwKBgBqbCQfCZbg14771UL+JxF5QRntAB6AAC6SXKcTHNSigrJ/VLfp4\nx2ePEa1c9/IlxhqzQpfOFDKP5bQcnlVOJaKbjukZdJN1raRMkGJIMNmG4KxrBH4B\nIYFb+uQogMeSXfOQdJa6AjoZUBXH0HgzB3OFQSMxKBlXai+R0ZWyrXYLAoGAeyXS\niYLFuzccDlqqGZWqTz6XjCeZ5fnpghCG0hY4s2rB5PEg4cmsVXXdqk/aQx0oIZ6E\nxVhPH/lHoyyRBKFFdgKTv+0eVqYr1L9rls+ypDJQjQfBECvYIyqHHVX14adwmXX9\nG1djUpSUDDAuS5qX4f/IgzlKHCNUgyIQfu+pF1ECgYEAiKAEg7LYm5zUQjNAAk4Z\nN055sxMs9DJhoZCrgNIXoFSNpfezF4Q3PiZfa6PCZ8Ro4yI1iOZDE/m1fl3WIsR5\n+6zHInRPyTI3Z9iikGIn/Xd+hR0Y9kdvN1h25BxowV+az7u211RlxA0MTDDCtCs5\nB5ZjdgYPPJ3Wv3LEbWMaBwU=\n-----END PRIVATE KEY-----\n'
  }
});

const bucketName = 'predix-images';
const bucket = storage.bucket(bucketName);

async function gcpImageUpload(
  file: ImageFile,
  location?: string
): Promise<string> {
  try {
    const ext = file.originalname.split('.').pop();
    const string = file.originalname.split('.').shift();
    const name = string?.replace(/\s/g, '_');
    const filename = `file-${Date.now()}-${name}.${ext}`;

    const blob = bucket.file(location + filename);
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    const publicUrl: string = await new Promise((resolve, reject) => {
      blobStream
        .on('error', (error: Response) => {
          handleHttpError(
            error,
            'Error uploading file to Google Cloud Storage'
          );
          reject('Error happened on image upload');
        })
        .on('finish', () => {
          const publicUrl = format(
            `https://storage.googleapis.com/${bucket.name}/${filename}`
          );
          resolve(publicUrl);
        })
        .end(file.buffer);
    });

    return publicUrl;
  } catch (error) {
    return 'Cannot upload image';
  }
}

export default gcpImageUpload;
