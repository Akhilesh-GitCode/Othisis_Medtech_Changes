import React, { useState, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TemplateCard from './TemplateCard';

function SortableItem({ id, title }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TemplateCard id={id} title={title} />
    </div>
  );
}

function TemplateList() {
  const [items, setItems] = useState([
    { id: 'template-1', title: 'Template 1' },
    { id: 'template-2', title: 'Template 2' },
    { id: 'template-3', title: 'Template 3' },
    { id: 'template-4', title: 'Template 4' },
    { id: 'template-5', title: 'Template 5' },
    { id: 'template-6', title: 'Template 6' },
  ]);

  const containerRef = useRef(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAutoScroll = (event) => {
    const scrollMargin = 80;
    const scrollSpeed = 15;

    if (containerRef.current) {
      const { top, bottom } = containerRef.current.getBoundingClientRect();
      const mouseY = event.clientY;

      if (mouseY > bottom - scrollMargin) {
        containerRef.current.scrollBy({ top: scrollSpeed, behavior: 'smooth' });
      } else if (mouseY < top + scrollMargin) {
        containerRef.current.scrollBy({ top: -scrollSpeed, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleAutoScroll);
    return () => {
      window.removeEventListener('mousemove', handleAutoScroll);
    };
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={containerRef}
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid var(--color-border)',
            padding: 'var(--spacing-md)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-card-bg)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {items.map((item) => (
            <SortableItem key={item.id} id={item.id} title={item.title} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default TemplateList;
