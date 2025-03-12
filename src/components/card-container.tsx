import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import React from "react";

function CardContainer({
  children,
  id,
}: React.PropsWithChildren<{ id: string }>) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: 700,
        border: "2px solid #ccc",
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        minHeight: 100,
        borderRadius: 1,
        color: isOver ? "green" : undefined,
      }}
    >
      {children}
    </Box>
  );
}

export default CardContainer;
