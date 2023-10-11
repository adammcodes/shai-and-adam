// Paragraph component with consistent class name tailwind styles

type ParagraphProps = {
  children: React.ReactNode;
};

const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="m-3 lg:text-justify">{children}</p>;
};

export default Paragraph;
