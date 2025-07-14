import { Card } from "../../../modules/cards/card.entity";
import { useSetAtom } from "jotai";
import { selectedCardIdAtom } from "../../../modules/cards/card.state";


interface SortableCardProps {
  card: Card;
}


export function SortableCard({ card }: SortableCardProps) {
  const setSelectedCardId = useSetAtom(selectedCardIdAtom);

  return (
    <div>
      <div className={`card`} onClick={() => setSelectedCardId(card.id)}>
        <div className="card-title">
          <span className="card-check">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="#4CAF50">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </span>
          {card.title}
        </div>
        <div className="card-badge">🕒 2025-06-08</div>
      </div>
    </div>
  );
}
