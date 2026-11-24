import { ObservabilitySdk, SignalKind, TraceContextPropagation } from "openan-observability-sdk";

const sdk = ObservabilitySdk.start({ serviceName: "a2a-client" });
const observe = sdk.observe();
const headers: Record<string, string> = {};
const client = observe.trace("SendMessage", SignalKind.CLIENT, { "operation.name": "SendMessage" });

await client.makeCurrent(() => TraceContextPropagation.inject(headers));
client.end();

await TraceContextPropagation.runWithExtracted(headers, async () => {
  const server = observe.trace("SendMessage", SignalKind.SERVER, { "operation.name": "SendMessage" });
  server.ok();
  server.end();
});

await sdk.close();
