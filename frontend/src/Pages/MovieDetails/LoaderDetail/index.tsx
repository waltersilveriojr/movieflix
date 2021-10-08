import React from "react";
import ContentLoader from "react-content-loader";

const LoaderDetail = () => {
  return (
    <ContentLoader 
    speed={2}
    width={300}
    height={460}
    viewBox="0 0 300 460"
    backgroundColor="#6c6c6c"
    foregroundColor="#c5b36d"
  >
    <rect x="2" y="289" rx="2" ry="2" width="140" height="10" /> 
    <rect x="2" y="308" rx="2" ry="2" width="140" height="10" /> 
    <rect x="-118" y="-131" rx="2" ry="2" width="400" height="400" />
  </ContentLoader>
  );
};

export default LoaderDetail;
