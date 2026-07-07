import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description?: string;
}

export default function PageMeta({
  title,
  description = "",
}: Props) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}