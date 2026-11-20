import { context, type Context, type TextMapGetter, type TextMapSetter } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";

const PROPAGATOR = new W3CTraceContextPropagator();

export class TraceContextPropagation {
  static inject<Carrier>(carrier: Carrier, setter: TextMapSetter<Carrier> = objectSetter as TextMapSetter<Carrier>): Carrier {
    if (carrier === undefined || carrier === null) throw new TypeError("carrier is required");
    PROPAGATOR.inject(context.active(), carrier, setter);
    return carrier;
  }

  static extract<Carrier>(carrier: Carrier, getter: TextMapGetter<Carrier> = objectGetter as TextMapGetter<Carrier>): Context {
    if (carrier === undefined || carrier === null) throw new TypeError("carrier is required");
    return PROPAGATOR.extract(context.active(), carrier, getter);
  }

  static runWithExtracted<Carrier, Result>(
    carrier: Carrier,
    callback: () => Result,
    getter: TextMapGetter<Carrier> = objectGetter as TextMapGetter<Carrier>,
  ): Result {
    if (typeof callback !== "function") throw new TypeError("callback is required");
    return context.with(this.extract(carrier, getter), callback);
  }

  /** Attaches extracted context until dispose() is called. Prefer runWithExtracted for async callbacks. */
  static extractToCurrent<Carrier>(
    carrier: Carrier,
    getter: TextMapGetter<Carrier> = objectGetter as TextMapGetter<Carrier>,
  ): { dispose(): void } {
    return context.attach(this.extract(carrier, getter));
  }
}

const objectSetter: TextMapSetter<Record<string, string>> = {
  set(carrier, key, value) {
    carrier[key] = value;
  },
};

const objectGetter: TextMapGetter<Readonly<Record<string, string | string[] | undefined>>> = {
  keys(carrier) {
    return Object.keys(carrier);
  },
  get(carrier, key) {
    return carrier[key];
  },
};
