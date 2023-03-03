import { Typography } from '@mui/material';
import Head from 'next/head'
import { useState } from 'react'
import { ImageUploader } from '../components/ImageUploader'
import PageLayout from '../components/PageLayout'

export default function Test() {
  const [img, setImg] = useState<number[]>([1, 3, 4, 10, 10, 10, 10, 10]);


  return (
    <>
      <Head>
        <title>ImageUploader test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ width: 500, height: 200, margin: 100 }}>
          <Typography variant="h3">
            Test Image Uploader
          </Typography>
          <Typography>
            Images: {img.join(", ")}
          </Typography>
          <ImageUploader
            images={img}
            setImages={setImg}
            maxImages={8}
          />
        </div>
      </main>
    </>
  )
}
