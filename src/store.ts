import { atom } from "recoil";
import { EMBED_FIELDS, EMBED_STYLE } from "./constants";
import { EmbedType } from "./types";

export const siteNameState = atom({
  key: 'siteNameState', // unique ID (with respect to other atoms/selectors)
  default: 'bilutleie1', // default value (aka initial value)
});

export const embedTypeState = atom<EmbedType>({
  key: 'embedTypeState', // unique ID (with respect to other atoms/selectors)
  default: EmbedType.PopularProducts, // default value (aka initial value)
  // Effect change props state
  effects: [
    ({ setSelf }) => {
      setSelf(EmbedType.PopularProducts);
    }
  ]
});

export const embedPropsState = atom({
  key: 'embedPropsState',
  default: EMBED_FIELDS[EmbedType.PopularProducts]
});

export const embedStyleState = atom({
  key: 'embedStyleState',
  default: EMBED_STYLE[EmbedType.PopularProducts]
});