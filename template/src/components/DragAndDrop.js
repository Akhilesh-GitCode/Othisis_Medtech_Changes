import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import TemplateCard from './TemplateCard';

const SortableItem = ({ id, title }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div style={style}>
      <TemplateCard
        title={title}
        listeners={listeners}
        attributes={attributes}
        refProp={setNodeRef}
      />
    </div>
  );
};

const DragAndDrop = () => {
  const [items, setItems] = useState(['Template 1', 'Template 2', 'Template 3']);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SortableItem key={item} id={item} title={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDrop;
