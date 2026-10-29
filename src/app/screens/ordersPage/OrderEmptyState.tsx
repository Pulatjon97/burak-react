type OrderEmptyStateProps = {
  status: "paused" | "process" | "finished";
};

const statusLabels = {
  paused: "paused",
  process: "in process",
  finished: "finished",
};

export default function OrderEmptyState({ status }: OrderEmptyStateProps) {
  return (
    <div className="order-empty-state">
      <img src="/icons/noimage-list.svg" alt={`No ${statusLabels[status]} orders`} />
    </div>
  );
}
