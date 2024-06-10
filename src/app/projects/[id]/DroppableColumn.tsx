import React, { PropsWithChildren } from 'react';
import {useDroppable} from '@dnd-kit/core';
import styles from "./project.module.css";

interface DroppableColumnProps extends PropsWithChildren{
    id: string
}

export const DroppableColumn: React.FunctionComponent<DroppableColumnProps> = ({id, children}) => {

  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const className = `${styles.column} ${isOver ? styles.over : ''}`;
  
  
  return (
    <div ref={setNodeRef} className={className}>
      <h2>{id}</h2>
      {children}
    </div>
  );
}

