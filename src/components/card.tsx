import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

type Props = {
  id: string;
};

function MyCard({ id }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  return (
    <Card
      ref={setNodeRef}
      sx={{
        minWidth: 275,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      variant={"outlined"}
      {...listeners}
      {...attributes}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          Card {id}
        </Typography>
        <Typography variant="h5" component="div">
          Climbed mountain.
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MyCard;
