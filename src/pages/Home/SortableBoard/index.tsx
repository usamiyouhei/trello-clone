import { SortableList } from './SortableList';
import { AddList } from './AddList';
import {  useAtomValue } from "jotai";
import { currentUserAtom } from "../../../modules/auth/current-user.state";
import { listRepository } from "../../../modules/lists/list.repository";

export default function SortableBoard() {
  const currentUser = useAtomValue(currentUserAtom);

  const createList = async (title: string) => {
    const newList = await listRepository.create(currentUser!.boardId, title);
    console.log(newList);
    
  }

  return (
    <div className="board-container">
      <div style={{ display: 'flex', gap: '12px' }}>
        <SortableList />
      </div>
      <AddList onCreate={createList}/>
    </div>
  );
}
