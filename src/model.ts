import type { ActionCreatorWithPayload, ActionCreatorWithoutPayload, } from "@reduxjs/toolkit";


export interface CommonActionsType {
    actionsWithPayload: ActionCreatorWithPayload<any, `${string}/${string}`>;
    actionsWithoutPayloadload: ActionCreatorWithoutPayload<`${string}/${string}`>;
}