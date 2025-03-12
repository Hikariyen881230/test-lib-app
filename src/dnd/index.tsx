import React, { useState } from "react";

import { SortableList } from "./components/sortable-list";
import { DragHandle, SortableItem } from "./components/sortable-item";
import "./style.css";

function getMockItems() {
  return [...new Array(50)].map((_, index) => ({ id: index + 1 }));
}

function Dnd() {
  const [items, setItems] = useState(getMockItems);

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <SortableList
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <SortableItem id={item.id}>
            {item.id}
            <DragHandle />
          </SortableItem>
        )}
      />
    </div>
  );
}

export default Dnd;
