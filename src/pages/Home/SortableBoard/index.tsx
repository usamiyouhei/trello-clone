import { SortableList } from './SortableList';
import { AddList } from './AddList';
import { useAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "../../../modules/auth/current-user.state";
import { listRepository } from "../../../modules/lists/list.repository";
import { listsAtom } from "../../../modules/lists/list.state";

export default function SortableBoard() {
  const currentUser = useAtomValue(currentUserAtom);
  const [lists, setLists] = useAtom(listsAtom);
  const sortedLists = [...lists].sort((a, b) => a.position - b.position)

  const createList = async (title: string) => {
    const newList = await listRepository.create(currentUser!.boardId, title);
    setLists((prevLists) => [...prevLists, newList]);
    setLists([...lists, newList])
    
  }

  return (
    <div className="board-container">
      <div style={{ display: 'flex', gap: '12px' }}>
        {sortedLists.map((list) => (
          <SortableList list={list}/>
        ))}
      </div>
      <AddList onCreate={createList}/>
    </div>
  );
}
