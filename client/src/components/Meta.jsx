import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Meta = ({
  title,
  userTitle,
  cmpTitle,
  description,
  userDescption,
  cmpDescription,
  url = "https://worknity.netlify.app/",
  userUrl,
  cmpUrl,
  robots,
  canonical,
}) => {
  const { user } = useSelector((state) => state.user);

  const roleTitle =
    user && user?.accountType === "seeker" ? userTitle : cmpTitle;

  const metaTitle = title ?? roleTitle;

  const roleDescription =
    user && user?.accountType === "seeker" ? userDescption : cmpDescription;

  const metaDescription = description ?? roleDescription;

  const roleUrl =
    user && user?.accountType === "seeker" ? userUrl : cmpUrl;

  const metaUrl = roleUrl ?? url;

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {robots && <meta name="robots" content={robots} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* open graph tags */}
      <meta property="og:site_name" content="Worknity" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={metaUrl} />
    </Helmet>
  );
};

export default Meta;
