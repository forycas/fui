import { DefineComponent, Plugin } from 'vue';


declare const Fui: Exclude<Plugin['install'], undefined>;
export default Fui;

export const FuiSample: DefineComponent;
