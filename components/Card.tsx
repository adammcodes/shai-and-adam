// Card is a component that renders a card with a title and children

export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      id={title}
      className="bg-white rounded-[28px] m-10 drop-shadow-lg text-blue z-10 w-[85%] max-w-[680px] px-[1em] lg:px-[0.8em] lg:px-[2em] py-[1em] flex flex-col items-center justify-center lg:flex"
    >
      <h1 className="text-xl lg:text-2xl lg:text-4xl font-bold text-center m-3">
        <a href={`#${encodeURIComponent(title)}`}>{title}</a>
      </h1>
      {children}
    </div>
  );
}
