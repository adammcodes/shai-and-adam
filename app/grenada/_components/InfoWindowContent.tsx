import { removeProtocolFromURL } from "@/helpers/removeProtocolFromURL";

type InfoWindowContentProps = {
  id: number;
  title: string;
  email: string;
  website: string;
};

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({
  id,
  title,
  email,
  website,
}) => {
  return (
    <>
      <div className="text-[#002F6C]">
        <h1 className="font-bold text-[#002F6C]">{title}</h1>
        {email && (
          <>
            <br />
            <a id={id.toString()} target="_blank" href={`mailto:${email}`}>
              {email}
            </a>
          </>
        )}
        <br />
        <a target="_blank" href={website}>
          {removeProtocolFromURL(website)}
        </a>
        <br />
        <br />
        <a
          className="font-bold"
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${title}`}
        >
          Open in Google Maps
        </a>
      </div>
    </>
  );
};

export default InfoWindowContent;
