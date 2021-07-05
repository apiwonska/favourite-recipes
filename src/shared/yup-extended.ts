import * as yup from 'yup';
import axios from 'axios';

declare module 'yup' {
  class StringSchema {
    isJpegImage(message?: string): this;

    maxImageSize(size: number, message?: string): this;
  }
}

const getHeaders = async (url: string): Promise<{ [key: string]: string }> => {
  try {
    const res = await axios.post('/.netlify/functions/getHeaders', url);
    return res.data.headers;
  } catch (err) {
    throw new Error();
  }
};

yup.addMethod(
  yup.string,
  'isJpegImage',
  function isJpegImageFn(message?: string) {
    return this.test(
      'returnJPEG',
      message || 'enter a valid correct URL for the jpeg image',
      async (url): Promise<boolean> => {
        if (!url) return true;
        try {
          const headers = await getHeaders(url);
          return (
            headers['content-type'] === 'image/jpeg' ||
            headers['content-type'] === 'image/webp' ||
            headers['content-type'] === 'image/png'
          );
        } catch (err) {
          return false;
        }
      }
    );
  }
);

yup.addMethod(
  yup.string,
  'maxImageSize',
  function maxSizeFn(size: number, message?: string) {
    return this.test(
      'maxImageSize',
      message || `image size is too big, it should be smaller than ${size}kB`,
      async (url): Promise<boolean> => {
        if (!url) return true;
        try {
          const headers = await getHeaders(url);
          if (headers['content-length']) {
            return Number(headers['content-length']) < size * 1000;
          }
          return true;
        } catch (err) {
          // Only show error message for the input if there is content-length header info
          // Otherwise it pops up when url is invalid
          return true;
        }
      }
    );
  }
);

export default yup;
