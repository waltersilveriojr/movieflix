import ContentLoader from 'react-content-loader';

const CardLoader = () => (
  <div className="card-loader-container">
    <ContentLoader
      speed={2}
      width={320}
      height={320}
      viewBox="0 0 320 460"
      backgroundColor="#6c6c6c"
      foregroundColor="#c5b36d"
    >
      <rect x="0" y="0" rx="2" ry="2" width="300" height="400" />
    </ContentLoader>
  </div>
);

export default CardLoader;
