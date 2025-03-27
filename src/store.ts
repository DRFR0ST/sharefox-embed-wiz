import { atom } from "recoil";
import { EMBED_FIELDS, EMBED_STYLE } from "./constants";
import { EmbedType } from "./types";
import { flattenEmbedFields } from "./utils";

/**
 * The Sharefox site name/merchant slug.
 */
export const siteNameState = atom({
  key: 'siteNameState',
  default: 'carrentaltestsite',
});

/**
 * The Sharefox Embed hostname.
 */
export const hostnameState = atom({
  key: 'hostnameState',
  default: '',
});

/**
 * The url to the embed script.
 */
export const embedUrlState = atom({
  key: 'embedUrlState',
  default: ``,
});

/**
 * The selected type of the embed.
 */
export const embedTypeState = atom<EmbedType>({
  key: 'embedTypeState',
  default: EmbedType.PopularProducts,
});

/**
 * The properties applied to the active embed.
 */
export const embedPropsState = atom({
  key: 'embedPropsState',
  default: flattenEmbedFields(EMBED_FIELDS[EmbedType.PopularProducts])
});

/**
 * The style applied to the active embed.
 */
export const embedStyleState = atom({
  key: 'embedStyleState',
  default: EMBED_STYLE[EmbedType.PopularProducts]
});