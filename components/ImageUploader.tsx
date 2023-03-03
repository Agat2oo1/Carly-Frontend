import { AddAPhoto, Clear } from "@mui/icons-material"
import { Box, Card, CircularProgress, Grid, IconButton, Typography } from "@mui/material"
import Image from "next/image";
import { useRef, useState } from "react";

export interface ImageUploaderProps {
  images: number[],
  setImages: (arg: number[]) => void,
  maxImages?: number // optional
}

const maxFileSize = 1048576; // 1 MB

export const ImageUploader = (props: ImageUploaderProps) => {
  const { images, setImages, maxImages } = { ...props };
  const [loading, setLoading] = useState(false);

  const fileInput = useRef(null);
  const handleClick = () => {
    (fileInput.current as any).click();
  }
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0] as File;

    console.log(fileUploaded.size);

    if (!fileUploaded.name.endsWith(".jpg")) {
      alert("Please upload a JPG image.")
      return;
    }
    if (fileUploaded.size > maxFileSize) {
      alert("File is too big.")
      return;
    }

    // file is OK - upload
    setLoading(true);
    fetch('https://carlybackend.azurewebsites.net/internal/images/', {
      method: 'POST',
      body: fileUploaded
    })
      .then(response => {
        console.log(response);
        if (!response.ok)
          throw response.statusText;
        return response.text();
      })
      .then(imageId => {
        const id = Number(imageId);
        setImages([...images, id]);
      })
      .catch(e => alert("Error: " + e))
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{
      width: "95%",
      height: "auto",
      border: "3px solid #ECEBE4",
      borderRadius: 2
    }}>
      <Grid container direction="column">
        <input type="file" style={{ "display": "none" }} ref={fileInput} onChange={handleChange} />
        <Grid item xs sx={{ borderBottom: "1px solid #ECEBE4" }} container alignItems="center">
          {
            loading ?
              <CircularProgress size={20} sx={{ m: 1 }} />
              :
              <IconButton disabled={maxImages === images.length} color="secondary" onClick={handleClick}>
                <AddAPhoto />
              </IconButton>
          }
          <Typography>
            Selected images: {images.length}
            {
              maxImages === undefined ? undefined : " of " + maxImages
            }&nbsp;
          </Typography>

          <Typography variant="caption">
            JPG image, max. 1 MB
          </Typography>
        </Grid>
        <Box sx={{
          width: "100%",
          overflow: 'auto'
        }}>
          <Box sx={{
            margin: 2,
            flexDirection: 'row',
            display: 'flex',
            gap: '10px'
          }}>
            {
              images.map((img, index) => {
                return <Box
                  key={img}
                  sx={{
                    width: 100,
                    height: 'fit-content',
                    position: "relative",
                    display: 'flex',
                    flexShrink: 0
                  }}
                  alignItems="center"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Image
                    alt={"Car image " + index}
                    src={"https://carlybackend.azurewebsites.net/internal/images/" + img}
                    width="100"
                    height="100"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 8,
                      position: "relative",
                      boxShadow: "0px 2px 4px #00000040"
                    }} />

                  <Card
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: 34,
                      height: 34,
                      borderRadius: 17
                    }}
                  >
                    <IconButton size="small" onClick={() => {
                      const newImages = images.filter(x => x !== img);
                      setImages(newImages);
                    }}>
                      <Clear />
                    </IconButton>
                  </Card>
                </Box>
              })}
          </Box>
        </Box>
      </Grid>
    </Box >
  )
}