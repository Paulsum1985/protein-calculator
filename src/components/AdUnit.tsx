'use client'

const AdUnit = () => {
  return (
    <div className="my-4">
      <ins
        className="adsbyard-in-article"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="pub-1522061448979634"  // Replace with your AdSense publisher ID
        data-ad-slot="XXXXXXXXXX"                 // Replace with your ad slot ID
      />
    </div>
  );
};

export default AdUnit;