// src/components/AdUnit.tsx
export default function AdUnit() {
    return (
      <div className="my-4">
        <ins
          className="adsbyard-in-article"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Your publisher ID
          data-ad-slot="XXXXXXXXXX"                 // Your ad slot ID
        />
      </div>
    )
  }