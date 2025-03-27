import { atom } from "recoil";
import { EMBED_FIELDS, EMBED_STYLE } from "./constants";
import { EmbedType } from "./types";
import { flattenEmbedFields } from "./utils";

/**
 * A custom effect to persist the state in localStorage.
 * It sets the initial value from localStorage if it exists,
 * and updates localStorage whenever the state changes.
 */
const localStorageEffect = (key: string) => 
  ({ setSelf, onSet }: { setSelf: (value: any) => void; onSet: (callback: (newValue: any) => void) => void }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

/**
 * The Sharefox site name/merchant slug.
 */
export const siteNameState = atom({
  key: 'siteNameState',
  default: 'carrentaltestsite',
  effects: [localStorageEffect('siteNameState')],
});

/**
 * The Sharefox Embed hostname.
 */
export const hostnameState = atom({
  key: 'hostnameState',
  default: '',
  effects: [localStorageEffect('hostnameState')],
});

/**
 * The url to the embed script.
 */
export const embedUrlState = atom({
  key: 'embedUrlState',
  default: ``,
  effects: [localStorageEffect('embedUrlState')],
});

/**
 * The selected type of the embed.
 */
export const embedTypeState = atom<EmbedType>({
  key: 'embedTypeState',
  default: EmbedType.PopularProducts,
  effects: [localStorageEffect('embedTypeState')],
});

/**
 * The properties applied to the active embed.
 */
export const embedPropsState = atom({
  key: 'embedPropsState',
  default: flattenEmbedFields(EMBED_FIELDS[EmbedType.PopularProducts]),
  effects: [localStorageEffect('embedPropsState')],
});

/**
 * The style applied to the active embed.
 */
export const embedStyleState = atom({
  key: 'embedStyleState',
  default: EMBED_STYLE[EmbedType.PopularProducts],
  effects: [localStorageEffect('embedStyleState')],
});