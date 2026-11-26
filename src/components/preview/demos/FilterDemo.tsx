import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, RotateCcw } from 'lucide-react';

interface ProductItem {
  id: number;
  name: string;
  brand: string;
  priceMan: number;
  freeShipping: boolean;
}

const PRODUCTS: ProductItem[] = [
  { id: 1, name: '소프트 울 가디건', brand: '무신사 스탠다드', priceMan: 4, freeShipping: true },
  { id: 2, name: '구스다운 숏패딩', brand: '노스페이스', priceMan: 19, freeShipping: true },
  { id: 3, name: '캐시미어 머플러', brand: '에잇세컨즈', priceMan: 6, freeShipping: false },
  { id: 4, name: '오버핏 니트 조끼', brand: '무신사 스탠다드', priceMan: 3, freeShipping: true },
  { id: 5, name: '헤비 플리스 자켓', brand: '파타고니아', priceMan: 12, freeShipping: true },
  { id: 6, name: '코듀로이 와이드 팬츠', brand: '에잇세컨즈', priceMan: 8, freeShipping: false },
];

const BRANDS = ['전체', '무신사 스탠다드', '노스페이스', '에잇세컨즈', '파타고니아'];

export const FilterDemo: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<'price' | 'brand'>('price');
  const [minPrice, setMinPrice] = useState(3);
  const [maxPrice, setMaxPrice] = useState(12);
  const [selectedBrand, setSelectedBrand] = useState('전체');
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const inPrice = p.priceMan >= minPrice && p.priceMan <= maxPrice;
      const inBrand = selectedBrand === '전체' || p.brand === selectedBrand;
      const inShipping = !freeShippingOnly || p.freeShipping;
      return inPrice && inBrand && inShipping;
    });
  }, [minPrice, maxPrice, selectedBrand, freeShippingOnly]);

  const minPercent = (minPrice / 20) * 100;
  const maxPercent = (maxPrice / 20) * 100;

  const resetAll = () => {
    setMinPrice(3);
    setMaxPrice(12);
    setSelectedBrand('전체');
    setFreeShippingOnly(false);
  };

  return (
    <div className="space-y-3.5">
      {/* Top Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => setActiveSheet('price')}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition ${
            activeSheet === 'price'
              ? 'bg-[#E8F3FF] text-[#3182F6] ring-1 ring-[#3182F6]/30'
              : 'bg-[#F2F4F6] text-[#4E5968]'
          }`}
        >
          가격 {minPrice}~{maxPrice}만
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setActiveSheet('brand')}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition ${
            activeSheet === 'brand' || selectedBrand !== '전체'
              ? 'bg-[#E8F3FF] text-[#3182F6] ring-1 ring-[#3182F6]/30'
              : 'bg-[#F2F4F6] text-[#4E5968]'
          }`}
        >
          {selectedBrand === '전체' ? '브랜드' : selectedBrand}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setFreeShippingOnly((prev) => !prev)}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition ${
            freeShippingOnly
              ? 'bg-[#E8F3FF] text-[#3182F6] ring-1 ring-[#3182F6]/30'
              : 'bg-[#F2F4F6] text-[#4E5968]'
          }`}
        >
          {freeShippingOnly && <Check className="h-3 w-3" />}
          무료배송
        </button>
      </div>

      {/* Interactive Filter Sheet */}
      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E5E8EB]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#191F28]">
            {activeSheet === 'price' ? '가격' : '브랜드 선택'}
          </span>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[#8B95A1] hover:text-[#191F28]"
          >
            <RotateCcw className="h-3 w-3" />
            초기화
          </button>
        </div>

        {activeSheet === 'price' ? (
          <div>
            <div className="relative flex h-7 items-center">
              <div className="h-1.5 w-full rounded-full bg-[#E5E8EB]" />
              <div
                className="absolute h-1.5 rounded-full bg-[#3182F6]"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
              />
              <input
                type="range"
                min={0}
                max={20}
                value={minPrice}
                aria-label="최소 가격"
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))
                }
                className="range-thumb-input absolute w-full"
              />
              <input
                type="range"
                min={0}
                max={20}
                value={maxPrice}
                aria-label="최대 가격"
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))
                }
                className="range-thumb-input absolute w-full"
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] text-[#8B95A1]">
              <span>0원</span>
              <span>10만 원</span>
              <span>20만 원</span>
            </div>

            <p className="mt-3 text-[15px] font-bold text-[#191F28]">
              {minPrice}만 원 ~ {maxPrice}만 원
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`rounded-xl px-3 py-2 text-[12px] font-semibold transition ${
                  selectedBrand === brand
                    ? 'bg-[#3182F6] text-white'
                    : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Live Filtered Preview */}
      <div className="rounded-2xl bg-[#F9FAFB] p-3.5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[12px] font-semibold text-[#4E5968]">
            조건에 맞는 상품
          </span>
          <span className="text-[12px] font-bold text-[#3182F6]">
            {filteredProducts.length}개
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="space-y-1.5">
            {filteredProducts.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-[12.5px] ring-1 ring-[#E5E8EB]/70"
              >
                <div>
                  <span className="font-semibold text-[#191F28]">{item.name}</span>
                  <span className="ml-1.5 text-[11px] text-[#8B95A1]">{item.brand}</span>
                </div>
                <span className="font-bold text-[#3182F6]">{item.priceMan}만 원</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-2 text-center text-[12px] text-[#8B95A1]">
            선택한 조건의 상품이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};
