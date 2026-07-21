import { useState } from "react";

const BhxhLookup = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Tra cứu mã đơn vị BHXH
      </h1>

      <div className="relative overflow-hidden rounded-xl border border-stroke">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
              <p className="text-gray-500">
                Đang kết nối đến Cổng BHXH Việt Nam...
              </p>
            </div>
          </div>
        )}

        <iframe
          title="Tra cứu mã đơn vị BHXH"
          src="https://baohiemxahoi.gov.vn/tracuu/Pages/don-vi-tham-gia-bhxh.aspx"
          className="h-[850px] w-full"
          frameBorder={0}
          loading="lazy"
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default BhxhLookup;