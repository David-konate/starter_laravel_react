import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

const CardAcceuil = ({ label, path, src }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea>
        <CardMedia
          sx={{ objectFit: "cover", height: "200px" }}
          component="img"
          image={src}
          alt={label}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardAcceuil;
