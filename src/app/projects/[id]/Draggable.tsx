import React, { PropsWithChildren } from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

interface DraggableProps extends PropsWithChildren {
    id: string
}
export const Draggable: React.FunctionComponent<DraggableProps> = ({id, children}) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}