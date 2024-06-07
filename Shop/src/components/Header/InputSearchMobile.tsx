import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInput } from "../../utils/useInput.ts";
import { useNavigate } from "react-router";

import { useDebounce } from "@uidotdev/usehooks";


export function InputSearchMobile() {
  const searchInput = useInput("");
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchInput.value, 500);

  const searchProduct = () => {
    if (debouncedSearchTerm) {
      navigate(`/search/${debouncedSearchTerm}`);
    }
  };

  useEffect(() => {
    searchProduct();
  }, [debouncedSearchTerm]);

  return (
    <>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") searchProduct();
        }}
        {...searchInput} type="text" placeholder="Tìm kiếm sản phẩm"
      />
      <span>
                  <Search onClick={searchProduct} className="icon" />
                </span>
    </>
  );
}

function useThrottleCustom(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}