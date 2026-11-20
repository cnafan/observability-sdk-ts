import { LogSeverity, ObservabilitySdk, SignalKind } from "openan-observability-sdk";

const sdk = ObservabilitySdk.start({
  serviceName: "task-t-agent",
  endpoint: "http://localhost:4318",
  protocol: "http/protobuf",
});
const observe = sdk.observe();
const attributes = { "extension.name": "task-t", "task.type": "diagnosis", "task.object": "router-17" };
const span = observe.trace("message/send", SignalKind.CLIENT, {
  "operation.name": "message/send",
  "task_id": "task-001",
  ...attributes,
});

await span.makeCurrent(async () => {
  observe.log("gen_ai.agent.a2at.message", LogSeverity.INFO, "Diagnosis request accepted", attributes, { span });
  observe.metric("task.duration", 1250, { "task.type": "diagnosis", "task.object": "router-17" });
  observe.metric("task.count", 1, { "task.type": "diagnosis" });
  span.ok();
});

span.end();
await sdk.flush();
await sdk.close();
