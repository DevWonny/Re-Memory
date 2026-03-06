// style
import "@/styles/components/loading.scss";

export default function Loading() {
  return (
    <div className="loading-container absolute flex flex-col">
      <div className="perforation">
        {Array.from({ length: 24 }).map((_, index) => (
          <p key={`loading-top-perforation-${index}`} />
        ))}
      </div>

      <div className="loading-item-container flex gap-[6px]">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={`loading-item-${index}`} className="loading-item" />
        ))}
      </div>

      <div className="perforation">
        {Array.from({ length: 24 }).map((_, index) => (
          <p key={`loading-bot-perforation-${index}`} />
        ))}
      </div>
    </div>
  );
}
