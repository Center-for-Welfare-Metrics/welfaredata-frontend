export type EventBusTypes = "CHANGE_LEVEL" | "CLOSE";

export type EventBusPayload = {
  CHANGE_LEVEL: {
    id: string;
  };
  CLOSE: {};
};

export type EventBusProps = {
  type: EventBusTypes;
  payload: EventBusPayload[EventBusTypes];
};

export type EventBus = {
  publish: (event: EventBusProps) => void;
};

export type EventBusHandler = (eventBus: EventBus) => void;
