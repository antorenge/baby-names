export type Baby = {
  id?: string
  name: string
  list_id: string
}

export enum ApiStatus {
  IDLE = "idle",
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}
