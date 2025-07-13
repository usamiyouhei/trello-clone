import { SortableCard } from './SortableCard';
import { AddCard } from './AddCard';
import { List } from "../../../modules/lists/list.entity";
import { Draggable } from '@hello-pangea/dnd';
interface SortableListProps {
  list: List;
  onDelete: (id: string) => void;
  onCreateCard: (listId: string, title: string) => Promise<void>;
}

export function SortableList({
   list, 
   onDelete, 
   onCreateCard 
  }: SortableListProps) {


  return (
    <Draggable draggableId={list.id} index={list.position}>
      {(provided, snapshot) => (
    <div 
    ref={provided.innerRef} 
    {...provided.draggableProps}
    style={{
      ...provided.draggableProps.style,
      opacity: snapshot.isDragging ? 0.8 : 1,
    }}
    >
      <div className={`list`}>
          <div
            className="list-header"
            style={{
              cursor: 'grab',
            }}
            {...provided.dragHandleProps}
          >
          <h3 className="list-title">{list.title}</h3>
          <button className="list-options" onClick={() => onDelete(list.id)}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
        <div
          style={{
            minHeight: '1px',
          }}
        >
          <SortableCard />
        </div>
        <AddCard listId={list.id} onCreate={onCreateCard}/>
      </div>
    </div>
      )}
    </Draggable>
  );
}
