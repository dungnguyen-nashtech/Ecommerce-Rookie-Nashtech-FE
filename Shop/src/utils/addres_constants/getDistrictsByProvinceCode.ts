import { CONSTANT_DISTRICT } from "./district.ts";

export function getDistrictsByProvinceCode(provinceCode: string) {
  return CONSTANT_DISTRICT.data.data.filter((item) => item.parent_code === provinceCode);
}