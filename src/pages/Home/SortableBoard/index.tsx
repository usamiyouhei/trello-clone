import { SortableList } from './SortableList';
import { AddList } from './AddList';
import { useAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "../../../modules/auth/current-user.state";
import { listRepository } from "../../../modules/lists/list.repository";
import { listsAtom } from "../../../modules/lists/list.state";
import {
  DragDropContext,
  Droppable,
  type DraggableLocation,
  type DropResult,
} from '@hello-pangea/dnd';
import { cardRepository } from "../../../modules/cards/card.repository";

export default function SortableBoard() {
  const currentUser = useAtomValue(currentUserAtom);
  const [lists, setLists] = useAtom(listsAtom);
  const sortedLists = [...lists].sort((a, b) => a.position - b.position)

  const createCard = async (listId: string, title: string) => {
    const newCard = await cardRepository.create(listId, title);
    console.log(newCard);
    
  }

  const createList = async (title: string) => {
    const newList = await listRepository.create(currentUser!.boardId, title);
    setLists((prevLists) => [...prevLists, newList]);
    setLists([...lists, newList])
  }

  const deleteList = async (listId: string) => {
    const confirmMessage =
    'リストを削除しますか？このリスト内のカードも全て削除されます';
    try {
      if(window.confirm(confirmMessage)){
        await listRepository.delete(listId);
        setLists((prevLists) => prevLists.filter((l) => l.id != listId))
      }
    } catch (error) {
      console.error("リストの削除に失敗しました。", error);
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    if(destination == null) return;

    const [reorderedList] = sortedLists.splice(source.index, 1);
    sortedLists.splice(destination.index, 0, reorderedList);

    const updatedLists = sortedLists.map((list,index) => ({
      ...list,
      position: index,
    }));

    const originalLists = [...lists]
    setLists(updatedLists)
    try {
      await listRepository.update(updatedLists);
    } catch (error) {
      console.error('リストの移動に失敗しました', error);
      setLists(originalLists)
      
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <div className="board-container">
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
        <div style={{ display: 'flex', gap: '12px' }}
        {...provided.droppableProps}
        ref={provided.innerRef}
        >
          {sortedLists.map((list) => (
            <SortableList 
              key={list.id} 
              list={list} 
              onDelete={deleteList}
              onCreateCard={createCard}
            />
        ))}
        {provided.placeholder}
      </div>
      )}
      </Droppable>
      <AddList onCreate={createList}/>
    </div>
    </DragDropContext>
  );
}
