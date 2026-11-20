import { ObservabilitySdk, SignalKind, TraceContextPropagation } from "openan-observability-sdk";

const sdk = ObservabilitySdk.start({ serviceName: "a2a-client" });
const observe = sdk.observe();
const headers: Record<string, string> = {};
const client = observe.trace("message/send", SignalKind.CLIENT, { "operation.name": "message/send" });

await client.makeCurrent(() => TraceContextPropagation.inject(headers));
client.end();

await TraceContextPropagation.runWithExtracted(headers, async () => {
  const server = observe.trace("message/send", SignalKind.SERVER, { "operation.name": "message/send" });
  server.ok();
  server.end();
});

await sdk.close();
