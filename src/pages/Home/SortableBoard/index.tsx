import { SortableList } from './SortableList';
import { AddList } from './AddList';
import { useAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "../../../modules/auth/current-user.state";
import { listRepository } from "../../../modules/lists/list.repository";
import { listsAtom } from "../../../modules/lists/list.state";
import { cardsAtom } from "../../../modules/cards/card.state";
import {
  DragDropContext,
  Droppable,
  type DraggableLocation,
  type DropResult,
} from '@hello-pangea/dnd';
import { cardRepository } from "../../../modules/cards/card.repository";
import { Card } from '../../../modules/cards/card.entity';

export default function SortableBoard() {
  const currentUser = useAtomValue(currentUserAtom);
  const [lists, setLists] = useAtom(listsAtom);
  const [cards, setCards] = useAtom(cardsAtom);
  const sortedLists = [...lists].sort((a, b) => a.position - b.position)

  const createCard = async (listId: string, title: string) => {
    const newCard = await cardRepository.create(listId, title);
    setCards((prevCards) => [...prevCards, newCard])
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
    const { destination, source, type, draggableId } = result;

    if(destination == null) return;

    if (type == 'list') {
      await handleListMove(source, destination);
      return;
    }

    if (type == 'card') {
      await handleCardMove(draggableId, source, destination);
    }
  }

  const handleCardMove = async(
    cardId: string, 
    source:DraggableLocation, 
    destination: DraggableLocation
  ) => {
    const targetCard = cards.find((card) => card.id == cardId);
    if (targetCard == null) return cards;
    const originalCards = [...cards];
    try {
      const updatedCards = 
      source.droppableId == destination.droppableId 
      ? moveCardInSameList(source, destination) 
      : moveCardBetweenLists(source, destination, targetCard);
      setCards(updatedCards);
      await cardRepository.update(updatedCards);
    } catch (error) {
      console.error('カードの移動でエラーが発生しました', error);
      setCards(originalCards)
    }


  };

  const moveCardBetweenLists = (
    source: DraggableLocation,
    destination: DraggableLocation,
    card: Card
  ) => {
    const sourceListCards = cards
    .filter((c) => c.listId == source.droppableId && c.id !== card.id)
    .sort((a, b) => a.position - b.position);
    const updatedCards = updateCardsPosition(cards, sourceListCards);

    const destinationListCards = updatedCards
    .filter((c) => c.listId == destination.droppableId)
    .sort((a, b) => a.position - b.position);
    destinationListCards.splice(destination.index, 0, { 
      ...card,
      listId: destination.droppableId,
    });
    return updateCardsPosition(updatedCards, destinationListCards)
  }

  const moveCardInSameList = (
    source: DraggableLocation, 
    destination: DraggableLocation
  ) => {
    const listCards = cards
    .filter((card) => card.listId == source.droppableId)
    .sort((a, b) => a.position - b.position);
    const [removed] = listCards.splice(source.index, 1);
    listCards.splice(destination.index, 0, removed);

    return updateCardsPosition(cards, listCards);
  };

  const updateCardsPosition = (cards: Card[], updatedCards: Card[]) => {
    return cards.map((card) => {
      const cardIndex = updatedCards.findIndex((c) => c.id == card.id);
      return cardIndex != -1 ? {
        ...updatedCards[cardIndex],
        position: cardIndex
      }
      : card;
    })
  }

  const handleListMove = async (
    source: DraggableLocation, 
    destination: DraggableLocation
  ) => {
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
