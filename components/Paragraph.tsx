// Paragraph component with consistent class name tailwind styles

type ParagraphProps = {
  children: React.ReactNode;
};

const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <p
      className="my-[10px] mx-[5px] lg:text-justify"
      style={{ wordSpacing: "-1px" }}
    >
      {children}
    </p>
  );
};

export default Paragraph;
