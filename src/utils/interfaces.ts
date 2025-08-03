import { Socket } from "socket.io";
import { UserPayload } from "./types";

export interface AuthenticatedSocket extends Socket {
  data: { user?: UserPayload; };
}
