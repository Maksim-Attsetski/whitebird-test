import { useDispatch, useSelector } from "react-redux";
import { store } from "@/store";

const state = store.getState();
export const useTypedDispatch = useDispatch.withTypes<typeof store.dispatch>(); //
export const useTypedSelector = useSelector.withTypes<typeof state>();
